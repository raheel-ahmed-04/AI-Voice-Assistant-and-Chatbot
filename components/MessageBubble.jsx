import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MessageBubble = ({ text, fromUser }) => {
  return (
    <View style={[styles.message, fromUser ? styles.userMsg : styles.aiMsg]}>
      <Text style={styles.messageText}>{text}</Text>
    </View>
  );
};

export default MessageBubble;

const styles = StyleSheet.create({
  message: {
    padding: 10,
    marginVertical: 4,
    borderRadius: 8,
    maxWidth: "80%",
  },
  userMsg: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  aiMsg: {
    backgroundColor: "#eee",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#333",
  },
});
