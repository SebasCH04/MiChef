import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../Style/Login/RecoverPasswordStyle.js';
import axios from 'axios';
import URL from '../../Services/url.js';



const RecoverPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const validateEmail = (value) => {
    if (!value.trim()) return 'El correo es requerido';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'El formato del correo no es válido';
    return '';
  };

  const handleConfirmPress = async () => {
    // limpiar banners previos
    setErrorMsg('');
    setSuccessMsg('');

    const emailErr = validateEmail(email);
    if (emailErr) {
      setErrorMsg(emailErr);
      return;
    }

    setSubmitting(true);
    try {
      const endpoint = `${URL}:3000/recover-password`;
      const resp = await axios.post(
        endpoint,
        { email: email.toLowerCase() },
        {
          timeout: 30000,
          headers: { 'Content-Type': 'application/json' },
          validateStatus: (s) => s >= 200 && s < 600,
        }
      );

      if (resp.status === 200 && resp.data?.success) {
        setSuccessMsg('Te enviamos un correo con el código de verificación. Revisa tu bandeja de entrada.');
        // Ir a pantalla de verificación con el email y el código esperado
        setTimeout(() => {
          navigation.navigate('verificationCode', { email: email.toLowerCase(), expectedCode: resp.data.code });
        }, 400);
        return;
      }

      // Manejo de respuestas de error
      if (resp.status === 404) {
        setErrorMsg('No encontramos una cuenta con ese correo. Verifica e intenta nuevamente.');
      } else if (resp.status === 400) {
        setErrorMsg(resp.data?.message || 'Solicitud inválida. Verifica el correo.');
      } else if (resp.status >= 500) {
        setErrorMsg('Ocurrió un problema en el servidor. Intenta más tarde.');
      } else {
        setErrorMsg(resp.data?.message || 'No se pudo procesar tu solicitud.');
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED' || (error.message || '').includes('timeout')) {
        setErrorMsg('Tiempo agotado al contactar el servidor. Intenta nuevamente.');
      } else if (error.message?.includes('Network Error') || error.code === 'ERR_NETWORK') {
        setErrorMsg('No se pudo conectar al servidor. Revisa tu conexión.');
      } else {
        setErrorMsg('Ocurrió un error inesperado. Intenta de nuevo.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <SafeAreaView edges={['top']} style={styles.safeTop} />
    <SafeAreaView edges={['left','right','bottom']} style={styles.safeArea}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.containerStatic}>
        {/* Encabezado Naranja */}
        <View style={styles.header}>
          <Text style={styles.headerText} accessibilityRole="header">
            MiChef
          </Text>
        </View>

      {/* Título de la sección */}
      <Text 
        style={styles.title} 
        accessibilityRole="header" 
        aria-level="1"
        // Para que el lector de pantalla lo anuncie claramente
        accessibilityLabel="Recuperar mi contraseña" 
      >
        Recuperar mi contraseña
      </Text>

      {/* Banners de estado */}
      {errorMsg ? (
        <View style={{ backgroundColor: '#ffebee', borderColor: '#ff5252', borderWidth: 1, padding: 10, borderRadius: 6, marginHorizontal: 20, marginTop: 10 }}>
          <Text style={{ color: '#b00020' }}>{errorMsg}</Text>
        </View>
      ) : null}
      {successMsg ? (
        <View style={{ backgroundColor: '#e8f5e9', borderColor: '#66bb6a', borderWidth: 1, padding: 10, borderRadius: 6, marginHorizontal: 20, marginTop: 10 }}>
          <Text style={{ color: '#2e7d32' }}>{successMsg}</Text>
        </View>
      ) : null}

      {/* Campo de Correo Electrónico */}
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="ejemplo@correo.com"
        value={email}
        onChangeText={(v) => {
          setEmail(v);
          if (errorMsg) setErrorMsg('');
        }}
        // Propiedades de accesibilidad
        accessibilityLabel="Campo de texto, introduce el correo electrónico de tu cuenta"
        accessibilityHint="Escribe aquí el correo electrónico para recibir el enlace de recuperación"
        accessibilityRole="text"
      />

      {/* Descripción/Instrucciones */}
      <Text style={styles.descriptionText} accessibilityRole="text">
        Escriba el correo electrónico que está asociado a su cuenta, si este existe, le enviaremos un correo con el link para cambiar su contraseña.
      </Text>

      {/* Contenedor de Botones (para alinearlos) */}
      <View style={styles.buttonContainer}>
        {/* Botón Confirmar */}
        <TouchableOpacity
          style={styles.confirmButton}
          // Propiedades de accesibilidad
          accessibilityLabel="Confirmar la solicitud de recuperación de contraseña"
          accessibilityHint="Pulsa para enviar el enlace de cambio de contraseña a tu correo"
          accessibilityRole="button"
          onPress={handleConfirmPress}
          disabled={submitting}
        >
          <Text style={styles.buttonText}>{submitting ? 'Enviando...' : 'Confirmar'}</Text>
        </TouchableOpacity>

        {/* Botón Regresar */}
        <TouchableOpacity
          style={styles.backButton}
          // Propiedades de accesibilidad
          accessibilityLabel="Regresar a la pantalla anterior, como iniciar sesión"
          accessibilityHint="Pulsa para cancelar y volver a la pantalla anterior"
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
      </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </>
  );
};

export default RecoverPasswordScreen;