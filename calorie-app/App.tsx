import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator';
import { FoodProvider } from './src/contexts/FoodContext';
import { ThemeProvider } from './src/contexts/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <FoodProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </FoodProvider>
    </ThemeProvider>
  );
}