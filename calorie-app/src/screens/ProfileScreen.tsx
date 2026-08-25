import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { TabParamList } from '../navigation/TabsNavigator';

import { useFood } from '../contexts/FoodContext';
import { useTheme } from '../contexts/ThemeContext';

type Props = BottomTabScreenProps<
  TabParamList,
  'Profile'
>;

export default function ProfileScreen({
  navigation,
}: Props) {
  const {
    profile,
    calorieGoal,
    proteinGoal,
    waterGoal,
  } = useFood();

  const {
    colors,
    isDark,
    toggleTheme,
  } = useTheme();

  // =================================
  // FORMATEAR NÚMEROS
  // =================================

  const formatNumber = (
    value: number | null | undefined
  ) => {
    if (
      value === null ||
      value === undefined ||
      Number.isNaN(value)
    ) {
      return '--';
    }

    return Number.isInteger(value)
      ? value.toString()
      : value.toFixed(1);
  };

  // =================================
  // ACCIONES
  // =================================

  const handleEditProfile = () => {
    Alert.alert(
      'Editar información',
      'La edición del perfil la conectaremos en el siguiente paso.'
    );
  };

  const handleNotifications = () => {
    Alert.alert(
      'Notificaciones',
      'Las notificaciones estarán disponibles próximamente.'
    );
  };

  const handleUnits = () => {
    Alert.alert(
      'Unidades',
      'Actualmente usamos centímetros y libras.'
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Quieres cerrar tu sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => {
            // Después conectaremos aquí
            // el cierre real de sesión.
          },
        },
      ]
    );
  };

  // =================================
  // DATOS SEGUROS
  // =================================

  const profileName =
    profile?.name || 'Usuario';

  const profileAge =
    profile?.age ?? null;

  const profileWeight =
    profile?.weight ?? null;

  const profileHeight =
    profile?.height ?? null;

  const profileTargetWeight =
    profile?.targetWeight ?? null;

  const profileGoal =
    profile?.goal || 'Mantener peso';

  const profileActivity =
    profile?.activityLevel ||
    'No especificada';

  // =================================
  // RENDER
  // =================================

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
        showsVerticalScrollIndicator={false}
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
              Mi perfil
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
              Administra tu información
            </Text>
          </View>

          <View
            style={[
              styles.avatar,
              {
                backgroundColor:
                  colors.surface,
              },
            ]}
          >
            <Text
              style={styles.avatarText}
            >
              👤
            </Text>
          </View>
        </View>

        {/* =========================
            USUARIO
        ========================= */}

        <View
          style={[
            styles.userCard,
            {
              backgroundColor:
                colors.card,
              borderColor:
                colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.userName,
              {
                color:
                  colors.text,
              },
            ]}
          >
            {profileName}
          </Text>

          {profileAge !== null && (
            <Text
              style={[
                styles.userAge,
                {
                  color:
                    colors.secondaryText,
                },
              ]}
            >
              {profileAge} años
            </Text>
          )}
        </View>

        {/* =========================
            INFORMACIÓN PERSONAL
        ========================= */}

        <Text
          style={[
            styles.sectionTitle,
            {
              color:
                colors.text,
            },
          ]}
        >
          Información personal
        </Text>

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
          <InfoRow
            icon="⚖️"
            label="Peso actual"
            value={
              profileWeight !== null
                ? `${formatNumber(
                    profileWeight
                  )} lb`
                : '--'
            }
            colors={colors}
          />

          <InfoRow
            icon="📏"
            label="Estatura"
            value={
              profileHeight !== null
                ? `${formatNumber(
                    profileHeight
                  )} cm`
                : '--'
            }
            colors={colors}
          />

          <InfoRow
            icon="🎯"
            label="Peso objetivo"
            value={
              profileTargetWeight !== null
                ? `${formatNumber(
                    profileTargetWeight
                  )} lb`
                : '--'
            }
            colors={colors}
            last
          />
        </View>

        {/* =========================
            EDITAR
        ========================= */}

        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor:
                colors.surface,
            },
          ]}
          onPress={
            handleEditProfile
          }
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.actionText,
              {
                color:
                  colors.primary,
              },
            ]}
          >
            ✏️  Editar información
          </Text>

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

        {/* =========================
            OBJETIVO
        ========================= */}

        <Text
          style={[
            styles.sectionTitle,
            {
              color:
                colors.text,
            },
          ]}
        >
          Objetivo
        </Text>

        <View
          style={[
            styles.goalCard,
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
              styles.goalIcon,
              {
                backgroundColor:
                  colors.surface,
              },
            ]}
          >
            <Text
              style={styles.goalEmoji}
            >
              🎯
            </Text>
          </View>

          <View
            style={styles.goalInfo}
          >
            <Text
              style={[
                styles.goalTitle,
                {
                  color:
                    colors.text,
                },
              ]}
            >
              {profileGoal}
            </Text>

            <Text
              style={[
                styles.goalSubtitle,
                {
                  color:
                    colors.secondaryText,
                },
              ]}
            >
              Actividad:{' '}
              {profileActivity}
            </Text>
          </View>
        </View>

        {/* =========================
            METAS
        ========================= */}

        <Text
          style={[
            styles.sectionTitle,
            {
              color:
                colors.text,
            },
          ]}
        >
          Mis metas
        </Text>

        <View
          style={styles.goalsGrid}
        >
          <GoalCard
            icon="🔥"
            value={`${calorieGoal ?? 2400}`}
            unit="kcal"
            label="Calorías"
            colors={colors}
          />

          <GoalCard
            icon="💪"
            value={`${proteinGoal ?? 180}`}
            unit="g"
            label="Proteína"
            colors={colors}
          />

          <GoalCard
            icon="💧"
            value={`${waterGoal ?? 2500}`}
            unit="ml"
            label="Agua"
            colors={colors}
          />
        </View>

        {/* =========================
            CONFIGURACIÓN
        ========================= */}

        <Text
          style={[
            styles.sectionTitle,
            {
              color:
                colors.text,
            },
          ]}
        >
          Configuración
        </Text>

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

          {/* APARIENCIA */}

          <TouchableOpacity
            style={
              styles.settingRow
            }
            onPress={
              toggleTheme
            }
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.settingIcon,
                {
                  backgroundColor:
                    colors.surface,
                },
              ]}
            >
              <Text
                style={
                  styles.settingEmoji
                }
              >
                {isDark
                  ? '🌙'
                  : '☀️'}
              </Text>
            </View>

            <View
              style={
                styles.settingInfo
              }
            >
              <Text
                style={[
                  styles.settingTitle,
                  {
                    color:
                      colors.text,
                  },
                ]}
              >
                Apariencia
              </Text>

              <Text
                style={[
                  styles.settingSubtitle,
                  {
                    color:
                      colors.secondaryText,
                  },
                ]}
              >
                {isDark
                  ? 'Modo oscuro'
                  : 'Modo claro'}
              </Text>
            </View>

            <Text
              style={[
                styles.settingArrow,
                {
                  color:
                    colors.secondaryText,
                },
              ]}
            >
              ›
            </Text>
          </TouchableOpacity>

          {/* NOTIFICACIONES */}

          <TouchableOpacity
            style={
              styles.settingRow
            }
            onPress={
              handleNotifications
            }
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.settingIcon,
                {
                  backgroundColor:
                    colors.surface,
                },
              ]}
            >
              <Text
                style={
                  styles.settingEmoji
                }
              >
                🔔
              </Text>
            </View>

            <View
              style={
                styles.settingInfo
              }
            >
              <Text
                style={[
                  styles.settingTitle,
                  {
                    color:
                      colors.text,
                  },
                ]}
              >
                Notificaciones
              </Text>

              <Text
                style={[
                  styles.settingSubtitle,
                  {
                    color:
                      colors.secondaryText,
                  },
                ]}
              >
                Recordatorios y avisos
              </Text>
            </View>

            <Text
              style={[
                styles.settingArrow,
                {
                  color:
                    colors.secondaryText,
                },
              ]}
            >
              ›
            </Text>
          </TouchableOpacity>

          {/* UNIDADES */}

          <TouchableOpacity
            style={[
              styles.settingRow,
              styles.lastSettingRow,
            ]}
            onPress={
              handleUnits
            }
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.settingIcon,
                {
                  backgroundColor:
                    colors.surface,
                },
              ]}
            >
              <Text
                style={
                  styles.settingEmoji
                }
              >
                📏
              </Text>
            </View>

            <View
              style={
                styles.settingInfo
              }
            >
              <Text
                style={[
                  styles.settingTitle,
                  {
                    color:
                      colors.text,
                  },
                ]}
              >
                Unidades
              </Text>

              <Text
                style={[
                  styles.settingSubtitle,
                  {
                    color:
                      colors.secondaryText,
                  },
                ]}
              >
                cm y lb
              </Text>
            </View>

            <Text
              style={[
                styles.settingArrow,
                {
                  color:
                    colors.secondaryText,
                },
              ]}
            >
              ›
            </Text>
          </TouchableOpacity>

        </View>

        {/* =========================
            CERRAR SESIÓN
        ========================= */}

        <TouchableOpacity
          style={[
            styles.logoutButton,
            {
              backgroundColor:
                colors.card,
              borderColor:
                colors.border,
            },
          ]}
          onPress={
            handleLogout
          }
          activeOpacity={0.8}
        >
          <Text
            style={
              styles.logoutIcon
            }
          >
            🚪
          </Text>

          <Text
            style={
              styles.logoutText
            }
          >
            Cerrar sesión
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// =================================
// INFO ROW
// =================================

