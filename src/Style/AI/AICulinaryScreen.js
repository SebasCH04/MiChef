import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    // Resto de la pantalla en blanco
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // Solo franja superior
    safeTop: {
        backgroundColor: '#FF8C00',
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    // --- Header ---
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: 65,
        backgroundColor: '#FF8C00', // Naranja Fuerte
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
    },
    profileIconContainer: {
        padding: 0,
        minWidth: 40,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
    },
    // --- Títulos y Subtítulos ---
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0047AB', // Azul oscuro
        marginTop: 25,
        alignSelf: 'flex-start', // Alineado a la izquierda como en la imagen
    },
    subtitle: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 25,
        paddingHorizontal: 0,
    },
    // --- Tarjetas de Opción ---
    card: {
        width: '100%',
        backgroundColor: '#fff0cc', // Fondo de tarjeta (Similar al amarillo/crema de la imagen)
        borderRadius: 12,
        padding: 24, // un poco más grande
        marginBottom: 28,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffcc00',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0047AB',
        marginTop: 10,
        marginBottom: 5,
    },
    cardDescription: {
        fontSize: 15,
        lineHeight: 22,
        color: '#555',
        textAlign: 'center',
        marginBottom: 18,
        paddingHorizontal: 4,
    },
    cardButton: {
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 2,
        width: '85%',
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: '#0047AB', // Azul oscuro
    },
    secondaryButton: {
        backgroundColor: '#0047AB', // Azul oscuro
    },
    cardButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    // --- Botón Volver al Inicio (Fijo) ---
    backButton: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        height: 50,
        backgroundColor: '#0047AB', // Azul oscuro para el botón de regresar
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 2,

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