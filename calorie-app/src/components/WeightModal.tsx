import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useTheme } from '../contexts/ThemeContext';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (weight: number) => void;
};

export default function WeightModal({
  visible,
  onClose,
  onSave,
}: Props) {
  const { colors } = useTheme();

  const [weight, setWeight] =
    useState('');

  const handleSave = () => {
    const numericWeight = Number(
      weight.replace(',', '.')
    );

    if (
      !numericWeight ||
      numericWeight <= 0
    ) {
      return;
    }

    onSave(numericWeight);
    setWeight('');
  };

  const handleClose = () => {
    setWeight('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>

        <View
          style={[
            styles.modal,
            {
              backgroundColor:
                colors.card,
              borderColor:
                colors.border,
            },
          ]}
        >

          {/* HEADER */}

          <View style={styles.header}>

            <View>
              <Text
                style={[
                  styles.title,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Registrar peso
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
                Actualiza tu peso actual
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.closeButton,
                {
                  backgroundColor:
                    colors.surface,
                },
              ]}
              onPress={handleClose}
            >
              <Text
                style={[
                  styles.closeText,
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

          {/* ICONO */}

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

          {/* INPUT */}

          <Text
            style={[
              styles.label,
              {
                color:
                  colors.secondaryText,
              },
            ]}
          >
            Peso actual
          </Text>

          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor:
                  colors.surface,
                borderColor:
                  colors.border,
              },
            ]}
          >
            <TextInput
              style={[
                styles.input,
                {
                  color: colors.text,
                },
              ]}
              value={weight}
              onChangeText={setWeight}
              placeholder="Ej. 153.3"
              placeholderTextColor={
                colors.secondaryText
              }
              keyboardType="decimal-pad"
              autoFocus
            />

            <Text
              style={[
                styles.unit,
                {
                  color:
                    colors.secondaryText,
                },
              ]}
            >
              lb
            </Text>
          </View>

          {/* BOTONES */}

          <View style={styles.buttons}>

            <TouchableOpacity
              style={[
                styles.cancelButton,
                {
                  backgroundColor:
                    colors.surface,
                },
              ]}
              onPress={handleClose}
            >
              <Text
                style={[
                  styles.cancelText,
                  {
                    color:
                      colors.secondaryText,
                  },
                ]}
              >
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.saveButton,
                {
                  backgroundColor:
                    colors.primary,
                },
              ]}
              onPress={handleSave}
            >
              <Text style={styles.saveText}>
                Guardar
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor:
      'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  modal: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 24,
    borderWidth: 1,
    padding: 22,
  },

  header: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'flex-start',
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
  },

  subtitle: {
    fontSize: 13,
    marginTop: 4,
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeText: {
    fontSize: 25,
    marginTop: -3,
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 22,
    marginBottom: 20,
  },

  icon: {
    fontSize: 29,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 7,
  },

  inputContainer: {
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
    fontSize: 17,
  },

  unit: {
    fontSize: 14,
    fontWeight: '700',
  },

  buttons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 22,
  },

  cancelButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelText: {
    fontSize: 14,
    fontWeight: '700',
  },

  saveButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});