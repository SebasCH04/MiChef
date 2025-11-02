import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../../Style/Login/RegisterStyle.js';
import URL from '../../Services/url.js';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
    const route = useRoute();
    const isEditing = route.params?.isEditing || false;

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [knowledgeLevel, setKnowledgeLevel] = useState('');
    const [dietType, setDietType] = useState('');
    const [allergies, setAllergies] = useState('');
    const [ingredientsToAvoid, setIngredientsToAvoid] = useState('');
    const [nivelesCocina, setNivelesCocina] = useState([]);
    const [tiposDieta, setTiposDieta] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState('Cargando...');
    const [submitting, setSubmitting] = useState(false);
        const [submitError, setSubmitError] = useState('');
    
    // Estados para los errores de validación
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        loadCatalogs();
    }, []);

    // Prefill when editing: after catalogs are loaded
    useEffect(() => {
        if (!isEditing) return;
        if (nivelesCocina.length === 0 || tiposDieta.length === 0) return;
        const prefill = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('michef_user');
                if (!storedUser) return;
                const parsed = JSON.parse(storedUser);
                // Prefill name/email
                if (parsed?.nombre) setUsername(parsed.nombre);
                if (parsed?.email) setEmail(parsed.email);

                // Fetch richer user data for allergies/ingredients and names
                const usuario_id = parsed.id || parsed.id_usuario;
                if (!usuario_id) return;
                const resp = await axios.get(`${URL}:3000/home/userData`, { params: { usuario_id }, timeout: 20000, validateStatus: s => s>=200 && s<600 });
                if (resp.status === 200 && resp.data?.success) {
                    const ud = resp.data.data || {};
                    setAllergies(ud.allergies || '');
                    setIngredientsToAvoid(ud.ingredientsToAvoid || '');
                    // Map names to ids in catalogs
                    if (ud.knowledgeLevel) {
                        const matchNivel = nivelesCocina.find(n => (n.nombre_nivel||'').toLowerCase() === ud.knowledgeLevel.toLowerCase());
                        if (matchNivel) setKnowledgeLevel(String(matchNivel.id_nivel));
                    }
                    if (ud.dietType) {
                        const matchDieta = tiposDieta.find(d => (d.nombre_dieta||'').toLowerCase() === ud.dietType.toLowerCase());
                        if (matchDieta) setDietType(String(matchDieta.id_dieta));
                    }
                }
            } catch (e) {
                console.log('No se pudo prefijar datos de edición:', e?.message);
            }
        };
        prefill();
    }, [isEditing, nivelesCocina, tiposDieta]);

    const loadCatalogs = async () => {
        try {
            // Configurar axios con timeout más largo
            const axiosConfig = {
                timeout: 30000, // 30 segundos
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            
            const nivelesUrl = `${URL}:3000/api/catalogs/niveles-cocina`;
            console.log('Llamando a:', nivelesUrl);
            
            const nivelesResponse = await axios.get(nivelesUrl, axiosConfig);
            
            if (nivelesResponse.data.success) {
                setNivelesCocina(nivelesResponse.data.data);
                if (nivelesResponse.data.data.length > 0 && !knowledgeLevel) {
                    setKnowledgeLevel(nivelesResponse.data.data[0].id_nivel.toString());
                }
            }
            
            const dietasUrl = `${URL}:3000/api/catalogs/tipos-dieta`;
            console.log('Llamando a:', dietasUrl);
            
            const dietasResponse = await axios.get(dietasUrl, axiosConfig);
            
            if (dietasResponse.data.success) {
                setTiposDieta(dietasResponse.data.data);
                if (dietasResponse.data.data.length > 0 && !dietType) {
                    setDietType(dietasResponse.data.data[0].id_dieta.toString());
                }
            }
            
        } catch (error) {
            // Determinar el tipo de error y crear un mensaje apropiado
            let errorTitle = 'Error al Cargar Datos';
            let errorMessage = '';
            let buttons = [];
            
            if (error.code === 'ECONNABORTED' || error.message.includes('timeout exceeded')) {
                errorTitle = 'Tiempo de Espera Agotado';
                errorMessage = 'La conexión al servidor está tardando demasiado.\n\n' +
                              'Esto puede deberse a:\n' +
                              '• Conexión lenta a internet\n' +
                              '• El servidor está sobrecargado\n' +
                              '• Problemas de red\n\n' +
                              '¿Deseas intentar nuevamente?';
                buttons = [
                    { text: 'Reintentar', onPress: () => loadCatalogs() },
                    { text: 'Cancelar', onPress: () => navigation.goBack(), style: 'cancel' }
                ];
            } else if (error.message.includes('Network Error') || error.code === 'ERR_NETWORK' || error.code === 'ERR_BAD_REQUEST') {
                errorTitle = 'Sin Conexión al Servidor';
                errorMessage = `No se pudo conectar al servidor.\n\n` +
                              `Servidor: ${URL}:3000\n\n` +
                              `Verifica que:\n` +
                              `✓ Tengas conexión a internet\n` +
                              `✓ Estés en la misma red WiFi\n` +
                              `✓ El servidor esté corriendo\n\n` +
                              `¿Deseas intentar nuevamente?`;
                buttons = [
                    { text: 'Reintentar', onPress: () => loadCatalogs() },
                    { text: 'Cancelar', onPress: () => navigation.goBack(), style: 'cancel' }
                ];
            } else if (error.response) {
                errorTitle = 'Error del Servidor';
                const status = error.response.status;
                errorMessage = `El servidor respondió con un error (${status}).\n\n` +
                              `${error.response.data?.message || 'Error desconocido'}\n\n` +
                              `¿Deseas intentar nuevamente?`;
                buttons = [
                    { text: 'Reintentar', onPress: () => loadCatalogs() },
                    { text: 'Cancelar', onPress: () => navigation.goBack(), style: 'cancel' }
                ];
            } else {
                errorTitle = 'Error Inesperado';
                errorMessage = `Ocurrió un error inesperado:\n\n${error.message}\n\n¿Deseas intentar nuevamente?`;
                buttons = [
                    { text: 'Reintentar', onPress: () => loadCatalogs() },
                    { text: 'Cancelar', onPress: () => navigation.goBack(), style: 'cancel' }
                ];
            }
            
            Alert.alert(errorTitle, errorMessage, buttons);
        } finally {
            setLoading(false);
        }
    };

    // Funciones de validación para cada campo
    const validateUsername = (value) => {
        if (!value.trim()) {
            return 'El nombre de usuario es requerido';
        }
        if (value.length < 3) {
            return 'El nombre debe tener al menos 3 caracteres';
        }
        return '';
    };

    const validateEmail = (value) => {
        if (!value.trim()) {
            return 'El correo electrónico es requerido';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'El formato del correo no es válido';
        }
        return '';
    };

    const validatePassword = (value) => {
        if (!value) {
            return 'La contraseña es requerida';
        }
        if (value.length < 8) {
            return 'La contraseña debe tener al menos 8 caracteres';
        }
        if (!/[A-Z]/.test(value)) {
            return 'Debe contener al menos una mayúscula';
        }
        if (!/[a-z]/.test(value)) {
            return 'Debe contener al menos una minúscula';
        }
        if (!/[0-9]/.test(value)) {
            return 'Debe contener al menos un número';
        }
        return '';
    };

    const validateConfirmPassword = (value) => {
        if (!value) {
            return 'Confirma tu contraseña';
        }
        if (value !== password) {
            return 'Las contraseñas no coinciden';
        }
        return '';
    };

    // Manejadores de cambio con validación
    const handleUsernameChange = (value) => {
        setUsername(value);
        setErrors(prev => ({ ...prev, username: validateUsername(value) }));
    };

    const handleEmailChange = (value) => {
        setEmail(value);
        setErrors(prev => ({ ...prev, email: validateEmail(value) }));
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        setErrors(prev => ({ 
            ...prev, 
            password: validatePassword(value),
            confirmPassword: confirmPassword ? validateConfirmPassword(confirmPassword) : ''
        }));
    };

    const handleConfirmPasswordChange = (value) => {
        setConfirmPassword(value);
        setErrors(prev => ({ ...prev, confirmPassword: validateConfirmPassword(value) }));
    };

    const validateForm = () => {
        const usernameError = validateUsername(username);
        const emailError = validateEmail(email);
        const passwordError = !isEditing ? validatePassword(password) : '';
        const confirmPasswordError = !isEditing ? validateConfirmPassword(confirmPassword) : '';

        setErrors({
            username: usernameError,
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError
        });

        if (usernameError || emailError || passwordError || confirmPasswordError) {
            return false;
        }

        if (!knowledgeLevel) {
            Alert.alert('Error', 'Selecciona un nivel de conocimiento');
            return false;
        }
        if (!dietType) {
            Alert.alert('Error', 'Selecciona un tipo de dieta');
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        try {
            console.log('=== Iniciando registro ===');
            setSubmitError('');
            setSubmitting(true);
            setLoading(true);
            setLoadingMessage('Registrando usuario...');
            
            const requestData = {
                nombre: username,
                email: email,
                password: password,
                confirmPassword: password,
                idNivelCocina: parseInt(knowledgeLevel),
                idTipoDieta: parseInt(dietType),
                ingredientesEvitar: ingredientsToAvoid.split(',').map(i => i.trim()).filter(i => i),
                alergias: allergies.split(',').map(a => a.trim()).filter(a => a)
            };
            
            console.log('URL de registro:', `${URL}:3000/register`);
            console.log('Datos a enviar:', requestData);
            
            setLoadingMessage('Registrando nuevo usuario...');
            
            const axiosConfig = {
                timeout: 30000, // 30 segundos
                headers: {
                    'Content-Type': 'application/json'
                },
                // Tratar códigos 4xx y 5xx como respuestas manejables (no excepciones)
                validateStatus: (status) => status >= 200 && status < 600,
            };
            
            const response = await axios.post(`${URL}:3000/register`, requestData, axiosConfig);
            
            console.log('Respuesta del servidor:', response.data);
            console.log('Status code:', response.status);
            
            // Manejar respuestas de error del servidor (4xx, 5xx)
            if (!response.data.success || response.status >= 400) {
                const status = response.status;
                const serverMessage = response.data?.message;
                let errorTitle = 'Error en el Registro';
                let errorMessage = '';
                
                if (status === 400) {
                    errorTitle = 'Datos Inválidos';
                    errorMessage = serverMessage || 'Los datos ingresados no son válidos. Por favor verifica la información.';
                } else if (status === 409) {
                    errorTitle = 'Email Ya Registrado';
                    errorMessage = serverMessage || 'El correo electrónico ya está registrado. Por favor usa otro correo.';
                } else if (status === 500) {
                    errorTitle = 'Error del Servidor';
                    errorMessage = serverMessage || 'Hubo un error en el servidor. Por favor intenta más tarde.';
                } else {
                    errorMessage = serverMessage || `Error del servidor (código ${status})`;
                }
                // Cerrar overlay de carga ANTES de mostrar el Alert
                setLoading(false);
                setSubmitting(false);
                // Mostrar error inline al estilo del Login
                setSubmitError(errorMessage);
                return;
            }
            
            if (response.data.success) {
                // Detener estados de carga
                setLoading(false);
                setSubmitting(false);

                // Resetear el formulario
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setAllergies('');
                setIngredientsToAvoid('');

                // Mensaje de éxito que se mostrará en Login
                const successText = `¡Usuario creado exitosamente! Ahora puedes iniciar sesión.`;

                // Navegar al Login y mostrar banner verde
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'login', params: { successMessage: successText } }]
                });
            }
        } catch (error) {
            // No mostrar logs en consola para errores esperados (409 - email duplicado)
            if (error.response?.status !== 409) {
                console.error('Error en registro:', error.message);
            }
            
            // Determinar el mensaje de error apropiado
            let errorTitle = 'Error en el Registro';
            let errorMessage = '';
            
            if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
                errorTitle = 'Tiempo de Espera Agotado';
                errorMessage = 'La conexión al servidor tardó demasiado tiempo.\n\n' +
                              'Posibles causas:\n' +
                              '• El servidor no está respondiendo\n' +
                              '• Problemas de conexión a internet\n' +
                              '• El servidor está procesando demasiadas solicitudes\n\n' +
                              'Por favor, intenta nuevamente.';
            } else if (error.message.includes('Network Error') || error.code === 'ERR_NETWORK') {
                errorTitle = 'Error de Conexión';
                errorMessage = `No se pudo conectar al servidor.\n\n` +
                              `Verifica que:\n` +
                              `• Tu dispositivo tenga conexión a internet\n` +
                              `• Estés en la misma red WiFi que el servidor\n` +
                              `• El servidor esté corriendo\n\n` +
                              `URL del servidor: ${URL}:3000`;
            } else if (error.response) {
                // Error del servidor con respuesta
                const status = error.response.status;
                const serverMessage = error.response.data?.message;
                
                if (status === 400) {
                    errorTitle = 'Datos Inválidos';
                    errorMessage = serverMessage || 'Los datos ingresados no son válidos. Por favor verifica la información.';
                } else if (status === 409) {
                    errorTitle = 'Usuario Existente';
                    errorMessage = serverMessage || 'El correo electrónico ya está registrado. Por favor usa otro correo.';
                } else if (status === 500) {
                    errorTitle = 'Error del Servidor';
                    errorMessage = serverMessage || 'Hubo un error en el servidor. Por favor intenta más tarde.';
                } else {
                    errorMessage = serverMessage || `Error del servidor (código ${status})`;
                }
            } else {
                // Error desconocido
                errorMessage = error.message || 'Ocurrió un error inesperado. Por favor intenta nuevamente.';
            }
            // Cerrar overlay de carga y mostrar error inline
            setLoading(false);
            setSubmitting(false);
            setSubmitError(errorMessage);
        } finally {
            // Asegurar que no quede bloqueado el botón
            setSubmitting(false);
            // El loading ya se maneja antes de los Alerts para que no tape el popup
        }
    };

    const handleAction = async () => {
        // Validar el formulario
        if (!validateForm()) return;

        if (isEditing) {
            try {
                setSubmitError('');
                setSubmitting(true);
                setLoading(true);
                setLoadingMessage('Guardando cambios...');

                const storedUser = await AsyncStorage.getItem('michef_user');
                const parsed = storedUser ? JSON.parse(storedUser) : null;
                const usuario_id = parsed?.id || parsed?.id_usuario;
                if (!usuario_id) throw new Error('No se encontró el usuario');

                const payload = {
                    usuario_id,
                    nombre: username,
                    idNivelCocina: parseInt(knowledgeLevel),
                    idTipoDieta: parseInt(dietType),
                    alergias: allergies,
                    ingredientesEvitar: ingredientsToAvoid,
                };

                const resp = await axios.put(`${URL}:3000/home/updateProfile`, payload, {
                    timeout: 30000,
                    headers: { 'Content-Type': 'application/json' },
                    validateStatus: s => s>=200 && s<600,
                });

                if (resp.status >= 400 || !resp.data?.success) {
                    const msg = resp.data?.message || 'No se pudo actualizar el perfil';
                    setLoading(false); setSubmitting(false); setSubmitError(msg); return;
                }

                // Actualizar AsyncStorage (al menos el nombre)
                if (parsed) {
                    parsed.nombre = username;
                    await AsyncStorage.setItem('michef_user', JSON.stringify(parsed));
                }

                setLoading(false); setSubmitting(false);
                navigation.reset({ index: 0, routes: [{ name: 'userdata' }] });
            } catch (error) {
                let msg = 'Error al actualizar el perfil';
                if (error.code === 'ECONNABORTED' || (error.message||'').includes('timeout')) msg = 'Tiempo agotado al contactar el servidor';
                else if (error.message?.includes('Network Error') || error.code === 'ERR_NETWORK') msg = 'No se pudo conectar al servidor';
                setLoading(false); setSubmitting(false); setSubmitError(msg);
            }
            return;
        }

        // Registro normal
        handleRegister();
    };
    const handleCancel = () => navigation?.goBack();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={{ marginTop: 20, fontSize: 16, color: '#333' }}>{loadingMessage}</Text>
                <Text style={{ marginTop: 10, fontSize: 12, color: '#666', textAlign: 'center', paddingHorizontal: 40 }}>
                    Por favor espere...
                </Text>
            </View>
        );
    }

    const screenTitle = isEditing ? 'Editar Perfil' : 'Registrarse';
    const actionButtonText = isEditing ? 'Guardar Cambios' : 'Registrarse';

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <Text style={styles.headerText}>MiChef</Text>
                </View>
                <Text style={styles.title}>{screenTitle}</Text>
                <View style={styles.formContainer}>
                    {submitError ? (
                        <View style={{ backgroundColor: '#ffebee', borderColor: '#ff5252', borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 10 }}>
                            <Text style={{ color: '#b00020' }}>{submitError}</Text>
                        </View>
                    ) : null}
                    <Text style={styles.label}>Nombre de usuario</Text>
                    <TextInput 
                        style={[styles.input, errors.username && styles.inputError]} 
                        value={username} 
                        onChangeText={handleUsernameChange} 
                        placeholder="Ej: Juan Ramírez" 
                    />
                    {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
                    
                    {!isEditing && (
                        <>
                            <Text style={styles.label}>Correo electrónico</Text>
                            <TextInput 
                                style={[styles.input, errors.email && styles.inputError]} 
                                value={email} 
                                onChangeText={handleEmailChange} 
                                keyboardType="email-address" 
                                autoCapitalize="none" 
                                placeholder="Ej: juanramirez@correo.com" 
                            />
                            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                            
                            <Text style={styles.label}>Contraseña</Text>
                            <TextInput 
                                style={[styles.input, errors.password && styles.inputError]} 
                                value={password} 
                                onChangeText={handlePasswordChange} 
                                secureTextEntry 
                                placeholder="Mínimo 8 caracteres" 
                            />
                            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                            
                            <Text style={styles.label}>Confirmar contraseña</Text>
                            <TextInput 
                                style={[styles.input, errors.confirmPassword && styles.inputError]} 
                                value={confirmPassword} 
                                onChangeText={handleConfirmPasswordChange} 
                                secureTextEntry 
                                placeholder="Repite la contraseña" 
                            />
                            {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
                        </>
                    )}
                    <Text style={styles.label}>Nivel de conocimiento en la cocina</Text>
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={knowledgeLevel} onValueChange={setKnowledgeLevel} style={styles.picker}>
                            {nivelesCocina.map(nivel => <Picker.Item key={nivel.id_nivel} label={nivel.nombre_nivel} value={nivel.id_nivel.toString()} />)}
                        </Picker>
                    </View>
                    <Text style={styles.label}>Tipo de dieta</Text>
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={dietType} onValueChange={setDietType} style={styles.picker}>
                            {tiposDieta.map(dieta => <Picker.Item key={dieta.id_dieta} label={dieta.nombre_dieta} value={dieta.id_dieta.toString()} />)}
                        </Picker>
                    </View>
                    <Text style={styles.label}>Tipo de alergias (separado por comas)</Text>
                    <TextInput style={styles.input} value={allergies} onChangeText={setAllergies} placeholder="Ej: Gluten, Lactosa, etc..." />
                    <Text style={styles.label}>Ingredientes a evitar (separado por comas)</Text>
                    <TextInput style={styles.input} value={ingredientsToAvoid} onChangeText={setIngredientsToAvoid} placeholder="Ej: Cilantro, Ajo, etc..." />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.registerButton, submitting && { opacity: 0.6 }]} onPress={handleAction} disabled={submitting}>
                        {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{actionButtonText}</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleCancel} disabled={submitting}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;
