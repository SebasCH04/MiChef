import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,

} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../../Style/Login/RegisterStyle.js'; 

// Datos estáticos para simular la carga de datos del usuario
const STATIC_USER_DATA = {
    username: 'Kevin Jiménez',
    email: 'kevin201560@estudiantec.cr',
    knowledgeLevel: 'Bajo',
    dietType: 'Vegano', 
    allergies: 'Sin padecimiento',
    ingredientsToAvoid: 'Arroz, Aguacate',
};


const RegisterScreen = ({ navigation }) => {
    const route = useRoute();
    const isEditing = route.params?.isEditing || false;

    const [username, setUsername] = useState(isEditing ? STATIC_USER_DATA.username : '');
    const [email, setEmail] = useState(isEditing ? STATIC_USER_DATA.email : '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [knowledgeLevel, setKnowledgeLevel] = useState(isEditing ? STATIC_USER_DATA.knowledgeLevel : 'Bajo');
    const [dietType, setDietType] = useState(isEditing ? STATIC_USER_DATA.dietType : 'Vegano');
    const [allergies, setAllergies] = useState(isEditing ? STATIC_USER_DATA.allergies : '');
    const [ingredientsToAvoid, setIngredientsToAvoid] = useState(isEditing ? STATIC_USER_DATA.ingredientsToAvoid : '');
    

    // Define títulos y textos de botón basados en el modo
    const screenTitle = isEditing ? 'Editar Perfil' : 'Registrarse';
    const actionButtonText = isEditing ? 'Guardar Cambios' : 'Registrarse';
    const actionAccessibilityLabel = isEditing ? 'Guardar Cambios del Perfil' : 'Crear tu cuenta';

    const handleAction = () => {
        if (isEditing) {
            console.log('Guardar cambios del perfil:', { username, email, knowledgeLevel, dietType });
        } else {
            console.log('Registrar nuevo usuario:', { username, email, password });
        }
    };
    
    const handleCancel = () => {
        console.log('Cancelar y volver');
        // Usar navigation.goBack() en una app real
    };

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

                {/* Título de la sección dinámico */}
                <Text style={styles.title} accessibilityRole="header" aria-level="1">
                    {screenTitle}
                </Text>

                <View style={styles.formContainer}>
                    {/* Campo Nombre de usuario */}
                    <Text style={styles.label} accessibilityRole="text">Nombre de usuario</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="words"
                        placeholder="Ej: JuanPerez"
                        accessibilityLabel="Introduce tu nombre de usuario"
                        accessibilityHint="Campo de texto para el nombre de usuario"
                        accessibilityRole="text"
                    />

                    {/* Campo Correo electrónico  (nota: este campo se muestra solo si no está en modo edición) */}
                    {/* <Text style={styles.label} accessibilityRole="text">Correo electrónico</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholder="ejemplo@correo.com"
                        accessibilityLabel="Introduce tu correo electrónico"
                        accessibilityHint="Campo de texto para el correo electrónico"
                        accessibilityRole="text"
                        // El correo puede deshabilitarse en edición si no queremos que se cambie fácilmente
                        editable={!isEditing} 
                        selectTextOnFocus={!isEditing}
                    /> */}

                    {/* Campos de Contraseña (Solo se muestran si NO estamos editando) */}
                    {!isEditing && (
                        <>
                                            {/* Campo Correo electrónico */}
                    <Text style={styles.label} accessibilityRole="text">Correo electrónico</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholder="ejemplo@correo.com"
                        accessibilityLabel="Introduce tu correo electrónico"
                        accessibilityHint="Campo de texto para el correo electrónico"
                        accessibilityRole="text"
                        // El correo puede deshabilitarse en edición si no queremos que se cambie fácilmente
                        editable={!isEditing} 
                        selectTextOnFocus={!isEditing}
                    />
                            <Text style={styles.label} accessibilityRole="text">Contraseña</Text>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                placeholder="Mínimo 8 caracteres"
                                accessibilityLabel="Introduce tu contraseña"
                                accessibilityHint="Campo de texto seguro para la contraseña"
                                accessibilityRole="text"
                            />

                            <Text style={styles.label} accessibilityRole="text">Confirmar contraseña</Text>
                            <TextInput
                                style={styles.input}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                                placeholder="Repite la contraseña"
                                accessibilityLabel="Confirma tu contraseña"
                                accessibilityHint="Campo de texto seguro para confirmar la contraseña"
                                accessibilityRole="text"
                            />
                        </>
                    )}

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
                        value={allergies}
                        onChangeText={setAllergies}
                        placeholder="Ej: Gluten, Lactosa, Maní"
                        accessibilityLabel="Introduce tus tipos de alergias, separadas por comas"
                        accessibilityHint="Campo de texto para listar alergias"
                        accessibilityRole="text"
                    />

                    {/* Campo Ingredientes a evitar */}
                    <Text style={styles.label} accessibilityRole="text">Ingredientes a evitar (separado por comas)</Text>
                    <TextInput
                        style={styles.input}
                        value={ingredientsToAvoid}
                        onChangeText={setIngredientsToAvoid}
                        placeholder="Ej: Cilantro, Trufa"
                        accessibilityLabel="Introduce ingredientes a evitar, separados por comas"
                        accessibilityHint="Campo de texto para listar ingredientes que quieres evitar"
                        accessibilityRole="text"
                    />
                </View>

                {/* Contenedor de Botones */}
                <View style={styles.buttonContainer}>
                    {/* Botón de Acción (Registro o Guardar) */}
                    <TouchableOpacity
                        style={styles.registerButton}
                        accessibilityLabel={actionAccessibilityLabel}
                        accessibilityHint={actionAccessibilityLabel}
                        accessibilityRole="button"
                        onPress={handleAction}
                    >
                        <Text style={styles.buttonText}>{actionButtonText}</Text>
                    </TouchableOpacity>

                    {/* Botón de Cancelar */}
                    <TouchableOpacity
                        style={styles.cancelButton}
                        accessibilityLabel="Cancelar"
                        accessibilityHint="Pulsa para volver a la pantalla anterior"
                        accessibilityRole="button"
                        onPress={handleCancel}
                    >
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;
