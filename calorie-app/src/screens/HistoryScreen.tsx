import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useFood } from '../contexts/FoodContext';

export default function HistoryScreen() {
  const { foods, removeFood } = useFood();

  // Agrupar comidas por día
  const groupedFoods = foods.reduce(
    (groups: Record<string, typeof foods>, food) => {
      const date = new Date(food.date);

      const dateKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }

      groups[dateKey].push(food);

      return groups;
    },
    {}
  );

  // Ordenar los días del más reciente al más antiguo
  const sortedDates = Object.keys(groupedFoods).sort(
    (a, b) =>
      new Date(b).getTime() - new Date(a).getTime()
  );

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString
      .split('-')
      .map(Number);

    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString('es-HN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const isToday = (dateString: string) => {
    const today = new Date();

    const todayKey = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, '0')}-${String(today.getDate()).padStart(
      2,
      '0'
    )}`;

    return dateString === todayKey;
  };

  const getDayCalories = (dayFoods: typeof foods) => {
    return dayFoods.reduce(
      (total, food) => total + food.calories,
      0
    );
  };

  const getDayProtein = (dayFoods: typeof foods) => {
    return dayFoods.reduce(
      (total, food) => total + food.protein,
      0
    );
  };

  const getDayCarbs = (dayFoods: typeof foods) => {
    return dayFoods.reduce(
      (total, food) => total + food.carbs,
      0
    );
  };

  const getDayFat = (dayFoods: typeof foods) => {
    return dayFoods.reduce(
      (total, food) => total + food.fat,
      0
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>
              Historial
            </Text>

            <Text style={styles.subtitle}>
              Revisa tus comidas y progreso
            </Text>
          </View>

          <View style={styles.historyIcon}>
            <Text style={styles.historyIconText}>
              📊
            </Text>
          </View>
        </View>

        {/* EMPTY STATE */}
        {foods.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIconContainer}>
              <Text style={styles.emptyIcon}>
                🍽️
              </Text>
            </View>

            <Text style={styles.emptyTitle}>
              No hay comidas registradas
            </Text>

            <Text style={styles.emptyText}>
              Cuando agregues una comida aparecerá
              aquí junto con sus calorías y macros.
            </Text>
          </View>
        ) : (
          <>
            {/* RESUMEN GENERAL */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>
                Resumen
              </Text>

              <View style={styles.summaryMain}>
                <View>
                  <Text style={styles.summaryLabel}>
                    Comidas registradas
                  </Text>

                  <Text style={styles.summaryValue}>
                    {foods.length}
                  </Text>
                </View>

                <View style={styles.summaryCalories}>
                  <Text style={styles.fireIcon}>
                    🔥
                  </Text>

                  <View>
                    <Text style={styles.summaryLabel}>
                      Calorías totales
                    </Text>

                    <Text style={styles.summaryCaloriesValue}>
                      {foods.reduce(
                        (total, food) =>
                          total + food.calories,
                        0
                      )}
                      <Text style={styles.summaryKcal}>
                        {' '}kcal
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* DÍAS */}
            {sortedDates.map((dateKey) => {
              const dayFoods = groupedFoods[dateKey];

              const dayCalories =
                getDayCalories(dayFoods);

              const dayProtein =
                getDayProtein(dayFoods);

              const dayCarbs =
                getDayCarbs(dayFoods);

              const dayFat =
                getDayFat(dayFoods);

              return (
                <View
                  key={dateKey}
                  style={styles.daySection}
                >

                  {/* FECHA */}
                  <View style={styles.dayHeader}>
                    <View>
                      <Text style={styles.dayTitle}>
                        {isToday(dateKey)
                          ? 'Hoy'
                          : formatDate(dateKey)}
                      </Text>

                      <Text style={styles.dayDate}>
                        {isToday(dateKey)
                          ? formatDate(dateKey)
                          : `${dayFoods.length} ${
                              dayFoods.length === 1
                                ? 'comida'
                                : 'comidas'
                            }`}
                      </Text>
                    </View>

                    <View style={styles.dayCalories}>
                      <Text style={styles.dayCaloriesNumber}>
                        {dayCalories}
                      </Text>

                      <Text style={styles.dayCaloriesUnit}>
                        kcal
                      </Text>
                    </View>
                  </View>

                  {/* MACROS DEL DÍA */}
                  <View style={styles.dayMacroCard}>

                    <View style={styles.dayMacro}>
                      <Text style={styles.dayMacroIcon}>
                        🥩
                      </Text>

                      <View>
                        <Text style={styles.dayMacroValue}>
                          {Math.round(dayProtein)}g
                        </Text>

                        <Text style={styles.dayMacroLabel}>
                          Proteína
                        </Text>
                      </View>
                    </View>

                    <View style={styles.dayMacro}>
                      <Text style={styles.dayMacroIcon}>
                        🍞
                      </Text>

                      <View>
                        <Text style={styles.dayMacroValue}>
                          {Math.round(dayCarbs)}g
                        </Text>

                        <Text style={styles.dayMacroLabel}>
                          Carbs
                        </Text>
                      </View>
                    </View>

                    <View style={styles.dayMacro}>
                      <Text style={styles.dayMacroIcon}>
                        🧀
                      </Text>

                      <View>
                        <Text style={styles.dayMacroValue}>
                          {Math.round(dayFat)}g
                        </Text>

                        <Text style={styles.dayMacroLabel}>
                          Grasas
                        </Text>
                      </View>
                    </View>

                  </View>

                  {/* COMIDAS */}
                  {dayFoods.map((food) => (
                    <View
                      key={food.id}
                      style={styles.mealCard}
                    >

                      <View style={styles.mealIconContainer}>
                        <Text style={styles.mealIcon}>
                          {food.mealType === 'Desayuno'
                            ? '🌅'
                            : food.mealType === 'Almuerzo'
                            ? '☀️'
                            : food.mealType === 'Merienda'
                            ? '🍎'
                            : '🌙'}
                        </Text>
                      </View>

                      <View style={styles.mealInfo}>

                        <Text style={styles.mealType}>
                          {food.mealType}
                        </Text>

                        <Text style={styles.foodName}>
                          {food.name}
                        </Text>

                        <View style={styles.mealDetails}>
                          <Text style={styles.timeText}>
                            🕐{' '}
                            {new Date(
                              food.date
                            ).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </Text>

                          <Text style={styles.macroText}>
                            P {food.protein}g
                          </Text>

                          <Text style={styles.macroText}>
                            C {food.carbs}g
                          </Text>

                          <Text style={styles.macroText}>
                            G {food.fat}g
                          </Text>
                        </View>

                      </View>

                      <View style={styles.mealRight}>

                        <Text style={styles.mealCalories}>
                          {food.calories}
                        </Text>

                        <Text style={styles.kcalSmall}>
                          kcal
                        </Text>

                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() =>
                            removeFood(food.id)
                          }
                        >
                          <Text style={styles.deleteText}>
                            Eliminar
                          </Text>
                        </TouchableOpacity>

                      </View>

                    </View>
                  ))}

                </View>
              );
            })}
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#102A43',
  },

  subtitle: {
    fontSize: 14,
    color: '#829AB1',
    marginTop: 4,
  },

  historyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  historyIconText: {
    fontSize: 22,
  },

  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#E5EEF5',
  },

  summaryTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#243B53',
    marginBottom: 18,
  },

  summaryMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  summaryLabel: {
    fontSize: 12,
    color: '#829AB1',
    marginBottom: 4,
  },

  summaryValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#102A43',
  },

  summaryCalories: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  fireIcon: {
    fontSize: 27,
    marginRight: 8,
  },

  summaryCaloriesValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#102A43',
  },

  summaryKcal: {
    fontSize: 13,
    fontWeight: '500',
    color: '#829AB1',
  },

  daySection: {
    marginBottom: 28,
  },

  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  dayTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#102A43',
    textTransform: 'capitalize',
  },

  dayDate: {
    fontSize: 13,
    color: '#829AB1',
    marginTop: 3,
    textTransform: 'capitalize',
  },

  dayCalories: {
    alignItems: 'flex-end',
  },

  dayCaloriesNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1787D4',
  },

  dayCaloriesUnit: {
    fontSize: 11,
    color: '#829AB1',
  },

  dayMacroCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EAF5FC',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
  },

  dayMacro: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dayMacroIcon: {
    fontSize: 18,
    marginRight: 6,
  },

  dayMacroValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#243B53',
  },

  dayMacroLabel: {
    fontSize: 10,
    color: '#829AB1',
    marginTop: 1,
  },

  mealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 13,
    marginBottom: 9,
    borderWidth: 1,
    borderColor: '#E5EEF5',
  },

  mealIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#F1F6FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
  },

  mealIcon: {
    fontSize: 23,
  },

  mealInfo: {
    flex: 1,
    marginRight: 8,
  },

  mealType: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1787D4',
    marginBottom: 2,
  },

  foodName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#243B53',
    marginBottom: 5,
  },

  mealDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 7,
  },

  timeText: {
    fontSize: 10,
    color: '#829AB1',
  },

  macroText: {
    fontSize: 10,
    color: '#829AB1',
  },

  mealRight: {
    alignItems: 'flex-end',
  },

  mealCalories: {
    fontSize: 18,
    fontWeight: '800',
    color: '#102A43',
  },

  kcalSmall: {
    fontSize: 10,
    color: '#829AB1',
  },

  deleteButton: {
    marginTop: 7,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },

  deleteText: {
    fontSize: 10,
    color: '#A0AEC0',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 35,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5EEF5',
    marginTop: 20,
  },

  emptyIconContainer: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: '#EAF5FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  emptyIcon: {
    fontSize: 38,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#243B53',
    marginBottom: 7,
  },

  emptyText: {
    fontSize: 13,
    color: '#829AB1',
    textAlign: 'center',
    lineHeight: 20,
  },
});