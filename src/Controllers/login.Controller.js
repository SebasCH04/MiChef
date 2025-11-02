import { executeQuery } from '../Services/azureDBConnect.js';
import { transporter } from '../Services/emails.js';
import crypto from 'crypto';

export const loginController = {
    // Login
    login: async (req, res) => {
        const { email, password } = req.body;
        console.log("Solicitud recibida en login", email);

        try {
            const result = await executeQuery(
                'EXEC sp_ValidarCredenciales @param0, @param1',
                [email.toLowerCase(), password]
            );

            if (!result || result.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
            }

            const user = result[0];

            // Enviar correo de confirmación
            await enviarCorreoLogin(email, user.nombre);

            return res.status(200).json({
                success: true,
                message: 'Login exitoso',
                user: {
                    id: user.id_usuario,
                    nombre: user.nombre,
                    email: user.email,
                    tipo_dieta: user.tipo_dieta,
                    nivel_cocina: user.nivel_cocina,
                }
            });

        } catch (error) {
            console.error('Error en login:', error);
            return res.status(500).json({
                success: false,
                message: 'Error en el servidor'
            });
        }
    },

    // Registro
    register: async (req, res) => {
        try {
            const {
                nombre,
                email,
                password,
                confirmPassword,
                idNivelCocina,
                idTipoDieta,
                ingredientesEvitar,
                alergias
            } = req.body;

            // Validar campos requeridos (AHORA: solo ids para nivel/tipo)
            if (!nombre || !email || !password || !confirmPassword || idNivelCocina === undefined || idTipoDieta === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Todos los campos son requeridos. Debes enviar idNivelCocina e idTipoDieta.'
                });
            }

            // Validar que las contraseñas coincidan
            if (password !== confirmPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Las contraseñas no coinciden'
                });
            }

            // Validar longitud mínima de contraseña
            if (password.length < 8) {
                return res.status(400).json({
                    success: false,
                    message: 'La contraseña debe tener al menos 8 caracteres'
                });
            }

            // Parsear ids
            const idNivel = parseInt(idNivelCocina, 10);
            const idDieta = parseInt(idTipoDieta, 10);

            if (!Number.isInteger(idNivel) || !Number.isInteger(idDieta)) {
                return res.status(400).json({ success: false, message: 'idNivelCocina e idTipoDieta deben ser números enteros' });
            }

            // Verificar existencia en catálogos
            const nivelExists = await executeQuery('SELECT 1 AS existsFlag FROM niveles_cocina WHERE id_nivel = @param0', [idNivel]);
            if (!nivelExists || nivelExists.length === 0) {
                return res.status(400).json({ success: false, message: 'Nivel de cocina no válido' });
            }

            const dietaExists = await executeQuery('SELECT 1 AS existsFlag FROM tipos_dieta WHERE id_dieta = @param0', [idDieta]);
            if (!dietaExists || dietaExists.length === 0) {
                return res.status(400).json({ success: false, message: 'Tipo de dieta no válido' });
            }

            // Convertir arrays a strings separados por comas
            const ingredientesEvitarStr = Array.isArray(ingredientesEvitar) 
                ? ingredientesEvitar.join(', ') 
                : (ingredientesEvitar || '');
            
            const alergiasStr = Array.isArray(alergias) 
                ? alergias.join(', ') 
                : (alergias || '');

            console.log('Datos a enviar al SP:');
            console.log('- Nombre:', nombre);
            console.log('- Email:', email.toLowerCase());
            console.log('- IdNivelCocina:', idNivel);
            console.log('- IdTipoDieta:', idDieta);
            console.log('- IngredientesEvitar:', ingredientesEvitarStr);
            console.log('- Alergias:', alergiasStr);

            // Registrar nuevo usuario con todos los datos usando IDs
            const result = await executeQuery(
                'EXEC sp_RegistrarUsuario @Nombre = @param0, @Email = @param1, @Password = @param2, @IdNivelCocina = @param3, @IdTipoDieta = @param4, @IngredientesEvitar = @param5, @Alergias = @param6',
                [
                    nombre,
                    email.toLowerCase(),
                    password,
                    idNivel,
                    idDieta,
                    ingredientesEvitarStr,
                    alergiasStr
                ]
            );

            return res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                user: {
                    id: result[0].id_usuario,
                    nombre: result[0].nombre,
                    email: result[0].email,
                    nivelCocina: result[0].nivel_cocina,
                    tipoDieta: result[0].tipo_dieta,
                    ingredientesEvitar: result[0].ingredientes_evitar,
                    alergias: result[0].alergias
                }
            });

        } catch (error) {
            // Capturar error específico de email duplicado
            if (error.number === 50001 || error.message?.includes('El email ya está registrado')) {
                return res.status(409).json({
                    success: false,
                    message: 'El email ya está registrado. Por favor usa otro correo electrónico.'
                });
            }
            
            // Para otros errores, mostrar mensaje genérico sin logs ruidosos
            return res.status(500).json({
                success: false,
                message: error.message || 'Error en el servidor al procesar el registro'
            });
        }
    },

    // Recuperación de contraseña
    recoverPassword: async (req, res) => {
        try {
            const { email } = req.body;
            
            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: 'El email es requerido'
                });
            }

            // El SP espera UNIQUEIDENTIFIER; generar un UUID v4 válido
            const token = crypto.randomUUID();
            // Generar un código de 6 dígitos derivado del token (solo números)
            const hash = crypto.createHash('sha256').update(token).digest('hex');
            const numeric = parseInt(hash.slice(0, 12), 16) % 1000000;
            const code = String(numeric).padStart(6, '0');
            const expiracion = new Date();
            expiracion.setHours(expiracion.getHours() + 1);

            const result = await executeQuery(
                'EXEC sp_GenerarTokenRecuperacion @param0, @param1, @param2',
                [email.toLowerCase(), token, expiracion]
            );

            if (!result || result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No se encontró una cuenta con ese email'
                });
            }

            await enviarCorreoRecuperacion(email, code);

            return res.json({
                success: true,
                message: 'Se ha enviado un correo con las instrucciones para recuperar tu contraseña',
                code
            });

        } catch (error) {
            console.error('Error en recuperación de contraseña:', error);
            return res.status(500).json({
                success: false,
                message: 'Error en el servidor'
            });
        }
    },

    // Cambio de contraseña con verificación de código
    resetPassword: async (req, res) => {
        try {
            const { email, code, newPassword, confirmPassword } = req.body;

            if (!email || !code || !newPassword || !confirmPassword) {
                return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
            }
            if (newPassword !== confirmPassword) {
                return res.status(400).json({ success: false, message: 'Las contraseñas no coinciden' });
            }
            if (newPassword.length < 8) {
                return res.status(400).json({ success: false, message: 'La contraseña debe tener al menos 8 caracteres' });
            }

            // Obtener token y expiración almacenados mediante SP (sin SQL incrustado)
            const rows = await executeQuery(
                'EXEC sp_GetResetInfo @param0',
                [email.toLowerCase()]
            );

            if (!rows || rows.length === 0) {
                return res.status(404).json({ success: false, message: 'No se encontró una cuenta con ese email' });
            }

            const { reset_token, reset_expires } = rows[0];
            if (!reset_token || !reset_expires) {
                return res.status(400).json({ success: false, message: 'No hay un proceso de recuperación activo' });
            }
            const expiresAt = new Date(reset_expires);
            if (isNaN(expiresAt.getTime()) || expiresAt < new Date()) {
                return res.status(400).json({ success: false, message: 'El código ha expirado, solicita uno nuevo' });
            }

            // Regenerar el código a partir del token guardado y compararlo
            // Normalizar a minúsculas para evitar discrepancias de mayúsculas/minúsculas en GUID desde SQL Server
            const tokenStr = String(reset_token).trim().toLowerCase();
            const hash = crypto.createHash('sha256').update(tokenStr).digest('hex');
            const numeric = parseInt(hash.slice(0, 12), 16) % 1000000;
            const expectedCode = String(numeric).padStart(6, '0');

            if (String(code).trim() !== expectedCode) {
                return res.status(401).json({ success: false, message: 'Código inválido' });
            }

            // Usar SP para evitar SQL incrustado en código
            await executeQuery(
                'EXEC sp_ResetPassword @param0, @param1',
                [email.toLowerCase(), newPassword]
            );

            // Opcional: correo de confirmación de cambio de contraseña
            try { await transporter.sendMail({
                from: 'MiChef <appmichef@gmail.com>',
                to: email,
                subject: 'Tu contraseña ha sido cambiada',
                html: `<div style="font-family: Arial; color:#333;">
                        <p>Se cambió la contraseña de tu cuenta. Si no fuiste tú, por favor contacta soporte.</p>
                       </div>`
            }); } catch (_) {}

            return res.json({ success: true, message: 'Contraseña actualizada correctamente' });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Error al actualizar la contraseña' });
        }
    }
};

