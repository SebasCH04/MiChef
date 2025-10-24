import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { styles } from '../../Style/Login/LoginStyle.js';


const LoginScreen = ( { navigation } ) => {

const handleRegisterPress = () => {
  navigation.navigate('registroPage');
}

const handleForgotPasswordPress = () => {
  navigation.navigate('recoverPassword');
}

const handleLoginPress = () => {
  navigation.navigate('home');
}

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerText} accessibilityRole="header">
          MiChef
        </Text>
      </View>

      {/* Título de la sección */}
      <Text style={styles.title} accessibilityRole="header" aria-level="1">
        Inicio de Sesión
      </Text>

      {/* Formulario de Login */}
      <View style={styles.formContainer}>
        {/* Campo de Correo Electrónico */}
        <Text style={styles.label} accessibilityRole="text">
          Correo Electrónico
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="ejemplo@correo.com"
          // Propiedades de accesibilidad
          accessibilityLabel="Introduce tu correo electrónico"
          accessibilityHint="Campo de texto para el correo electrónico"
          accessibilityRole="text"
        />

        {/* Campo de Contraseña */}
        <Text style={styles.label} accessibilityRole="text">
          Contraseña
        </Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Escribe tu contraseña"
          // Propiedades de accesibilidad
          accessibilityLabel="Introduce tu contraseña"
          accessibilityHint="Campo de texto seguro para la contraseña"
          accessibilityRole="text"
        />

        {/* Enlace para recuperar contraseña - CORREGIDO */}
        <View style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>
                ¿No recuerda su contraseña? Presione{' '}
            </Text>
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
          style={styles.button}
          // Propiedades de accesibilidad
          accessibilityLabel="Iniciar Sesión"
          accessibilityHint="Pulsa para acceder a tu cuenta"
          accessibilityRole="button"
          onPress={() => handleLoginPress()}
        >
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>


      {/* Enlace de Registro - CORREGIDO */}
        <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
            En caso de no tener una cuenta, presione a la derecha en{' '}
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
