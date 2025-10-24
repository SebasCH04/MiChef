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
    backgroundColor: '#FF8C00', // Naranja
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 10 : 15, // Ajuste para iOS (notch)
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 65, // Altura fija
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
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
    backgroundColor: '#E0E0E0', // Gris claro
    marginRight: 10,
  },
  filterButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  activeFilterButton: {
    backgroundColor: '#2196F3', // Azul para el activo (o el que uses)
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
    backgroundColor: '#B0D3F5', // Azul claro
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