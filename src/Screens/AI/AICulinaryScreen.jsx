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

    // Demo de receta deshabilitado temporalmente

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

                    {/* --- Tarjeta: Consultar IA Culinaria --- */}
                    <View style={styles.card}>
                        <MaterialCommunityIcons
                            name="robot"
                            size={60}
                            color="#1a4785"
                            accessible={false}
                            accessibilityElementsHidden={true}
                            importantForAccessibility="no"
                        />
                        <Text {...a11yEs} style={styles.cardTitle}>Consultar IA Culinaria</Text>
                        <Text {...a11yEs} style={styles.cardDescription}>
                            Haz preguntas sobre recetas, ingredientes y técnicas de cocina; recibe trucos, sustituciones de ingredientes y recomendaciones adaptadas a tu nivel, tiempo disponible y preferencias. La respuesta se presenta en texto claro y, si lo deseas, también con lectura en voz alta para que puedas cocinar sin mirar la pantalla.
                        </Text>
                        <TouchableOpacity 
                            style={[styles.cardButton, styles.primaryButton]}
                            onPress={handleStartChat}
                            {...a11yEs}
                        >
                            <Text style={styles.cardButtonText}>Comenzar Chef AI</Text>
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