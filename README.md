# Gestión Académica TEC

## Descripción

App en android para el proyecto de diseño

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
   git clone https://github.com/Jeshon04CRC/GestionAcademica.git
   cd GestionAcademica
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
   npm start
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

### Chat de IA con LM Studio (local y gratis)

1. Instala LM Studio (Windows): https://lmstudio.ai/
2. En LM Studio, descarga el modelo "openai/gpt-oss-20b" (o uno más ligero si tu PC lo requiere).
3. Activa el "Local Server" (OpenAI Compatible Server). Por defecto expone http://localhost:1234/v1
4. En `.env` configura:
   ```env
   AI_PROVIDER=lmstudio
   LOCAL_OPENAI_BASE_URL=http://localhost:1234/v1
   LOCAL_MODEL=openai/gpt-oss-20b
   # Opcional para pruebas sin IA real:
   # AI_FAKE=1
   ```
5. Inicia el backend con `npm run dev` y la app móvil con `npm start`.
6. La app llama a `POST /ai/chat`; el backend reenvía a LM Studio y retorna la respuesta en español.

   Notas:
   - Los modelos grandes (20B) necesitan bastante RAM/VRAM/CPU. Si notas lentitud, prueba con un modelo más pequeño en LM Studio.
   - Si el servidor local no responde, el backend mostrará un error claro en español pidiéndote iniciar el Local Server.


## Características

### Módulo Estudiantes
- **Registro académico completo**: Los estudiantes pueden crear y mantener un perfil detallado que incluye información personal, carrera, nivel académico, promedio ponderado y documentos relevantes como certificados y transcripciones.
- **Búsqueda avanzada de oportunidades**: Sistema de filtros múltiples que permite buscar tutorías y proyectos por carrera, profesor asignado, palabras clave, horarios disponibles y requisitos de promedio mínimo.
- **Sistema de postulaciones**: Proceso simplificado para aplicar a ofertas académicas con carga directa de documentos requeridos y seguimiento en tiempo real del estado de cada solicitud.
- **Seguimiento de actividades y horas**: Monitoreo detallado del progreso en tutorías y proyectos, registro de horas trabajadas, evaluaciones recibidas y descarga automática de certificados de participación.

### Módulo Profesores
- **Gestión de perfil institucional**: Administración completa del perfil académico incluyendo datos personales, materias impartidas, especialidades, historial de tutorías y registro institucional actualizado.
- **Publicación de ofertas académicas**: Creación detallada de tutorías y proyectos de investigación con formularios completos, especificación de requisitos, fechas límite, horarios y beneficios ofrecidos a los estudiantes.
- **Revisión integral de postulaciones**: Sistema organizado para evaluar solicitudes con filtros personalizables, revisión de documentos adjuntos, programación de entrevistas y gestión de acciones con comentarios detallados.
- **Seguimiento personalizado de estudiantes**: Herramientas para registrar asistencia, asignar y evaluar tareas, monitorear desempeño académico, asignar calificaciones y proporcionar retroalimentación cualitativa continua.

### Módulo Escuelas y Departamentos
- **Gestión de perfil institucional**: Registro y actualización del perfil departamental con información sobre facultad, datos de contacto, programas académicos ofrecidos y áreas de especialización.
- **Configuración de políticas internas**: Establecimiento de criterios institucionales como promedio mínimo requerido, cursos prerequisito, límites de horas de trabajo y otros requisitos específicos del departamento.
- **Gestión de beneficios económicos**: Administración completa de exoneraciones, becas y pagos a estudiantes asistentes, con generación de reportes detallados por estudiante y semestre académico.
- **Sistema de reportes y estadísticas**: Generación automática de informes sobre participación estudiantil, desempeño académico, distribución de recursos y métricas de aprovechamiento de programas.

### Módulo Administradores
- **Gestión completa de usuarios y roles**: Herramientas administrativas para crear, editar y eliminar cuentas de usuario, asignar roles específicos y gestionar permisos de acceso según el tipo de usuario.
- **Moderación y supervisión de contenido**: Validación, edición o eliminación de publicaciones inapropiadas, supervisión general de la plataforma y mantenimiento de estándares de calidad del contenido.
- **Panel estadístico centralizado**: Dashboard integral con métricas de uso de la plataforma, estadísticas de participación, reportes de actividad y análisis de tendencias para toma de decisiones.
- **Configuración avanzada del sistema**: Administración de parámetros globales, configuración de notificaciones, gestión de respaldos y mantenimiento técnico de la plataforma.

### Características Técnicas Avanzadas
- **Autenticación institucional robusta**: Sistema de inicio de sesión basado en correos electrónicos institucionales con validación automática de roles según el dominio del usuario.
- **Interfaz móvil responsiva**: Diseño optimizado para dispositivos móviles con navegación intuitiva, adaptación automática a diferentes tamaños de pantalla y experiencia de usuario fluida.
- **Sincronización en tiempo real**: Integración con Firebase para actualizaciones instantáneas de datos, notificaciones push y sincronización automática entre dispositivos.
- **Generación automática de documentos**: Sistema integrado para crear reportes en formato PDF, certificados de participación, transcripciones de actividades y documentos oficiales.
- **Sistema de notificaciones inteligente**: Envío automático de correos electrónicos para actualizaciones importantes, recordatorios de fechas límite y comunicaciones relevantes según el rol del usuario.

## Arquitectura

```
src/
├── Controllers/     # Lógica de negocio del backend
├── Routers/        # Rutas de la API REST
├── Screens/        # Pantallas de la aplicación móvil
├── Services/       # Servicios (Firebase, Email, etc.)
└── Style/          # Estilos por módulo
```

## Tipos de Usuario

El sistema identifica automáticamente el rol del usuario basado en el dominio del correo institucional:

| Rol | Dominio | Ejemplo |
|-----|---------|---------|
| **Estudiantes** | `@estudiantec.cr` | `juan.perez@estudiantec.cr` |
| **Profesores** | `@itcr.ac.cr` | `maria.ruiz@itcr.ac.cr` |
| **Escuelas** | `@tec.ac.cr` | `electro@tec.ac.cr` |
| **Administradores** | `@tec.ac.cr` | `admin@tec.ac.cr` |

---

**Desarrollado para el Instituto Tecnológico de Costa Rica (TEC)**

