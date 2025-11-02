import React, { useState, useRef, useEffect } from 'react';
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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../Style/AI/AIChatScreen.js';

const initialMessages = [
    {
        id: 1,
        text: '¡Hola! Soy tu asistente culinario de MiChef...',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
];

const AIChatScreen = ({ navigation }) => {
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState(initialMessages);
    // --- NUEVO: Estado para Pantalla Completa ---
    const [isFullScreen, setIsFullScreen] = useState(false); 
    
    const scrollViewRef = useRef();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleVoice = () => {
        console.log('Iniciando grabación de voz...');
    };

    const handleSend = () => {
        const trimmedInput = messageInput.trim();
        if (trimmedInput === '') return;

        const newUserMessage = {
            id: Date.now(),
            text: trimmedInput,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages(prevMessages => [...prevMessages, newUserMessage]);
        setMessageInput('');

        setTimeout(() => {
            const aiResponse = {
                id: Date.now() + 1,
                text: 'Estoy procesando tu solicitud...',
                sender: 'ai',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prevMessages => [...prevMessages, aiResponse]);
        }, 1000);
    };

    const handleListen = (text) => {
        console.log('Reproduciendo texto:', text);
    };

    const handleFullScreen = () => {
        setIsFullScreen(prev => !prev); 
    };

    useEffect(() => {

        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]); 


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
                  <Text style={styles.headerTitle}>MiChef</Text>
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
                            <Text style={styles.mainTitle}>
                                Asistente Culinario IA
                            </Text>
                            <Text style={styles.subtitle}>
                                Tu chef personal inteligente y accesible. Pregunta sobre recetas, ingredientes y técnicas de cocina.
                            </Text>
                        </>
                    )}
                    <View style={styles.chatAreaContainer}>
                        {/* Encabezado del chat */}
                        <View style={styles.chatHeader}>
                            <Text style={styles.chatTitle}>Chat IA</Text>
                            <TouchableOpacity
                                style={styles.fullScreenButton}
                                onPress={handleFullScreen}
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
                                        style={message.sender === 'user'
                                            ? styles.userMessageText
                                            : styles.messageText
                                        }
                                    >
                                        {message.text}
                                    </Text>
                                    <Text style={styles.messageTimestamp}>
                                        {message.timestamp}
                                    </Text>
                                    {message.sender === 'ai' && (
                                        <TouchableOpacity
                                            style={styles.listenButton}
                                            onPress={() => handleListen(message.text)}
                                        >
                                            <Text style={styles.listenButtonText}>Escuchar</Text>
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
                        />
                        <TouchableOpacity
                            style={styles.voiceButton}
                            onPress={handleVoice}
                        >
                            <MaterialCommunityIcons name="microphone" size={24} color="#1a4785" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.sendButton}
                            onPress={handleSend}
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
                >
                    <Text style={styles.backButtonText}>Regresar</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
        </>
    );
};

export default AIChatScreen;