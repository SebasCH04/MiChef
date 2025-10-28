import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#F77F00', // Naranja
        padding: 15,
        paddingTop: 40,
    },
    headerText: {
        fontSize: 24,
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
        width: '90%',
        padding: 20,
        backgroundColor: '#fff8dc', // Fondo amarillo claro/crema
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
        fontWeight: 'normal', // Manteniendo el estilo de la imagen
        // Accesibilidad: El TextInput tiene su propia etiqueta
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
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
        flex: 1,
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
        backgroundColor: '#0d47a1', // Azul oscuro
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