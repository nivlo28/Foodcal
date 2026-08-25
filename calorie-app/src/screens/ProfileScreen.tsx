import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { TabParamList } from '../navigation/TabsNavigator';

type Props = BottomTabScreenProps<TabParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.title}>Mi perfil</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>

          <Text style={styles.name}>Usuario</Text>
          <Text style={styles.email}>usuario@email.com</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Mis objetivos</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Meta diaria</Text>
            <Text style={styles.value}>2400 kcal</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Peso</Text>
            <Text style={styles.value}>-- kg</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Altura</Text>
            <Text style={styles.value}>-- cm</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.getParent()?.navigate('Login' as never)}
        >
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  profileCard: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingVertical: 25,
    marginBottom: 20,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  avatarText: {
    fontSize: 35,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  email: {
    fontSize: 14,
    color: '#777777',
    marginTop: 5,
  },

  infoCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  label: {
    fontSize: 15,
    color: '#666666',
  },

  value: {
    fontSize: 15,
    fontWeight: '600',
  },

  editButton: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },

  logoutButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});