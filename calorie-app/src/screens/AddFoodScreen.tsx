import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { TabParamList } from '../navigation/TabsNavigator';

import { useFood } from '../contexts/FoodContext';
import { useTheme } from '../contexts/ThemeContext';

type Props = BottomTabScreenProps<
  TabParamList,
  'AddFood'
>;

export default function AddFoodScreen({
  navigation,
}: Props) {
  const { colors } = useTheme();

  const { addFood } = useFood();

  const [foodName, setFoodName] =
    useState('');

  const [calories, setCalories] =
    useState('');

  const [protein, setProtein] =
    useState('');

  const [carbs, setCarbs] =
    useState('');

  const [fat, setFat] =
    useState('');

  const [
    selectedMeal,
    setSelectedMeal,
  ] = useState<
    'Desayuno' |
    'Almuerzo' |
    'Merienda' |
    'Cena'
  >('Desayuno');

  const handleAddFood = () => {
    if (
      foodName.trim() === '' ||
      calories.trim() === ''
    ) {
      return;
    }

    addFood({
      name: foodName.trim(),

      calories:
        Number(
          calories.replace(',', '.')
        ) || 0,

      protein:
        Number(
          protein.replace(',', '.')
        ) || 0,

      carbs:
        Number(
          carbs.replace(',', '.')
        ) || 0,

      fat:
        Number(
          fat.replace(',', '.')
        ) || 0,

      mealType: selectedMeal,
    });

    setFoodName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');

    navigation.navigate('Home');
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor:
            colors.background,
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }
      >

        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text
              style={[
                styles.title,
                {
                  color: colors.text,
                },
              ]}
            >
              Agregar comida
            </Text>

            <Text
              style={[
                styles.subtitle,
                {
                  color:
                    colors.secondaryText,
                },
              ]}
            >
              Registra lo que comiste.
            </Text>
          </View>
        </View>

        {/* IA */}

        <TouchableOpacity
          style={[
            styles.cameraButton,
            {
              backgroundColor:
                colors.card,
              borderColor:
                colors.border,
            },
          ]}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.cameraIconContainer,
              {
                backgroundColor:
                  colors.surface,
              },
            ]}
          >
            <Text style={styles.cameraIcon}>
              📷
            </Text>
          </View>

          <Text
            style={[
              styles.cameraTitle,
              {
                color: colors.text,
              },
            ]}
          >
            Analizar con IA
          </Text>

          <Text
            style={[
              styles.cameraSubtitle,
              {
                color:
                  colors.secondaryText,
              },
            ]}
          >
            Toma una foto de tu comida
          </Text>

          <View
            style={[
              styles.aiBadge,
              {
                backgroundColor:
                  colors.surface,
              },
            ]}
          >
            <Text
              style={[
                styles.aiBadgeText,
                {
                  color:
                    colors.primary,
                },
              ]}
            >
              Próximamente
            </Text>
          </View>
        </TouchableOpacity>

        {/* FORMULARIO */}

        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.text,
            },
          ]}
        >
          Información
        </Text>

        <View
          style={[
            styles.card,
            {
              backgroundColor:
                colors.card,
              borderColor:
                colors.border,
            },
          ]}
        >

          {/* NOMBRE */}

          <Text
            style={[
              styles.label,
              {
                color:
                  colors.secondaryText,
              },
            ]}
          >
            Nombre de la comida
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor:
                  colors.surface,
                borderColor:
                  colors.border,
                color: colors.text,
              },
            ]}
            placeholder="Ej. Pollo con arroz"
            placeholderTextColor={
              colors.secondaryText
            }
            value={foodName}
            onChangeText={setFoodName}
          />

          {/* CALORÍAS */}

          <Text
            style={[
              styles.label,
              {
                color:
                  colors.secondaryText,
              },
            ]}
          >
            Calorías
          </Text>

          <View
            style={[
              styles.inputWithUnit,
              {
                backgroundColor:
                  colors.surface,
                borderColor:
                  colors.border,
              },
            ]}
          >
            <TextInput
              style={[
                styles.inputUnitField,
                {
                  color: colors.text,
                },
              ]}
              placeholder="Ej. 650"
              placeholderTextColor={
                colors.secondaryText
              }
              value={calories}
              onChangeText={setCalories}
              keyboardType="decimal-pad"
            />

            <Text
              style={[
                styles.unit,
                {
                  color:
                    colors.secondaryText,
                },
              ]}
            >
              kcal
            </Text>
          </View>

          {/* MACROS */}

          <Text
            style={[
              styles.label,
              {
                color:
                  colors.secondaryText,
              },
            ]}
          >
            Macronutrientes
          </Text>

          <View style={styles.macroInputs}>

            <MacroInput
              label="Proteína"
              unit="g"
              value={protein}
              onChangeText={setProtein}
              colors={colors}
            />

            <MacroInput
              label="Carbohidratos"
              unit="g"
              value={carbs}
              onChangeText={setCarbs}
              colors={colors}
            />

            <MacroInput
              label="Grasas"
              unit="g"
              value={fat}
              onChangeText={setFat}
              colors={colors}
            />

          </View>

        </View>

        {/* TIPO DE COMIDA */}

        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.text,
            },
          ]}
        >
          Tipo de comida
        </Text>

        <View
          style={[
            styles.mealTypesCard,
            {
              backgroundColor:
                colors.card,
              borderColor:
                colors.border,
            },
          ]}
        >

          <MealButton
            text="Desayuno"
            icon="🌅"
            selected={
              selectedMeal ===
              'Desayuno'
            }
            onPress={() =>
              setSelectedMeal(
                'Desayuno'
              )
            }
            colors={colors}
          />

          <MealButton
            text="Almuerzo"
            icon="🍽️"
            selected={
              selectedMeal ===
              'Almuerzo'
            }
            onPress={() =>
              setSelectedMeal(
                'Almuerzo'
              )
            }
            colors={colors}
          />

          <MealButton
            text="Merienda"
            icon="🍎"
            selected={
              selectedMeal ===
              'Merienda'
            }
            onPress={() =>
              setSelectedMeal(
                'Merienda'
              )
            }
            colors={colors}
          />

          <MealButton
            text="Cena"
            icon="🌙"
            selected={
              selectedMeal === 'Cena'
            }
            onPress={() =>
              setSelectedMeal('Cena')
            }
            colors={colors}
          />

        </View>

        {/* BOTÓN */}

        <TouchableOpacity
          style={[
            styles.addButton,
            {
              backgroundColor:
                colors.primary,
            },
          ]}
          onPress={handleAddFood}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>
            Agregar comida
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// =================================
// MACRO INPUT
// =================================

