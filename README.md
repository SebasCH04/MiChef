# MiChef

## Descripción

App en Android/iOS para el proyecto de diseño

## Contenido

- [Instalación](#instalación)
- [Uso](#uso)
- [Características](#características)
- [Arquitectura](#arquitectura)
- [Tipos de Usuario](#tipos-de-usuario)

## Instalación

### Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) instalado en tu dispositivo móvil

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/SebasCH04/MiChef.git
   cd MiChef
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar la URL del servidor:**
   - Abrir el archivo `src/Services/url.js`
   - Reemplazar con tu dirección IP local:
   ```javascript
   const URL = "http://192.168.X.X:3000";
   export default URL;
   ```

4. **Obtener tu IP local (Windows):**
   ```powershell
   ipconfig
   ```
   Copiar la dirección IPv4 mostrada.

## Uso

### Modo Desarrollo con Expo

1. **Iniciar el servidor backend:**
   ```bash
   npm run dev
   ```

2. **En una nueva terminal, iniciar la aplicación:**
   ```bash
   npx expo start
   ```

3. **Conectar dispositivo móvil:**
   - Escanear el código QR con la app Expo Go
   - Asegurarse de estar en la misma red Wi-Fi

### Modo Producción (.apk)

1. **Generar APK:**
   ```bash
   eas build --platform android
   ```

2. **Instalar en dispositivo Android:**
   - Habilitar "Fuentes desconocidas" en Configuración > Seguridad
   - Instalar el archivo .apk generado

### Scripts Disponibles

```bash
npm start          # Iniciar con Expo
npm run android    # Abrir en emulador Android
npm run ios        # Abrir en emulador iOS
npm run web        # Ejecutar en navegador web
npm run dev        # Iniciar servidor backend
```

## Arquitectura

```
src/
├── Controllers/    # Lógica de negocio del backend
├── Routers/        # Rutas de la API REST
├── Screens/        # Pantallas de la aplicación móvil
├── Services/       # Servicios (Azure, Email, etc.)
└── Style/          # Estilos por módulo
```

---

**Desarrollado para el Instituto Tecnológico de Costa Rica (TEC)**

