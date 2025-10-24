import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { styles } from '../../Style/Login/RecoverPasswordStyle.js';

const RecoverPasswordScreen = ({ navigation }) => {

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
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

      {/* Campo de Correo Electrónico */}
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="ejemplo@correo.com"
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
          onPress={() => console.log('Confirmar recuperación')}
        >
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>

        {/* Botón Regresar */}
        <TouchableOpacity
          style={styles.backButton}
          // Propiedades de accesibilidad
          accessibilityLabel="Regresar a la pantalla anterior, como iniciar sesión"
          accessibilityHint="Pulsa para cancelar y volver a la pantalla anterior"
          accessibilityRole="button"
          onPress={() => console.log('Regresar')}
        >
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RecoverPasswordScreen;