import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '../contexts/ThemeContext';

type Props = {
  protein: number;
  carbs: number;
  fat: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
};

export default function MacroCard({
  protein,
  carbs,
  fat,
  proteinGoal,
  carbsGoal,
  fatGoal,
}: Props) {
  const { colors } = useTheme();

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
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.title,
              { color: colors.text },
            ]}
          >
            Macronutrientes
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: colors.secondaryText },
            ]}
          >
            Progreso del día
          </Text>
        </View>

        <Text style={styles.icon}>🥗</Text>
      </View>

      <View style={styles.macrosRow}>
        <MacroItem
          label="Proteína"
          value={protein}
          goal={proteinGoal}
          unit="g"
          icon="💪"
          colors={colors}
        />

        <MacroItem
          label="Carbohidratos"
          value={carbs}
          goal={carbsGoal}
          unit="g"
          icon="🍞"
          colors={colors}
        />

        <MacroItem
          label="Grasas"
          value={fat}
          goal={fatGoal}
          unit="g"
          icon="🥑"
          colors={colors}
        />
      </View>
    </View>
  );
}

type MacroItemProps = {
  label: string;
  value: number;
  goal: number;
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

function MacroItem({
  label,
  value,
  goal,
  unit,
  icon,
  colors,
}: MacroItemProps) {
  const progress =
    goal > 0
      ? Math.min(value / goal, 1)
      : 0;

  return (
    <View style={styles.macroItem}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: colors.surface,
          },
        ]}
      >
        <Text style={styles.macroIcon}>
          {icon}
        </Text>
      </View>

      <Text
        style={[
          styles.label,
          { color: colors.secondaryText },
        ]}
      >
        {label}
      </Text>

      <View style={styles.valueRow}>
        <Text
          style={[
            styles.value,
            { color: colors.text },
          ]}
        >
          {Math.round(value)}
        </Text>

        <Text
          style={[
            styles.unit,
            { color: colors.secondaryText },
          ]}
        >
          / {Math.round(goal)}
          {unit}
        </Text>
      </View>

      <View
        style={[
          styles.progressBackground,
          {
            backgroundColor: colors.surface,
          },
        ]}
      >
        <View
          style={[
            styles.progress,
            {
              width: `${progress * 100}%`,
              backgroundColor: colors.primary,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 20,
    marginBottom: 14,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
  },

  subtitle: {
    fontSize: 13,
    marginTop: 3,
  },

  icon: {
    fontSize: 25,
  },

  macrosRow: {
    flexDirection: 'row',
    gap: 10,
  },

  macroItem: {
    flex: 1,
  },

  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },

  macroIcon: {
    fontSize: 18,
  },

  label: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },

  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },

  value: {
    fontSize: 18,
    fontWeight: '800',
  },

  unit: {
    fontSize: 10,
    marginLeft: 2,
  },

  progressBackground: {
    height: 6,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 8,
  },

  progress: {
    height: '100%',
    borderRadius: 10,
  },
});