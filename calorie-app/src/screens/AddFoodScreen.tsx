import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { TabParamList } from '../navigation/TabsNavigator';
import { useFood, MealType } from '../contexts/FoodContext';

type Props = BottomTabScreenProps<TabParamList, 'AddFood'>;

const mealTypes: MealType[] = [
  'Desayuno',
  'Almuerzo',
  'Merienda',
  'Cena',
];

export default function AddFoodScreen({ navigation }: Props) {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [mealType, setMealType] =
    useState<MealType>('Desayuno');

  const { addFood } = useFood();

  const handleAddFood = () => {
    if (!foodName.trim() || !calories.trim()) {
      Alert.alert(
        'Datos incompletos',
        'Ingresa el nombre de la comida y las calorías.'
      );
      return;
    }

    const caloriesNumber = Number(calories);

    if (
      isNaN(caloriesNumber) ||
      caloriesNumber <= 0
    ) {
      Alert.alert(
        'Calorías inválidas',
        'Ingresa una cantidad válida de calorías.'
      );
      return;
    }

    addFood({
      name: foodName.trim(),
      calories: caloriesNumber,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      mealType,
    });

    setFoodName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
    setMealType('Desayuno');

    Alert.alert(
      'Comida agregada',
      `${foodName.trim()} - ${caloriesNumber} kcal`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <Text style={styles.title}>
          Agregar comida
        </Text>

        <Text style={styles.subtitle}>
          Registra lo que comiste o usa la IA para
          analizar una foto.
        </Text>

        <TouchableOpacity style={styles.cameraButton}>
          <Text style={styles.cameraIcon}>📷</Text>

          <Text style={styles.cameraTitle}>
            Analizar con IA
          </Text>

          <Text style={styles.cameraSubtitle}>
            Toma una foto de tu comida
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>
          Tipo de comida
        </Text>

        <View style={styles.mealTypes}>
          {mealTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.mealTypeButton,
                mealType === type &&
                  styles.mealTypeSelected,
              ]}
              onPress={() => setMealType(type)}
            >
              <Text
                style={[
                  styles.mealTypeText,
                  mealType === type &&
                    styles.mealTypeTextSelected,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>
          Información nutricional
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre de la comida"
          placeholderTextColor="#888"
          value={foodName}
          onChangeText={setFoodName}
        />

        <TextInput
          style={styles.input}
          placeholder="Calorías"
          placeholderTextColor="#888"
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Proteínas (g)"
          placeholderTextColor="#888"
          value={protein}
          onChangeText={setProtein}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Carbohidratos (g)"
          placeholderTextColor="#888"
          value={carbs}
          onChangeText={setCarbs}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Grasas (g)"
          placeholderTextColor="#888"
          value={fat}
          onChangeText={setFat}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddFood}
        >
          <Text style={styles.addButtonText}>
            Agregar comida
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
    marginBottom: 25,
  },

  cameraButton: {
    height: 170,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    marginBottom: 25,
  },

  cameraIcon: {
    fontSize: 40,
    marginBottom: 10,
  },

  cameraTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  cameraSubtitle: {
    fontSize: 14,
    color: '#777777',
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  mealTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 25,
  },

  mealTypeButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F2F2F2',
  },

  mealTypeSelected: {
    backgroundColor: '#000000',
  },

  mealTypeText: {
    fontSize: 13,
    color: '#555555',
  },

  mealTypeTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 15,
  },

  addButton: {
    height: 52,
    backgroundColor: '#000000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});