type InfoRowProps = {
  icon: string;
  label: string;
  value: string;
  colors: {
    text: string;
    secondaryText: string;
    border: string;
  };
  last?: boolean;
};

function InfoRow({
  icon,
  label,
  value,
  colors,
  last = false,
}: InfoRowProps) {
  return (
    <View
      style={[
        styles.infoRow,
        !last && {
          borderBottomColor:
            colors.border,
          borderBottomWidth: 1,
        },
      ]}
    >
      <View
        style={styles.infoLeft}
      >
        <Text
          style={styles.infoIcon}
        >
          {icon}
        </Text>

        <Text
          style={[
            styles.infoLabel,
            {
              color:
                colors.secondaryText,
            },
          ]}
        >
          {label}
        </Text>
      </View>

      <Text
        style={[
          styles.infoValue,
          {
            color:
              colors.text,
          },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

// =================================
// GOAL CARD
// =================================

type GoalCardProps = {
  icon: string;
  value: string;
  unit: string;
  label: string;
  colors: {
    card: string;
    border: string;
    text: string;
    secondaryText: string;
  };
};

function GoalCard({
  icon,
  value,
  unit,
  label,
  colors,
}: GoalCardProps) {
  return (
    <View
      style={[
        styles.goalSmallCard,
        {
          backgroundColor:
            colors.card,
          borderColor:
            colors.border,
        },
      ]}
    >
      <Text
        style={
          styles.goalSmallIcon
        }
      >
        {icon}
      </Text>

      <View
        style={
          styles.goalValueRow
        }
      >
        <Text
          style={[
            styles.goalValue,
            {
              color:
                colors.text,
            },
          ]}
        >
          {value}
        </Text>

        <Text
          style={[
            styles.goalUnit,
            {
              color:
                colors.secondaryText,
            },
          ]}
        >
          {unit}
        </Text>
      </View>

      <Text
        style={[
          styles.goalLabel,
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
    paddingTop: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
  },

  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontSize: 27,
  },

  userCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 25,
  },

  userName: {
    fontSize: 22,
    fontWeight: '800',
  },

  userAge: {
    fontSize: 14,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
  },

  card: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 18,
    marginBottom: 12,
  },

  infoRow: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
  },

  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoIcon: {
    fontSize: 20,
    width: 35,
  },

  infoLabel: {
    fontSize: 15,
    fontWeight: '600',
  },

  infoValue: {
    fontSize: 15,
    fontWeight: '800',
  },

  actionButton: {
    height: 50,
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
    marginBottom: 25,
  },

  actionText: {
    fontSize: 15,
    fontWeight: '800',
  },

  arrow: {
    fontSize: 27,
  },

  goalCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  goalEmoji: {
    fontSize: 23,
  },

  goalInfo: {
    marginLeft: 14,
    flex: 1,
  },

  goalTitle: {
    fontSize: 16,
    fontWeight: '800',
  },

  goalSubtitle: {
    fontSize: 13,
    marginTop: 4,
  },

  goalsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 25,
  },

  goalSmallCard: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
  },

  goalSmallIcon: {
    fontSize: 20,
    marginBottom: 8,
  },

  goalValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  goalValue: {
    fontSize: 20,
    fontWeight: '800',
  },

  goalUnit: {
    fontSize: 11,
    marginLeft: 3,
  },

  goalLabel: {
    fontSize: 12,
    marginTop: 4,
  },

  settingRow: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },

  lastSettingRow: {
    borderBottomWidth: 0,
  },

  settingIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },

  settingEmoji: {
    fontSize: 20,
  },

  settingInfo: {
    flex: 1,
    marginLeft: 13,
  },

  settingTitle: {
    fontSize: 15,
    fontWeight: '800',
  },

  settingSubtitle: {
    fontSize: 12,
    marginTop: 3,
  },

  settingArrow: {
    fontSize: 25,
    marginLeft: 10,
  },

  logoutButton: {
    height: 54,
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  logoutIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  logoutText: {
    color: '#D64545',
    fontSize: 15,
    fontWeight: '800',
  },
});