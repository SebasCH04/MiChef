import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert, 
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Speech from 'expo-speech'; 
import { styles } from '../../Style/AI/AIDemoRecipesStyle.js';
import { a11yEs } from '../../Services/a11y';
import URL from '../../Services/url.js'; 

const API_URL = `${URL}:3000/home/recipeDetails`; 

const initialRecipeData = {
    name: 'Cargando Receta...',
    time: 0,
    difficulty: 'Cargando...',
    servings: 0,
    diet: 'Cargando...',
    ingredients: [],
    steps: [],
};


const AIDemoRecipesScreen = ({ navigation, route }) => {
    
    const { receta_id } = route.params || {}; 
    const [recipeData, setRecipeData] = useState(initialRecipeData);
    const [loading, setLoading] = useState(true);
    const [currentStepIndex, setCurrentStepIndex] = useState(0); 
    
    const [timeRemaining, setTimeRemaining] = useState(0); 
    const [timerRunning, setTimerRunning] = useState(false);

    const fetchRecipeDetails = useCallback(async () => {
        if (!receta_id) {
            setLoading(false);
            Alert.alert('Error', 'No se recibió el ID de la receta.');
            navigation.goBack();
            return;
        }

        setLoading(true);
        const endpoint = `${API_URL}?receta_id=${receta_id}`;

        try {
            const response = await fetch(endpoint);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
            }

            const data = await response.json();

            if (data.success && data.data) {
                setRecipeData(data.data);
                setTimeRemaining(data.data.time * 60); 
                setCurrentStepIndex(0); 
            } else {
                Alert.alert('Error', data.message || 'No se pudieron obtener los detalles de la receta.');
                navigation.goBack();
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar con el servidor para obtener la receta.');
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    }, [receta_id, navigation]);

    useEffect(() => {
        fetchRecipeDetails();
    }, [fetchRecipeDetails]);

    useEffect(() => {
        let interval = null;

        if (timerRunning && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
            }, 1000); 
        } 
        else if (!timerRunning || timeRemaining === 0) {
            clearInterval(interval);
            
            if (timeRemaining === 0 && timerRunning) {
                Alert.alert('¡Tiempo!', 'El temporizador de la receta ha finalizado.');
                setTimerRunning(false);
            }
        }

        return () => clearInterval(interval);
    }, [timerRunning, timeRemaining]); 

    useEffect(() => {
        return () => {
            Speech.stop();
        };
    }, []);


    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#FF8C00" style={{ marginTop: 50 }} />
                    <Text style={{ textAlign: 'center', marginTop: 10 }}>Cargando detalles de la receta...</Text>
                </View>
            </SafeAreaView>
        );
    }

    const currentStep = recipeData.steps[currentStepIndex];
    const totalSteps = recipeData.steps.length;
    


    const handleNext = () => {
        Speech.stop(); // Detener audio al cambiar de paso
        const newIndex = currentStepIndex + 1;
        if (newIndex < totalSteps) {
            setCurrentStepIndex(newIndex);
        }
    };

    const handlePrevious = () => {
        Speech.stop(); // Detener audio al cambiar de paso
        const newIndex = currentStepIndex - 1;
        if (newIndex >= 0) {
            setCurrentStepIndex(newIndex);
        }
    };

    const goToStep = (index) => {
        Speech.stop(); // Detener audio al saltar a un paso
        if (index >= 0 && index < totalSteps) {
            setCurrentStepIndex(index);
        }
    };
    const handleReproduce = () => {
        const textToSpeak = currentStep.description;
        
        if (!textToSpeak) {
            Alert.alert('Error', 'No hay descripción para reproducir.');
            return;
        }

        // Detener cualquier reproducción anterior
        Speech.stop(); 
        // Reproducir la descripción actual en español
        Speech.speak(textToSpeak, {
            language: 'es-ES', // Puedes usar 'es' o 'es-ES'
            onDone: () => console.log('[DEBUG] Reproducción finalizada.'),
            onError: (err) => console.log('[DEBUG] Error al reproducir audio.', err)
        });
    };
    
    const handleStartTimer = () => {
        if (timeRemaining === 0 && !timerRunning) {
            setTimeRemaining(recipeData.time * 60); 
            setTimerRunning(true); 
        } else {
            setTimerRunning(!timerRunning); 
        }
    };
    
    const handleGoBack = () => {
        Speech.stop(); // Detener audio al regresar
        navigation.goBack(); 
    };


    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const getTimerButtonText = () => {
        if (timerRunning) {
            return 'Pausar Temporizador';
        }
        if (timeRemaining > 0 && timeRemaining < (recipeData.time * 60)) {
            return 'Continuar Temporizador';
        }
        if (timeRemaining === 0 && recipeData.time > 0) {
            return 'Reiniciar Temporizador';
        }
        return 'Iniciar Temporizador'; 
    };

    if (!currentStep) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Text style={styles.mainTitle}>Error</Text>
                    <Text style={styles.stepDescription}>
                        La receta cargada no tiene pasos de preparación definidos.
                    </Text>
                    <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                        <Text style={styles.backButtonText}>Regresar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
    
    
    return (
        <>
        <SafeAreaView edges={['top']} style={styles.safeTop} />
        <SafeAreaView edges={['left','right','bottom']} style={styles.safeArea}>
            {/* Header Naranja (MiChef) */}
            <View style={styles.header}>
                <Text {...a11yEs} style={styles.headerTitle} accessibilityRole="header" accessibilityLabel="Mi Chef">MiChef</Text>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    
                    <View>
                        <Text style={styles.linkText}>Demo de Receta</Text>
                    </View>
                    <Text {...a11yEs} style={styles.mainTitle}>{recipeData.name}</Text>
                    
                    <View style={styles.tagsContainer}>
                        <View style={styles.tag}>
                            <Text {...a11yEs} style={styles.tagText}>{`${recipeData.time} minutos`}</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text {...a11yEs} style={styles.tagText}>{`Dificultad: ${recipeData.difficulty}`}</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text {...a11yEs} style={styles.tagText}>{`Paso ${currentStep.number} de ${totalSteps}`}</Text>
                        </View>
                    </View>

                    <View style={styles.stepContainer}>
                        <View style={styles.stepHeader}>
                            <View style={styles.stepNumberBubble}>
                                <Text {...a11yEs} style={styles.stepNumber}>{currentStep.number}</Text>
                            </View>
                            <Text {...a11yEs} style={styles.stepTitle}>{`Paso ${currentStep.number}`}</Text>
                        </View>

                        <Text {...a11yEs} style={styles.stepDescription}>
                            {currentStep.description}
                        </Text>
                        
                        <View style={styles.navigationButtons}>
                            <TouchableOpacity 
                                {...a11yEs}
                                style={[styles.navButton, currentStepIndex === 0 && { opacity: 0.5 }]}
                                onPress={handlePrevious} 
                                disabled={currentStepIndex === 0}
                            >
                                <Text style={styles.navButtonText}>Anterior</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                {...a11yEs}
                                style={[styles.navButton, styles.reproduceButton]}
                                onPress={handleReproduce}
                            >
                                <Text style={styles.navButtonText}>Reproducir</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                {...a11yEs}
                                style={[styles.navButton, currentStepIndex === totalSteps - 1 && { opacity: 0.5 }]}
                                onPress={handleNext}
                                disabled={currentStepIndex === totalSteps - 1}
                            >
                                <Text style={styles.navButtonText}>Siguiente</Text>
                            </TouchableOpacity>
                        </View>

                        <Text {...a11yEs} style={styles.timerText}>
                           Tiempo Total Restante: {formatTime(timeRemaining)}
                        </Text>
                        <TouchableOpacity 
                            {...a11yEs}
                            style={styles.timerButton}
                            onPress={handleStartTimer}
                            disabled={recipeData.time === 0} 
                        >
                            <Text style={styles.timerButtonText}>
                                {getTimerButtonText()}
                            </Text>
                        </TouchableOpacity>

                        <Text {...a11yEs} style={styles.summaryTitle}>Ingredientes</Text>
                        {recipeData.ingredients.map((ing, index) => (
                             <Text key={index} style={styles.ingredientText}>
                                 {`${ing.cantidad} ${ing.unidad} de ${ing.name}`}
                            </Text>
                        ))}
                    </View>

                    <Text {...a11yEs} style={styles.summaryTitle}>Resumen de pasos</Text>
                    {recipeData.steps.map((step, index) => (
                        <TouchableOpacity
                            key={step.number}
                            style={[
                                styles.summaryButton,
                                index === currentStepIndex && { borderColor: '#FF8C00', borderWidth: 2 } 
                            ]}
                            onPress={() => goToStep(index)} 
                            {...a11yEs}
                            accessibilityLabel={`Ir al paso ${step.number}: ${step.description.substring(0, 30)}...`}
                        >
                            <Text {...a11yEs} style={styles.summaryButtonText}>
                                {`${step.number}. ${step.description.substring(0, 40)}...`}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    
                </View>
            </ScrollView>

            <TouchableOpacity
                {...a11yEs}
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