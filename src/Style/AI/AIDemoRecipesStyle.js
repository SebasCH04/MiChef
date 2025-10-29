import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    // --- Contenedor Principal ---
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // El contenedor principal del contenido (excluyendo el header naranja)
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        // Se añade un padding extra abajo para que el contenido no quede cubierto
        // por el botón 'Regresar' fijo.
        paddingBottom: 80, 
    },

    // --- Header Naranja (Compartido con AI Chat) ---
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

    // --- Títulos de la Receta ---
    linkText: {
        fontSize: 16,
        color: '#1a4785', // Azul de enlace
        textAlign: 'center',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 20,
    },

    // --- Tags de Información (Tiempo, Dificultad, Paso) ---
    tagsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 25,
    },
    tag: {
        backgroundColor: '#fff0cc', // Amarillo claro
        borderColor: '#ffcc00', 
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 4,
    },
    tagText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
    },

    // --- Área del Paso Actual ---
    stepContainer: {
        backgroundColor: '#f5f5f5', // Fondo del área del paso
        borderRadius: 10,
        padding: 20,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    stepHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    stepNumberBubble: {
        backgroundColor: '#FF8C00', // Naranja Fuerte
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    stepNumber: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    stepTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a4785', // Azul Oscuro
        flexShrink: 1, // Permite que el texto se ajuste si es largo
    },
    stepDescription: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 20,
    },

    // --- Controles de Navegación (Anterior/Siguiente/Reproducir) ---
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    navButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#1a4785', // Azul Oscuro para la mayoría
        minWidth: 90,
        alignItems: 'center',
    },
    reproduceButton: {
        backgroundColor: '#FF8C00', // Naranja para Reproducir/Acción Principal
    },
    navButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },

    // --- Temporizador ---
    timerText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    timerButton: {
        backgroundColor: '#1a4785',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25, // Para un botón ovalado
        alignSelf: 'center',
    },
    timerButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    
    // --- Resumen de Pasos ---
    summaryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 15,
    },
    summaryButton: {
        backgroundColor: '#f5f5f5', // Fondo claro, similar al paso
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 10,
    },
    summaryButtonText: {
        fontSize: 16,
        color: '#333',
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