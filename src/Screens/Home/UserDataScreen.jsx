import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../Style/Home/UserDataStyle.js';
import URL from '../../Services/url.js';

const UserDataScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [userDataState, setUserDataState] = useState(null);

  // 🔹 1. Cargar usuario del AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('michef_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserDataState(parsedUser);
        } else {
          console.warn('No se encontró usuario en AsyncStorage');
        }
      } catch (err) {
        console.log('Error cargando usuario:', err);
      }
    };
    loadUser();
  }, []);

  const API_URL = `${URL}:3000/home/userData`;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userDataState?.id && !userDataState?.id_usuario) {
        return;
      }

      const usuario_id = userDataState.id || userDataState.id_usuario;

      try {
        setLoading(true);
        const response = await fetch(`${API_URL}?usuario_id=${usuario_id}`);
        const data = await response.json();
        if (data.success) {
          setUserData(data.data);
        } else {
          setError('No se pudieron obtener los datos del usuario');
        }
      } catch (err) {
        console.error('Error al obtener datos del usuario:', err);
        setError('Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userDataState]); 


  const renderDataRow = (label, value) => {
    const accessibilityLabel = `${label} ${value}`;
    return (
      <View style={styles.dataRow} accessible accessibilityLabel={accessibilityLabel}>
        <Text style={styles.dataLabel} accessibilityElementsHidden>{label}</Text>
        <Text style={styles.dataValue} accessibilityElementsHidden>{value}</Text>
      </View>
    );
  };

  const renderAvoidIngredients = (ingredientsInput) => {
    let ingredients = [];
    if (Array.isArray(ingredientsInput)) {
      ingredients = ingredientsInput.map(i => (typeof i === 'string' ? i.trim() : String(i))).filter(Boolean);
    } else if (typeof ingredientsInput === 'string') {
      ingredients = ingredientsInput.split(',').map(i => i.trim()).filter(Boolean);
    }

    const hasNone = ingredients.length === 0;
    const accessibilityLabel = hasNone
      ? 'Ingredientes a evitar: Ninguno'
      : `Ingredientes a evitar: ${ingredients.join(', ')}`;

    return (
      <View accessible accessibilityLabel={accessibilityLabel}>
        <Text style={styles.dataLabel} accessibilityElementsHidden>Ingredientes a evitar:</Text>
        <View style={styles.avoidIngredientsList}>
          {hasNone ? (
            <Text style={styles.dataValue} accessibilityElementsHidden>
              Ninguno
            </Text>
          ) : (
            ingredients.map((item, index) => (
              <Text key={index} style={styles.dataValue} accessibilityElementsHidden>
                {item}
              </Text>
            ))
          )}
        </View>
      </View>
    );
  };

  const handleChangePasswordPress = () => navigation.navigate('recoverPassword');
  const handleEditProfilePress = () => navigation.navigate('registroPage', { isEditing: true });

  const renderAllergies = (allergiesInput) => {
    let items = [];
    if (Array.isArray(allergiesInput)) {
      items = allergiesInput.map(a => (typeof a === 'string' ? a.trim() : String(a))).filter(Boolean);
    } else if (typeof allergiesInput === 'string') {
      items = allergiesInput.split(',').map(a => a.trim()).filter(Boolean);
    }

    const hasNone = items.length === 0;
    const accessibilityLabel = hasNone
      ? 'Tipo de alergias: Ninguno'
      : `Tipo de alergias: ${items.join(', ')}`;

    return (
      <View accessible accessibilityLabel={accessibilityLabel}>
        <Text style={styles.dataLabel} accessibilityElementsHidden>Tipo de alergias:</Text>
        <View style={styles.allergiesList || styles.avoidIngredientsList}>
          {hasNone ? (
            <Text style={styles.dataValue} accessibilityElementsHidden>
              Ninguno
            </Text>
          ) : (
            items.map((item, index) => (
              <Text key={index} style={styles.dataValue} accessibilityElementsHidden>
                {item}
              </Text>
            ))
          )}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 20, fontSize: 16, color: '#333' }}>Cargando datos del usuario...</Text>
        <Text style={{ marginTop: 10, fontSize: 12, color: '#666', textAlign: 'center', paddingHorizontal: 40 }}>
          Por favor espere...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
      </View>
    );
  }

  return (
    <>
    <SafeAreaView edges={['top']} style={styles.safeTop} />
    <SafeAreaView edges={['left','right','bottom']} style={styles.safeArea}>
      <View 
        style={styles.header}
        accessible
        accessibilityRole="header"
        accessibilityLabel="MiChef aplicación"
      >
        <Text style={styles.headerTitle}>MiChef</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text 
          style={styles.sectionTitle}
          accessibilityRole="header"
          accessible
          accessibilityLabel="Mis Datos de Usuario"
        >
          Mis Datos
        </Text>

        <View style={styles.dataContainer}>
          {renderDataRow("Nombre de usuario:", userData?.username)}
          {renderDataRow("Correo electrónico:", userData?.email)}
          {renderDataRow("Nivel de conocimiento:", userData?.knowledgeLevel)}
          {renderDataRow("Tipo de dieta:", userData?.dietType)}
          {renderAllergies(userData?.allergies)}
          {renderAvoidIngredients(userData?.ingredientsToAvoid)}

          <TouchableOpacity 
            style={styles.passwordChangeLink}
            onPress={handleChangePasswordPress}
            accessibilityRole="link"
            accessibilityLabel="Cambiar contraseña"
            accessible
          >
            <Text style={styles.passwordChangeText}>Cambiar contraseña</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handleEditProfilePress}
          accessibilityRole="button"
          accessibilityLabel="Botón Actualizar datos"
          accessible
        >
          <Text style={styles.actionButtonText}>Actualizar datos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => navigation.navigate('home')}
          accessibilityRole="button"
          accessibilityLabel="Botón Cancelar y volver"
          accessible
        >
          <Text style={styles.cancelButtonText}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </>
  );
};

export default UserDataScreen;
