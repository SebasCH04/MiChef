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

    const loadCatalogs = async () => {
        try {
            console.log('=== Iniciando carga de catálogos ===');
            console.log('URL:', URL);
            setLoading(true);
            setLoadingMessage('Cargando...');
            
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
            console.log('Respuesta niveles:', nivelesResponse.data);
            
            if (nivelesResponse.data.success) {
                console.log('Niveles obtenidos:', nivelesResponse.data.data);
                setNivelesCocina(nivelesResponse.data.data);
                if (nivelesResponse.data.data.length > 0 && !knowledgeLevel) {
                    setKnowledgeLevel(nivelesResponse.data.data[0].id_nivel.toString());
                }
            }
            
            const dietasUrl = `${URL}:3000/api/catalogs/tipos-dieta`;
            console.log('Llamando a:', dietasUrl);
            
            const dietasResponse = await axios.get(dietasUrl, axiosConfig);
            console.log('Respuesta dietas:', dietasResponse.data);
            
            if (dietasResponse.data.success) {
                console.log('Dietas obtenidas:', dietasResponse.data.data);
                setTiposDieta(dietasResponse.data.data);
                if (dietasResponse.data.data.length > 0 && !dietType) {
                    setDietType(dietasResponse.data.data[0].id_dieta.toString());
                }
            }
            
            console.log('=== Catálogos cargados exitosamente ===');
        } catch (error) {
            console.error('=== ERROR al cargar catálogos ===');
            console.error('Error completo:', error);
            console.error('Error message:', error.message);
            console.error('Error code:', error.code);
            console.error('Error response:', error.response?.data);
            
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
            
            setLoadingMessage('Enviando su registro al servidor...');
            
            const axiosConfig = {
                timeout: 30000, // 30 segundos
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            
            const response = await axios.post(`${URL}:3000/register`, requestData, axiosConfig);
            
            console.log('Respuesta del servidor:', response.data);
            
            if (response.data.success) {
                // Primero detener el loading
                setLoading(false);
                
                // Luego mostrar mensaje de éxito y redirigir al login
                setTimeout(() => {
                    Alert.alert(
                        '¡Registro Exitoso! 🎉',
                        `Bienvenido ${response.data.user.nombre}!\n\nTu cuenta ha sido creada correctamente.\n\nAhora puedes iniciar sesión con tu correo y contraseña.`,
                        [
                            { 
                                text: 'Ir al Login', 
                                onPress: () => {
                                    // Resetear el formulario
                                    setUsername('');
                                    setEmail('');
                                    setPassword('');
                                    setConfirmPassword('');
                                    setAllergies('');
                                    setIngredientsToAvoid('');
                                    
                                    // Navegar al Login
                                    navigation.navigate('Login');
                                }
                            }
                        ],
                        { cancelable: false } // No permitir cerrar sin presionar el botón
                    );
                }, 100);
            }
        } catch (error) {
            console.error('=== ERROR en registro ===');
            console.error('Error completo:', error);
            console.error('Error message:', error.message);
            console.error('Error response:', error.response?.data);
            
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
            
            Alert.alert(errorTitle, errorMessage, [
                { text: 'Entendido', style: 'default' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = () => {
        console.log('=== handleAction ejecutado ===');
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('KnowledgeLevel:', knowledgeLevel);
        console.log('DietType:', dietType);
        console.log('Allergies:', allergies);
        console.log('IngredientsToAvoid:', ingredientsToAvoid);
        
        // Validar el formulario
        if (!validateForm()) {
            // Si hay errores, ya están mostrados en los campos
            return;
        }
        
        handleRegister();
    };    const handleCancel = () => navigation?.goBack();

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
                    <Text style={styles.label}>Nombre de usuario</Text>
                    <TextInput 
                        style={[styles.input, errors.username && styles.inputError]} 
                        value={username} 
                        onChangeText={handleUsernameChange} 
                        placeholder="Ej: JuanPerez" 
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
                                placeholder="ejemplo@correo.com" 
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
                    <TextInput style={styles.input} value={allergies} onChangeText={setAllergies} placeholder="Ej: Gluten, Lactosa, Maní" />
                    <Text style={styles.label}>Ingredientes a evitar (separado por comas)</Text>
                    <TextInput style={styles.input} value={ingredientsToAvoid} onChangeText={setIngredientsToAvoid} placeholder="Ej: Cilantro, Trufa" />
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
