import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff', // Resto blanco
  },
  safeTop: {
    backgroundColor: '#FF8C00',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff', // Fondo blanco, sin el gris claro de las otras pantallas
    paddingBottom: 40,
  },
  containerStatic: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: 20,
  },

  // Estilos del encabezado Naranja
  header: {
    backgroundColor: '#FF8C00', // Naranja
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 65,
    marginBottom: 0, // Se une directamente con el resto del contenido
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff', // Blanco
  },

  // Título "Recuperar mi contraseña"
  title: {
    marginTop: 150,
    fontSize: 26,
    fontWeight: '700',
    color: '#0d47a1', // Azul oscuro
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  // Campo de texto (Input)
  input: {
    backgroundColor: '#ffffff', // Blanco
    borderWidth: 1,
    borderColor: '#cccccc', // Gris de borde
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginHorizontal: 30,
    marginBottom: 20,
  },

  // Texto de la descripción/instrucciones
  descriptionText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 50, // Espacio antes de los botones
  },

  // Contenedor de Botones (para alinear los dos botones horizontalmente)
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },

  // Botón Confirmar
  confirmButton: {
    backgroundColor: '#0047AB', // Azul más oscuro
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 2,
    alignItems: 'center',
    flex: 1,
    marginRight: 15, // Espacio entre botones
  },

  // Botón Regresar
  backButton: {
    backgroundColor: '#0047AB', // Azul más oscuro
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 2,
    alignItems: 'center',
    flex: 1,
    marginLeft: 15, // Espacio entre botones
  },

  buttonText: {
    color: '#ffffff', // Blanco
    fontSize: 16,
    fontWeight: 'bold',
  },
});