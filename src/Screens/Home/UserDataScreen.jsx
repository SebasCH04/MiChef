import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { styles } from '../../Style/Home/UserDataStyle.js';


const STATIC_USER_DATA = {
    username: 'Kevin Jiménez',
    email: 'kevin201560@estudiantec.cr',
    knowledgeLevel: 'Bajo',
    dietType: 'Sin dieta',
    allergies: 'Sin padecimiento',
    ingredientsToAvoid: ['Arroz', 'Aguacate'],
};

const UserDataScreen = ({ navigation }) => {
    const renderDataRow = (label, value) => {
        const accessibilityLabel = `${label} ${value}`;

        return (
            <View 
                style={styles.dataRow}
                accessible={true} 
                accessibilityLabel={accessibilityLabel} // Etiqueta combinada
            >
                {/* 2. Ocultamos los textos individuales para que el lector solo lea la etiqueta del padre */}
                <Text style={styles.dataLabel} accessibilityElementsHidden={true}>{label}</Text>
                <Text style={styles.dataValue} accessibilityElementsHidden={true}>{value}</Text>
            </View>
        );
    };

    // Helper para renderizar los ingredientes a evitar de forma accesible
    const renderAvoidIngredients = (ingredients) => {
        // Crea una cadena clara: "Ingredientes a evitar: Arroz, Aguacate"
        const listText = ingredients.join(', '); 
        const accessibilityLabel = `Ingredientes a evitar: ${listText}`;
        
        return (
            <View accessible={true} accessibilityLabel={accessibilityLabel}>
                <Text style={styles.dataLabel} accessibilityElementsHidden={true}>Ingredientes a evitar:</Text>
                
                <View style={styles.avoidIngredientsList}>
                    {/* Ocultamos los textos individuales para evitar duplicidad */}
                    {ingredients.map((item, index) => (
                        <Text key={index} style={styles.dataValue} accessibilityElementsHidden={true}>
                            {item}
                        </Text>
                    ))}
                </View>
            </View>
        );
    };

    const handleChangePasswordPress = () => {
        navigation.navigate('recoverPassword');
    };

    const handleEditProfilePress = () => {
        navigation.navigate('registroPage', { isEditing: true });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header con accesibilidad de título */}
            <View 
                style={styles.header}
                accessible={true}
                accessibilityRole="header"
                accessibilityLabel="MiChef aplicación"
            >
                <Text style={styles.headerTitle}>MiChef</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Título de sección con accesibilidad de cabecera */}
                <Text 
                    style={styles.sectionTitle}
                    accessibilityRole="header"
                    accessible={true}
                    accessibilityLabel="Mis Datos de Usuario"
                >
                    Mis Datos
                </Text>

                {/* Contenedor de Datos del Usuario (el recuadro amarillo) */}
                <View style={styles.dataContainer}>
                    {renderDataRow("Nombre de usuario:", STATIC_USER_DATA.username)}
                    {renderDataRow("Correo electrónico:", STATIC_USER_DATA.email)}
                    
                    {/* Nivel de conocimiento: Accesibilidad manual debido a la estructura de la imagen */}
                    <View accessible={true} accessibilityLabel={`Nivel de conocimiento en la cocina: ${STATIC_USER_DATA.knowledgeLevel}`}>
                        <Text style={styles.dataLabel} accessibilityElementsHidden={true}>Nivel de conocimiento en la cocina:</Text>
                        <Text style={styles.dataValue} accessibilityElementsHidden={true}>{STATIC_USER_DATA.knowledgeLevel}</Text>
                    </View>

                    {renderDataRow("Tipo de dieta:", STATIC_USER_DATA.dietType)}
                    {renderDataRow("Tipo de alergias:", STATIC_USER_DATA.allergies)}
                    
                    {renderAvoidIngredients(STATIC_USER_DATA.ingredientsToAvoid)}

                                    {/* Enlace para cambiar contraseña con accesibilidad adecuada */}
                <TouchableOpacity 
                    style={styles.passwordChangeLink}
                    onPress={() => handleChangePasswordPress()}
                    accessibilityRole="link"
                    accessibilityLabel="Cambiar de contraseña"
                    accessible={true}
                >
                    <Text style={styles.passwordChangeText}>
                        Cambiar de contraseña
                    </Text>
                </TouchableOpacity>
                </View>



            </ScrollView>

            {/* Botones Flotantes Inferiores con labels descriptivas */}
            <View style={styles.bottomButtonsContainer}>
                <TouchableOpacity 
                    style={styles.actionButton} 
                    onPress={() => handleEditProfilePress()}
                    accessibilityRole="button"
                    accessibilityLabel="Botón Actualizar datos"
                    accessible={true}
                >
                    <Text style={styles.actionButtonText}>Actualizar datos</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.cancelButton} 
                    onPress={() => console.log('Cancelar presionado')}
                    accessibilityRole="button"
                    accessibilityLabel="Botón Cancelar y volver"
                    accessible={true}
                >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default UserDataScreen;
