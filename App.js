import React from 'react';

import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Componentes y Servicios
// import SessionTimeout from './src/Services/sessionTimeout '; // ELIMINADO
import WelcomeScreen from './src/Screens/Login/WelcomeScreen'; 
import LoginScreen from './src/Screens/Login/LoginScreen'; 
import RegisterScreen from './src/Screens/Login/RegisterScreen'; 
import RecoverPasswordScreen from './src/Screens/Login/RecoverPasswordScreen';
import Dashboard from './src/Screens/Home/DashboardScreen';

const Stack = createStackNavigator();

// NOTA: 'navigationRef' y 'navigate' ya no son necesarios 
// si la única razón era el SessionTimeout, pero los dejo por si los usas en otro lugar.
const navigationRef = createNavigationContainerRef();

function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}


export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      {/* El Stack.Navigator ahora es el hijo directo de NavigationContainer, 
        eliminando el SessionTimeout. 
      */}
      <Stack.Navigator initialRouteName="welcome" screenOptions={{ headerShown: false }}>

        {/* Login and Registration Screens */}
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="registroPage" component={RegisterScreen} />
        <Stack.Screen name="recoverPassword" component={RecoverPasswordScreen} />

        {/* Home Screens */}
        <Stack.Screen name="home" component={Dashboard} />
          
      </Stack.Navigator>
    </NavigationContainer>
  );
}
