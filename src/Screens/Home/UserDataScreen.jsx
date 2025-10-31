import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../Style/Home/UserDataStyle.js';
import URL from '../../Services/url.js';

const UserDataScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const usuario_id = 6; // ID de usuario fijo para pruebas

  const API_URL = `${URL}:3000/home/userData`;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
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
  }, []);

  // 🔹 Renderizar fila de datos
  const renderDataRow = (label, value) => {
    const accessibilityLabel = `${label} ${value}`;
    return (
      <View style={styles.dataRow} accessible={true} accessibilityLabel={accessibilityLabel}>
        <Text style={styles.dataLabel} accessibilityElementsHidden={true}>{label}</Text>
        <Text style={styles.dataValue} accessibilityElementsHidden={true}>{value}</Text>
      </View>
    );
  };

  // 🔹 Renderizar ingredientes a evitar
  const renderAvoidIngredients = (ingredientsString) => {
    const ingredients = ingredientsString ? ingredientsString.split(',').map(i => i.trim()) : [];
    const accessibilityLabel = `Ingredientes a evitar: ${ingredients.join(', ')}`;
    
    return (
      <View accessible={true} accessibilityLabel={accessibilityLabel}>
        <Text style={styles.dataLabel} accessibilityElementsHidden={true}>Ingredientes a evitar:</Text>
        <View style={styles.avoidIngredientsList}>
          {ingredients.map((item, index) => (
            <Text key={index} style={styles.dataValue} accessibilityElementsHidden={true}>
              {item}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  const handleChangePasswordPress = () => {
    navigation.navigate('recoverPassword');
  };

  const handleEditProfilePress = () => {
    navigation.navigate('registroPage', { isEditing: true });
  };

  // 🔹 Si está cargando
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FACC15" />
        <Text>Cargando datos del usuario...</Text>
      </View>
    );
  }

  // 🔹 Si hubo error
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View 
        style={styles.header}
        accessible={true}
        accessibilityRole="header"
        accessibilityLabel="MiChef aplicación"
      >
        <Text style={styles.headerTitle}>MiChef</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text 
          style={styles.sectionTitle}
          accessibilityRole="header"
          accessible={true}
          accessibilityLabel="Mis Datos de Usuario"
        >
          Mis Datos
        </Text>

        {/* 🔸 Contenedor principal */}
        <View style={styles.dataContainer}>
          {renderDataRow("Nombre de usuario:", userData.username)}
          {renderDataRow("Correo electrónico:", userData.email)}
          {renderDataRow("Nivel de conocimiento:", userData.knowledgeLevel)}
          {renderDataRow("Tipo de dieta:", userData.dietType)}
          {renderDataRow("Tipo de alergias:", userData.allergies)}
          {renderAvoidIngredients(userData.ingredientsToAvoid)}

          {/* 🔸 Cambiar contraseña */}
          <TouchableOpacity 
            style={styles.passwordChangeLink}
            onPress={handleChangePasswordPress}
            accessibilityRole="link"
            accessibilityLabel="Cambiar contraseña"
            accessible={true}
          >
            <Text style={styles.passwordChangeText}>Cambiar contraseña</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 🔸 Botones inferiores */}
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handleEditProfilePress}
          accessibilityRole="button"
          accessibilityLabel="Botón Actualizar datos"
          accessible={true}
        >
          <Text style={styles.actionButtonText}>Actualizar datos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Botón Cancelar y volver"
          accessible={true}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserDataScreen;
