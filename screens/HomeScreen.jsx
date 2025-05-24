import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LottieView from 'lottie-react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>"AI Voice Assistant & Chatbot"</Text>
      <Text style={styles.subtitle}>Made by Raheel Ahmed</Text>
      <Text style={styles.subtitle}>(FA22-BSE-077)</Text>
      <LottieView
        source={require('../assets/ai-animation.json')} // Use Lottie JSON animation
        autoPlay
        loop
        style={styles.animation}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat')}>
        <Text style={styles.buttonText}>Start Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1BB878', marginBottom: 20 },
  subtitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  animation: { width: 250, height: 250 },
  button: {
    marginTop: 30,
    backgroundColor: '#1BB878',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: { color: '#fff', fontSize: 18 },
});
