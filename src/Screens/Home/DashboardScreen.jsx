import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Asegúrate de que esta ruta sea correcta para tus estilos
import { styles } from '../../Style/Home/DashboardStyle.js'; 

// Iconos (necesitarás instalarlos si no los tienes)
// Por ejemplo, usando @expo/vector-icons
// npm install @expo/vector-icons
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const DashboardScreen = ({ navigation }) => {
  // Datos de ejemplo para las tarjetas de recomendaciones
  const recommendations = [
    {
      id: '1',
      name: 'Gallo Pinto',
      time: '20-30 minutos',
      diet: 'Sin dieta',
      difficulty: 'Nivel de dificultad: bajo',
      image: require('../../../assets/GalloPinto.jpg'),
      isFavorite: true,
    },
    {
      id: '2',
      name: 'Pasta al pesto',
      time: '25-30 min',
      diet: 'Dieta vegetariana',
      difficulty: 'Nivel de dificultad: medio',
      image: require('../../../assets/Pesto.jpg'),
      isFavorite: false,
    },
    // Puedes añadir más recetas aquí
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MiChef</Text>
          <TouchableOpacity style={styles.profileIconContainer} onPress={() => console.log('Perfil presionado')}>
            <MaterialCommunityIcons name="account-circle" size={40} color="white" />
          </TouchableOpacity>
        </View>

        {/* Sección de Recomendaciones */}
        <Text style={styles.sectionTitle}>Recomendaciones para ti</Text>

        {/* Filtros */}
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterIcon}>
            <MaterialCommunityIcons name="tune-vertical" size={24} color="#666" />
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterButtonsScrollView}>
            <TouchableOpacity style={styles.filterButton} onPress={() => console.log('Mi Dieta')}>
              <Text style={styles.filterButtonText}>Mi Dieta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton} onPress={() => console.log('Mi Nivel')}>
              <Text style={styles.filterButtonText}>Mi Nivel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterButton, styles.activeFilterButton]} onPress={() => console.log('Favoritos')}>
              <Text style={[styles.filterButtonText, styles.activeFilterButtonText]}>Favoritos</Text>
            </TouchableOpacity>
            {/* Agrega más botones de filtro aquí si los necesitas */}
          </ScrollView>
        </View>

        {/* Lista de Recetas Recomendadas */}
        <ScrollView style={styles.recommendationsList} contentContainerStyle={styles.recommendationsListContent}>
          {recommendations.map((item) => (
            <View key={item.id} style={styles.recipeCard}>
              <Image source={{ uri: item.image }} style={styles.recipeImage} />
              <View style={styles.recipeDetails}>
                <Text style={styles.recipeName}>{item.name}</Text>
                <Text style={styles.recipeInfo}>{item.time}</Text>
                <Text style={styles.recipeInfo}>{item.diet}</Text>
                <Text style={styles.recipeInfo}>{item.difficulty}</Text>
              </View>
              <TouchableOpacity style={styles.favoriteIcon}>
                <MaterialCommunityIcons 
                  name={item.isFavorite ? "heart" : "heart-outline"} 
                  size={24} 
                  color={item.isFavorite ? "red" : "#999"} 
                />
              </TouchableOpacity>
            </View>
          ))}
          {/* Espacio extra al final del ScrollView para que no se vea cortado por los botones inferiores */}
          <View style={{ height: 120 }} /> 
        </ScrollView>

        {/* Botones Flotantes Inferiores */}
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity style={styles.bottomCard} onPress={() => console.log('Gestor de Recetas')}>
            <Image source={require('../../../assets/GestorImage.png')} style={styles.bottomCardIcon} /> {/* Cambia la ruta */}
            <Text style={styles.bottomCardText}>Gestor de Recetas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomCard} onPress={() => console.log('Asistente Culinario')}>
            <Image source={require('../../../assets/IAImage.png')} style={styles.bottomCardIcon} /> {/* Cambia la ruta */}
            <Text style={styles.bottomCardText}>Asistente Culinario</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;