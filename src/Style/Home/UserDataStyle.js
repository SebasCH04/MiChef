import { StyleSheet, Platform } from 'react-native';


export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // Header (Replicado del Dashboard)
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // Alineamos solo el título a la izquierda
        alignItems: 'center',
        backgroundColor: '#FF8C00',
        paddingHorizontal: 15,
        paddingVertical: Platform.OS === 'ios' ? 10 : 15,
        height: 65,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },

    // Contenido
    scrollContent: {
        paddingHorizontal: 15,
        paddingBottom: 120, // Espacio para los botones inferiores
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginBottom: 15,
    },

    // Contenedor de Datos (Recuadro Amarillo)
    dataContainer: {
        backgroundColor: '#FFFACD',
        padding: 20,
        borderRadius: 10,
        borderColor: '#E6E6A8', // Borde sutil
        borderWidth: 1,
        marginBottom: 15,
    },

    // Filas de Datos
    dataRow: {
        marginBottom: 10,
    },
    dataLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        lineHeight: 24, // Espacio para el valor
    },
    dataValue: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10, // Indentación para los valores
        marginBottom: 5,
    },
    
    // Lista de ingredientes a evitar (sin guiones/puntos, solo valores)
    avoidIngredientsList: {
        marginLeft: 0, // Ajuste si se necesita más espacio
    },

    // Enlace de Contraseña
    passwordChangeLink: {
        alignSelf: 'flex-start', // Asegura que el Touchable no ocupe todo el ancho
        marginBottom: 0,
        marginTop: 20,

    },
    passwordChangeText: {
        color: '#0047AB',
        fontSize: 16,
        textDecorationLine: 'underline',
        fontWeight: '600',
    },

    // Botones Flotantes Inferiores
    bottomButtonsContainer: {
        marginBottom: 200,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
        
    },
    actionButton: {
        backgroundColor: '#0D47A1', // Azul Oscuro
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 2,
        paddingVertical: 12,
        width: '45%',
        alignItems: 'center',

    },
    actionButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Botón Cancelar (usa el mismo estilo que el de acción para un look uniforme)
    cancelButton: {
        backgroundColor: '#0D47A1', // Mismo Azul
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 2,
        paddingVertical: 12,
        width: '45%',
        alignItems: 'center',

    },
    cancelButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
