import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Fondo blanco para toda la pantalla
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Header
  header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#FF8C00', // Naranja Fuerte
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  logoutButton: {
    padding: 8,
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconContainer: {
    // Si necesitas algún estilo adicional para el contenedor del icono de perfil
  },

  // Sección de Recomendaciones
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 15,
  },

  // Filtros
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 20,
  },
  filterIcon: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E0E0E0', // Gris claro
    marginRight: 10,
  },
  filterButtonsScrollView: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20, // Bordes más redondeados
    backgroundColor: '#0047AB', // Azul base (mismo color que el activo)
    marginRight: 10,
    opacity: 0.4, // Aplicamos 40% de opacidad a los no activos por defecto
  },
  filterButtonText: {
    color: 'white', // Texto blanco para todos los botones (se verá tenue por la opacidad)
    fontWeight: '500',
  },
  activeFilterButton: {
    backgroundColor: '#0047AB', // Mismo color base
    opacity: 1.0, // Opacidad total (100%)
    borderColor: 'black',
    borderWidth: 2,
  },
  activeFilterButtonText: {
    color: 'white', 
    fontWeight: 'bold',
  },

  // Lista de Recetas
  recommendationsList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  recommendationsListContent: {
    paddingBottom: 20, // Espacio al final de la lista
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8', // Gris muy claro
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000', // Sombra para efecto 3D
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra para Android
    borderWidth: 1, // Borde fino
    borderColor: '#eee',
  },
  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  recipeDetails: {
    flex: 1,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  recipeInfo: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  favoriteIcon: {
    padding: 5,
  },

  // Botones Flotantes Inferiores
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: 20, // Ajusta según el espacio deseado desde el borde inferior
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    // Sombra para que se vean flotantes
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  bottomCard: {
    backgroundColor: 'rgba(13, 71, 161, 0.4)', // Azul claro
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: '45%', // Para que ocupen casi la mitad cada uno
    alignItems: 'center',
    justifyContent: 'center',
    height: 100, // Altura fija

  },
  bottomCardIcon: {
    width: 40, // Tamaño de los iconos
    height: 40,
    marginBottom: 8,
  },
  bottomCardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});
