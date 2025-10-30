import { executeQuery } from './azureDBConnect.js';
import { transporter } from './emails.js';
import crypto from 'crypto';

export class AuthService {
    // Login
    static async validateCredentials(email, password) {
        try {
            const result = await executeQuery(
                'EXEC sp_ValidarCredenciales @param0, @param1',
                [email, password]
            );
            
            return result[0] || null;
        } catch (error) {
            console.error('Error en validación de credenciales:', error);
            throw error;
        }
    }

    // Registro
    static async registerUser(nombre, email, password) {
        try {
            // Primero verificamos si el email existe
            const emailExiste = await executeQuery(
                'EXEC sp_VerificarEmail @param0',
                [email]
            );

            if (emailExiste[0].existe > 0) {
                throw new Error('El email ya está registrado');
            }

            const result = await executeQuery(
                'EXEC sp_RegistrarUsuario @param0, @param1, @param2',
                [nombre, email, password]
            );

            return result[0];
        } catch (error) {
            console.error('Error en registro:', error);
            throw error;
        }
    }

    // Recuperación de contraseña
    static async initializePasswordRecovery(email) {
        try {
            // Generar token
            const token = crypto.randomBytes(32).toString('hex');
            const expiracion = new Date();
            expiracion.setHours(expiracion.getHours() + 1); // Token válido por 1 hora

            const result = await executeQuery(
                'EXEC sp_GenerarTokenRecuperacion @param0, @param1, @param2',
                [email, token, expiracion]
            );

            if (result[0]) {
                // Enviar email
                await this.sendRecoveryEmail(email, token);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error en recuperación de contraseña:', error);
            throw error;
        }
    }

    // Envío de email de recuperación
    static async sendRecoveryEmail(email, token) {
        const recoveryLink = `https://michef.com/reset-password?token=${token}`;
        
        await transporter.sendMail({
            from: 'MiChef <noreply@michef.com>',
            to: email,
            subject: 'Recuperación de Contraseña',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h1 style="color: #007bff;">Recuperación de Contraseña</h1>
                    <p>Has solicitado restablecer tu contraseña.</p>
                    <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
                    <a href="${recoveryLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                        Restablecer Contraseña
                    </a>
                    <p>Este enlace expirará en 1 hora.</p>
                    <p>Si no solicitaste este cambio, ignora este correo.</p>
                </div>
            `
        });
    }
}