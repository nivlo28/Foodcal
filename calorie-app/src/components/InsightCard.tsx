import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { useTheme } from '../contexts/ThemeContext';

export default function InsightCard() {
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
          💡
        </Text>
      </View>

      <View style={styles.content}>

        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}
        >
          Consejo del día
        </Text>

        <Text
          style={[
            styles.text,
            {
              color:
                colors.secondaryText,
            },
          ]}
        >
          Mantener una buena hidratación
          durante el día puede ayudarte
          a sentirte mejor y mantener un
          buen rendimiento.
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 17,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  iconContainer: {
    width: 43,
    height: 43,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    fontSize: 21,
  },

  content: {
    flex: 1,
    marginLeft: 13,
  },

  title: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 5,
  },

  text: {
    fontSize: 12,
    lineHeight: 18,
  },
});