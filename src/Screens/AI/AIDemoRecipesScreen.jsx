import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    // No necesitamos TextInput, KeyboardAvoidingView, o SafeAreaView aquí
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from '../../Style/AI/AIDemoRecipesStyle.js';
// --- Datos de la Receta ---
const RECIPE_STEPS = [
    {
        number: 1,
        title: 'Preparar los ingredientes',
        description: 'Lava y pica la albahaca fresca. Corta los tomates en cubos pequeños. Pela y pica finamente 2 dientes de ajo.',
        time: '5 min',
    },
    {
        number: 2,
        title: 'Hervir el agua',
        description: 'Pon una olla grande de agua a hervir con una cucharada de sal. El agua debe estar a borbotones antes de seguir.',
        time: '10 min',
    },
    {
        number: 3,
        title: 'Cocinar la pasta',
        description: 'Agrega la pasta al agua hirviendo. Cocina por el tiempo indicado en el paquete, o hasta que esté al dente.',
        time: '12 min',
    },
    {
        number: 4,
        title: 'Preparar la salsa',
        description: 'Mientras la pasta se cocina, en un sartén grande con aceite, sofríe el ajo picado. Agrega los tomates picados y cocina a fuego lento por 10 minutos. Sazona con sal y pimienta.',
        time: '15 min',
    },
    {
        number: 5,
        title: 'Combinar y servir',
        description: 'Escurre la pasta y añádela al sartén con la salsa de tomate. Mezcla bien y añade la albahaca fresca. Sirve inmediatamente.',
        time: '3 min',
    },
];

const AIDemoRecipesScreen = ({ navigation }) => {
    // Estado para el paso actual (basado en índice, de 0 a 4)
    const [currentStepIndex, setCurrentStepIndex] = useState(0); 

    const currentStep = RECIPE_STEPS[currentStepIndex];
    const totalSteps = RECIPE_STEPS.length;
    
    // --- Lógica de Navegación de Pasos ---
    
    const handleNext = () => {
        if (currentStepIndex < totalSteps - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        }
    };
    
    // Función genérica para ir a un paso específico (usado en el Resumen)
    const goToStep = (index) => {
        if (index >= 0 && index < totalSteps) {
            setCurrentStepIndex(index);
        }
    };

    const handleReproduce = () => {
        console.log(`Reproduciendo texto del paso ${currentStep.number}: ${currentStep.description}`);
        // Aquí se integraría una librería de Texto-a-Voz (TTS)
    };

    const handleStartTimer = () => {
        console.log(`Iniciando temporizador de ${currentStep.time} para el paso ${currentStep.number}`);
        // Aquí se integraría la lógica del temporizador
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    // Usamos ScrollView para permitir el desplazamiento del contenido
    return (
        <>
        <SafeAreaView edges={['top']} style={styles.safeTop} />
        <SafeAreaView edges={['left','right','bottom']} style={styles.safeArea}>
            {/* Header Naranja (MiChef) */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>MiChef</Text>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    
                    {/* Título de Receta y Enlace */}
                    <TouchableOpacity onPress={() => console.log('Ir a Demo de Receta')}>
                        <Text style={styles.linkText}>Demo de Receta</Text>
                    </TouchableOpacity>
                    <Text style={styles.mainTitle}>Pasta con Tomate y Albahaca</Text>
                    
                    {/* Tags de Información */}
                    <View style={styles.tagsContainer}>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>30 minutos</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>Dificultad: Fácil</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>{`Paso ${currentStep.number} de ${totalSteps}`}</Text>
                        </View>
                    </View>

                    {/* Área del Paso Actual */}
                    <View style={styles.stepContainer}>
                        <View style={styles.stepHeader}>
                            <View style={styles.stepNumberBubble}>
                                <Text style={styles.stepNumber}>{currentStep.number}</Text>
                            </View>
                            <Text style={styles.stepTitle}>{currentStep.title}</Text>
                        </View>

                        <Text style={styles.stepDescription}>
                            {currentStep.description}
                        </Text>
                        
                        {/* Controles de Navegación */}
                        <View style={styles.navigationButtons}>
                            <TouchableOpacity 
                                style={[styles.navButton, currentStepIndex === 0 && { opacity: 0.5 }]}
                                onPress={handlePrevious} 
                                disabled={currentStepIndex === 0}
                            >
                                <Text style={styles.navButtonText}>Anterior</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={[styles.navButton, styles.reproduceButton]}
                                onPress={handleReproduce}
                            >
                                <Text style={styles.navButtonText}>Reproducir</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={[styles.navButton, currentStepIndex === totalSteps - 1 && { opacity: 0.5 }]}
                                onPress={handleNext}
                                disabled={currentStepIndex === totalSteps - 1}
                            >
                                <Text style={styles.navButtonText}>Siguiente</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Temporizador */}
                        <Text style={styles.timerText}>
                            {currentStep.time}
                        </Text>
                        <TouchableOpacity 
                            style={styles.timerButton}
                            onPress={handleStartTimer}
                        >
                            <Text style={styles.timerButtonText}>Iniciar Temporizador</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Resumen de Pasos */}
                    <Text style={styles.summaryTitle}>Resumen de pasos</Text>
                    {RECIPE_STEPS.map((step, index) => (
                        <TouchableOpacity
                            key={step.number}
                            style={[
                                styles.summaryButton,
                                index === currentStepIndex && { borderColor: '#FF8C00', borderWidth: 2 } // Destacar paso actual
                            ]}
                            onPress={() => goToStep(index)}
                        >
                            <Text style={styles.summaryButtonText}>
                                {`${step.number}. ${step.title}`}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    
                    {/* El botón 'Regresar' fijo se manejará fuera del ScrollView, por eso agregamos paddingBottom al container */}
                </View>
            </ScrollView>

            {/* Botón Regresar (Fijo, fuera del ScrollView) */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={handleGoBack}
                accessibilityRole="button"
                accessibilityLabel="Regresar a la pantalla anterior"
            >
                <Text style={styles.backButtonText}>Regresar</Text>
            </TouchableOpacity>
        </SafeAreaView>
        </>
    );
};

export default AIDemoRecipesScreen;