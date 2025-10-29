import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  TextInput, // Para el campo de búsqueda
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import GestorImage from '../../../assets/GestorImage.png';
import IAImage from '../../../assets/IAImage.png';  
import { styles } from '../../Style/Home/RecipeManagerStyle.js';

const initialRecipes = [
    {
        id: '1',
        name: 'Gallo Pinto',
        time: '20-30 minutos',
        diet: 'Sin dieta',
        difficulty: 'Nivel de dificultad: bajo', 
        image: require('../../../assets/GalloPinto.jpg'), // Asegúrate de que esta ruta sea correcta
        isFavorite: true,
    },
    {
        id: '2',
        name: 'Pasta al pesto',
        time: '25-30 min',
        diet: 'Dieta Vegetariana', 
        difficulty: 'Nivel de dificultad: medio',
        image: require('../../../assets/Pesto.jpg'), // Asegúrate de que esta ruta sea correcta
        isFavorite: true,
    }
];

const RecipeManagerScreen = ({ navigation }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState(initialRecipes);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = () => {
        setHasSearched(true);
        const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

        if (!lowerCaseSearchTerm) {

            setFilteredRecipes([]); 
            return;
        }

        const results = initialRecipes.filter(recipe => 
            recipe.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            recipe.diet.toLowerCase().includes(lowerCaseSearchTerm) ||
            recipe.difficulty.toLowerCase().includes(lowerCaseSearchTerm)
        );
        
        setFilteredRecipes(results);
        console.log(`Buscando: ${searchTerm}. Resultados: ${results.length}`);
    };
    
    const handleGoBack = () => {
        navigation.goBack(); 
    };

    const handleProfilePress = () => {
        navigation.navigate('userdata'); 
    };

    const RecipeCard = ({ item }) => (
        <TouchableOpacity 
            style={styles.recipeCard}
            onPress={() => console.log(`Ver detalles de: ${item.name}`)}
        >
            {item.image ? (
                <Image 
                    source={item.image} 
                    style={styles.recipeImage}
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
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header Naranja */} 
            <View style={styles.header}>
                <Text style={styles.headerTitle}>MiChef</Text>
                <TouchableOpacity 
                    style={styles.profileIconContainer} 
                    onPress={() => handleProfilePress()}
                >
                    {/* Ícono de perfil solicitado */}
                    <MaterialCommunityIcons name="account-circle" size={40} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                {/* Título de la Sección */}
                <Text style={styles.sectionTitle}>
                    Gestor de Recetas
                </Text>

                {/* Barra de Búsqueda */}
                <View style={styles.searchBarContainer}>
                    <View style={styles.searchBox}>
                        <MaterialCommunityIcons name="magnify" size={24} color="#666" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar por receta, nombre o dificultad"
                            placeholderTextColor="#999"
                            value={searchTerm}
                            onChangeText={setSearchTerm}
                            onSubmitEditing={handleSearch} 
                        />
                    </View>
                    <TouchableOpacity 
                        style={styles.searchButton}
                        onPress={handleSearch}
                    >
                        <Text style={styles.searchButtonText}>Buscar</Text>
                    </TouchableOpacity>
                </View>
                
                {/* Título de la Lista */}
                <Text style={styles.listTitle}>
                    Lista de Recetas
                </Text>

                {/* Lista de Recetas / Sin Resultados */}
                <View style={styles.recipeListContainer}>
                    {/* Condición de mostrar resultados */}
                    {filteredRecipes.length > 0 && hasSearched ? (
                        <ScrollView contentContainerStyle={styles.scrollContent}>
                            {filteredRecipes.map((item) => (
                                <RecipeCard key={item.id} item={item} />
                            ))}
                            {/* Espacio final */}
                            <View style={{ height: 20 }} /> 
                        </ScrollView>
                    ) : (
                        // Contenido de "Sin resultados..." o la tarjeta amarilla
                        <View style={styles.noResultsBox}>
                            <Text style={styles.noResultsText}>Sin resultados...</Text>
                        </View>
                    )}
                </View>
            </View>

            {/* Botón Flotante Regresar */}
            <TouchableOpacity 
                style={styles.backButton}
                onPress={handleGoBack}
                accessibilityRole="button"
                accessibilityLabel="Regresar a la pantalla anterior"
            >
                <Text style={styles.backButtonText}>Regresar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default RecipeManagerScreen;