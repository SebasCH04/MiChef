import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../Style/Login/WelcomeStyle.js'; 
import { a11yEs } from '../../Services/a11y.js';


const WelcomeScreen = ({ navigation }) => {

    const handleIngresarPress = () => {
        navigation.navigate('login'); 
    };

    return (
        <SafeAreaProvider>
            {/* Franja superior en naranja */}
            <SafeAreaView edges={['top']} style={styles.safeTop} />
            <SafeAreaView 
                edges={['left','right','bottom']}
                style={styles.safeArea}
                // Permite al lector de pantalla determinar el orden de enfoque.
            >
                <View style={styles.container}>
                    <View
                        style={styles.header}
                    >
                        <Text 
                            {...a11yEs}
                            style={styles.headerText}
                            accessible={true} // El texto es el elemento que debe ser leído.
                            accessibilityRole="header"
                            accessibilityLabel="Mi Chef, aplicación de cocina asistida. Inicio."
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
                            {...a11yEs}
                            style={styles.welcomeTitle}
                            accessible={true}
                            accessibilityRole="header"
                            accessibilityLevel={1}
                            accessibilityLabel="Encabezado principal. Bienvenido a Mi Chef" 
                        >
                            Bienvenido a MiChef
                        </Text>
                        
                        {/* SUBTÍTULO DESCRIPTIVO */}
                        <Text 
                            {...a11yEs}
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
                                accessible={false}
                                accessibilityElementsHidden={true}
                                importantForAccessibility="no"
                            />
                        </View>

                        {/* BOTÓN PRINCIPAL: INGRESAR
                            Debe ser el único elemento interactivo al que se pueda enfocar directamente.
                        */}
                        <TouchableOpacity
                            {...a11yEs}
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
