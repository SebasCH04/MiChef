import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../Style/Login/WelcomeStyle.js'; 


const WelcomeScreen = ({ navigation }) => {

    const handleIngresarPress = () => {
        navigation.navigate('login'); 
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView 
                style={styles.safeArea}
                // Permite al lector de pantalla determinar el orden de enfoque.
            >
                <View style={styles.container}>
                    <View
                        style={styles.header}
                    >
                        <Text 
                            style={styles.headerText}
                            accessible={true} // El texto es el elemento que debe ser leído.
                            accessibilityRole="header"
                            accessibilityLabel="MiChef, aplicación de cocina asistida. Inicio."
                        >
                            MiChef
                        </Text>
                    </View>

                    {/* Contenido Principal */}
                    <View style={styles.content}>
                        
                        {/* TÍTULO DE BIENVENIDA 
                            El lector debe anunciarlo como el principal, nivel 1.
                        */}
                        <Text
                            style={styles.welcomeTitle}
                            accessible={true}
                            accessibilityRole="header"
                            accessibilityLevel={1}
                            accessibilityLabel="Encabezado principal. Bienvenido a MiChef" 
                        >
                            Bienvenido a MiChef
                        </Text>
                        
                        {/* SUBTÍTULO DESCRIPTIVO */}
                        <Text 
                            style={styles.welcomeSubtitle}
                            accessible={true}
                            accessibilityLabel="Descripción de la aplicación. Cocina asistida que te escucha, te guía y te cuida."
                        >
                            ¡Cocina asistida que te escucha, te guía y te cuida!
                        </Text>

                        {/* IMAGEN 
                            Aseguramos que sea accesible para que la descripción se anuncie.
                        */}
                        <View style={styles.imagePlaceholder}>
                            <Image
                                source={require('../../../assets/Login/ImagenBienvenida.png')}
                                style={styles.chefImage}
                                resizeMode="contain"
                                accessible={true}
                                accessibilityLabel="Ilustración del logo de MiChef, un gorro de chef sonriente, representando un asistente de cocina amable."
                            />
                        </View>

                        {/* BOTÓN PRINCIPAL: INGRESAR
                            Debe ser el único elemento interactivo al que se pueda enfocar directamente.
                        */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleIngresarPress}
                            accessibilityRole="button"
                            accessibilityLabel="Botón Ingresar"
                            accessibilityHint="Toca dos veces para ir a la pantalla de inicio de sesión."
                        >
                            <Text style={styles.buttonText}>Ingresar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>

    );
};


export default WelcomeScreen;
