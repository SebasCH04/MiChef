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
import { a11yEs } from '../../Services/a11y';

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
        <>
        <SafeAreaView edges={['top']} style={styles.safeTop} />
        <SafeAreaView edges={['left','right','bottom']} style={styles.safeArea}>
                        <View style={styles.header}>
                                <Text
                                    style={styles.headerTitle}
                                    accessible={true}
                                    accessibilityRole="header"
                                    accessibilityLabel="Mi Chef"
                                    {...a11yEs}
                                >
                                    MiChef
                                </Text>
                <TouchableOpacity 
                    style={styles.profileIconContainer} 
                    onPress={handleProfilePress}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="Abrir perfil de usuario"
                    accessibilityHint="Muestra tus datos de usuario"
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    {...a11yEs}
                >
                    <MaterialCommunityIcons name="account-circle" size={40} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.container}>
                    
                    {/* Título Principal */}
                    <Text style={styles.mainTitle} {...a11yEs}>
                        Inteligencia Artificial
                    </Text>

                    {/* Subtítulo Descriptivo */}
                    <Text style={styles.subtitle} {...a11yEs}>
                        Elige una opción para comenzar tu experiencia culinaria utilizando inteligencia artificial.
                    </Text>

                    {/* --- Tarjeta 1: Consultar IA Culinaria --- */}
                    <View style={styles.card}>
                        <MaterialCommunityIcons
                            name="robot"
                            size={50}
                            color="#1a4785"
                            accessible={false}
                            accessibilityElementsHidden={true}
                            importantForAccessibility="no"
                        />
                        <Text {...a11yEs} style={styles.cardTitle}>Consultar IA Culinaria</Text>
                        <Text {...a11yEs} style={styles.cardDescription}>
                            Pregunta sobre recetas, ingredientes y técnicas de cocina. Obtén sugerencias personalizadas con texto a voz incluido.
                        </Text>
                        <TouchableOpacity 
                            style={[styles.cardButton, styles.primaryButton]}
                            onPress={handleStartChat}
                            {...a11yEs}
                        >
                            <Text style={styles.cardButtonText}>Comenzar Chat IA</Text>
                        </TouchableOpacity>
                    </View>

                    {/* --- Tarjeta 2: Seguir Receta Paso a Paso --- */}
                    <View style={styles.card}>
                        <MaterialCommunityIcons
                            name="book-open-variant"
                            size={50}
                            color="#1a4785"
                            accessible={false}
                            accessibilityElementsHidden={true}
                            importantForAccessibility="no"
                        />
                        <Text {...a11yEs} style={styles.cardTitle}>Seguir Receta Paso a Paso</Text>
                        <Text {...a11yEs} style={styles.cardDescription}>
                            Cocina con instrucciones detalladas utilizando inteligencia artificial, texto a voz y temporizador integrado para cada paso.
                        </Text>
                        <TouchableOpacity 
                            style={[styles.cardButton, styles.secondaryButton]}
                            onPress={handleViewDemo}
                            {...a11yEs}
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
                {...a11yEs}
            >
                <Text style={styles.backButtonText}>Volver al Inicio</Text>
            </TouchableOpacity>
        </SafeAreaView>
        </>
    );
};

export default AICulinaryScreen;