import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { useTheme } from '../contexts/ThemeContext';

type Props = {
  consumed: number;
  goal: number;
};

export default function CalorieCard({
  consumed,
  goal,
}: Props) {
  const { colors } = useTheme();

  const remaining = Math.max(
    goal - consumed,
    0
  );

  const progress =
    goal > 0
      ? Math.min(consumed / goal, 1)
      : 0;

  const size = 220;
  const strokeWidth = 14;
  const radius =
    (size - strokeWidth) / 2;

  const circumference =
    2 * Math.PI * radius;

  const strokeDashoffset =
    circumference -
    progress * circumference;

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
      <Text
        style={[
          styles.title,
          {
            color: colors.text,
          },
        ]}
      >
        Calorías
      </Text>

      <View style={styles.circleContainer}>
        <Svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* CÍRCULO DE FONDO */}

          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.surface}
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* PROGRESO */}

          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.primary}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={
              strokeDashoffset
            }
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>

        {/* CONTENIDO DEL CÍRCULO */}

        <View
          style={styles.circleContent}
        >
          <Text
            style={[
              styles.remainingLabel,
              {
                color:
                  colors.secondaryText,
              },
            ]}
          >
            Restante
          </Text>

          <Text
            style={[
              styles.remainingValue,
              {
                color: colors.text,
              },
            ]}
          >
            {remaining}
          </Text>

          <Text
            style={[
              styles.kcal,
              {
                color: colors.text,
              },
            ]}
          >
            kcal
          </Text>
        </View>
      </View>

      {/* META */}

      <Text
        style={[
          styles.goalText,
          {
            color:
              colors.secondaryText,
          },
        ]}
      >
        Meta {goal} kcal
      </Text>

      <Text
        style={[
          styles.consumedText,
          {
            color:
              colors.secondaryText,
          },
        ]}
      >
        {consumed} kcal consumidas
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 14,
    alignItems: 'center',
  },

  title: {
    width: '100%',
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 5,
  },

  circleContainer: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circleContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },

  remainingLabel: {
    fontSize: 15,
    marginBottom: 2,
  },

  remainingValue: {
    fontSize: 42,
    fontWeight: '800',
    lineHeight: 48,
  },

  kcal: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 1,
  },

  goalText: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
  },

  consumedText: {
    fontSize: 12,
    marginTop: 6,
  },
});