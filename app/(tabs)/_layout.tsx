import { Tabs } from "expo-router";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { HapticTab } from "@/components/HapticTab";

import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";

// Import Background Image
const tabBarBg = require("@/assets/images/tab1.png");

const TabBarBackgroundImage = () => (
  <ImageBackground
    source={tabBarBg}
    style={styles.backgroundImage}
    resizeMode="stretch"
  >
    <View style={styles.overlay} />
  </ImageBackground>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff", // White for active icons
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackgroundImage,
        tabBarStyle: {
          position: "absolute",
          height: 72,
        },
        tabBarLabelStyle: {
          position: "absolute",
          bottom: 28, // Move label slightly up
          fontSize: 10, // Adjust size if needed
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={[
                styles.iconContainer,
                { borderColor: focused ? "#fff" : "rgba(255,255,255,0.5)" },
              ]}
            >
              <AntDesign name="home" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="yolo"
        options={{
          title: "Yolo Play",
          tabBarLabelStyle: {
            bottom: 12,
            fontSize: 10,
          },
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={[
                styles.iconContainer,
                {
                  borderColor: focused ? "#fff" : "rgba(255,255,255,0.5)",
                  marginBottom: 18, // Keep middle tab icon lifted
                },
              ]}
            >
              <MaterialIcons name="qr-code-scanner" size={size} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="ginie"
        options={{
          title: "Ginie",
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={[
                styles.iconContainer,
                { borderColor: focused ? "#fff" : "rgba(255,255,255,0.5)" },
              ]}
            >
              <MaterialCommunityIcons
                name="brightness-percent"
                size={size}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

// Styles
const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: 100,
    bottom: 0,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    paddingBottom: 15,
  },
});
