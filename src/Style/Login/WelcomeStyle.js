import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    safeTop: {
        backgroundColor: '#FF8C00',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        backgroundColor: '#FF8C00', // Naranja
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: 65,
        alignItems: 'flex-start',
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    content: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    welcomeTitle: {
        fontSize: 52,
        fontWeight: 'bold',
        color: '#0047AB',
        textAlign: 'center',
        marginBottom: 10,
    },
    welcomeSubtitle: {
        fontSize: 18,
        color: '#666666',
        textAlign: 'center',
        marginBottom: 30,
    },
    imagePlaceholder: {
        width: '100%',
        height: 250,
        marginBottom: 40,
        borderRadius: 20,
        overflow: 'hidden',
    },
    chefImage: {
        width: '100%',
        height: '100%',
    },
    button: {
        backgroundColor: '#0047AB', // Naranja
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 2,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});