type MacroInputProps = {
  label: string;
  unit: string;
  value: string;
  onChangeText: (text: string) => void;
  colors: {
    background: string;
    card: string;
    surface: string;
    text: string;
    secondaryText: string;
    primary: string;
    border: string;
  };
};

function MacroInput({
  label,
  unit,
  value,
  onChangeText,
  colors,
}: MacroInputProps) {
  return (
    <View style={styles.macroInputContainer}>

      <Text
        style={[
          styles.macroLabel,
          {
            color:
              colors.secondaryText,
          },
        ]}
      >
        {label}
      </Text>

      <View
        style={[
          styles.macroInput,
          {
            backgroundColor:
              colors.surface,
            borderColor:
              colors.border,
          },
        ]}
      >
        <TextInput
          style={[
            styles.macroTextInput,
            {
              color: colors.text,
            },
          ]}
          placeholder="0"
          placeholderTextColor={
            colors.secondaryText
          }
          value={value}
          onChangeText={onChangeText}
          keyboardType="decimal-pad"
        />

        <Text
          style={[
            styles.macroUnit,
            {
              color:
                colors.secondaryText,
            },
          ]}
        >
          {unit}
        </Text>
      </View>

    </View>
  );
}

// =================================
// MEAL BUTTON
// =================================

type MealButtonProps = {
  text: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
  colors: {
    background: string;
    card: string;
    surface: string;
    text: string;
    secondaryText: string;
    primary: string;
    border: string;
  };
};

function MealButton({
  text,
  icon,
  selected,
  onPress,
  colors,
}: MealButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.mealButton,
        selected && {
          backgroundColor:
            colors.surface,
          borderColor:
            colors.primary,
        },
        !selected && {
          borderColor:
            colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.mealIcon}>
        {icon}
      </Text>

      <Text
        style={[
          styles.mealButtonText,
          {
            color: selected
              ? colors.primary
              : colors.secondaryText,
          },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

// =================================
// ESTILOS
// =================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
  },

  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },

  // IA

  cameraButton: {
    minHeight: 190,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    paddingVertical: 25,
  },

  cameraIconContainer: {
    width: 62,
    height: 62,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  cameraIcon: {
    fontSize: 30,
  },

  cameraTitle: {
    fontSize: 19,
    fontWeight: '800',
  },

  cameraSubtitle: {
    fontSize: 13,
    marginTop: 5,
  },

  aiBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 12,
  },

  aiBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },

  // SECCIONES

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
  },

  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
    marginBottom: 25,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 7,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 18,
  },

  inputWithUnit: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 15,
    marginBottom: 18,
  },

  inputUnitField: {
    flex: 1,
    fontSize: 16,
  },

  unit: {
    fontSize: 13,
    fontWeight: '700',
  },

  // MACROS

  macroInputs: {
    flexDirection: 'row',
    gap: 8,
  },

  macroInputContainer: {
    flex: 1,
  },

  macroLabel: {
    fontSize: 11,
    marginBottom: 6,
  },

  macroInput: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  macroTextInput: {
    flex: 1,
    fontSize: 15,
  },

  macroUnit: {
    fontSize: 11,
    fontWeight: '700',
  },

  // TIPO DE COMIDA

  mealTypesCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    gap: 8,
  },

  mealButton: {
    minHeight: 52,
    borderRadius: 13,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  mealIcon: {
    fontSize: 19,
    marginRight: 10,
  },

  mealButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },

  // AGREGAR

  addButton: {
    height: 56,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});