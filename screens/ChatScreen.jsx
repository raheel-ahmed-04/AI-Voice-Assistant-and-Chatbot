import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import LottieView from "lottie-react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GoogleGenerativeAI } from "@google/generative-ai";
// import { GEMINI_API_KEY } from "@env"; 
import MessageBubble from "../components/MessageBubble";
// import Constants from "expo-constants";



const ChatScreen = () => {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const animationRef = useRef(null);
  
// const genAI = new GoogleGenerativeAI(Constants.expoConfig.extra.GEMINI_API_KEY);
  const genAI = new GoogleGenerativeAI("AIzaSyDlR5kE0_7lwmE1nWfj9jIeWWysloPIw60");

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    saveMessages();
  }, [messages]);

  const loadMessages = async () => {
    const saved = await AsyncStorage.getItem("messages");
    if (saved) setMessages(JSON.parse(saved));
  };

  const saveMessages = async () => {
    await AsyncStorage.setItem("messages", JSON.stringify(messages));
  };

  const clearMessages = async () => {
  await AsyncStorage.removeItem("messages");
  setMessages([]);
};

  const sendMessage = () => {
    if (!text.trim()) return;
    const newMessage = { id: Date.now().toString(), text, fromUser: true };
    setMessages([...messages, newMessage]);
    setText("");
    simulateAIResponse(text);
  };

  const simulateAIResponse = async (userText) => {
  try {
    setIsTyping(true);
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(`make concise and clear response on my question: ${userText}`);
    const response = await result.response;
    const aiText = response.text();

    const aiMessage = {
      id: Date.now().toString(),
      text: aiText || `AI Said: ${userText}`,
      fromUser: false,
    };
    setMessages((prev) => [...prev, aiMessage]);
  } catch (error) {
    const errorMessage = {
      id: Date.now().toString(),
      text: "Error from AI: " + error.message,
      fromUser: false,
    };
    setMessages((prev) => [...prev, errorMessage]);
  } finally {
    setIsTyping(false);
  }
};


  const speak = () => {
    Speech.speak("Listening is not yet implemented in Expo", {
      rate: 1.0,
    });
  };

  const renderItem = ({ item }) => (
    <MessageBubble text={item.text} fromUser={item.fromUser} />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F7FA" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 15 : 0}
      >
        {/* Top Bar */}
        <View style={[styles.topBar, { paddingTop: insets.top }]}>
          <Text style={styles.topBarText}>AI Assistant</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={clearMessages} style={styles.clearBtn}>
                <Ionicons name="trash-bin-outline" size={22} color="#FF3B30" />
                </TouchableOpacity>
                <Ionicons name="chatbubbles-outline" size={24} color="#555" style={{ marginLeft: 12 }} />
            </View>
        </View>

        {/* Chat */}
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatContainer}
          keyboardShouldPersistTaps="handled"
        />

        {/* Typing Animation */}
        {isTyping && (
          <LottieView
            source={require("../assets/ai-typing-indicator.json")}
            autoPlay
            loop
            style={{
              width: 100,
              height: 50,
              alignSelf: "flex-start",
              marginLeft: 16,
            }}
            ref={animationRef}
          />
        )}

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={speak} style={styles.micBtn}>
            <AntDesign name="sound" size={20} color="#333" />
          </TouchableOpacity>
          <TextInput
            placeholder="Ask me anything..."
            placeholderTextColor="#888"
            value={text}
            onChangeText={setText}
            style={styles.input}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
            <Text style={{ color: "#fff" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  topBarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 10,
  },
  

  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
    color: "#000",
    marginHorizontal: 10,
  },
  sendBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  micBtn: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 20,
  },
});
