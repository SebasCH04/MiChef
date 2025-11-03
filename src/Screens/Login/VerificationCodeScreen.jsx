import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from '../../Style/Login/VerificationCodeStyle.js';
import { useRoute } from '@react-navigation/native';
import { a11yEs } from '../../Services/a11y.js';

const VerificationCodeScreen = ({ navigation }) => {
  const route = useRoute();
  const { email, expectedCode } = route.params || {};
  const [codigo, setCodigo] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleConfirmar = () => {
    setErrorMsg('');
    const input = (codigo || '').trim();
    if (input.length !== 6) {
      setErrorMsg('El código debe tener 6 dígitos.');
      return;
    }
    if (expectedCode && input === String(expectedCode)) {
      navigation.navigate('changePassword', { email, code: expectedCode });
    } else {
      setErrorMsg('Código inválido. Verifica e inténtalo nuevamente.');
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
        {/* Título */}
        <Text {...a11yEs} style={styles.title} accessibilityRole="header" accessibilityLevel={1}>
          Ingresar código de verificación
        </Text>

        {/* Banner de error */}
        {errorMsg ? (
          <View style={{ backgroundColor: '#ffebee', borderColor: '#ff5252', borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 12 }}>
            <Text style={{ color: '#b00020' }}>{errorMsg}</Text>
          </View>
        ) : null}

        {/* Contenedor principal de la tarjeta */}
        <View style={styles.card}>
          <Text {...a11yEs} style={styles.label}>
            Código de verificación
          </Text>

          {/* Campo de texto con accesibilidad para código de 6 dígitos */}
          <TextInput
            style={styles.input}
            onChangeText={(v) => {
              setCodigo(v);
              if (errorMsg) setErrorMsg('');
            }}
            value={codigo}
            placeholder="Ingrese el código de 6 dígitos"
            keyboardType="number-pad" // Solo números
            maxLength={6} // Máximo 6 dígitos
            // Accesibilidad
            {...a11yEs}
            accessibilityLabel="Campo de entrada para el código de verificación de 6 dígitos"
            accessibilityHint="Ingresa el código numérico que recibiste"
            accessible={true}
          />

         
          
        </View>
         {/* Contenedor de botones para alineación horizontal */}
        <View style={styles.buttonContainer}>
            {/* Botón Confirmar */}
            <TouchableOpacity
              {...a11yEs}
              style={[styles.button, styles.confirmarButton]}
              onPress={handleConfirmar}
              // Accesibilidad del botón
              accessibilityRole="button"
              accessibilityLabel="Confirmar código de verificación"
              accessible={true}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>

            {/* Botón Cancelar */}
            <TouchableOpacity
              {...a11yEs}
              style={[styles.button, styles.cancelarButton]}
              onPress={handleCancelar}
              // Accesibilidad del botón
              accessibilityRole="button"
              accessibilityLabel="Cancelar la operación"
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

export default VerificationCodeScreen;

