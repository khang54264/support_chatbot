import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleLogin = async () => {
        //LAN WIFI
    try {
      const response = await axios.post('http://192.168.1.96:5000/api/users/login', { // Replace with your backend URL
        username: username,
        password: password,
      });
    
        //PHONE 4G
    //   const response = await axios.post('http://localhost:5000/api/users/login', { // Replace with your backend URL
    //     username: username,
    //     password: password,
    //   });

      if (response.status === 200) {
      // Login successful
      const { message, token, userId } = response.data; // Get userId
      Alert.alert('Login Successful', message);

      // Store the token using AsyncStorage
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userId', userId); // Store userId

      // Navigate to the MainDrawer screen
      navigation.navigate('MainDrawer');

    } else {
      // Login failed
      Alert.alert('Login Failed', response.data.message || 'Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      Alert.alert('Login Error', error.response.data.message || 'Invalid credentials');
    } else if (error.request) {
      // The request was made but no response was received
      Alert.alert('Login Error', 'No response from server. Please check your internet connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      Alert.alert('Login Error', 'An error occurred during login.');
    }
  }
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword} // Toggle secureTextEntry based on state
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.icon} onPress={togglePasswordVisibility}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'} // Choose eye or eye-off icon
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  icon: {
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Login;