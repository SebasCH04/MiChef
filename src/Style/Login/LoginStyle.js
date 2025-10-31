import { StyleSheet } from 'react-native';

// Definición de colores


export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 40,
  },

  // Estilos del encabezado
  header: {
    backgroundColor: '#F77F00',
    paddingVertical: 16,

    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  // Título "Inicio de Sesión"
  title: {
    marginTop: 150,
    fontSize: 22,
    fontWeight: '600',
    color: '#0d47a1',
    marginLeft: 20,
    marginBottom: 20,
  },

  // Contenedor del formulario (caja amarilla clara)
  formContainer: {
    backgroundColor: '#fffbe6', // Amarillo más claro para el fondo del formulario
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffeb3b',
  },

  // Etiquetas de los campos
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
    marginTop: 10,
  },

  // Campos de texto (inputs)
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 15,
  },

  // Errores de validación
  inputError: {
    borderColor: '#ff5252',
  },
  errorText: {
    color: '#ff5252',
    marginTop: -10,
    marginBottom: 10,
    fontSize: 12,
  },

  // Enlace de "¿No recuerda su contraseña?"
  forgotPasswordContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 13,
    margin: 0,
    padding: 0,
    marginRight: 0,
    paddingRight: 0,
    color: '#333333',
  },
  forgotPasswordLink: {
    fontSize: 13,
    color: '#0d47a1',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginLeft: 0,
    paddingLeft: 0,
  },

  // Botón "Iniciar"
  button: {
    backgroundColor: '#0047AB',
    padding: 12,
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 2,
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 90,
    marginRight: 90,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Enlace de Registro
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 20,
  },
  registerText: {
    fontSize: 16,
    color: '#333333',
    marginRight: 0,
    paddingRight: 0,
  },
  registerLink: {
    fontSize: 16,
    color: '#0d47a1',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginLeft: 0,
    paddingLeft: 0,
  },
});