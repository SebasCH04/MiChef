// CardStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF', // Blanco para el fondo de cada tarjeta
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    paddingRight: 10,
  },
  cardImage: {
    width: 120, // Ancho fijo para la imagen de la tarjeta
    height: 120, // Altura fija
  },
  cardContent: {
    flex: 1,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 120,
    paddingVertical: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 3,
  },
  cardDetail: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 18,
  },
  favoriteIcon: {
    fontSize: 20,
    color: '#FF0000', // Rojo
    padding: 5,
  },
});

