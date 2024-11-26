import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Keyboard, Text } from 'react-native';
import React from 'react';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  const handleBlankSpaceClick = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handleBlankSpaceClick}
      activeOpacity={1}
    >
      <LoginScreen />
      <StatusBar style="auto" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
