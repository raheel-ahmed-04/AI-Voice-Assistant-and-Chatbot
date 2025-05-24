// components/MessageBubble.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MessageBubble = ({ text, fromUser, onSpeak }) => {
  return (
    <View
      style={[
        styles.bubble,
        fromUser ? styles.userBubble : styles.aiBubble,
      ]}
    >
      <Text style={[styles.text, fromUser ? styles.userText : styles.aiText]}>
        {text}
      </Text>
      
      {!fromUser && (
        <TouchableOpacity onPress={onSpeak} style={styles.speakerIcon}>
          <Ionicons name="volume-high" size={18} color="#555" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    position: "relative",
  },
  userBubble: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
  },
  aiBubble: {
    backgroundColor: "#e5e5ea",
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 16,
  },
  userText: {
    color: "#fff",
  },
  aiText: {
    color: "#000",
  },
  speakerIcon: {
    position: "absolute",
    bottom: 6,
    right: 6,
  },
});

export default MessageBubble;
