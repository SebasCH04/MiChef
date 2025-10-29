import React from 'react';

import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Componentes y Servicios
// Modulos de Login y Registro
import WelcomeScreen from './src/Screens/Login/WelcomeScreen'; 
import LoginScreen from './src/Screens/Login/LoginScreen'; 
import RegisterScreen from './src/Screens/Login/RegisterScreen'; 
import RecoverPasswordScreen from './src/Screens/Login/RecoverPasswordScreen';
import VerificationCodeScreen from './src/Screens/Login/VerificationCodeScreen';
import ChangePasswordScreen from './src/Screens/Login/ChangePasswordScreen';

// Modulos de Home
import Dashboard from './src/Screens/Home/DashboardScreen';
import UserDataScreen from './src/Screens/Home/UserDataScreen';
import RecipeManagerScreen from './src/Screens/Home/RecipeManagerScreen';

// Modulo de AI
import AICulinaryScreen from './src/Screens/AI/AICulinaryScreen';
import AIChatScreen from './src/Screens/AI/AIChatScreen';
import AIDemoRecipesScreen from './src/Screens/AI/AIDemoRecipesScreen';

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
        <Stack.Screen name="verificationCode" component={VerificationCodeScreen} />
        <Stack.Screen name="changePassword" component={ChangePasswordScreen} />


        {/* Home Screens */}
        <Stack.Screen name="home" component={Dashboard} />
        <Stack.Screen name="userdata" component={UserDataScreen} />
        <Stack.Screen name="recipeManager" component={RecipeManagerScreen} />


        {/* AI Culinary Screen */}
        <Stack.Screen name="AICulinary" component={AICulinaryScreen} />
        <Stack.Screen name="AIChatScreen" component={AIChatScreen} />
        <Stack.Screen name='AIDemoRecipes' component={AIDemoRecipesScreen} />
          
      </Stack.Navigator>
    </NavigationContainer>
  );
}
