import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  AccessibilityInfo
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { styles } from '../../Style/Home/RecipeManagerStyle.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../../Services/url.js'; 


const RecipeManagerScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  

  const API_URL = `${URL}:3000/home/searchRecipes`;
  const FAVORITE_URL = `${URL}:3000/home/toggleFavorite`;


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
  const fetchRecipes = async (term = '') => {
    try {
      setLoading(true);
      const qs = term !== undefined && term !== null ? `&searchTerm=${encodeURIComponent(term)}` : '';
      const response = await fetch(`${API_URL}?usuario_id=${usuario_id}${qs}`);
      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        let formatted = data.data.map(item => ({
          id: item.id,
          name: item.name,
          time: item.time,
          diet: item.diet,
          difficulty: item.difficulty,
          image: item.image ? { uri: item.image } : null,
          isFavorite: item.isFavorite === true || item.isFavorite === 'true',
        }));
        // Intento de orden más nuevo a más viejo por id si aplica
        formatted.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
        setFilteredRecipes(formatted);
        setCurrentPage(1);
        AccessibilityInfo.announceForAccessibility(`Se cargaron ${formatted.length} recetas.`);
      } else {
        setFilteredRecipes([]);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error('Error al obtener recetas:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setHasSearched(true);
    const term = searchTerm.trim();
    if (!term) {
      // Si no hay término, cargar todas
      await fetchRecipes('');
      return;
    }
    await fetchRecipes(term);
  };

  // Cargar todas las recetas al iniciar (cuando tenemos usuario)
  useEffect(() => {
    if (usuario_id) {
      fetchRecipes('');
    }
  }, [usuario_id]);

  // Paginación derivada
  const totalItems = filteredRecipes.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIdx = (safePage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const visibleRecipes = filteredRecipes.slice(startIdx, endIdx);

  const goPrev = () => setCurrentPage(p => Math.max(1, p - 1));
  const goNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));

  const handleGoBack = () => navigation.goBack();
  const handleProfilePress = () => navigation.navigate('userdata');

  const handleToggleFavorite = async (recipeId) => {
    try {
      
      const response = await fetch(FAVORITE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id, receta_id: recipeId }),
      });
      
      const data = await response.json();

      if (data.success && data.data?.length > 0) {
        const newFavoriteState = data.data[0].isFavorite;

        setFilteredRecipes(prev =>
          prev.map(recipe =>
            recipe.id === recipeId
              ? { ...recipe, isFavorite: newFavoriteState }
              : recipe
          )
        );

        AccessibilityInfo.announceForAccessibility(
          newFavoriteState ? 'Receta añadida a favoritos' : 'Receta eliminada de favoritos'
        );
      } else {
        Alert.alert('Error', data.message || 'No se pudo actualizar el favorito.');
      }
    } catch (error) {
      console.error('Error al alternar favorito:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  const RecipeCard = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Receta ${item.name}`}
      accessibilityHint="Toca dos veces para ver más información de esta receta"
      onPress={() => console.log(`Ver detalles de: ${item.name}`)}
    >
      {item.image ? (
        <Image
          source={item.image}
          style={styles.recipeImage}
          accessibilityLabel={`Imagen de la receta ${item.name}`}
        />
      ) : (
        <View
          style={[styles.recipeImage, { backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }]}
          accessible={true}
          accessibilityLabel="Sin imagen disponible"
        >
          <Text>Sin imagen</Text>
        </View>
      )}

      <View style={styles.recipeDetails} accessible={true}>
        <Text style={styles.recipeName} accessibilityLabel={`Nombre: ${item.name}`}>{item.name}</Text>
        <Text style={styles.recipeInfo} accessibilityLabel={`Tiempo: ${item.time}`}>{item.time}</Text>
        <Text style={styles.recipeInfo} accessibilityLabel={`Dieta: ${item.diet}`}>{item.diet}</Text>
        <Text style={styles.recipeInfo} accessibilityLabel={`Dificultad: ${item.difficulty}`}>{item.difficulty}</Text>
      </View>

      {/* Botón de Favorito */}
      <TouchableOpacity
        style={styles.favoriteIcon}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={
          item.isFavorite
            ? `Eliminar ${item.name} de favoritos`
            : `Agregar ${item.name} a favoritos`
        }
        accessibilityHint="Toca dos veces para alternar favorito"
        onPress={() => handleToggleFavorite(item.id)}
      >
        <MaterialCommunityIcons
          name={item.isFavorite ? "heart" : "heart-outline"}
          size={24}
          marginTop={40}
          marginRight={10}
          color={item.isFavorite ? "red" : "#999"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <>
    <SafeAreaView edges={['top']} style={styles.safeTop} />
    <SafeAreaView edges={['left','right','bottom']} style={styles.safeArea} accessible={false}>
      {/* Header */}
      <View style={styles.header} accessible={true} accessibilityRole="header">
        <Text style={styles.headerTitle} accessibilityLabel="MiChef, Gestor de Recetas">MiChef</Text>
        <TouchableOpacity
          style={styles.profileIconContainer}
          onPress={handleProfilePress}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Ir al perfil del usuario"
          accessibilityHint="Toca dos veces para abrir la pantalla de perfil"
        >
          <MaterialCommunityIcons name="account-circle" size={40} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text
          style={styles.sectionTitle}
          accessibilityRole="header"
          accessibilityLabel="Gestor de Recetas"
        >
          Gestor de Recetas
        </Text>

        {/* Barra de búsqueda */}
        <View style={styles.searchBarContainer} accessible={true}>
          <View style={styles.searchBox}>
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color="#666"
              style={styles.searchIcon}
              accessibilityLabel="Buscar recetas"
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por receta, nombre o dificultad"
              placeholderTextColor="#999"
              value={searchTerm}
              onChangeText={setSearchTerm}
              onSubmitEditing={handleSearch}
              accessible={true}
              accessibilityLabel="Campo de búsqueda de recetas"
              accessibilityHint="Escribe el nombre o dificultad y presiona buscar"
              returnKeyType="search"
            />
          </View>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Botón de buscar recetas"
            accessibilityHint="Toca dos veces para buscar recetas con el texto ingresado"
          >
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        <Text
          style={styles.listTitle}
          accessibilityRole="header"
          accessibilityLabel="Lista de recetas"
        >
          Lista de Recetas
        </Text>

        <View style={styles.recipeListContainer}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#f57c00"
              style={{ marginTop: 20 }}
              accessibilityLabel="Cargando recetas"
            />
          ) : filteredRecipes.length > 0 ? (
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              accessible={true}
              accessibilityLabel="Resultados de búsqueda de recetas"
            >
              {visibleRecipes.map((item) => (
                <RecipeCard key={item.id} item={item} />
              ))}
              <View style={{ height: 20 }} /> 
              {/* Controles de paginación */}
              <View style={styles.paginationContainer} accessible accessibilityRole="adjustable" accessibilityLabel={`Página ${safePage} de ${totalPages}`}>
                <TouchableOpacity
                  style={[styles.paginationButton, safePage === 1 && styles.paginationButtonDisabled]}
                  onPress={goPrev}
                  disabled={safePage === 1}
                  accessibilityRole="button"
                  accessibilityLabel="Página anterior"
                >
                  <Text style={styles.paginationButtonText}>Anterior</Text>
                </TouchableOpacity>
                <Text style={styles.paginationInfo} accessibilityElementsHidden>
                  Página {safePage} de {totalPages}
                </Text>
                <TouchableOpacity
                  style={[styles.paginationButton, safePage === totalPages && styles.paginationButtonDisabled]}
                  onPress={goNext}
                  disabled={safePage === totalPages}
                  accessibilityRole="button"
                  accessibilityLabel="Página siguiente"
                >
                  <Text style={styles.paginationButtonText}>Siguiente</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          ) : hasSearched ? (
            <Text
              style={styles.noResultsText}
              accessible={true}
              accessibilityLabel="Sin resultados"
            >
              Sin resultados...
            </Text>
          ) : (
            <View />
          )}
        </View>
      </View>

      {/* Botón Regresar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleGoBack}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Regresar a la pantalla anterior"
        accessibilityHint="Toca dos veces para volver al menú principal"
      >
        <Text style={styles.backButtonText}>Regresar</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </>
  );
};

export default RecipeManagerScreen;
