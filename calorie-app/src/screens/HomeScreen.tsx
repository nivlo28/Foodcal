import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { TabParamList } from '../navigation/TabsNavigator';
import { useFood } from '../contexts/FoodContext';

type Props = BottomTabScreenProps<TabParamList, 'Home'>;

const CALORIE_GOAL = 2400;
const PROTEIN_GOAL = 180;
const CARBS_GOAL = 300;
const FAT_GOAL = 67;

export default function HomeScreen({ navigation }: Props) {
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
} = useFood();

  const caloriesRemaining = Math.max(
    CALORIE_GOAL - selectedDayCalories,
    0
  );

  const calorieProgress = Math.min(
    selectedDayCalories / CALORIE_GOAL,
    1
  );

  const getMealCalories = (mealType: string) => {
    return selectedDayFoods
      .filter((food) => food.mealType === mealType)
      .reduce((total, food) => total + food.calories, 0);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-HN', {
      day: 'numeric',
      month: 'long',
    });
  };

  const isToday = () => {
    const today = new Date();

    return (
      selectedDate.getFullYear() === today.getFullYear() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getDate() === today.getDate()
    );
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);

    newDate.setDate(newDate.getDate() + days);

    setSelectedDate(newDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>CalorieAI</Text>

            <Text style={styles.dateText}>
              {formatDate(selectedDate)}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* DATE */}
        <View style={styles.dateHeader}>
          <TouchableOpacity
            style={styles.dateArrow}
            onPress={() => changeDate(-1)}
          >
            <Text style={styles.arrowText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.dateCenter}>
            <Text style={styles.todayText}>
              {isToday() ? 'Hoy' : formatDate(selectedDate)}
            </Text>

            <Text style={styles.fullDate}>
              {selectedDate.toLocaleDateString('es-HN', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.dateArrow}
            onPress={() => changeDate(1)}
          >
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* DAILY BUDGET */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Presupuesto diario
          </Text>

          <TouchableOpacity>
            <Text style={styles.editText}>Editar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dashboardRow}>

          {/* CALORIES */}
          <View style={styles.calorieCard}>

            <View style={styles.progressCircle}>

              <View
                style={[
                  styles.progressFill,
                  {
                    transform: [
                      {
                        rotate: `${-90 + calorieProgress * 180}deg`,
                      },
                    ],
                  },
                ]}
              />

              <View style={styles.circleInner}>

                <Text style={styles.remainingLabel}>
                  Restante
                </Text>

                <Text style={styles.remainingCalories}>
                  {caloriesRemaining}
                </Text>

                <Text style={styles.kcalText}>
                  kcal
                </Text>

              </View>

            </View>

            <Text style={styles.goalText}>
              Meta {CALORIE_GOAL} kcal
            </Text>

          </View>

          {/* MACROS */}
          <View style={styles.macroCard}>

            <MacroRow
              label="Carbs"
              current={selectedDayCarbs}
              goal={CARBS_GOAL}
              unit="g"
              icon="🍞"
            />

            <MacroRow
              label="Proteína"
              current={selectedDayProtein}
              goal={PROTEIN_GOAL}
              unit="g"
              icon="🍗"
            />

            <MacroRow
              label="Grasas"
              current={selectedDayFat}
              goal={FAT_GOAL}
              unit="g"
              icon="🧀"
            />

          </View>

        </View>

        {/* INSIGHT */}
        <TouchableOpacity style={styles.insightCard}>
          <Text style={styles.insightIcon}>✨</Text>

          <View style={styles.insightContent}>

            <Text style={styles.insightTitle}>
              Dato diario
            </Text>

            <Text style={styles.insightText}>
              Mantén un registro constante de tus comidas
              para conocer mejor tus hábitos.
            </Text>

          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* MEALS */}
        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Ingesta
          </Text>

          <Text style={styles.totalToday}>
            🔥 {selectedDayCalories} kcal
          </Text>

        </View>

        <MealCard
          icon="🌅"
          name="Desayuno"
          consumed={getMealCalories('Desayuno')}
          goal={600}
          onPress={() => navigation.navigate('AddFood')}
        />

        <MealCard
          icon="☀️"
          name="Almuerzo"
          consumed={getMealCalories('Almuerzo')}
          goal={960}
          onPress={() => navigation.navigate('AddFood')}
        />

        <MealCard
          icon="🍎"
          name="Merienda"
          consumed={getMealCalories('Merienda')}
          goal={240}
          onPress={() => navigation.navigate('AddFood')}
        />

        <MealCard
          icon="🌙"
          name="Cena"
          consumed={getMealCalories('Cena')}
          goal={600}
          onPress={() => navigation.navigate('AddFood')}
        />

        {/* WATER */}
        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Agua
          </Text>

          <TouchableOpacity>
            <Text style={styles.editText}>
              Más ›
            </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.waterCard}>

          <View>

            <Text style={styles.waterAmount}>
                {selectedDayWater}
              <Text style={styles.waterUnit}>
                {' '}ml
              </Text>
            </Text>

            <Text style={styles.waterGoal}>
              Meta 2500 ml
            </Text>

            <Text style={styles.waterCup}>
              1 taza = 250 ml
            </Text>

          </View>

          <TouchableOpacity
             style={styles.waterButton}
             onPress={() => addWater(250)}
            >
            <Text style={styles.waterPlus}>+</Text>
          </TouchableOpacity>

        </View>

        {/* WEIGHT */}
        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Peso
          </Text>

          <TouchableOpacity>
            <Text style={styles.editText}>
              Más ›
            </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.weightCard}>

          <View>

            <Text style={styles.weight}>
              153.3
              <Text style={styles.weightUnit}>
                {' '}lb
              </Text>
            </Text>

            <Text style={styles.weightGoal}>
              Meta 155.5 lb
            </Text>

            <View style={styles.weightChange}>
              <Text style={styles.weightChangeText}>
                ▲ 0.0
              </Text>
            </View>

          </View>

          <TouchableOpacity style={styles.smallPlus}>
            <Text style={styles.plusText}>
              +
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

