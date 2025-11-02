import { Platform, NativeModules } from 'react-native';
import Constants from 'expo-constants';

// Obtener la URL del servidor backend
const getServerURL = () => {
    // En web, siempre usa localhost
    if (Platform.OS === 'web') {
        return 'http://localhost';
    }
    
    // En móvil, intenta obtener el host del dev server (funciona con Tunnel y LAN)
    const expoHost = Constants.expoConfig?.hostUri
        || Constants.expoGoConfig?.hostUri
        || Constants.expoGoConfig?.debuggerHost; // ej: 192.168.1.5:8081

    if (expoHost) {
        const hostOnly = String(expoHost).split('/')[0].split(':')[0];
        if (hostOnly) {
            console.log('Usando host de Expo:', hostOnly);
            return `http://${hostOnly}`;
        }
    }

    // Fallback adicional: usar scriptURL de RN (LAN)
    const scriptURL = NativeModules?.SourceCode?.scriptURL; // ej: http://192.168.1.5:8081/index.bundle?...
    if (scriptURL) {
        try {
            const hostPart = String(scriptURL).split('://')[1].split('/')[0]; // 192.168.1.5:8081
            const hostOnly = hostPart.split(':')[0];
            if (hostOnly) {
                console.log('Usando host de SourceCode.scriptURL:', hostOnly);
                return `http://${hostOnly}`;
            }
        } catch {}
    }
    
    // Fallback: usar IP local (solo funciona en la misma WiFi)
    console.log('No se detectó host automáticamente, usando localhost');
    return 'http://localhost';
};

const URL = getServerURL();

console.log('Plataforma:', Platform.OS);
console.log('URL del servidor:', URL);

export default URL;