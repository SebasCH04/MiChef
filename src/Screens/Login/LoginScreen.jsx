import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { styles } from '../../Style/Login/LoginStyle.js';
import URL from '../../Services/url.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ( { navigation } ) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
        const [submitting, setSubmitting] = useState(false);
        const [errors, setErrors] = useState({ email: '', password: '' });
        const [authError, setAuthError] = useState('');

    const handleRegisterPress = () => {
        navigation.navigate('registroPage');
    };

    const handleForgotPasswordPress = () => {
        navigation.navigate('recoverPassword');
    };

    const validateEmail = (value) => {
        if (!value.trim()) return 'El correo es requerido';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'El formato del correo no es válido';
        return '';
    };

    const validatePassword = (value) => {
        if (!value) return 'La contraseña es requerida';
        if (value.length < 8) return 'Mínimo 8 caracteres';
        return '';
    };

    const handleLoginPress = async () => {
        // Validación simple
        const emailErr = validateEmail(email);
        const passErr = validatePassword(password);
        setErrors({ email: emailErr, password: passErr });
        setAuthError('');
        if (emailErr || passErr) return;

        setSubmitting(true);
        try {
            const axiosConfig = {
                timeout: 30000,
                headers: { 'Content-Type': 'application/json' }
            };

            const payload = { email: email.toLowerCase(), password };
            const endpoint = `${URL}:3000/login`;
            console.log('POST', endpoint, payload);
            const resp = await axios.post(endpoint, payload, axiosConfig);

                    if (resp.data?.success) {
                const user = resp.data.user;
                // Guardar sesión mínima
                try {
                    await AsyncStorage.setItem('michef_user', JSON.stringify(user));
                } catch (e) {
                    console.warn('No se pudo guardar el usuario en AsyncStorage', e);
                }

                        // Navegación sólida: reemplaza el stack para que no vuelva al login
                        navigation.reset({ index: 0, routes: [{ name: 'home' }] });
                        return;
            } else {
                        setAuthError('Credenciales inválidas. Verifica tu correo y contraseña.');
            }
        } catch (error) {
            console.error('Login error:', error?.message, error?.response?.data);
            if (error.code === 'ECONNABORTED' || (error.message || '').includes('timeout')) {
                        setAuthError('Tiempo agotado al contactar el servidor. Intenta nuevamente.');
            } else if (error.response?.status === 401) {
                        setAuthError('Credenciales inválidas. Correo o contraseña incorrectos.');
            } else if (error.message?.includes('Network Error') || error.code === 'ERR_NETWORK') {
                        setAuthError('No se pudo conectar al servidor. Revisa tu conexión.');
            } else {
                        setAuthError(error.response?.data?.message || 'Ocurrió un error al iniciar sesión');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText} accessibilityRole="header">MiChef</Text>
            </View>

            <Text style={styles.title} accessibilityRole="header">Inicio de Sesión</Text>

            {/* Formulario de Login */}
            <View style={styles.formContainer}>
                                {authError ? (
                                    <View style={{ backgroundColor: '#ffebee', borderColor: '#ff5252', borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 10 }}>
                                        <Text style={{ color: '#b00020' }}>{authError}</Text>
                                    </View>
                                ) : null}
                {/* Campo de Correo Electrónico */}
                <Text style={styles.label} accessibilityRole="text">Correo Electrónico</Text>
                <TextInput
                    style={[styles.input, errors.email ? styles.inputError : null]}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChangeText={(v) => {
                      setEmail(v);
                      setErrors((prev) => ({ ...prev, email: validateEmail(v) }));
                                            if (authError) setAuthError('');
                    }}
                    accessibilityLabel="Introduce tu correo electrónico"
                    accessibilityHint="Campo de texto para el correo electrónico"
                />
                {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

                {/* Campo de Contraseña */}
                <Text style={styles.label} accessibilityRole="text">Contraseña</Text>
                <TextInput
                    style={[styles.input, errors.password ? styles.inputError : null]}
                    secureTextEntry
                    placeholder="Escribe tu contraseña"
                    value={password}
                    onChangeText={(v) => {
                      setPassword(v);
                      setErrors((prev) => ({ ...prev, password: validatePassword(v) }));
                                            if (authError) setAuthError('');
                    }}
                    accessibilityLabel="Introduce tu contraseña"
                    accessibilityHint="Campo de texto seguro para la contraseña"
                />
                {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

                {/* Enlace para recuperar contraseña */}
                <View style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPasswordText}>¿No recuerda su contraseña? Presione </Text>
                    <TouchableOpacity
                        accessibilityLabel="Recuperar contraseña"
                        accessibilityHint="Pulsa para ir a la página de recuperación de contraseña"
                        accessibilityRole="link"
                        onPress={handleForgotPasswordPress}
                    >
                        <Text style={styles.forgotPasswordLink}>aquí</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Botón de Iniciar Sesión */}
            <TouchableOpacity
                style={[styles.button, submitting && { opacity: 0.7 }]}
                accessibilityLabel="Iniciar Sesión"
                accessibilityHint="Pulsa para acceder a tu cuenta"
                accessibilityRole="button"
                onPress={handleLoginPress}
                disabled={submitting}
            >
                {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Iniciar</Text>}
            </TouchableOpacity>

            {/* Enlace de Registro */}
            <View style={styles.registerContainer}>
                <Text style={styles.registerText}>
                    En caso de no tener una cuenta, presione en{' '}
                </Text>
                <TouchableOpacity
                    accessibilityLabel="Registrarse"
                    accessibilityHint="Pulsa para crear una nueva cuenta"
                    accessibilityRole="link"
                    onPress={handleRegisterPress}
                >
                    <Text style={styles.registerLink}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default LoginScreen;
