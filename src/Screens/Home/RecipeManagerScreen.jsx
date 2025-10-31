import React, { useState } from 'react';
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
import URL from '../../Services/url.js'; 

const RecipeManagerScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const usuario_id = 9;
  const API_URL = `${URL}:3000/home/searchRecipes`;
  const FAVORITE_URL = `${URL}:3000/home/toggleFavorite`;

  const handleSearch = async () => {
    setHasSearched(true);
    const term = searchTerm.trim();

    if (!term) {
      Alert.alert('Aviso', 'Por favor ingresa un término de búsqueda.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}?usuario_id=${usuario_id}&searchTerm=${encodeURIComponent(term)}`);
      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        const formatted = data.data.map(item => ({
          id: item.id,
          name: item.name,
          time: item.time,
          diet: item.diet,
          difficulty: item.difficulty,
          image: item.image ? { uri: item.image } : null,
          isFavorite: item.isFavorite === true || item.isFavorite === 'true',
        }));
        setFilteredRecipes(formatted);
        AccessibilityInfo.announceForAccessibility(`Se encontraron ${formatted.length} recetas.`);
      } else {
        setFilteredRecipes([]);
        Alert.alert('Sin resultados', data.message || 'No se encontraron recetas.');
        AccessibilityInfo.announceForAccessibility('No se encontraron resultados.');
      }
    } catch (error) {
      console.error('Error al buscar recetas:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      AccessibilityInfo.announceForAccessibility('Error al buscar recetas.');
    } finally {
      setLoading(false);
    }
  };

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
    <SafeAreaView style={styles.safeArea} accessible={false}>
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
          ) : filteredRecipes.length > 0 && hasSearched ? (
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              accessible={true}
              accessibilityLabel="Resultados de búsqueda de recetas"
            >
              {filteredRecipes.map((item) => (
                <RecipeCard key={item.id} item={item} />
              ))}
              <View style={{ height: 20 }} /> 
            </ScrollView>
          ) : hasSearched ? (
            <View
              style={styles.noResultsBox}
              accessible={true}
              accessibilityLabel="Sin resultados"
            >
              <Text style={styles.noResultsText}>Sin resultados...</Text>
            </View>
          ) : (
            <View
              style={styles.noResultsBox}
              accessible={true}
              accessibilityLabel="Busca una receta para comenzar"
            >
              <Text style={styles.noResultsText}>Busca una receta para comenzar</Text>
            </View>
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
  );
};

export default RecipeManagerScreen;
