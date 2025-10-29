import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        paddingHorizontal: 15,
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
    // --- Títulos ---
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1a4785', // Azul oscuro
        marginTop: 15,
        marginBottom: 10,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
        marginBottom: 8,
    },
    // --- Barra de Búsqueda ---
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        marginRight: 10,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },
    searchButton: {
        backgroundColor: '#0047AB', // Azul oscuro para el botón
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    // --- Lista de Recetas ---
    recipeListContainer: {
        flex: 1,
        // Usamos una altura calculada para que el botón "Regresar" quede fijo
        maxHeight: height - 300, 
        marginBottom: 100,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    noResultsBox: {
        flex: 1,
        backgroundColor: '#fff0cc', // Amarillo claro/crema (similar a la imagen)
        minHeight: 300, // Altura mínima similar a la imagen
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderWidth: 1,
        borderColor: '#ffcc00',
    },
    noResultsText: {
        fontSize: 18,
        color: '#666',
    },
    // --- Tarjeta de Receta (Reutilizada del Dashboard) ---
    recipeCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 15,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    recipeImage: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        marginRight: 10,
    },
    recipeDetails: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    recipeName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    recipeInfo: {
        fontSize: 12,
        color: '#666',
    },
    // --- Botón Regresar ---
    backButton: {
        position: 'absolute',
        bottom: 20,
        left: 15,
        right: 15,
        height: 50,
        backgroundColor: '#0047AB', // Azul oscuro
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',

    },
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});