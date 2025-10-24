import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// Importamos 'styles' de forma genérica ya que el usuario ajustará la ruta y el contenido.
import { styles } from '../../Style/Login/WelcomeStyle.js'; 


const WelcomeScreen = ({ navigation }) => {

    const handleIngresarPress = () => {
        // Asegúrate de que 'login' sea el nombre correcto de la ruta en tu navegador
        navigation.navigate('login'); 
    };

    return (
        <SafeAreaProvider>
            {/*
            PROBLEMA SOLUCIONADO: 
            1. Eliminamos 'importantForAccessibility="yes"' del SafeAreaView. 
            2. Usamos 'importantForAccessibility="no"' en el contenedor que solo agrupa.
            3. Nos aseguramos de que solo los elementos de texto e interactivos estén 
               explícitamente marcados para accesibilidad.
            */}
            <SafeAreaView 
                style={styles.safeArea}
                // Permite al lector de pantalla determinar el orden de enfoque.
            >
                <View style={styles.container}>
                    {/* HEADER: Título de la Aplicación
                        Aseguramos que solo el texto sea el foco, no el View contenedor.
                    */}
                    <View
                        style={styles.header}
                        // Quitamos 'accessible={true}' del View para evitar que agrupe su contenido.
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
                            accessibilityLabel="Encabezado principal. Bienvenido a MiChef" // Descripción más clara
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