// Funciones auxiliares para envío de correos
const enviarCorreoLogin = async (email, nombre) => {
    try {
        await transporter.sendMail({
            from: 'MiChef <salascordero2003@gmail.com>',
            to: email,
            subject: 'Inicio de sesión exitoso',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h1 style="color: #007bff;">¡Bienvenido(a) a MiChef!</h1>
                    <p>Hola, <strong>${nombre}</strong>,</p>
                    <p>Has iniciado sesión exitosamente en tu cuenta.</p>
                    <p>Si no fuiste tú quien inició esta sesión, por favor contacta con soporte inmediatamente.</p>
                    <br>
                    <p>¡Que tengas una excelente experiencia!</p>
                    <p>— El equipo de MiChef</p>
                </div>
            `
        });
    } catch (error) {
        console.error('Error al enviar correo de login:', error);
    }
};

const enviarCorreoRecuperacion = async (email, code) => {
    try {
        await transporter.sendMail({
            from: 'MiChef <salascordero2003@gmail.com>',
            to: email,
            subject: 'Código de Recuperación de Contraseña',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h1 style="color: #007bff;">Recuperación de Contraseña</h1>
                    <p>Has solicitado restablecer tu contraseña.</p>
                    <p>Usa el siguiente código para continuar con el proceso en la app:</p>
                    <div style="font-size: 24px; font-weight: bold; letter-spacing: 3px; background: #f2f2f2; display: inline-block; padding: 10px 16px; border-radius: 6px; border: 1px solid #ddd;">
                        ${code}
                    </div>
                    <p style="margin-top: 12px;">Este código expirará en 1 hora.</p>
                    <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
                    <br>
                    <p>— El equipo de MiChef</p>
                </div>
            `
        });
    } catch (error) {
        console.error('Error al enviar correo de recuperación:', error);
        throw error;
    }
};



