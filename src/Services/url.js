import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Obtener la URL del servidor backend
const getServerURL = () => {
    // En web, siempre usa localhost
    if (Platform.OS === 'web') {
        return 'http://localhost';
    }
    
    // En móvil, intenta obtener el host desde Expo
    // Esto funciona cuando usas: npx expo start --tunnel
    const expoHost = Constants.expoConfig?.hostUri;
    
    if (expoHost) {
        // Extraer solo el host (sin el puerto de Expo)
        const host = expoHost.split(':')[0];
        console.log('Usando host de Expo:', host);
        return `http://${host}`;
    }
    
    // Fallback: usar IP local (solo funciona en la misma WiFi)
    console.log('No se detectó Expo Tunnel, usando IP local');
    return 'http://172.28.205.194';
};

const URL = getServerURL();

console.log('Plataforma:', Platform.OS);
console.log('URL del servidor:', URL);

export default URL;