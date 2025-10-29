import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    StyleSheet, // Importamos StyleSheet para definir los estilos
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { styles } from '../../Style/AI/AICulinaryScreen.js';

const AICulinaryScreen = ({ navigation }) => {
    
    const handleProfilePress = () => {
        // Asume que esta navegación existe
        navigation.navigate('userdata'); 
    };

    const handleStartChat = () => {
        navigation.navigate('AIChatScreen');
    };

    const handleViewDemo = () => {
        navigation.navigate('AIDemoRecipes')
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>MiChef</Text>
                <TouchableOpacity 
                    style={styles.profileIconContainer} 
                    onPress={handleProfilePress}
                >
                    <MaterialCommunityIcons name="account-circle" size={40} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.container}>
                    
                    {/* Título Principal */}
                    <Text style={styles.mainTitle}>
                        Inteligencia Artificial
                    </Text>

                    {/* Subtítulo Descriptivo */}
                    <Text style={styles.subtitle}>
                        Elige una opción para comenzar tu experiencia culinaria utilizando inteligencia artificial
                    </Text>

                    {/* --- Tarjeta 1: Consultar IA Culinaria --- */}
                    <View style={styles.card}>
                        <MaterialCommunityIcons name="robot" size={50} color="#1a4785" />
                        <Text style={styles.cardTitle}>Consultar IA Culinaria</Text>
                        <Text style={styles.cardDescription}>
                            Pregunta sobre recetas, ingredientes y técnicas de cocina. Obtén sugerencias personalizadas con texto a voz incluido.
                        </Text>
                        <TouchableOpacity 
                            style={[styles.cardButton, styles.primaryButton]}
                            onPress={handleStartChat}
                        >
                            <Text style={styles.cardButtonText}>Comenzar Chat AI</Text>
                        </TouchableOpacity>
                    </View>

                    {/* --- Tarjeta 2: Seguir Receta Paso a Paso --- */}
                    <View style={styles.card}>
                        <MaterialCommunityIcons name="book-open-variant" size={50} color="#1a4785" />
                        <Text style={styles.cardTitle}>Seguir Receta Paso a Paso</Text>
                        <Text style={styles.cardDescription}>
                            Cocina con instrucciones detalladas utilizando inteligencia artificial, texto a voz y temporizador integrado para cada paso.
                        </Text>
                        <TouchableOpacity 
                            style={[styles.cardButton, styles.secondaryButton]}
                            onPress={handleViewDemo}
                        >
                            <Text style={styles.cardButtonText}>Ver Demo de Receta</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {/* Espacio para que el botón "Volver al Inicio" no tape la última tarjeta */}
                    <View style={{ height: 90 }} />
                </View>
            </ScrollView>

            {/* Botón Flotante Regresar */}
            <TouchableOpacity 
                style={styles.backButton}
                onPress={handleGoBack}
                accessibilityRole="button"
                accessibilityLabel="Volver a la pantalla de inicio"
            >
                <Text style={styles.backButtonText}>Volver al Inicio</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default AICulinaryScreen;