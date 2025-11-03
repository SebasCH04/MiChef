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
    display: 'none', // oculto: ya no usamos el picker nativo
  },

  // Campo dropdown personalizado
  dropdownField: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  dropdownArrow: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },

  // Modal estilos
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
  modalCancel: {
    marginTop: 10,
    backgroundColor: '#0047AB',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalCancelText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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