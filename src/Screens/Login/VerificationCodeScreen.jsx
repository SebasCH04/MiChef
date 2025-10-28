import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { styles } from '../../Style/Login/VerificationCodeStyle.js';

const VerificationCodeScreen = ({ navigation }) => {
  const [codigo, setCodigo] = useState('');

  const handleConfirmar = () => {
    navigation.navigate('changePassword');
  };

  const handleCancelar = () => {
    // Lógica para cancelar
    console.log('Cancelado');
    alert('Acción Cancelada');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado Naranja */}
      <View style={styles.header}>
        <Text style={styles.headerText}>MiChef</Text>
      </View>

      <View style={styles.content}>
        {/* Título */}
        <Text style={styles.title}>
          Ingresar código de verificación
        </Text>

        {/* Contenedor principal de la tarjeta */}
        <View style={styles.card}>
          <Text style={styles.label}>
            Código de verificación
          </Text>

          {/* Campo de texto con accesibilidad para código de 6 dígitos */}
          <TextInput
            style={styles.input}
            onChangeText={setCodigo}
            value={codigo}
            placeholder="Ingrese el código de 6 dígitos"
            keyboardType="number-pad" // Solo números
            maxLength={6} // Máximo 6 dígitos
            // Accesibilidad
            accessibilityLabel="Campo de entrada para el código de verificación de 6 dígitos"
            accessibilityHint="Ingresa el código numérico que recibiste"
            accessible={true}
          />

         
          
        </View>
         {/* Contenedor de botones para alineación horizontal */}
        <View style={styles.buttonContainer}>
            {/* Botón Confirmar */}
            <TouchableOpacity
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
    </SafeAreaView>
  );
};

export default VerificationCodeScreen;

