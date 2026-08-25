import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  Food,
  MealType,
} from '../contexts/FoodContext';

import { useTheme } from '../contexts/ThemeContext';

type Props = {
  mealType: MealType;
  foods: Food[];
  goal: number;
  onAdd: () => void;
  onDelete: (id: string) => void;
};

export default function MealCard({
  mealType,
  foods,
  goal,
  onAdd,
  onDelete,
}: Props) {
  const { colors } =
    useTheme();

  const calories =
    foods.reduce(
      (total, food) =>
        total + food.calories,
      0
    );

  const getIcon = () => {
    switch (mealType) {
      case 'Desayuno':
        return '🌅';

      case 'Almuerzo':
        return '☀️';

      case 'Merienda':
        return '🍎';

      case 'Cena':
        return '🌙';

      default:
        return '🍽️';
    }
  };

  return (
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
      {/* HEADER */}

      <View
        style={styles.header}
      >
        <View
          style={
            styles.titleContainer
          }
        >
          <Text
            style={
              styles.icon
            }
          >
            {getIcon()}
          </Text>

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
              {mealType}
            </Text>

            <Text
              style={[
                styles.calories,
                {
                  color:
                    colors.secondaryText,
                },
              ]}
            >
              {calories}{' '}
              <Text
                style={
                  styles.goal
                }
              >
                / {goal} kcal
              </Text>
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.addButton,
            {
              backgroundColor:
                colors.surface,
            },
          ]}
          onPress={onAdd}
        >
          <Text
            style={[
              styles.addText,
              {
                color:
                  colors.primary,
              },
            ]}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>

      {/* COMIDAS */}

      {foods.map((food) => (
        <View
          key={food.id}
          style={[
            styles.foodRow,
            {
              borderTopColor:
                colors.border,
            },
          ]}
        >
          {food.image ? (
            <Image
              source={{
                uri: food.image,
              }}
              style={
                styles.foodImage
              }
            />
          ) : (
            <View
              style={[
                styles.foodImagePlaceholder,
                {
                  backgroundColor:
                    colors.surface,
                },
              ]}
            >
              <Text
                style={
                  styles.placeholderIcon
                }
              >
                🍽️
              </Text>
            </View>
          )}

          <View
            style={
              styles.foodInfo
            }
          >
            <Text
              style={[
                styles.foodName,
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
                styles.foodDetails,
                {
                  color:
                    colors.secondaryText,
                },
              ]}
            >
              {food.calories} kcal
            </Text>
          </View>

          <TouchableOpacity
            style={
              styles.menuButton
            }
            onPress={() =>
              onDelete(food.id)
            }
          >
            <Text
              style={[
                styles.menuText,
                {
                  color:
                    colors.secondaryText,
                },
              ]}
            >
              ⋮
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
  },

  header: {
    minHeight: 92,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    fontSize: 29,
    marginRight: 13,
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
  },

  calories: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 3,
  },

  goal: {
    fontWeight: '400',
  },

  addButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addText: {
    fontSize: 30,
    fontWeight: '300',
    marginTop: -2,
  },

  foodRow: {
    minHeight: 88,
    borderTopWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  foodImage: {
    width: 58,
    height: 58,
    borderRadius: 14,
  },

  foodImagePlaceholder: {
    width: 58,
    height: 58,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderIcon: {
    fontSize: 24,
  },

  foodInfo: {
    flex: 1,
    marginLeft: 13,
  },

  foodName: {
    fontSize: 16,
    fontWeight: '800',
  },

  foodDetails: {
    fontSize: 12,
    marginTop: 4,
  },

  menuButton: {
    width: 35,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuText: {
    fontSize: 25,
  },
});