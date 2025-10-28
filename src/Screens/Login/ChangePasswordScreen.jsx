import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { styles } from '../../Style/Login/ChangePasswordStyle.js';
const ChangePasswordScreen = () => {
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const handleCambiar = () => {
    // Lógica para cambiar la contraseña
    if (nuevaContrasena !== confirmarContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    console.log('Nueva Contraseña:', nuevaContrasena);
    alert('Contraseña cambiada exitosamente.');
  };

  const handleCancelar = () => {
    // Lógica para cancelar
    console.log('Cancelado');
    alert('Operación cancelada.');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado Naranja */}
      <View style={styles.header}>
        <Text style={styles.headerText}>MiChef</Text>
      </View>

      <View style={styles.content}>
        {/* Enlace/Título de la pantalla */}
        <Text style={styles.title}>
          Cambiar de contraseña
        </Text>

        {/* Contenedor principal de la tarjeta */}
        <View style={styles.card}>
          {/* Campo Nueva Contraseña */}
          <Text style={styles.label}>
            Nueva contraseña
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setNuevaContrasena}
            value={nuevaContrasena}
            secureTextEntry={true} // Ocultar el texto
            placeholder="Ingrese nueva contraseña"
            // Accesibilidad
            accessibilityLabel="Campo de entrada para la nueva contraseña"
            accessibilityHint="Escriba su nueva contraseña. Debe ser secreta."
            accessible={true}
          />

          {/* Campo Confirmar Nueva Contraseña */}
          <Text style={styles.label}>
            Confirmar nueva contraseña
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setConfirmarContrasena}
            value={confirmarContrasena}
            secureTextEntry={true} // Ocultar el texto
            placeholder="Confirme su nueva contraseña"
            // Accesibilidad
            accessibilityLabel="Campo de entrada para confirmar la nueva contraseña"
            accessibilityHint="Vuelva a escribir la nueva contraseña para confirmarla."
            accessible={true}
          />

          
        </View>
        {/* Contenedor de botones para alineación horizontal */}
          <View style={styles.buttonContainer}>
            {/* Botón Cambiar */}
            <TouchableOpacity
              style={[styles.button, styles.confirmarButton]}
              onPress={handleCambiar}
              // Accesibilidad del botón
              accessibilityRole="button"
              accessibilityLabel="Cambiar mi contraseña"
              accessible={true}
            >
              <Text style={styles.buttonText}>Cambiar</Text>
            </TouchableOpacity>

            {/* Botón Cancelar */}
            <TouchableOpacity
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
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;