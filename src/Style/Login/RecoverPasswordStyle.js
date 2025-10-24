import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff', // Fondo blanco, sin el gris claro de las otras pantallas
    paddingBottom: 40,
  },

  // Estilos del encabezado Naranja
  header: {
    backgroundColor: '#ff8c00', // Naranja
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 0, // Se une directamente con el resto del contenido
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff', // Blanco
  },

  // Título "Recuperar mi contraseña"
  title: {
    marginTop: 100, // Espacio para centrar verticalmente, similar a la imagen
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