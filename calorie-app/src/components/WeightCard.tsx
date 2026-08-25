import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useTheme } from '../contexts/ThemeContext';

type Props = {
  weight: number;
  goal: number;
  unit: string;
  change?: number;
  onAdd: () => void;
};

export default function WeightCard({
  weight,
  goal,
  unit,
  change = 0,
  onAdd,
}: Props) {
  const { colors } = useTheme();

  const difference =
    weight - goal;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >

      <View style={styles.top}>

        <View style={styles.left}>

          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor:
                  colors.surface,
              },
            ]}
          >
            <Text style={styles.icon}>
              ⚖️
            </Text>
          </View>

          <View>
            <Text
              style={[
                styles.title,
                {
                  color: colors.text,
                },
              ]}
            >
              Peso actual
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
              Objetivo: {goal} {unit}
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
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.addText,
              {
                color: colors.primary,
              },
            ]}
          >
            + Registrar
          </Text>
        </TouchableOpacity>

      </View>

      <View style={styles.weightRow}>

        <Text
          style={[
            styles.weight,
            {
              color: colors.text,
            },
          ]}
        >
          {weight}
        </Text>

        <Text
          style={[
            styles.unit,
            {
              color:
                colors.secondaryText,
            },
          ]}
        >
          {' '}
          {unit}
        </Text>

      </View>

      <View style={styles.bottom}>

        <Text
          style={[
            styles.goalText,
            {
              color:
                colors.secondaryText,
            },
          ]}
        >
          {difference === 0
            ? '🎯 Has alcanzado tu objetivo'
            : difference > 0
            ? `🎯 ${difference.toFixed(
                1
              )} ${unit} para tu objetivo`
            : `🎯 ${Math.abs(
                difference
              ).toFixed(
                1
              )} ${unit} por encima del objetivo`}
        </Text>

        {change !== 0 && (
          <Text
            style={[
              styles.change,
              {
                color:
                  change < 0
                    ? '#22A06B'
                    : '#E05252',
              },
            ]}
          >
            {change > 0 ? '+' : ''}
            {change.toFixed(1)} {unit}
          </Text>
        )}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 18,
    marginBottom: 14,
  },

  top: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    fontSize: 22,
  },

  title: {
    fontSize: 17,
    fontWeight: '800',
    marginLeft: 13,
  },

  subtitle: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 13,
  },

  addButton: {
    paddingHorizontal: 12,
    height: 35,
    borderRadius: 11,
    justifyContent: 'center',
  },

  addText: {
    fontSize: 12,
    fontWeight: '800',
  },

  weightRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 20,
  },

  weight: {
    fontSize: 38,
    fontWeight: '800',
  },

  unit: {
    fontSize: 16,
    fontWeight: '600',
  },

  bottom: {
    marginTop: 7,
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
  },

  goalText: {
    fontSize: 12,
    flex: 1,
  },

  change: {
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 8,
  },
});