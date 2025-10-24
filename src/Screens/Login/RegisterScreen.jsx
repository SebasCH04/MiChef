import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { styles } from '../../Style/Login/RegisterStyle.js';

const RegisterScreen = () => {
  const [knowledgeLevel, setKnowledgeLevel] = useState('Bajo');
  const [dietType, setDietType] = useState('Vegano');

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      keyboardVerticalOffset={0} 
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.headerText} accessibilityRole="header">
            MiChef
          </Text>
        </View>

        {/* Título de la sección */}
        <Text style={styles.title} accessibilityRole="header" aria-level="1">
          Registrarse
        </Text>

        {/* Formulario de Registro */}
        {/* ... (Todo el contenido del formulario sigue aquí, sin cambios) ... */}
        
        <View style={styles.formContainer}>
            {/* Campo Nombre de usuario */}
            <Text style={styles.label} accessibilityRole="text">Nombre de usuario</Text>
            <TextInput
            style={styles.input}
            autoCapitalize="words"
            placeholder="Ej: JuanPerez"
            accessibilityLabel="Introduce tu nombre de usuario"
            accessibilityHint="Campo de texto para el nombre de usuario"
            accessibilityRole="text"
            />

            {/* Campo Correo electrónico */}
            <Text style={styles.label} accessibilityRole="text">Correo electrónico</Text>
            <TextInput
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="ejemplo@correo.com"
            accessibilityLabel="Introduce tu correo electrónico"
            accessibilityHint="Campo de texto para el correo electrónico"
            accessibilityRole="text"
            />

            {/* Campo Contraseña */}
            <Text style={styles.label} accessibilityRole="text">Contraseña</Text>
            <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Mínimo 8 caracteres"
            accessibilityLabel="Introduce tu contraseña"
            accessibilityHint="Campo de texto seguro para la contraseña"
            accessibilityRole="text"
            />

            {/* Campo Confirmar contraseña */}
            <Text style={styles.label} accessibilityRole="text">Confirmar contraseña</Text>
            <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Repite la contraseña"
            accessibilityLabel="Confirma tu contraseña"
            accessibilityHint="Campo de texto seguro para confirmar la contraseña"
            accessibilityRole="text"
            />

            {/* Selector: Nivel de conocimiento en la cocina */}
            <Text style={styles.label} accessibilityRole="text">Nivel de conocimiento en la cocina</Text>
            <View style={styles.pickerContainer}>
            <Picker
                selectedValue={knowledgeLevel}
                onValueChange={(itemValue) => setKnowledgeLevel(itemValue)}
                accessibilityLabel="Selector de nivel de conocimiento en la cocina"
                accessibilityHint={`El nivel actual es ${knowledgeLevel}. Pulsa para cambiar`}
                accessibilityRole="adjustable"
                style={styles.picker}
                itemStyle={styles.pickerItem}
            >
                <Picker.Item label="Alto" value="Alto" />
                <Picker.Item label="Medio" value="Medio" />
                <Picker.Item label="Bajo" value="Bajo" />
            </Picker>
            </View>

            {/* Selector: Tipo de dieta */}
            <Text style={styles.label} accessibilityRole="text">Tipo de dieta</Text>
            <View style={styles.pickerContainer}>
            <Picker
                selectedValue={dietType}
                onValueChange={(itemValue) => setDietType(itemValue)}
                accessibilityLabel="Selector de tipo de dieta"
                accessibilityHint={`El tipo de dieta actual es ${dietType}. Pulsa para cambiar`}
                accessibilityRole="adjustable"
                style={styles.picker}
                itemStyle={styles.pickerItem}
            >
                <Picker.Item label="Vegano" value="Vegano" />
                <Picker.Item label="Vegetariano" value="Vegetariano" />
                <Picker.Item label="Omnívoro" value="Omnívoro" />
                <Picker.Item label="Keto" value="Keto" />
            </Picker>
            </View>

            {/* Campo Tipo de alergias */}
            <Text style={styles.label} accessibilityRole="text">Tipo de alergias (separado por comas)</Text>
            <TextInput
            style={styles.input}
            placeholder="Ej: Gluten, Lactosa, Maní"
            accessibilityLabel="Introduce tus tipos de alergias, separadas por comas"
            accessibilityHint="Campo de texto para listar alergias"
            accessibilityRole="text"
            />

            {/* Campo Ingredientes a evitar */}
            <Text style={styles.label} accessibilityRole="text">Ingredientes a evitar (separado por comas)</Text>
            <TextInput
            style={styles.input}
            placeholder="Ej: Cilantro, Trufa"
            accessibilityLabel="Introduce ingredientes a evitar, separados por comas"
            accessibilityHint="Campo de texto para listar ingredientes que quieres evitar"
            accessibilityRole="text"
            />
        </View>

        {/* Contenedor de Botones */}
        <View style={styles.buttonContainer}>
          {/* Botón de Registro */}
          <TouchableOpacity
            style={styles.registerButton}
            accessibilityLabel="Registrarse"
            accessibilityHint="Pulsa para crear tu cuenta"
            accessibilityRole="button"
            onPress={() => console.log('Registrar Usuario')}
          >
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>

          {/* Botón de Cancelar */}
          <TouchableOpacity
            style={styles.cancelButton}
            accessibilityLabel="Cancelar"
            accessibilityHint="Pulsa para volver a la pantalla anterior"
            accessibilityRole="button"
            onPress={() => console.log('Cancelar Registro')}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;