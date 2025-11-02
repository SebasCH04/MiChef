import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  // Safe area general (resto de la pantalla): blanco
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  // Solo la franja superior (notch / status bar): naranja
  safeTop: {
    backgroundColor: '#FF8C00',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5', // Gris claro de fondo
    paddingBottom: 0,
  },
  // Contenedor de pantalla estática para que solo el formulario se desplace
  screenContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  // Estilos del encabezado
  header: {
    backgroundColor: '#FF8C00', // Naranja
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 65,
    marginBottom: 0,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff', // Blanco
  },

  // Título "Registrarse"
  title: {
    marginTop: 25,
    fontSize: 22,
    fontWeight: '600',
    color: '#0d47a1', // Azul oscuro
    marginLeft: 20,
    marginBottom: 20,
  },

  // Contenedor del formulario (caja amarilla clara)
  formContainer: {
    backgroundColor: '#fffbe6', // Amarillo muy claro para el fondo del formulario
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffeb3b', // Amarillo de borde
  },

  // Etiquetas de los campos
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000', // Negro
    marginBottom: 5,
    marginTop: 15,
  },

  // Campos de texto (inputs)
  input: {
    backgroundColor: '#ffffff', // Blanco
    borderWidth: 1,
    borderColor: '#cccccc', // Gris de borde
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },

  // Input con error
  inputError: {
    borderColor: '#d32f2f', // Rojo para indicar error
    borderWidth: 2,
  },

  // Texto de error
  errorText: {
    color: '#d32f2f', // Rojo
    fontSize: 12,
    marginTop: 4,
    marginBottom: 5,
    fontStyle: 'italic',
  },

  // Contenedor del Picker (para darle un borde y fondo)
  pickerContainer: {
    backgroundColor: '#ffffff', // Blanco
    borderWidth: 1,
    borderColor: '#cccccc', // Gris de borde
    borderRadius: 5,
    overflow: 'hidden', // Asegura que el contenido se ajuste al borde
    marginBottom: 15,
  },

  // Estilos específicos para el componente Picker
  picker: {
    height: 50, // Altura estándar
    width: '100%',
    color: '#000000',
  },
  // Estilo para los ítems del picker (puede variar entre plataformas)
  pickerItem: {
    fontSize: 16,
    height: Platform.OS === 'ios' ? 150 : undefined, // Altura para iOS
  },

  // Contenedor de Botones (para alinear los dos botones horizontalmente)
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },

  // Botón de Registrarse
  registerButton: {
    flex: 1,
    backgroundColor: '#0047AB', // Azul
    padding: 12,
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 2,
    alignItems: 'center',
    marginRight: 10, // Espacio entre botones
  },

  // Botón de Cancelar
  cancelButton: {
    flex: 1,
    backgroundColor: '#0047AB', // Azul (igual que el otro botón según la imagen)
    padding: 12,
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 2,
    alignItems: 'center',
    marginLeft: 10, // Espacio entre botones
  },

  buttonText: {
    color: '#ffffff', // Blanco
    fontSize: 18,
    fontWeight: 'bold',
  },
});