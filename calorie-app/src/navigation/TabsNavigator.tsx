import React from 'react';
import { StyleSheet } from 'react-native';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import AddFoodScreen from '../screens/AddFoodScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { useTheme } from '../contexts/ThemeContext';

export type TabParamList = {
  Home: undefined;
  AddFood: undefined;
  History: undefined;
  Profile: undefined;
};

const Tab =
  createBottomTabNavigator<TabParamList>();

export default function TabsNavigator() {
  const { colors, isDark } =
    useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor:
          colors.primary,

        tabBarInactiveTintColor:
          colors.secondaryText,

        tabBarStyle: {
          backgroundColor:
            colors.card,

          borderTopColor:
            colors.border,

          height: 65,

          paddingTop: 6,

          paddingBottom: 8,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },

        tabBarIcon: ({
          focused,
          color,
          size,
        }) => {
          let iconName:
            | keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (
            route.name === 'AddFood'
          ) {
            iconName = focused
              ? 'add-circle'
              : 'add-circle-outline';
          } else if (
            route.name === 'History'
          ) {
            iconName = focused
              ? 'bar-chart'
              : 'bar-chart-outline';
          } else {
            iconName = focused
              ? 'person'
              : 'person-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Inicio',
        }}
      />

      <Tab.Screen
        name="AddFood"
        component={AddFoodScreen}
        options={{
          title: 'Agregar',
        }}
      />

      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: 'Historial',
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
}