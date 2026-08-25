import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Más adelante conectaremos esto con Supabase.
    navigation.replace('Main');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Crear cuenta</Text>

        <Text style={styles.subtitle}>
          Crea tu cuenta para comenzar a controlar tus calorías.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.loginText}>
            ¿Ya tienes una cuenta?{' '}
            <Text style={styles.loginLink}>Inicia sesión</Text>
          </Text>
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
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#666666',
    marginBottom: 30,
    lineHeight: 22,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    height: 52,
    backgroundColor: '#000000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  loginText: {
    textAlign: 'center',
    marginTop: 25,
    color: '#666666',
  },

  loginLink: {
    color: '#000000',
    fontWeight: 'bold',
  },
});