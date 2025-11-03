import React, { useState, useEffect, useCallback } from 'react';
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
import { useFocusEffect } from '@react-navigation/native';
import { a11yEs } from '../../Services/a11y';

const API_URL = `${URL}:3000/home`;



const DashboardScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('Favoritos');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try{
        const storedUser = await AsyncStorage.getItem('michef_user');
        if(storedUser){
          const parsedUser = JSON.parse(storedUser);
          setUserData(parsedUser);
        }
      } catch(err){
        console.log("Error cargando usuario:", err);
      }
    }
    loadUser();
  }, []);


  
  const usuario_id = userData?.id;
  const fetchRecommendations = async () => {
    
    try {
      if(!userData) return;

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

  // Volver a cargar cuando cambia el filtro
  useEffect(() => {
    fetchRecommendations();
  }, [activeFilter]);

  // Cargar cuando el usuario esté listo (primer render tras login)
  useEffect(() => {
    if (usuario_id) {
      fetchRecommendations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario_id]);

  // Recargar al volver al enfoque del Dashboard (navegación de regreso)
  useFocusEffect(
    useCallback(() => {
      if (usuario_id) {
        fetchRecommendations();
      }
    }, [usuario_id, activeFilter])
  );

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
    const MY_DIET = userData?.tipo_dieta;
    const MY_LEVEL = userData?.nivel_cocina;
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
    <>
      {/* Franja superior en naranja (solo notch) */}
      <SafeAreaView edges={['top']} style={styles.safeTop} />
      <SafeAreaView
        edges={['left','right','bottom']}
        style={styles.safeArea}
      >
      <View style={styles.container}>
        
        {/* HEADER */}
        <View 
          style={styles.header}
          accessibilityRole="header"
        >
          <Text
            style={styles.headerTitle}
            accessibilityRole="text"
            accessible={true}
            accessibilityLabel="Mi Chef"
            {...a11yEs}
          >
            MiChef
          </Text>
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
              {...a11yEs}
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
              {...a11yEs}
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
          {...a11yEs}
        >
          Recomendaciones para ti
        </Text>

        {/* FILTROS */}
        <View 
          style={styles.filterContainer}
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
                {...a11yEs}
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
          >
            {filteredRecommendations.map((item) => (
              <View
                key={item.id}
                style={styles.recipeCard}
                accessible={false}
              >
                {item.image ? (
                  <Image
                    source={item.image}
                    style={styles.recipeImage}
                    accessible={false}
                    accessibilityElementsHidden={true}
                    importantForAccessibility="no"
                  />
                ) : (
                  <View
                    style={[styles.recipeImage, { backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }]}
                    accessible={false}
                    accessibilityElementsHidden={true}
                    importantForAccessibility="no"
                  >
                    <Text>Sin Imagen</Text>
                  </View>
                )}

                <View 
                  style={styles.recipeDetails}
                  accessible={true}
                  accessibilityLabel={`Receta ${item.name}. Tiempo: ${item.time}. Dieta: ${item.diet}. Dificultad: ${item.difficulty}.`}
                  {...a11yEs}
                >
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
                  accessibilityState={{ selected: item.isFavorite }}
                  accessibilityValue={{ text: item.isFavorite ? 'Marcado como favorito' : 'No favorito' }}
                  {...a11yEs}
                >
                  <MaterialCommunityIcons
                    name={item.isFavorite ? "heart" : "heart-outline"}
                    size={24}
                    color={item.isFavorite ? "red" : "#999"}
                  />
                </TouchableOpacity>
              </View>
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
        >
          <TouchableOpacity
            style={styles.bottomCard}
            onPress={() => navigation.navigate('recipeManager')}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Abrir gestor de recetas"
            accessibilityHint="Te permite buscar y gestionar tus recetas"
            {...a11yEs}
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
            {...a11yEs}
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
    </>
  );
};

export default DashboardScreen;
