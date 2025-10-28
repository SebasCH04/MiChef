import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image, 

} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Estilos
import { styles } from '../../Style/Home/DashboardStyle.js'; 

// Iconos
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import GestorImage from '../../../assets/GestorImage.png';
import IAImage from '../../../assets/IAImage.png';


const initialRecommendations = [
    {
        id: '1',
        name: 'Gallo Pinto',
        time: '20-30 minutos',
        diet: 'Sin dieta',
        difficulty: 'Nivel de dificultad: bajo', // Coincide con Nivel
        image: require('../../../assets/GalloPinto.jpg'),
        isFavorite: true, // Coincide con Favoritos
    },
    {
        id: '2',
        name: 'Pasta al pesto',
        time: '25-30 min',
        diet: 'Dieta Vegetariana', // Coincide con Dieta
        difficulty: 'Nivel de dificultad: medio',
        image: require('../../../assets/Pesto.jpg'),
        isFavorite: true,
    }
];

const MY_DIET = 'Dieta Vegetariana';
const MY_LEVEL = 'Nivel de dificultad: bajo';


const DashboardScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('Favoritos');

  const [recommendations, setRecommendations] = useState(initialRecommendations);

  const handleFilterPress = (filterName) => {
    setActiveFilter(filterName);
    console.log(`Filtro seleccionado: ${filterName}`);
  };

  const handleToggleFavorite = (recipeId) => {
    setRecommendations(prevRecommendations => {
      return prevRecommendations.map(recipe => {
        if (recipe.id === recipeId) {
          return {
            ...recipe,
            isFavorite: !recipe.isFavorite, 
          };
        }
        return recipe;
      });
    });
  };

  const getFilteredRecommendations = () => {
    switch (activeFilter) {
      case 'MiDieta':
        return recommendations.filter(recipe => recipe.diet === MY_DIET);

      case 'MiNivel':
        return recommendations.filter(recipe => recipe.difficulty === MY_LEVEL);

      case 'Favoritos':
      default:
        return recommendations.filter(recipe => recipe.isFavorite);
    }
  };
  const filteredRecommendations = getFilteredRecommendations();
  
  const renderFilterButton = (filterName, label) => {
    const isActive = activeFilter === filterName;
    
    return (
      <TouchableOpacity 
        key={filterName}
        style={[
          styles.filterButton, 
          isActive && styles.activeFilterButton 
        ]} 
        onPress={() => handleFilterPress(filterName)}
        accessibilityState={{ selected: isActive }}
        accessibilityLabel={`Filtro ${label}`}
        accessible={true}
      >
        <Text 
          style={[
            styles.filterButtonText, 
            isActive && styles.activeFilterButtonText
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleProfilePress = () => {
    navigation.navigate('userdata');
  };
  // -----------------------------

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */} 
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MiChef</Text>
          <TouchableOpacity 
            style={styles.profileIconContainer} 
            onPress={() => handleProfilePress()}
            accessibilityRole="button"
            accessibilityLabel="Abrir perfil del usuario"
            accessible={true}
          >
            <MaterialCommunityIcons name="account-circle" size={40} color="white" />
          </TouchableOpacity>
        </View>

        {/* Sección de Recomendaciones */}
        <Text style={styles.sectionTitle} accessibilityRole="header" accessible={true}>
          Recomendaciones para ti
        </Text>

        {/* Filtros */}
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={styles.filterIcon}
            accessibilityRole="button"
            accessibilityLabel="Opciones de filtrado avanzado"
            accessible={true}
          >
            <MaterialCommunityIcons name="tune-vertical" size={24} color="#666" />
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterButtonsScrollView}>
            {renderFilterButton('MiDieta', 'Mi Dieta')}
            {renderFilterButton('MiNivel', 'Mi Nivel')}
            {renderFilterButton('Favoritos', 'Favoritos')}
          </ScrollView>
        </View>

        {/* Lista de Recetas Recomendadas (FILTRADA) */}
        <ScrollView style={styles.recommendationsList} contentContainerStyle={styles.recommendationsListContent}>
          
          {filteredRecommendations.map((item) => (
            // Contenedor principal de la tarjeta de receta
            <TouchableOpacity 
              key={item.id} 
              style={styles.recipeCard}
              onPress={() => console.log(`Ver receta: ${item.name}`)}
              accessibilityRole="button"
              accessibilityLabel={`Receta: ${item.name}. Tocar para ver detalles.`}
              accessible={true}
            >
              {item.image ? (
                <Image 
                  source={item.image} 
                  style={styles.recipeImage} 
                  accessibilityLabel={`Imagen de la receta: ${item.name}`}
                  accessible={true}
                />
              ) : (
                <View style={[styles.recipeImage, { backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }]}>
                  <Text>No image</Text>
                </View>
              )}
              
              <View style={styles.recipeDetails}>
                <Text style={styles.recipeName}>{item.name}</Text>
                <Text style={styles.recipeInfo}>{item.time}</Text>
                <Text style={styles.recipeInfo}>{item.diet}</Text>
                <Text style={styles.recipeInfo}>{item.difficulty}</Text>
              </View>
              
              {/* BOTÓN DE FAVORITOS (CORAZÓN) CON LA FUNCIÓN */}
              <TouchableOpacity 
                style={styles.favoriteIcon}
                onPress={() => handleToggleFavorite(item.id)}
                // Evita que el toque del corazón también active el toque de la tarjeta completa
                onStartShouldSetResponder={() => true} 
                accessibilityRole="button"
                accessibilityLabel={item.isFavorite ? `Quitar ${item.name} de favoritos` : `Añadir ${item.name} a favoritos`}
                accessible={true}
              >
                <MaterialCommunityIcons
                  name={item.isFavorite ? "heart" : "heart-outline"} // Icono condicional
                  size={24}
                  color={item.isFavorite ? "red" : "#999"} // Color condicional
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
          
          {/* Mensaje si el filtro no devuelve resultados */}
          {filteredRecommendations.length === 0 && (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                No se encontraron recetas que coincidan con el filtro activo.
              </Text>
            </View>
          )}

          {/* Espacio extra al final del ScrollView */}
          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Botones Flotantes Inferiores */}
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity 
            style={styles.bottomCard} 
            onPress={() => console.log('Gestor de Recetas')}
            accessibilityRole="button"
            accessibilityLabel="Abrir Gestor de Recetas"
            accessible={true}
          >
            <Image 
              source={GestorImage} 
              style={styles.bottomCardIcon} 
              accessibilityRole="image"
              accessibilityLabel=""
            />
            <Text style={styles.bottomCardText}>Gestor de Recetas</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.bottomCard} 
            onPress={() => console.log('Asistente Culinario')}
            accessibilityRole="button"
            accessibilityLabel="Abrir Asistente Culinario con Inteligencia Artificial"
            accessible={true}
          >
            <Image 
              source={IAImage} 
              style={styles.bottomCardIcon} 
              accessibilityRole="image"
              accessibilityLabel=""
            />
            <Text style={styles.bottomCardText}>Asistente Culinario</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
