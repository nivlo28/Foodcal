import React, {
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import {
  MealType,
  useFood,
} from '../contexts/FoodContext';

import { useTheme } from '../contexts/ThemeContext';

type Props = {
  visible: boolean;
  imageUri: string | null;
  mealType: MealType;
  onClose: () => void;
};

export default function AddFoodModal({
  visible,
  imageUri,
  mealType,
  onClose,
}: Props) {
  const { colors } =
    useTheme();

  const { addFood } =
    useFood();

  const [name, setName] =
    useState('');

  const [calories, setCalories] =
    useState('');

  const [protein, setProtein] =
    useState('');

  const [carbs, setCarbs] =
    useState('');

  const [fat, setFat] =
    useState('');

  const reset = () => {
    setName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSave = () => {
    const calorieNumber =
      Number(calories);

    if (
      !name.trim() ||
      !calorieNumber ||
      calorieNumber <= 0 ||
      !imageUri
    ) {
      return;
    }

    addFood({
      name: name.trim(),
      calories:
        calorieNumber,
      protein:
        Number(protein) || 0,
      carbs:
        Number(carbs) || 0,
      fat:
        Number(fat) || 0,
      mealType,
      image: imageUri,
    });

    reset();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={
        handleClose
      }
    >
      <View
        style={
          styles.overlay
        }
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
              styles.handle
            }
          />

          <View
            style={
              styles.header
            }
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
                Agregar comida
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
                {mealType}
              </Text>
            </View>

            <TouchableOpacity
              onPress={
                handleClose
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

          <ScrollView
            showsVerticalScrollIndicator={
              false
            }
          >
            {imageUri && (
              <Image
                source={{
                  uri: imageUri,
                }}
                style={
                  styles.foodImage
                }
              />
            )}

            <Text
              style={[
                styles.label,
                {
                  color:
                    colors.secondaryText,
                },
              ]}
            >
              Nombre de la comida
            </Text>

            <TextInput
              value={name}
              onChangeText={
                setName
              }
              placeholder="Ej. Pollo con arroz"
              placeholderTextColor={
                colors.secondaryText
              }
              style={[
                styles.input,
                {
                  color:
                    colors.text,
                  backgroundColor:
                    colors.surface,
                  borderColor:
                    colors.border,
                },
              ]}
            />

            <Text
              style={[
                styles.label,
                {
                  color:
                    colors.secondaryText,
                },
              ]}
            >
              Calorías
            </Text>

            <TextInput
              value={calories}
              onChangeText={
                setCalories
              }
              placeholder="Ej. 550"
              placeholderTextColor={
                colors.secondaryText
              }
              keyboardType="numeric"
              style={[
                styles.input,
                {
                  color:
                    colors.text,
                  backgroundColor:
                    colors.surface,
                  borderColor:
                    colors.border,
                },
              ]}
            />

            <Text
              style={[
                styles.label,
                {
                  color:
                    colors.secondaryText,
                },
              ]}
            >
              Macronutrientes
            </Text>

            <View
              style={
                styles.macroRow
              }
            >
              <MacroInput
                value={protein}
                onChangeText={
                  setProtein
                }
                placeholder="Proteína"
                colors={colors}
              />

              <MacroInput
                value={carbs}
                onChangeText={
                  setCarbs
                }
                placeholder="Carbos"
                colors={colors}
              />

              <MacroInput
                value={fat}
                onChangeText={
                  setFat
                }
                placeholder="Grasas"
                colors={colors}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.saveButton,
                {
                  backgroundColor:
                    colors.primary,
                  opacity:
                    name.trim() &&
                    calories
                      ? 1
                      : 0.5,
                },
              ]}
              disabled={
                !name.trim() ||
                !calories
              }
              onPress={
                handleSave
              }
            >
              <Text
                style={
                  styles.saveText
                }
              >
                Guardar comida
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                styles.cancelButton
              }
              onPress={
                handleClose
              }
            >
              <Text
                style={[
                  styles.cancelButtonText,
                  {
                    color:
                      colors.secondaryText,
                  },
                ]}
              >
                Cancelar
              </Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

type MacroInputProps = {
  value: string;
  onChangeText: (
    value: string
  ) => void;
  placeholder: string;
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

function MacroInput({
  value,
  onChangeText,
  placeholder,
  colors,
}: MacroInputProps) {
  return (
    <TextInput
      value={value}
      onChangeText={
        onChangeText
      }
      placeholder={placeholder}
      placeholderTextColor={
        colors.secondaryText
      }
      keyboardType="decimal-pad"
      style={[
        styles.macroInput,
        {
          color:
            colors.text,
          backgroundColor:
            colors.surface,
          borderColor:
            colors.border,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor:
      'rgba(0,0,0,0.5)',
  },

  modal: {
    maxHeight: '92%',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 25,
  },

  handle: {
    width: 42,
    height: 4,
    borderRadius: 10,
    backgroundColor:
      '#A0A0A0',
    alignSelf: 'center',
    marginBottom: 18,
  },

  header: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
  },

  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },

  close: {
    fontSize: 30,
    fontWeight: '300',
  },

  foodImage: {
    width: '100%',
    height: 190,
    borderRadius: 20,
    marginBottom: 18,
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 7,
    marginTop: 5,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 15,
    fontSize: 15,
  },

  macroRow: {
    flexDirection: 'row',
    gap: 8,
  },

  macroInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 10,
    fontSize: 13,
  },

  saveButton: {
    height: 52,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },

  saveText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  cancelButton: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
});