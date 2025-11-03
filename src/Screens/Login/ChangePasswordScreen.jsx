import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from '../../Style/Login/ChangePasswordStyle.js';
import axios from 'axios';
import URL from '../../Services/url.js';
import { useRoute } from '@react-navigation/native';
import { a11yEs } from '../../Services/a11y.js';

const ChangePasswordScreen = ({ navigation }) => {
  const route = useRoute();
  const { email, code } = route.params || {};
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const validate = () => {
    if (!nuevaContrasena || !confirmarContrasena) return 'Completa ambos campos';
    if (nuevaContrasena.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
    if (nuevaContrasena !== confirmarContrasena) return 'Las contraseñas no coinciden';
    return '';
  };

  const handleCambiar = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    const v = validate();
    if (v) { setErrorMsg(v); return; }

    setSubmitting(true);
    try {
      const resp = await axios.post(
        `${URL}:3000/reset-password`,
        {
          email,
          code,
          newPassword: nuevaContrasena,
          confirmPassword: confirmarContrasena,
        },
        {
          timeout: 30000,
          headers: { 'Content-Type': 'application/json' },
          validateStatus: (s) => s >= 200 && s < 600,
        }
      );

      if (resp.status === 200 && resp.data?.success) {
        setSuccessMsg('¡Contraseña actualizada! Inicia sesión con tu nueva contraseña.');
        setTimeout(() => {
          navigation.reset({ index: 0, routes: [{ name: 'login', params: { successMessage: 'Contraseña cambiada exitosamente. Ingresa con tu nueva contraseña.' } }] });
        }, 700);
        return;
      }

      if (resp.status === 400) setErrorMsg(resp.data?.message || 'Solicitud inválida');
      else if (resp.status === 401) setErrorMsg('Código inválido');
      else if (resp.status === 404) setErrorMsg('No se encontró una cuenta con ese correo');
      else if (resp.status >= 500) setErrorMsg('Error del servidor. Intenta más tarde.');
      else setErrorMsg(resp.data?.message || 'No se pudo cambiar la contraseña');
    } catch (error) {
      if (error.code === 'ECONNABORTED' || (error.message || '').includes('timeout')) setErrorMsg('Tiempo agotado al contactar el servidor');
      else if (error.message?.includes('Network Error') || error.code === 'ERR_NETWORK') setErrorMsg('Sin conexión al servidor');
      else setErrorMsg('Ocurrió un error inesperado');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelar = () => {
    navigation.goBack();
  };

  return (
    <>
    <SafeAreaView edges={['top']} style={styles.safeTop} />
    <SafeAreaView edges={['left','right','bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        {/* Encabezado Naranja */}
        <View style={styles.header}>
          <Text {...a11yEs} style={styles.headerText} accessibilityRole="header" accessibilityLabel="Mi Chef">MiChef</Text>
        </View>

      <View style={styles.content}>
        {/* Enlace/Título de la pantalla */}
        <Text {...a11yEs} style={styles.title} accessibilityRole="header" accessibilityLevel={1}>
          Cambiar de contraseña
        </Text>

        {/* Banners */}
        {errorMsg ? (
          <View style={{ backgroundColor: '#ffebee', borderColor: '#ff5252', borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 12, marginHorizontal: 20 }}>
            <Text style={{ color: '#b00020' }}>{errorMsg}</Text>
          </View>
        ) : null}
        {successMsg ? (
          <View style={{ backgroundColor: '#e8f5e9', borderColor: '#66bb6a', borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 12, marginHorizontal: 20 }}>
            <Text style={{ color: '#2e7d32' }}>{successMsg}</Text>
          </View>
        ) : null}

        {/* Contenedor principal de la tarjeta */}
        <View style={styles.card}>
          {/* Campo Nueva Contraseña */}
          <Text {...a11yEs} style={styles.label}>
            Nueva contraseña
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(v)=>{ setNuevaContrasena(v); if (errorMsg) setErrorMsg(''); }}
            value={nuevaContrasena}
            secureTextEntry={true} // Ocultar el texto
            placeholder="Ingrese nueva contraseña"
            // Accesibilidad
            {...a11yEs}
            accessibilityLabel="Campo de entrada para la nueva contraseña"
            accessibilityHint="Escriba su nueva contraseña. Debe ser secreta."
            accessible={true}
          />

          {/* Campo Confirmar Nueva Contraseña */}
          <Text {...a11yEs} style={styles.label}>
            Confirmar nueva contraseña
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(v)=>{ setConfirmarContrasena(v); if (errorMsg) setErrorMsg(''); }}
            value={confirmarContrasena}
            secureTextEntry={true} // Ocultar el texto
            placeholder="Confirme su nueva contraseña"
            // Accesibilidad
            {...a11yEs}
            accessibilityLabel="Campo de entrada para confirmar la nueva contraseña"
            accessibilityHint="Vuelva a escribir la nueva contraseña para confirmarla."
            accessible={true}
          />

          
        </View>
        {/* Contenedor de botones para alineación horizontal */}
          <View style={styles.buttonContainer}>
            {/* Botón Cambiar */}
            <TouchableOpacity
              {...a11yEs}
              style={[styles.button, styles.confirmarButton]}
              onPress={handleCambiar}
              disabled={submitting}
              // Accesibilidad del botón
              accessibilityRole="button"
              accessibilityLabel="Cambiar mi contraseña"
              accessible={true}
            >
              <Text style={styles.buttonText}>{submitting ? 'Cambiando...' : 'Cambiar'}</Text>
            </TouchableOpacity>

            {/* Botón Cancelar */}
            <TouchableOpacity
              {...a11yEs}
              style={[styles.button, styles.cancelarButton]}
              onPress={handleCancelar}
              // Accesibilidad del botón
              accessibilityRole="button"
              accessibilityLabel="Cancelar el cambio de contraseña"
              accessible={true}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
    </>
  );
};

export default ChangePasswordScreen;