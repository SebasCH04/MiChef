import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    // Resto de la pantalla en blanco/gris claro
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    // Solo la franja superior (notch)
    safeTop: {
        backgroundColor: '#FF8C00',
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Fondo blanco de la pantalla
    },
    header: {
        backgroundColor: '#FF8C00', // Naranja fuerte
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: 65,
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        marginTop: 100, // Espacio para centrar verticalmente, similar a la imagen
        fontSize: 26,
        fontWeight: '700',
        color: '#0d47a1', // Azul oscuro
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    card: {
        width: '90%', // Ajuste de ancho similar a la imagen
        padding: 20,
        backgroundColor: '#fff8dc', // Fondo amarillo claro/crema para la tarjeta
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Sombra para Android
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
        // Accesibilidad: El TextInput tiene su propia etiqueta
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff', // Fondo blanco del input
        textAlign: 'center', // Para un código se ve mejor centrado
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        flex: 1, // Para que ocupen el espacio disponible
        marginHorizontal: 5,
        alignItems: 'center',
    },
    confirmarButton: {
        backgroundColor: '#0d47a1', // Azul oscuro
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 2,
        marginRight: 10,
        marginLeft: 10,
    },
    cancelarButton: {
        backgroundColor: '#0d47a1', // Azul oscuro (mismo estilo que la imagen)
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 2,
        marginRight: 10,
        marginLeft: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    });

