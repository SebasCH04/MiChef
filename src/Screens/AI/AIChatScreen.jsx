import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Speech from 'expo-speech';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../Style/AI/AIChatScreen.js';
import { a11yEs } from '../../Services/a11y';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import URL from '../../Services/url.js';

const initialMessages = [
    {
        id: 1,
        text: '¡Hola! Soy tu asistente culinario de MiChef...',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
];

const AIChatScreen = ({ navigation }) => {
    // Límites para eficiencia
    const MAX_PROMPT_WORDS = 80;
    const MAX_HISTORY = 6;

    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState(initialMessages);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speakingMsgId, setSpeakingMsgId] = useState(null);
    // --- NUEVO: Estado para Pantalla Completa ---
    const [isFullScreen, setIsFullScreen] = useState(false); 
    
    const scrollViewRef = useRef();

    // Utilidad: convertir Markdown a texto plano legible
    const mdToPlain = (input) => {
        let t = String(input ?? '');
        // Quitar fences de código pero mantener contenido
        t = t.replace(/```[\s\S]*?```/g, (m) => m.replace(/```/g, ''));
        // Encabezados #
        t = t.replace(/^\s{0,3}#{1,6}\s+/gm, '');
        // Negritas y cursivas
        t = t.replace(/\*\*(.*?)\*\*/g, '$1');
        t = t.replace(/__(.*?)__/g, '$1');
        t = t.replace(/(?<!\*)\*(?!\*)([^\*]+)(?<!\*)\*(?!\*)/g, '$1');
        t = t.replace(/_(.*?)_/g, '$1');
        // Código inline
        t = t.replace(/`([^`]+)`/g, '$1');
        // Imágenes: usar alt
        t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '$1');
        // Links: mostrar solo el texto
        t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
        // Citas
        t = t.replace(/^>\s?/gm, '');
        // Reglas horizontales
        t = t.replace(/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/gm, '');
        // Listas sin ordenar
        t = t.replace(/^\s*[-*+]\s+/gm, '• ');
        // Listas ordenadas
        t = t.replace(/^\s*(\d+)\.\s+/gm, '$1) ');
        // Colapsar saltos múltiples
        t = t.replace(/\n{3,}/g, '\n\n');
        return t.trim();
    };

    const handleGoBack = () => {
        try { Speech.stop(); } catch {}
        setIsSpeaking(false);
        setSpeakingMsgId(null);
        navigation.goBack();
    };

    const handleVoice = () => {
        console.log('Iniciando grabación de voz...');
    };

    const limitWords = (text, maxWords) => {
        const words = text.trim().split(/\s+/);
        if (words.length <= maxWords) return text.trim();
        return words.slice(0, maxWords).join(' ') + '…';
    };

    const handleSend = async () => {
        const trimmedInput = limitWords(messageInput, MAX_PROMPT_WORDS);
        if (trimmedInput === '') return;

        const newUserMessage = {
            id: Date.now(),
            text: trimmedInput,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        const pendingId = Date.now() + 1;
        const pendingAI = {
            id: pendingId,
            text: 'Pensando…',
            sender: 'ai',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages(prev => [...prev, newUserMessage, pendingAI]);
        setMessageInput('');

        try {
            // Construir historial limitado para la API
            const recent = [...messages, newUserMessage].slice(-MAX_HISTORY);
            const history = recent.map(m => ({
                role: m.sender === 'user' ? 'user' : 'assistant',
                content: m.text,
            }));

            const endpoint = `${URL}:3000/ai/chat`;
            const resp = await axios.post(endpoint, { messages: history }, { timeout: 45000 });
            const content = resp?.data?.content || 'No recibí contenido de la IA.';

            setMessages(prev => prev.filter(m => m.id !== pendingId).concat({
                id: Date.now() + 2,
                text: content,
                sender: 'ai',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }));
        } catch (e) {
            const status = e?.response?.status;
            const serverMsg = e?.response?.data?.message;
            console.log('Error IA:', status ? `HTTP ${status}` : e?.message);
            setMessages(prev => prev.filter(m => m.id !== pendingId).concat({
                id: Date.now() + 3,
                text: status === 402
                    ? (serverMsg || 'Saldo insuficiente en la cuenta de IA. Vuelve a intentarlo más tarde.')
                    : (serverMsg ? `Error: ${serverMsg}` : 'Hubo un error al procesar tu solicitud. Verifica tu conexión e inténtalo de nuevo.'),
                sender: 'ai',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }));
        }
    };

    const handleListen = async (text, id) => {
        try {
            const speaking = await Speech.isSpeakingAsync();
            // Si ya está hablando este mismo mensaje, detener
            if (speaking && speakingMsgId === id) {
                Speech.stop();
                setIsSpeaking(false);
                setSpeakingMsgId(null);
                return;
            }
            // Si está hablando otra cosa, detener y continuar
            if (speaking) {
                Speech.stop();
            }
            Speech.speak(text, {
                language: 'es-MX',
                rate: 1.0,
                pitch: 1.0,
                onStart: () => { setIsSpeaking(true); setSpeakingMsgId(id); },
                onDone: () => { setIsSpeaking(false); setSpeakingMsgId(null); },
                onStopped: () => { setIsSpeaking(false); setSpeakingMsgId(null); },
                onError: () => { setIsSpeaking(false); setSpeakingMsgId(null); },
            });
        } catch (e) {
            console.log('Error al reproducir TTS:', e?.message);
            setIsSpeaking(false);
            setSpeakingMsgId(null);
        }
    };

    const handleFullScreen = () => {
        setIsFullScreen(prev => !prev); 
    };

    useEffect(() => {

        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]); 

    // Al perder el foco o salir de la pantalla, detener cualquier TTS en curso
    useFocusEffect(
        useCallback(() => {
            return () => {
                try { Speech.stop(); } catch {}
                setIsSpeaking(false);
                setSpeakingMsgId(null);
            };
        }, [])
    );

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);


    return (
        <>
        <SafeAreaView edges={['top']} style={isFullScreen ? styles.safeTopHidden : styles.safeTop} />
        <SafeAreaView edges={['left','right','bottom']} style={styles.safeArea}>
            {/* Encabezado MiChef (ocultar en pantalla completa) */}
            {!isFullScreen && (
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
                            </View>
            )}

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? (isFullScreen ? 0 : 60) : 0} 
            >
                <View style={[
                    styles.container, 
                    isFullScreen && styles.containerFullScreen 
                ]}>
                    
                    {!isFullScreen && (
                        <>
                            <Text style={styles.mainTitle} {...a11yEs}>
                                Asistente Culinario IA
                            </Text>
                            <Text style={styles.subtitle} {...a11yEs}>
                                Tu chef personal inteligente y accesible. Pregunta sobre recetas, ingredientes y técnicas de cocina.
                            </Text>
                        </>
                    )}
                    <View style={styles.chatAreaContainer}>
                        {/* Encabezado del chat */}
                        <View style={styles.chatHeader}>
                            <Text style={styles.chatTitle} {...a11yEs}>Chef AI</Text>
                            <TouchableOpacity
                                style={styles.fullScreenButton}
                                onPress={handleFullScreen}
                                {...a11yEs}
                            >
                                <Text style={styles.fullScreenButtonText}>
                                    {isFullScreen ? 'Salir de Pantalla Completa' : 'Pantalla Completa'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            ref={scrollViewRef}
                            style={{ flex: 1 }}
                            contentContainerStyle={{ paddingBottom: 10 }}
                        >
                            {messages.map((message) => (
                                <View
                                    key={message.id}
                                    style={message.sender === 'user'
                                        ? styles.userMessageBox
                                        : styles.messageBox
                                    }
                                >
                                    <Text
                                        {...a11yEs}
                                        style={message.sender === 'user'
                                            ? styles.userMessageText
                                            : styles.messageText
                                        }
                                    >
                                        {message.sender === 'ai' ? mdToPlain(message.text) : message.text}
                                    </Text>
                                    <Text style={styles.messageTimestamp} {...a11yEs}>
                                        {message.timestamp}
                                    </Text>
                                    {message.sender === 'ai' && (
                                        <TouchableOpacity
                                            style={styles.listenButton}
                                            onPress={() => handleListen(message.sender === 'ai' ? mdToPlain(message.text) : message.text, message.id)}
                                            {...a11yEs}
                                            accessibilityRole="button"
                                            accessibilityLabel={speakingMsgId === message.id && isSpeaking ? 'Detener este mensaje' : 'Escuchar este mensaje'}
                                        >
                                            <Text style={styles.listenButtonText}>
                                                {speakingMsgId === message.id && isSpeaking ? 'Detener' : 'Escuchar'}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Input y Botones de Envío */}
                    <View style={styles.inputArea}>
                        <TextInput
                            style={styles.input}
                            placeholder="Escribe tu pregunta..."
                            placeholderTextColor="#999"
                            value={messageInput}
                            onChangeText={setMessageInput}
                            onSubmitEditing={handleSend}
                            returnKeyType="send"
                            {...a11yEs}
                        />
                        <TouchableOpacity
                            style={styles.voiceButton}
                            onPress={handleVoice}
                            accessible={true}
                            accessibilityRole="button"
                            accessibilityLabel="Grabar voz"
                            accessibilityHint="Toca dos veces para dictar tu pregunta"
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            {...a11yEs}
                        >
                            <MaterialCommunityIcons name="microphone" size={24} color="#1a4785" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.sendButton}
                            onPress={handleSend}
                            accessible={true}
                            accessibilityRole="button"
                            accessibilityLabel="Enviar mensaje"
                            accessibilityHint="Toca dos veces para enviar tu pregunta"
                            {...a11yEs}
                        >
                            <Text style={styles.sendButtonText}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>

            {!isFullScreen && (
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleGoBack}
                    accessibilityRole="button"
                    accessibilityLabel="Regresar a la pantalla anterior"
                    {...a11yEs}
                >
                    <Text style={styles.backButtonText}>Regresar</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
        </>
    );
};

export default AIChatScreen;