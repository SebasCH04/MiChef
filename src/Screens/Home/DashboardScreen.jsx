import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  Alert,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { styles } from '../../Style/Home/DashboardStyle.js'; 
import GestorImage from '../../../assets/GestorImage.png';
import IAImage from '../../../assets/IAImage.png';
import URL from '../../Services/url.js';

const API_URL = `${URL}:3000/home`;
const MY_DIET = 'Vegano';
const MY_LEVEL = 'Medio';

const DashboardScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('Favoritos');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

 const usuario_id = 9;


  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/recommendations?usuario_id=${usuario_id}&filterType=${activeFilter}` );
      const data = await response.json();

      if (data.success) {

        const formatted = data.data.map(item => ({
          id: item.id,
          name: item.name,
          time: item.time,
          diet: item.diet,
          difficulty: item.difficulty,
          image: item.image ? { uri: item.image } : null,
          isFavorite: item.isFavorite === true || item.isFavorite === 'true',
        }));
        setRecommendations(formatted);
      } else {
        Alert.alert('Error', data.message || 'No se pudieron obtener las recomendaciones.');
      }
    } catch (error) {
      console.error('Error al obtener recomendaciones:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [activeFilter]);


  const handleToggleFavorite = async (recipeId) => {
    try {
      const response = await fetch(`${API_URL}/toggleFavorite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id, receta_id: recipeId }),
      });
      console.log('Respuesta de toggleFavorite:', response);

      const data = await response.json();

      if (data.success && data.data?.length > 0) {
        const newFavoriteState = data.data[0].isFavorite;

        setRecommendations(prev =>
          prev.map(recipe =>
            recipe.id === recipeId
              ? { ...recipe, isFavorite: newFavoriteState }
              : recipe
          )
        );
      } else {
        Alert.alert('Error', data.message || 'No se pudo actualizar el favorito.');
      }
    } catch (error) {
      console.error('Error al alternar favorito:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };


  const getFilteredRecommendations = () => {
    switch (activeFilter) {
      case 'MiDieta':
        return recommendations.filter(r => r.diet === MY_DIET);
      case 'MiNivel':
        return recommendations.filter(r => r.difficulty === MY_LEVEL);
      case 'Favoritos':
        return recommendations.filter(r => r.isFavorite);
      default:
        return recommendations;
    }
  };

  const filteredRecommendations = getFilteredRecommendations();


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MiChef</Text>
          <TouchableOpacity onPress={() => navigation.navigate('userdata')}>
            <MaterialCommunityIcons name="account-circle" size={40} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Recomendaciones para ti</Text>

        {/* FILTROS */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterButtonsScrollView}>
            {['MiDieta', 'MiNivel', 'Favoritos'].map(f => (
              <TouchableOpacity
                key={f}
                style={[styles.filterButton, activeFilter === f && styles.activeFilterButton]}
                onPress={() => setActiveFilter(f)}
              >
                <Text style={[styles.filterButtonText, activeFilter === f && styles.activeFilterButtonText]}>
                  {f === 'MiDieta' ? 'Mi Dieta' : f === 'MiNivel' ? 'Mi Nivel' : 'Favoritos'}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* CONTENIDO */}
        {loading ? (
          <ActivityIndicator size="large" color="#000" style={{ marginTop: 40 }} />
        ) : (
          <ScrollView style={styles.recommendationsList} contentContainerStyle={styles.recommendationsListContent}>
            {filteredRecommendations.map((item) => (
              <TouchableOpacity key={item.id} style={styles.recipeCard}>
                {item.image ? (
                  <Image source={item.image} style={styles.recipeImage} />
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

                <TouchableOpacity
                  style={styles.favoriteIcon}
                  onPress={() => handleToggleFavorite(item.id)}
                >
                  <MaterialCommunityIcons
                    name={item.isFavorite ? "heart" : "heart-outline"}
                    size={24}
                    color={item.isFavorite ? "red" : "#999"}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}

            {filteredRecommendations.length === 0 && !loading && (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>No se encontraron recetas con este filtro.</Text>
              </View>
            )}
          </ScrollView>
        )}

        {/* BOTONES INFERIORES */}
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity style={styles.bottomCard} onPress={() => navigation.navigate('recipeManager')}>
            <Image source={GestorImage} style={styles.bottomCardIcon} />
            <Text style={styles.bottomCardText}>Gestor de Recetas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomCard} onPress={() => navigation.navigate('AICulinary')}>
            <Image source={IAImage} style={styles.bottomCardIcon} />
            <Text style={styles.bottomCardText}>Asistente Culinario</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
