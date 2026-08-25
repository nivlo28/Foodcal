import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';

import {
  Food,
  MealType,
  useFood,
} from '../contexts/FoodContext';

import { useTheme } from '../contexts/ThemeContext';

const CALORIE_GOAL = 2400;

type FilterType =
  | 'Todo'
  | MealType
  | 'Agua';

export default function HistoryScreen() {
  const { colors } = useTheme();

  const {
    foods,
    waterEntries,
    selectedDate,
    setSelectedDate,
    removeFood,
    removeWater,
  } = useFood();

  const [filter, setFilter] =
    useState<FilterType>('Todo');

  const [selectedFood, setSelectedFood] =
    useState<Food | null>(null);

  // =========================
  // FECHA
  // =========================

  const isSameDay = (
    date1: Date,
    date2: Date
  ) => {
    return (
      date1.getFullYear() ===
        date2.getFullYear() &&
      date1.getMonth() ===
        date2.getMonth() &&
      date1.getDate() ===
        date2.getDate()
    );
  };

  const changeDate = (days: number) => {
    const newDate = new Date(
      selectedDate
    );

    newDate.setDate(
      newDate.getDate() + days
    );

    setSelectedDate(newDate);

    setFilter('Todo');
  };

  const today = new Date();

  const isToday = isSameDay(
    selectedDate,
    today
  );

  const dateText =
    selectedDate.toLocaleDateString(
      'es-HN',
      {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }
    );

  // =========================
  // DATOS DEL DÍA
  // =========================

  const dayFoods = useMemo(() => {
    return foods.filter((food) =>
      isSameDay(
        new Date(food.date),
        selectedDate
      )
    );
  }, [foods, selectedDate]);

  const dayWater = useMemo(() => {
    return waterEntries.filter((entry) =>
      isSameDay(
        new Date(entry.date),
        selectedDate
      )
    );
  }, [waterEntries, selectedDate]);

  // =========================
  // TOTALES
  // =========================

  const totalCalories =
    dayFoods.reduce(
      (total, food) =>
        total + food.calories,
      0
    );

  const totalProtein =
    dayFoods.reduce(
      (total, food) =>
        total + food.protein,
      0
    );

  const totalCarbs =
    dayFoods.reduce(
      (total, food) =>
        total + food.carbs,
      0
    );

  const totalFat =
    dayFoods.reduce(
      (total, food) =>
        total + food.fat,
      0
    );

  const totalWater =
    dayWater.reduce(
      (total, entry) =>
        total + entry.amount,
      0
    );

  const calorieProgress =
    Math.min(
      totalCalories /
        CALORIE_GOAL,
      1
    );

  // =========================
  // REGISTROS FILTRADOS
  // =========================

  const filteredFoods =
    filter === 'Todo' ||
    filter === 'Agua'
      ? dayFoods
      : dayFoods.filter(
          (food) =>
            food.mealType ===
            filter
        );

  const showWater =
    filter === 'Todo' ||
    filter === 'Agua';

  const hasEntries =
    filteredFoods.length > 0 ||
    (showWater &&
      dayWater.length > 0);

  // =========================
  // ELIMINAR COMIDA
  // =========================

  const handleDeleteFood = () => {
    if (!selectedFood) {
      return;
    }

    removeFood(selectedFood.id);
    setSelectedFood(null);
  };

  // =========================
  // HORA
  // =========================

  const formatTime = (
    date: string
  ) => {
    return new Date(
      date
    ).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // =========================
  // ICONO COMIDA
  // =========================

  const getMealIcon = (
    type: MealType
  ) => {
    switch (type) {
      case 'Desayuno':
        return '🌅';

      case 'Almuerzo':
        return '🍽️';

      case 'Merienda':
        return '🍎';

      case 'Cena':
        return '🌙';

      default:
        return '🍴';
    }
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
              Historial
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
              Tu diario de alimentación
            </Text>
          </View>

          <View
            style={[
              styles.headerIcon,
              {
                backgroundColor:
                  colors.surface,
              },
            ]}
          >
            <Text style={styles.headerEmoji}>
              📖
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
            style={styles.dateCenter}
          >
            <Text
              style={[
                styles.dateMain,
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
              {dateText}
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
            RESUMEN
        ========================= */}

        <View
          style={[
            styles.summaryCard,
            {
              backgroundColor:
                colors.card,
              borderColor:
                colors.border,
            },
          ]}
        >

          <View
            style={
              styles.summaryHeader
            }
          >
            <View>
              <Text
                style={[
                  styles.summaryLabel,
                  {
                    color:
                      colors.secondaryText,
                  },
                ]}
              >
                Calorías del día
              </Text>

              <View
                style={
                  styles.calorieRow
                }
              >
                <Text
                  style={[
                    styles.calorieValue,
                    {
                      color:
                        colors.text,
                    },
                  ]}
                >
                  {totalCalories}
                </Text>

                <Text
                  style={[
                    styles.calorieGoal,
                    {
                      color:
                        colors.secondaryText,
                    },
                  ]}
                >
                  / {CALORIE_GOAL} kcal
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.calorieIcon,
                {
                  backgroundColor:
                    colors.surface,
                },
              ]}
            >
              <Text style={styles.fire}>
                🔥
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.progressBackground,
              {
                backgroundColor:
                  colors.surface,
                },
              ]}
          >
            <View
              style={[
                styles.progress,
                {
                  width: `${
                    calorieProgress *
                    100
                  }%`,
                  backgroundColor:
                    colors.primary,
                },
              ]}
            />
          </View>

          <Text
            style={[
              styles.progressText,
              {
                color:
                  colors.secondaryText,
              },
            ]}
          >
            {totalCalories >=
            CALORIE_GOAL
              ? 'Meta diaria alcanzada 🎯'
              : `${Math.max(
                  CALORIE_GOAL -
                    totalCalories,
                  0
                )} kcal restantes`}
          </Text>

          {/* MINI STATS */}

          <View
            style={styles.statsRow}
          >

            <Stat
              icon="💪"
              value={`${Math.round(
                totalProtein
              )}g`}
              label="Proteína"
              colors={colors}
            />

            <Stat
              icon="🍞"
              value={`${Math.round(
                totalCarbs
              )}g`}
              label="Carbohidratos"
              colors={colors}
            />

            <Stat
              icon="🥑"
              value={`${Math.round(
                totalFat
              )}g`}
              label="Grasas"
              colors={colors}
            />

            <Stat
              icon="💧"
              value={`${(
                totalWater / 1000
              ).toFixed(1)}L`}
              label="Agua"
              colors={colors}
            />

          </View>

        </View>

        {/* =========================
            FILTROS
        ========================= */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.filters
          }
        >

          {(
            [
              'Todo',
              'Desayuno',
              'Almuerzo',
              'Merienda',
              'Cena',
              'Agua',
            ] as FilterType[]
          ).map((item) => {

            const active =
              filter === item;

            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.filterButton,
                  {
                    backgroundColor:
                      active
                        ? colors.primary
                        : colors.card,
                    borderColor:
                      active
                        ? colors.primary
                        : colors.border,
                  },
                ]}
                onPress={() =>
                  setFilter(item)
                }
              >
                <Text
                  style={[
                    styles.filterText,
                    {
                      color: active
                        ? '#FFFFFF'
                        : colors.secondaryText,
                    },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}

        </ScrollView>

        {/* =========================
            ACTIVIDAD
        ========================= */}

        <View
          style={
            styles.activityHeader
          }
        >
          <Text
            style={[
              styles.activityTitle,
              {
                color:
                  colors.text,
              },
            ]}
          >
            Actividad
          </Text>

          <Text
            style={[
              styles.activityCount,
              {
                color:
                  colors.secondaryText,
              },
            ]}
          >
            {dayFoods.length +
              dayWater.length}{' '}
            registros
          </Text>
        </View>

        {!hasEntries ? (
          <View
            style={[
              styles.emptyCard,
              {
                backgroundColor:
                  colors.card,
                borderColor:
                  colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.emptyIconContainer,
                {
                  backgroundColor:
                    colors.surface,
                },
              ]}
            >
              <Text
                style={
                  styles.emptyIcon
                }
              >
                🍽️
              </Text>
            </View>

            <Text
              style={[
                styles.emptyTitle,
                {
                  color:
                    colors.text,
                },
              ]}
            >
              Nada registrado
            </Text>

            <Text
              style={[
                styles.emptyText,
                {
                  color:
                    colors.secondaryText,
                },
              ]}
            >
              Todavía no tienes
              registros para este día.
            </Text>
          </View>
        ) : (
          <View
            style={styles.timeline}
          >

            {/* COMIDAS */}

            {filteredFoods.map(
              (food, index) => (
                <View
                  key={food.id}
                  style={
                    styles.timelineItem
                  }
                >

                  <View
                    style={
                      styles.timelineLineContainer
                    }
                  >

                    <View
                      style={[
                        styles.timelineDot,
                        {
                          backgroundColor:
                            colors.primary,
                        },
                      ]}
                    />

                    {index <
                      filteredFoods.length -
                        1 && (
                      <View
                        style={[
                          styles.timelineLine,
                          {
                            backgroundColor:
                              colors.border,
                          },
                        ]}
                      />
                    )}

                  </View>

                  <TouchableOpacity
                    style={[
                      styles.entryCard,
                      {
                        backgroundColor:
                          colors.card,
                        borderColor:
                          colors.border,
                      },
                    ]}
                    activeOpacity={0.8}
                    onPress={() =>
                      setSelectedFood(
                        food
                      )
                    }
                  >

                    <View
                      style={[
                        styles.entryIcon,
                        {
                          backgroundColor:
                            colors.surface,
                        },
                      ]}
                    >
                      <Text
                        style={
                          styles.entryEmoji
                        }
                      >
                        {getMealIcon(
                          food.mealType
                        )}
                      </Text>
                    </View>

                    <View
                      style={
                        styles.entryInfo
                      }
                    >
                      <Text
                        style={[
                          styles.entryType,
                          {
                            color:
                              colors.primary,
                          },
                        ]}
                      >
                        {food.mealType}
                      </Text>

                      <Text
                        style={[
                          styles.entryName,
                          {
                            color:
                              colors.text,
                          },
                        ]}
                        numberOfLines={1}
                      >
                        {food.name}
                      </Text>

                      <Text
                        style={[
                          styles.entryTime,
                          {
                            color:
                              colors.secondaryText,
                          },
                        ]}
                      >
                        {formatTime(
                          food.date
                        )}
                      </Text>
                    </View>

                    <View
                      style={
                        styles.entryCalories
                      }
                    >
                      <Text
                        style={[
                          styles.calorieNumber,
                          {
                            color:
                              colors.text,
                          },
                        ]}
                      >
                        {food.calories}
                      </Text>

                      <Text
                        style={[
                          styles.kcalText,
                          {
                            color:
                              colors.secondaryText,
                          },
                        ]}
                      >
                        kcal
                      </Text>

                      <Text
                        style={[
                          styles.chevron,
                          {
                            color:
                              colors.secondaryText,
                          },
                        ]}
                      >
                        ›
                      </Text>
                    </View>

                  </TouchableOpacity>

                </View>
              )
            )}

            {/* AGUA */}

            {showWater &&
              dayWater.map(
                (entry) => (
                  <View
                    key={entry.id}
                    style={
                      styles.timelineItem
                    }
                  >

                    <View
                      style={
                        styles.timelineLineContainer
                      }
                    >

                      <View
                        style={[
                          styles.timelineDot,
                          {
                            backgroundColor:
                              '#38A9E8',
                          },
                        ]}
                      />

                    </View>

                    <TouchableOpacity
                      style={[
                        styles.entryCard,
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
                          styles.entryIcon,
                          {
                            backgroundColor:
                              colors.surface,
                          },
                        ]}
                      >
                        <Text
                          style={
                            styles.entryEmoji
                          }
                        >
                          💧
                        </Text>
                      </View>

                      <View
                        style={
                          styles.entryInfo
                        }
                      >
                        <Text
                          style={[
                            styles.entryType,
                            {
                              color:
                                '#38A9E8',
                            },
                          ]}
                        >
                          Hidratación
                        </Text>

                        <Text
                          style={[
                            styles.entryName,
                            {
                              color:
                                colors.text,
                            },
                          ]}
                        >
                          Agua
                        </Text>

                        <Text
                          style={[
                            styles.entryTime,
                            {
                              color:
                                colors.secondaryText,
                            },
                          ]}
                        >
                          {formatTime(
                            entry.date
                          )}
                        </Text>
                      </View>

                      <View
                        style={
                          styles.entryCalories
                        }
                      >
                        <Text
                          style={[
                            styles.calorieNumber,
                            {
                              color:
                                colors.text,
                            },
                          ]}
                        >
                          {entry.amount}
                        </Text>

                        <Text
                          style={[
                            styles.kcalText,
                            {
                              color:
                                colors.secondaryText,
                            },
                          ]}
                        >
                          ml
                        </Text>

                        <TouchableOpacity
                          onPress={() =>
                            removeWater(
                              entry.id
                            )
                          }
                        >
                          <Text
                            style={
                              styles.deleteText
                            }
                          >
                            Eliminar
                          </Text>
                        </TouchableOpacity>
                      </View>

                    </TouchableOpacity>

                  </View>
                )
              )}

          </View>
        )}

      </ScrollView>

      {/* =========================
          DETALLE DE COMIDA
      ========================= */}

      <Modal
        visible={
          selectedFood !== null
        }
        transparent
        animationType="slide"
        onRequestClose={() =>
          setSelectedFood(null)
        }
      >

        <View
          style={styles.modalOverlay}
        >

          <View
            style={[
              styles.modal,
              {
                backgroundColor:
                  colors.card,
              },
            ]}
          >

            <View
              style={
                styles.modalHandle
              }
            />

            {selectedFood && (
              <>
                <View
                  style={
                    styles.modalHeader
                  }
                >
                  <View
                    style={[
                      styles.modalIcon,
                      {
                        backgroundColor:
                          colors.surface,
                      },
                    ]}
                  >
                    <Text
                      style={
                        styles.modalEmoji
                      }
                    >
                      {getMealIcon(
                        selectedFood.mealType
                      )}
                    </Text>
                  </View>

                  <View
                    style={
                      styles.modalTitleContainer
                    }
                  >
                    <Text
                      style={[
                        styles.modalType,
                        {
                          color:
                            colors.primary,
                        },
                      ]}
                    >
                      {
                        selectedFood.mealType
                      }
                    </Text>

                    <Text
                      style={[
                        styles.modalTitle,
                        {
                          color:
                            colors.text,
                        },
                      ]}
                    >
                      {
                        selectedFood.name
                      }
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      setSelectedFood(
                        null
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.close,
                        {
                          color:
                            colors.secondaryText,
                        },
                      ]}
                    >
                      ×
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text
                  style={[
                    styles.modalCalories,
                    {
                      color:
                        colors.text,
                    },
                  ]}
                >
                  {
                    selectedFood.calories
                  }{' '}
                  <Text
                    style={[
                      styles.modalKcal,
                      {
                        color:
                          colors.secondaryText,
                      },
                    ]}
                  >
                    kcal
                  </Text>
                </Text>

                <Text
                  style={[
                    styles.modalTime,
                    {
                      color:
                        colors.secondaryText,
                    },
                  ]}
                >
                  Registrado a las{' '}
                  {formatTime(
                    selectedFood.date
                  )}
                </Text>

                <View
                  style={
                    styles.modalMacros
                  }
                >

                  <ModalMacro
                    label="Proteína"
                    value={
                      selectedFood.protein
                    }
                    unit="g"
                    icon="💪"
                    colors={colors}
                  />

                  <ModalMacro
                    label="Carbohidratos"
                    value={
                      selectedFood.carbs
                    }
                    unit="g"
                    icon="🍞"
                    colors={colors}
                  />

                  <ModalMacro
                    label="Grasas"
                    value={
                      selectedFood.fat
                    }
                    unit="g"
                    icon="🥑"
                    colors={colors}
                  />

                </View>

                <TouchableOpacity
                  style={
                    styles.deleteButton
                  }
                  onPress={
                    handleDeleteFood
                  }
                >
                  <Text
                    style={
                      styles.deleteButtonText
                    }
                  >
                    Eliminar comida
                  </Text>
                </TouchableOpacity>

              </>
            )}

          </View>

        </View>

      </Modal>

    </SafeAreaView>
  );
}