/* =========================
   MACRO ROW
========================= */

type MacroRowProps = {
  label: string;
  current: number;
  goal: number;
  unit: string;
  icon: string;
};

function MacroRow({
  label,
  current,
  goal,
  unit,
  icon,
}: MacroRowProps) {
  return (
    <View style={styles.macroRow}>

      <View style={styles.macroTextContainer}>

        <Text style={styles.macroAmount}>
          {Math.round(current)}
          <Text style={styles.macroGoal}>
            {' '} / {goal}{unit}
          </Text>
        </Text>

        <Text style={styles.macroLabel}>
          {label}
        </Text>

      </View>

      <View style={styles.macroIcon}>
        <Text>{icon}</Text>
      </View>

    </View>
  );
}

/* =========================
   MEAL CARD
========================= */

type MealCardProps = {
  icon: string;
  name: string;
  consumed: number;
  goal: number;
  onPress: () => void;
};

function MealCard({
  icon,
  name,
  consumed,
  goal,
  onPress,
}: MealCardProps) {
  return (
    <TouchableOpacity
      style={styles.mealCard}
      onPress={onPress}
      activeOpacity={0.8}
    >

      <Text style={styles.mealIcon}>
        {icon}
      </Text>

      <View style={styles.mealInfo}>

        <Text style={styles.mealName}>
          {name}
        </Text>

        <Text style={styles.mealCalories}>
          {consumed}
          <Text style={styles.mealGoal}>
            {' '} / {goal} kcal
          </Text>
        </Text>

      </View>

      <View style={styles.mealPlus}>
        <Text style={styles.plusText}>
          +
        </Text>
      </View>

    </TouchableOpacity>
  );
}

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    marginBottom: 15,
  },

  logo: {
    fontSize: 30,
    fontWeight: '800',
    color: '#102A43',
  },

  dateText: {
    fontSize: 13,
    color: '#829AB1',
    marginTop: 2,
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F1F8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileIcon: {
    fontSize: 23,
  },

  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 10,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E5EEF5',
  },

  dateCenter: {
    alignItems: 'center',
    flex: 1,
  },

  todayText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#243B53',
  },

  fullDate: {
    fontSize: 13,
    color: '#829AB1',
    marginTop: 3,
    textTransform: 'capitalize',
  },

  dateArrow: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E8F4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrowText: {
    fontSize: 30,
    color: '#1787D4',
    marginTop: -3,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 23,
    fontWeight: '800',
    color: '#102A43',
  },

  editText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#627D98',
  },

  dashboardRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 15,
  },

  calorieCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5EEF5',
  },

  progressCircle: {
    width: 145,
    height: 145,
    borderRadius: 73,
    borderWidth: 12,
    borderColor: '#DDEAF4',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  progressFill: {
    position: 'absolute',
    width: 145,
    height: 145,
    borderRadius: 73,
    borderWidth: 12,
    borderColor: '#45A8E8',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },

  circleInner: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#E8F5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  remainingLabel: {
    fontSize: 13,
    color: '#627D98',
  },

  remainingCalories: {
    fontSize: 28,
    fontWeight: '800',
    color: '#102A43',
  },

  kcalText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#102A43',
  },

  goalText: {
    fontSize: 13,
    color: '#627D98',
    marginTop: 12,
  },

  macroCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5EEF5',
    justifyContent: 'space-around',
  },

  macroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  macroTextContainer: {
    flex: 1,
  },

  macroAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: '#102A43',
  },

  macroGoal: {
    fontWeight: '500',
    color: '#829AB1',
  },

  macroLabel: {
    fontSize: 13,
    color: '#627D98',
    marginTop: 2,
  },

  macroIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F1F6FA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4FF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 25,
  },

  insightIcon: {
    fontSize: 24,
    marginRight: 12,
  },

  insightContent: {
    flex: 1,
  },

  insightTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1475B8',
  },

  insightText: {
    fontSize: 12,
    color: '#627D98',
    marginTop: 3,
  },

  arrow: {
    fontSize: 25,
    color: '#829AB1',
  },

  totalToday: {
    fontSize: 14,
    fontWeight: '700',
    color: '#627D98',
  },

  mealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5EEF5',
  },

  mealIcon: {
    fontSize: 27,
    width: 45,
  },

  mealInfo: {
    flex: 1,
  },

  mealName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#102A43',
  },

  mealCalories: {
    fontSize: 14,
    fontWeight: '700',
    color: '#102A43',
    marginTop: 4,
  },

  mealGoal: {
    fontWeight: '500',
    color: '#829AB1',
  },

  mealPlus: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E8F4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  plusText: {
    fontSize: 28,
    fontWeight: '300',
    color: '#1787D4',
  },

  waterCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5EEF5',
    marginBottom: 15,
  },

  waterAmount: {
    fontSize: 34,
    fontWeight: '800',
    color: '#102A43',
  },

  waterUnit: {
    fontSize: 18,
    fontWeight: '600',
  },

  waterGoal: {
    fontSize: 15,
    color: '#829AB1',
    marginTop: 3,
  },

  waterCup: {
    fontSize: 11,
    color: '#A0AEC0',
    marginTop: 8,
    backgroundColor: '#F4F7FA',
    padding: 5,
    borderRadius: 5,
  },

  waterButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#E6F5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  waterPlus: {
    fontSize: 38,
    fontWeight: '300',
    color: '#1787D4',
  },

  weightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5EEF5',
    marginBottom: 20,
  },

  weight: {
    fontSize: 34,
    fontWeight: '800',
    color: '#102A43',
  },

  weightUnit: {
    fontSize: 17,
    fontWeight: '600',
  },

  weightGoal: {
    fontSize: 15,
    color: '#829AB1',
    marginTop: 3,
  },

  weightChange: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F7E8',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
  },

  weightChangeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3C9A3C',
  },

  smallPlus: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8F4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});