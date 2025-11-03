// Card.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../Style/Components/CardStyle.js';

const Card = ({ title, time, diet, difficulty, imageUrl }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => console.log('Receta seleccionada: ' + title)}
      // Accesibilidad
      accessibilityRole="button"
      accessibilityLabel={`Receta: ${title}. Tiempo: ${time}. Dieta: ${diet}. Dificultad: ${difficulty}. Toca dos veces para ver la receta.`}
      accessibilityHint={`Abre la receta de ${title}`}
    >
      <Image
        source={imageUrl}
        style={styles.cardImage}
        resizeMode="cover"
        accessible={false}
        accessibilityElementsHidden={true}
        importantForAccessibility="no"
      />
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.cardTitle} accessibilityRole="header">{title}</Text>
          <Text style={styles.cardDetail}>{time}</Text>
          {diet && <Text style={styles.cardDetail}>{diet}</Text>}
          <Text style={styles.cardDetail}>Nivel de dificultad: {difficulty}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;