// =================================
// STAT
// =================================

type StatProps = {
  icon: string;
  value: string;
  label: string;
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

function Stat({
  icon,
  value,
  label,
  colors,
}: StatProps) {
  return (
    <View
      style={styles.stat}
    >
      <Text style={styles.statIcon}>
        {icon}
      </Text>

      <Text
        style={[
          styles.statValue,
          {
            color: colors.text,
          },
        ]}
      >
        {value}
      </Text>

      <Text
        style={[
          styles.statLabel,
          {
            color:
              colors.secondaryText,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

// =================================
// MODAL MACRO
// =================================

type ModalMacroProps = {
  label: string;
  value: number;
  unit: string;
  icon: string;
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

function ModalMacro({
  label,
  value,
  unit,
  icon,
  colors,
}: ModalMacroProps) {
  return (
    <View
      style={[
        styles.modalMacro,
        {
          backgroundColor:
            colors.surface,
        },
      ]}
    >
      <Text
        style={
          styles.modalMacroIcon
        }
      >
        {icon}
      </Text>

      <Text
        style={[
          styles.modalMacroValue,
          {
            color: colors.text,
          },
        ]}
      >
        {Math.round(value)}
        {unit}
      </Text>

      <Text
        style={[
          styles.modalMacroLabel,
          {
            color:
              colors.secondaryText,
          },
        ]}
      >
        {label}
      </Text>
    </View>
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
    paddingTop: 18,
    paddingBottom: 45,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
  },

  subtitle: {
    fontSize: 13,
    marginTop: 3,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerEmoji: {
    fontSize: 24,
  },

  // FECHA

  dateCard: {
    height: 76,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  dateButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
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

  dateMain: {
    fontSize: 18,
    fontWeight: '800',
    textTransform: 'capitalize',
  },

  dateFull: {
    fontSize: 12,
    marginTop: 3,
    textTransform: 'capitalize',
  },

  // RESUMEN

  summaryCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 18,
    marginBottom: 18,
  },

  summaryHeader: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
  },

  summaryLabel: {
    fontSize: 12,
    fontWeight: '600',
  },

  calorieRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },

  calorieValue: {
    fontSize: 34,
    fontWeight: '800',
  },

  calorieGoal: {
    fontSize: 12,
    marginLeft: 4,
  },

  calorieIcon: {
    width: 45,
    height: 45,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fire: {
    fontSize: 22,
  },

  progressBackground: {
    height: 8,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 14,
  },

  progress: {
    height: '100%',
    borderRadius: 10,
  },

  progressText: {
    fontSize: 11,
    marginTop: 7,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    marginTop: 17,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor:
      '#E5E7EB',
  },

  stat: {
    alignItems: 'center',
    flex: 1,
  },

  statIcon: {
    fontSize: 16,
  },

  statValue: {
    fontSize: 13,
    fontWeight: '800',
    marginTop: 3,
  },

  statLabel: {
    fontSize: 8,
    marginTop: 2,
  },

  // FILTROS

  filters: {
    paddingBottom: 20,
    gap: 8,
  },

  filterButton: {
    height: 38,
    paddingHorizontal: 15,
    borderRadius: 13,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  filterText: {
    fontSize: 12,
    fontWeight: '700',
  },

  // ACTIVIDAD

  activityHeader: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  activityTitle: {
    fontSize: 22,
    fontWeight: '800',
  },

  activityCount: {
    fontSize: 12,
  },

  timeline: {
    paddingBottom: 10,
  },

  timelineItem: {
    flexDirection: 'row',
    minHeight: 105,
  },

  timelineLineContainer: {
    width: 24,
    alignItems: 'center',
  },

  timelineDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    marginTop: 22,
  },

  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: 3,
    marginBottom: -5,
  },

  entryCard: {
    flex: 1,
    minHeight: 88,
    borderRadius: 18,
    borderWidth: 1,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: 8,
  },

  entryIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  entryEmoji: {
    fontSize: 22,
  },

  entryInfo: {
    flex: 1,
    marginLeft: 12,
  },

  entryType: {
    fontSize: 10,
    fontWeight: '800',
  },

  entryName: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 2,
  },

  entryTime: {
    fontSize: 10,
    marginTop: 3,
  },

  entryCalories: {
    alignItems: 'flex-end',
    marginLeft: 5,
  },

  calorieNumber: {
    fontSize: 16,
    fontWeight: '800',
  },

  kcalText: {
    fontSize: 9,
  },

  chevron: {
    fontSize: 22,
    marginTop: 3,
  },

  deleteText: {
    color: '#EF4444',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  },

  // VACÍO

  emptyCard: {
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 35,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  emptyIconContainer: {
    width: 58,
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  emptyIcon: {
    fontSize: 27,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
  },

  emptyText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },

  // MODAL

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor:
      'rgba(0,0,0,0.5)',
  },

  modal: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 35,
  },

  modalHandle: {
    width: 42,
    height: 4,
    borderRadius: 10,
    backgroundColor:
      '#A0A0A0',
    alignSelf: 'center',
    marginBottom: 20,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  modalIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalEmoji: {
    fontSize: 27,
  },

  modalTitleContainer: {
    flex: 1,
    marginLeft: 13,
  },

  modalType: {
    fontSize: 11,
    fontWeight: '800',
  },

  modalTitle: {
    fontSize: 19,
    fontWeight: '800',
    marginTop: 2,
  },

  close: {
    fontSize: 30,
    fontWeight: '300',
  },

  modalCalories: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 24,
  },

  modalKcal: {
    fontSize: 16,
    fontWeight: '600',
  },

  modalTime: {
    fontSize: 12,
    marginTop: 2,
  },

  modalMacros: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 22,
  },

  modalMacro: {
    flex: 1,
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center',
  },

  modalMacroIcon: {
    fontSize: 17,
  },

  modalMacroValue: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 4,
  },

  modalMacroLabel: {
    fontSize: 9,
    marginTop: 2,
  },

  deleteButton: {
    height: 50,
    borderRadius: 15,
    backgroundColor:
      '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  deleteButtonText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '800',
  },
});