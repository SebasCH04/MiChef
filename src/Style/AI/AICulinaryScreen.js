import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
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
        backgroundColor: '#FF8C00', // Naranja Fuerte
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
    },
    profileIconContainer: {
        padding: 5,
    },
    // --- Títulos y Subtítulos ---
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0047AB', // Azul oscuro
        marginTop: 15,
        alignSelf: 'flex-start', // Alineado a la izquierda como en la imagen
    },
    subtitle: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    // --- Tarjetas de Opción ---
    card: {
        width: '100%',
        backgroundColor: '#fff0cc', // Fondo de tarjeta (Similar al amarillo/crema de la imagen)
        borderRadius: 12,
        padding: 20,
        marginBottom: 25,
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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0047AB',
        marginTop: 10,
        marginBottom: 5,
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 15,
    },
    cardButton: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 2,
        width: '80%',
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