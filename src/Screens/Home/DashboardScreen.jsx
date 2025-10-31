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
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      const response = await fetch(`${API_URL}/recommendations?usuario_id=${usuario_id}&filterType=${activeFilter}`);
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

  const handleLogout = async () => {
    console.log('Cerrando sesión...');
    try {
      await AsyncStorage.removeItem('michef_user');
      navigation.reset({ index: 0, routes: [{ name: 'login' }] });
    } catch (error) {
      console.error('=== LOGOUT: Error ===', error);
      Alert.alert('Error', 'No se pudo cerrar sesión correctamente');
    }
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      accessible={true}
      accessibilityLabel="Pantalla principal de MiChef con recomendaciones personalizadas"
    >
      <View style={styles.container}>
        
        {/* HEADER */}
        <View 
          style={styles.header}
          accessible={true}
          accessibilityRole="header"
          accessibilityLabel="Encabezado MiChef"
        >
          <Text style={styles.headerTitle} accessibilityRole="text">MiChef</Text>
          <View style={styles.headerIcons}>
            {/* Primero el perfil */}
            <TouchableOpacity 
              onPress={() => {
                console.log('Profile button pressed!');
                navigation.navigate('userdata');
              }}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Abrir perfil de usuario"
              accessibilityHint="Muestra los datos de tu cuenta"
            >
              <MaterialCommunityIcons name="account-circle" size={40} color="white" />
            </TouchableOpacity>
            {/* Luego el logout, a la derecha */}
            <TouchableOpacity 
              onPress={() => {
                handleLogout();
              }} 
              style={styles.logoutButton}
              accessibilityLabel="Cerrar sesión"
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="logout" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* TÍTULO */}
        <Text
          style={styles.sectionTitle}
          accessible={true}
          accessibilityRole="header"
        >
          Recomendaciones para ti
        </Text>

        {/* FILTROS */}
        <View 
          style={styles.filterContainer}
          accessible={true}
          accessibilityLabel="Filtros de recetas: Mi dieta, Mi nivel, Favoritos"
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterButtonsScrollView}
          >
            {['MiDieta', 'MiNivel', 'Favoritos'].map(f => (
              <TouchableOpacity
                key={f}
                style={[styles.filterButton, activeFilter === f && styles.activeFilterButton]}
                onPress={() => setActiveFilter(f)}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`Filtrar por ${f === 'MiDieta' ? 'Mi dieta' : f === 'MiNivel' ? 'Mi nivel' : 'Favoritos'}`}
                accessibilityHint={`Muestra solo las recetas correspondientes a ${f}`}
              >
                <Text 
                  style={[styles.filterButtonText, activeFilter === f && styles.activeFilterButtonText]}
                  accessibilityRole="text"
                >
                  {f === 'MiDieta' ? 'Mi Dieta' : f === 'MiNivel' ? 'Mi Nivel' : 'Favoritos'}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* CONTENIDO */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#000"
            style={{ marginTop: 40 }}
            accessible={true}
            accessibilityLabel="Cargando recetas"
          />
        ) : (
          <ScrollView
            style={styles.recommendationsList}
            contentContainerStyle={styles.recommendationsListContent}
            accessible={true}
            accessibilityLabel={`Lista de ${filteredRecommendations.length} recetas`}
          >
            {filteredRecommendations.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.recipeCard}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`Receta ${item.name}`}
                accessibilityHint={`Toca dos veces para abrir, para marcar como favorita hay un botón a continuación`}
              >
                {item.image ? (
                  <Image
                    source={item.image}
                    style={styles.recipeImage}
                    accessible={true}
                    accessibilityLabel={`Imagen de ${item.name}`}
                  />
                ) : (
                  <View
                    style={[styles.recipeImage, { backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }]}
                    accessible={true}
                    accessibilityLabel="Imagen no disponible"
                  >
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
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={item.isFavorite 
                    ? `Quitar ${item.name} de favoritos`
                    : `Agregar ${item.name} a favoritos`
                  }
                  accessibilityHint="Activa o desactiva el favorito"
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
              <View
                style={styles.noResultsContainer}
                accessible={true}
                accessibilityLabel="No se encontraron recetas con este filtro"
              >
                <Text style={styles.noResultsText}>No se encontraron recetas con este filtro.</Text>
              </View>
            )}
          </ScrollView>
        )}

        {/* BOTONES INFERIORES */}
        <View
          style={styles.bottomButtonsContainer}
          accessible={true}
          accessibilityLabel="Opciones adicionales"
        >
          <TouchableOpacity
            style={styles.bottomCard}
            onPress={() => navigation.navigate('recipeManager')}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Abrir gestor de recetas"
            accessibilityHint="Te permite buscar y gestionar tus recetas"
          >
            <Image
              source={GestorImage}
              style={styles.bottomCardIcon}
              accessible={false}
            />
            <Text style={styles.bottomCardText}>Gestor de Recetas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomCard}
            onPress={() => navigation.navigate('AICulinary')}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Abrir asistente culinario con inteligencia artificial"
            accessibilityHint="Te ayuda a cocinar o sugerir recetas"
          >
            <Image
              source={IAImage}
              style={styles.bottomCardIcon}
              accessible={false}
            />
            <Text style={styles.bottomCardText}>Asistente Culinario</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
