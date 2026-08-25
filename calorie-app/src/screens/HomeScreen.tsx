import React, {
  useMemo,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  useFood,
  MealType,
} from '../contexts/FoodContext';

import { useTheme } from '../contexts/ThemeContext';

import CalorieCard from '../components/CalorieCard';
import MacroCard from '../components/MacroCard';
import WaterCard from '../components/WaterCard';
import InsightCard from '../components/InsightCard';
import WeightCard from '../components/WeightCard';
import MealCard from '../components/MealCard';

import FoodCamera from '../components/FoodCamera';
import AddFoodModal from '../components/AddFoodModal';

const CALORIE_GOAL = 2400;
const PROTEIN_GOAL = 180;
const CARBS_GOAL = 300;
const FAT_GOAL = 67;
const WATER_GOAL = 2500;

export default function HomeScreen() {
  const { colors } =
    useTheme();

  const {
    selectedDate,
    setSelectedDate,
    selectedDayFoods,
    selectedDayCalories,
    selectedDayProtein,
    selectedDayCarbs,
    selectedDayFat,
    selectedDayWater,
    addWater,
    removeFood,
  } = useFood();

  const [cameraVisible, setCameraVisible] =
    useState(false);

  const [foodModalVisible, setFoodModalVisible] =
    useState(false);

  const [photoUri, setPhotoUri] =
    useState<string | null>(null);

  const [selectedMeal, setSelectedMeal] =
    useState<MealType>('Desayuno');

  // =========================
  // FECHA
  // =========================

  const changeDate = (
    days: number
  ) => {
    const newDate =
      new Date(selectedDate);

    newDate.setDate(
      newDate.getDate() + days
    );

    setSelectedDate(newDate);
  };

  const today = new Date();

  const isToday =
    selectedDate.getFullYear() ===
      today.getFullYear() &&
    selectedDate.getMonth() ===
      today.getMonth() &&
    selectedDate.getDate() ===
      today.getDate();

  const formattedDate =
    selectedDate.toLocaleDateString(
      'es-HN',
      {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }
    );

  // =========================
  // COMIDAS
  // =========================

  const getFoodsByMeal = (
    mealType: MealType
  ) => {
    return selectedDayFoods.filter(
      (food) =>
        food.mealType ===
        mealType
    );
  };

  const openCamera = (
    mealType: MealType
  ) => {
    setSelectedMeal(
      mealType
    );

    setCameraVisible(true);
  };

  const handlePhotoTaken = (
    uri: string
  ) => {
    setPhotoUri(uri);

    setCameraVisible(false);

    setTimeout(() => {
      setFoodModalVisible(true);
    }, 300);
  };

  const closeFoodModal = () => {
    setFoodModalVisible(false);
    setPhotoUri(null);
  };

  const meals: {
    type: MealType;
    goal: number;
  }[] = [
    {
      type: 'Desayuno',
      goal: 600,
    },
    {
      type: 'Almuerzo',
      goal: 900,
    },
    {
      type: 'Merienda',
      goal: 300,
    },
    {
      type: 'Cena',
      goal: 600,
    },
  ];

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
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >

        {/* =========================
            HEADER
        ========================= */}

        <View
          style={styles.header}
        >
          <View>
            <Text
              style={[
                styles.title,
                {
                  color:
                    colors.text,
                },
              ]}
            >
              CalorieAI
            </Text>

            <Text
              style={[
                styles.dateText,
                {
                  color:
                    colors.secondaryText,
                },
              ]}
            >
              {formattedDate}
            </Text>
          </View>

          <View
            style={[
              styles.profileCircle,
              {
                backgroundColor:
                  colors.surface,
              },
            ]}
          >
            <Text
              style={
                styles.profileIcon
              }
            >
              👤
            </Text>
          </View>
        </View>

        {/* =========================
            FECHA
        ========================= */}

        <View
          style={[
            styles.dateCard,
            {
              backgroundColor:
                colors.card,
              borderColor:
                colors.border,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.dateButton,
              {
                backgroundColor:
                  colors.surface,
              },
            ]}
            onPress={() =>
              changeDate(-1)
            }
          >
            <Text
              style={[
                styles.arrow,
                {
                  color:
                    colors.primary,
                },
              ]}
            >
              ‹
            </Text>
          </TouchableOpacity>

          <View
            style={
              styles.dateCenter
            }
          >
            <Text
              style={[
                styles.dateToday,
                {
                  color:
                    colors.text,
                },
              ]}
            >
              {isToday
                ? 'Hoy'
                : selectedDate.toLocaleDateString(
                    'es-HN',
                    {
                      day: 'numeric',
                      month: 'short',
                    }
                  )}
            </Text>

            <Text
              style={[
                styles.dateFull,
                {
                  color:
                    colors.secondaryText,
                },
              ]}
            >
              {formattedDate}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.dateButton,
              {
                backgroundColor:
                  colors.surface,
              },
            ]}
            onPress={() =>
              changeDate(1)
            }
          >
            <Text
              style={[
                styles.arrow,
                {
                  color:
                    colors.primary,
                },
              ]}
            >
              ›
            </Text>
          </TouchableOpacity>
        </View>

        {/* =========================
            PRESUPUESTO
        ========================= */}

        <View
          style={
            styles.sectionHeader
          }
        >
          <Text
            style={[
              styles.sectionTitle,
              {
                color:
                  colors.text,
              },
            ]}
          >
            Presupuesto diario
          </Text>

          <Text
            style={[
              styles.editText,
              {
                color:
                  colors.secondaryText,
              },
            ]}
          >
            Editar
          </Text>
        </View>

        <CalorieCard
          consumed={
            selectedDayCalories
          }
          goal={CALORIE_GOAL}
        />

        <MacroCard
          protein={
            selectedDayProtein
          }
          carbs={
            selectedDayCarbs
          }
          fat={selectedDayFat}
          proteinGoal={
            PROTEIN_GOAL
          }
          carbsGoal={CARBS_GOAL}
          fatGoal={FAT_GOAL}
        />

        <InsightCard />

        {/* =========================
            INGESTA
        ========================= */}

        <View
          style={[
            styles.intakeHeader,
            {
              marginTop: 8,
            },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              {
                color:
                  colors.text,
              },
            ]}
          >
            Ingesta
          </Text>

          <Text
            style={[
              styles.totalCalories,
              {
                color:
                  colors.text,
              },
            ]}
          >
            🔥 {selectedDayCalories}{' '}
            kcal
          </Text>
        </View>

        {meals.map(
          (meal) => (
            <MealCard
              key={meal.type}
              mealType={
                meal.type
              }
              foods={getFoodsByMeal(
                meal.type
              )}
              goal={
                meal.goal
              }
              onAdd={() =>
                openCamera(
                  meal.type
                )
              }
              onDelete={
                removeFood
              }
            />
          )
        )}

        {/* =========================
            AGUA
        ========================= */}

        <View
          style={
            styles.sectionHeader
          }
        >
          <Text
            style={[
              styles.sectionTitle,
              {
                color:
                  colors.text,
                marginTop: 8,
              },
            ]}
          >
            Agua
          </Text>

          <Text
            style={[
              styles.totalCalories,
              {
                color:
                  colors.secondaryText,
              },
            ]}
          >
            💧 {selectedDayWater} ml
          </Text>
        </View>

        <WaterCard
          amount={
            selectedDayWater
          }
          goal={WATER_GOAL}
          onAdd={() =>
            addWater(250)
          }
          onRemove={() =>
            {}
          }
        />

        {/* =========================
            PESO
        ========================= */}

        <View
          style={
            styles.sectionHeader
          }
        >
          <Text
            style={[
              styles.sectionTitle,
              {
                color:
                  colors.text,
              },
            ]}
          >
            Peso
          </Text>
        </View>

        <WeightCard />

      </ScrollView>

      {/* =========================
          CÁMARA
      ========================= */}

      <FoodCamera
        visible={
          cameraVisible
        }
        onClose={() =>
          setCameraVisible(
            false
          )
        }
        onPhotoTaken={
          handlePhotoTaken
        }
      />

      {/* =========================
          FORMULARIO
      ========================= */}

      <AddFoodModal
        visible={
          foodModalVisible
        }
        imageUri={
          photoUri
        }
        mealType={
          selectedMeal
        }
        onClose={
          closeFoodModal
        }
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
    marginBottom: 15,
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
  },

  dateText: {
    fontSize: 13,
    marginTop: 2,
    textTransform:
      'capitalize',
  },

  profileCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileIcon: {
    fontSize: 24,
  },

  dateCard: {
    height: 74,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 25,
  },

  dateButton: {
    width: 45,
    height: 45,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrow: {
    fontSize: 30,
    lineHeight: 32,
  },

  dateCenter: {
    flex: 1,
    alignItems: 'center',
  },

  dateToday: {
    fontSize: 18,
    fontWeight: '800',
  },

  dateFull: {
    fontSize: 12,
    marginTop: 3,
    textTransform:
      'capitalize',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
  },

  editText: {
    fontSize: 14,
    fontWeight: '700',
  },

  intakeHeader: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  totalCalories: {
    fontSize: 14,
    fontWeight: '800',
  },
});