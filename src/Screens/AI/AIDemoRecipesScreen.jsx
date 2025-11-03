import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert, 
    ActivityIndicator,
    Vibration,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
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
    const [timerActive, setTimerActive] = useState(false);
    const [timerSecondsRemaining, setTimerSecondsRemaining] = useState(null);
    const timerRef = useRef(null);
    const alarmSoundRef = useRef(null);
    
    // Temporizador por paso

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

    // --- utilidades de tiempo por receta ---
    const parseTimeToSeconds = (timeStr) => {
        if (timeStr == null) return 0;
        if (typeof timeStr === 'number' && Number.isFinite(timeStr)) {
            // Si es un número pequeño asumimos minutos; si es grande (>= 60) podría ser segundos
            return timeStr >= 60 ? Math.round(timeStr) : Math.round(timeStr * 60);
        }
        const s = String(timeStr);
        // Soporta "10 min", "10mins", "10 minutos", "90 s", "90 seg"
        const minMatch = /([0-9]+)\s*(min|mins|minuto|minutos)\b/i.exec(s);
        if (minMatch) return parseInt(minMatch[1], 10) * 60;
        const secMatch = /([0-9]+)\s*(s|seg|segundo|segundos)\b/i.exec(s);
        if (secMatch) return parseInt(secMatch[1], 10);
        // Sólo números sin unidad -> minutos por defecto
        const justNum = /^(\d+)$/i.exec(s.trim());
        if (justNum) return parseInt(justNum[1], 10) * 60;
        return 0;
    };

    useEffect(() => {
        return () => {
            Speech.stop();
        };
    }, []);


    // Detener y limpiar temporizador / audio al desmontar
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            if (alarmSoundRef.current) {
                alarmSoundRef.current.unloadAsync().catch(() => {});
                alarmSoundRef.current = null;
            }
            // Detener TTS al desmontar
            try { Speech.stop(); } catch {}
        };
    }, []);

    // Si se cambia de paso y había un temporizador activo, detenerlo y parar TTS
    useEffect(() => {
        // Detener TTS al cambiar de paso, pero NO detener el temporizador de receta
        try { Speech.stop(); } catch {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStepIndex]);

    // Configurar audio para reproducirse en modo silencio (iOS)
    useEffect(() => {
        (async () => {
            try {
                await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
            } catch {}
        })();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FF8C00" />
                    <Text style={styles.loadingText}>Cargando datos de la receta...</Text>
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

    const handleReproduce = async () => {
        try {
            // Toggle: si está hablando, detener; en caso contrario, hablar
            const speaking = await Speech.isSpeakingAsync();
            if (speaking) {
                Speech.stop();
                return;
            }
            const spoken = `Paso ${currentStep.number}. ${currentStep.title}. ${currentStep.description}`;
            Speech.speak(spoken, {
                language: 'es-MX',
                rate: 1.0,
                pitch: 1.0,
            });
        } catch (e) {
            console.log('Error al reproducir el paso:', e?.message);
        }
    };

    const formatSeconds = (sec) => {
        if (sec == null) return '';
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${String(s).padStart(2, '0')}`;
    };

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setTimerActive(false);
        setTimerSecondsRemaining(null);
    };
    
    const handleStartTimer = () => {
        // Toggle: si está activo, detener
        if (timerActive) {
            stopTimer();
            return;
        }
        const raw = getRecipeTimeRaw();
        const totalSec = parseTimeToSeconds(raw);
        if (!totalSec) {
            Alert.alert('Sin tiempo', 'Esta receta no tiene duración definida.');
            return;
        }
        setTimerSecondsRemaining(totalSec);
        setTimerActive(true);
        // Iniciar intervalo
        timerRef.current = setInterval(() => {
            setTimerSecondsRemaining((prev) => {
                if (prev == null) return prev;
                if (prev <= 1) {
                    // Fin del temporizador
                    if (timerRef.current) {
                        clearInterval(timerRef.current);
                        timerRef.current = null;
                    }
                    setTimerActive(false);
                    // Reproducir sonido de alarma
                    playAlarm();
                    // Vibración leve
                    try { Vibration.vibrate(150); } catch {}
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    

    const playAlarm = async () => {
        try {
            // Limpia sonido previo
            if (alarmSoundRef.current) {
                await alarmSoundRef.current.unloadAsync();
                alarmSoundRef.current = null;
            }
            // Reproducir asset local (sin depender de internet)
            const { sound } = await Audio.Sound.createAsync(
                require('../../../assets/sounds/alarm.mp3'),
                { shouldPlay: true, volume: 1.0 }
            );
            alarmSoundRef.current = sound;
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    sound.unloadAsync().catch(() => {});
                    alarmSoundRef.current = null;
                }
            });
        } catch (e) {
            // Si falla la reproducción, no interrumpimos el flujo
            console.log('No se pudo reproducir la alarma:', e?.message);
        }
    };
    
    const handleGoBack = () => {
        Speech.stop(); // Detener audio al regresar
        navigation.goBack(); 
    };


    const getRecipeTimeRaw = () => {
        const r = recipeData || {};
        const candidates = [
            r.time, r.tiempo, r.Tiempo, r.duration, r.duracion,
            r.total_time, r.tiempo_total, r.duracion_total,
            r.cooking_time, r.preparation_time,
            r.timeMinutes, r.minutos, r.Minutos
        ];
        for (const c of candidates) {
            if (c !== undefined && c !== null && String(c).trim() !== '') return c;
        }
        return null;
    };

    const getRecipeTimeLabel = () => {
        const raw = getRecipeTimeRaw();
        if (raw === null) return 'Sin tiempo';
        const sec = parseTimeToSeconds(raw);
        if (sec > 0) {
            const min = Math.ceil(sec / 60);
            return `${min} minutos`;
        }
        const s = String(raw).trim();
        return s.length > 0 ? s : 'Sin tiempo';
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
                    
                    <Text {...a11yEs} style={styles.sectionTitle} accessibilityRole="header">Demo de Receta</Text>
                    <Text {...a11yEs} style={styles.mainTitle}>{recipeData.name}</Text>
                    
                    <View style={styles.tagsContainer}>
                        <View style={styles.tag}>
                            <Text {...a11yEs} style={styles.tagText}>{getRecipeTimeLabel()}</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text {...a11yEs} style={styles.tagText}>{`Dificultad: ${recipeData.difficulty}`}</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text {...a11yEs} style={styles.tagText}>{`Paso ${currentStep.number} de ${totalSteps}`}</Text>
                        </View>
                    </View>

                    {/* (El bloque del paso actual se mostrará al final, debajo de ingredientes y resumen) */}

                    {/* Ingredientes (estilo similar a 'Resumen de pasos', pero sin interacción) */}
                    <Text {...a11yEs} style={styles.summaryTitle}>Ingredientes</Text>
                    {Array.isArray(recipeData.ingredients) && recipeData.ingredients.length > 0 ? (
                        recipeData.ingredients.map((ing, index) => (
                            <View
                                key={`${ing.name || 'ing'}-${index}`}
                                style={styles.summaryButton}
                                accessible={true}
                                accessibilityRole="text"
                                accessibilityLabel={`Ingrediente: ${ing.cantidad ?? ''} ${ing.unidad ?? ''} de ${ing.name ?? ''}`}
                                {...a11yEs}
                            >
                                <Text {...a11yEs} style={styles.summaryButtonText}>
                                    {`${ing.cantidad ?? ''} ${ing.unidad ?? ''} de ${ing.name ?? ''}`.trim()}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <View style={styles.summaryButton} accessible={true} {...a11yEs}>
                            <Text style={styles.summaryButtonText}>No hay ingredientes disponibles.</Text>
                        </View>
                    )}

                    {/* Pequeño espacio para separar ingredientes del resumen de pasos */}
                    <View style={styles.sectionSpacerSmall} />

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

                    {/* Separador entre el resumen y los pasos en sí */}
                    <View style={styles.sectionDivider} accessible={false} />

                    {/* Ahora sí: Paso actual con controles y temporizador al final */}
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
                                accessibilityRole="button"
                                accessibilityLabel={'Reproducir o detener el paso actual'}
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
                            {timerActive && timerSecondsRemaining != null
                                ? formatSeconds(timerSecondsRemaining)
                                : getRecipeTimeLabel()}
                        </Text>
                        <TouchableOpacity 
                            {...a11yEs}
                            style={styles.timerButton}
                            onPress={handleStartTimer}
                            accessibilityRole="button"
                            accessibilityLabel={
                                timerActive
                                    ? 'Detener temporizador'
                                    : `Iniciar temporizador de ${getRecipeTimeLabel()}`
                            }
                        >
                            <Text style={styles.timerButtonText}>
                                {timerActive ? 'Detener Temporizador' : 'Iniciar Temporizador'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
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