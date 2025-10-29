import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // --- Header ---
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: '#FF8C00', // Naranja Fuerte
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
    },

    // --- Contenedor Principal y Títulos ---
    container: {
            flex: 1,
            paddingHorizontal: 20,
            paddingBottom: 80, // Mantenemos el padding por defecto
        },
    containerFullScreen: {
            paddingBottom: 15, // Reducimos el padding inferior
        },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a4785', // Azul oscuro
        marginTop: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },

    // --- Área de Chat / Mensajes ---
    chatAreaContainer: {
        flex: 1, // Ocupa el espacio restante
        backgroundColor: '#fff0cc', // Amarillo muy claro
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ffcc00',
        padding: 10,
        // CORRECCIÓN: Eliminado 'marginBottom: 120'
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    chatTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    fullScreenButton: {
        backgroundColor: '#1a4785',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    fullScreenButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    
    // --- Mensaje de la IA ---
    messageBox: {
        backgroundColor: '#f5f5f5', // Fondo del mensaje
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        maxWidth: '90%', 
        alignSelf: 'flex-start', // Alinea IA a la izquierda
        borderLeftWidth: 4,
        borderLeftColor: '#1a4785',
    },
    messageText: {
        fontSize: 14,
        color: '#333', // Color de texto para el mensaje de la IA
    },

    // --- Mensaje del Usuario ---
    userMessageBox: {
        backgroundColor: '#1a4785', // Fondo azul para el usuario
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        maxWidth: '90%', 
        alignSelf: 'flex-end', // Alinea usuario a la derecha
    },
    userMessageText: {
        fontSize: 14,
        color: 'white', // Texto blanco para contraste
    },

    // --- Componentes del Mensaje (Timestamp y Botón Escuchar) ---
    messageTimestamp: {
        fontSize: 10,
        color: '#999',
        textAlign: 'right',
        marginTop: 5,
    },
    listenButton: {
        backgroundColor: '#1a4785',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'flex-end',
    },
    listenButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },

    // --- Área de Input ---
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        // CORRECCIÓN: Eliminado 'marginBottom: 120'
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 15,
        fontSize: 16,
        marginRight: 10,
    },
    voiceButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#1a4785',
        height: 50,
        width: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#1a4785',
        height: 50,
        paddingHorizontal: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },

    // --- Botón Regresar (Fijo) ---
    backButton: {
        position: 'absolute', // Se superpone al contenido
        bottom: 20,
        left: 20,
        right: 20,
        height: 50,
        backgroundColor: '#1a4785', // Azul oscuro
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});