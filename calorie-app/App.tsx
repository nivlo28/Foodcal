import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator';
import { FoodProvider } from './src/contexts/FoodContext';

export default function App() {
  return (
    <FoodProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </FoodProvider>
  );
}