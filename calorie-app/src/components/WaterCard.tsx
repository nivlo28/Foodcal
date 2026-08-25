import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useTheme } from '../contexts/ThemeContext';

type Props = {
  amount: number;
  goal: number;
  onAdd: () => void;
  onRemove: () => void;
};

export default function WaterCard({
  amount,
  goal,
  onAdd,
  onRemove,
}: Props) {
  const { colors } = useTheme();

  const progress =
    goal > 0
      ? Math.min(amount / goal, 1)
      : 0;

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
            💧
          </Text>
        </View>

        <View style={styles.headerInfo}>

          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}
          >
            Hidratación
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
            {amount} / {goal} ml
          </Text>

        </View>

        <Text
          style={[
            styles.percentage,
            {
              color: colors.primary,
            },
          ]}
        >
          {Math.round(progress * 100)}%
        </Text>

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
              width: `${progress * 100}%`,
              backgroundColor:
                colors.primary,
            },
          ]}
        />
      </View>

      <View style={styles.bottom}>

        <Text
          style={[
            styles.remaining,
            {
              color:
                colors.secondaryText,
            },
          ]}
        >
          {Math.max(goal - amount, 0)} ml restantes
        </Text>

        <View style={styles.buttons}>

          <TouchableOpacity
            style={[
              styles.smallButton,
              {
                backgroundColor:
                  colors.surface,
              },
            ]}
            onPress={onRemove}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color:
                    colors.secondaryText,
                },
              ]}
            >
              −
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.addButton,
              {
                backgroundColor:
                  colors.primary,
              },
            ]}
            onPress={onAdd}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>
              +250 ml
            </Text>
          </TouchableOpacity>

        </View>

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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    fontSize: 24,
  },

  headerInfo: {
    flex: 1,
    marginLeft: 13,
  },

  title: {
    fontSize: 17,
    fontWeight: '800',
  },

  subtitle: {
    fontSize: 13,
    marginTop: 3,
  },

  percentage: {
    fontSize: 17,
    fontWeight: '800',
  },

  progressBackground: {
    height: 9,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  progress: {
    height: '100%',
    borderRadius: 10,
  },

  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
    marginTop: 15,
  },

  remaining: {
    fontSize: 12,
  },

  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  smallButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 24,
    fontWeight: '500',
  },

  addButton: {
    height: 38,
    paddingHorizontal: 13,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
});