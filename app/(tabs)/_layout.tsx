import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { HapticTab } from "@/components/HapticTab";

import { useColorScheme } from "@/hooks/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";
const homeIcon = require("@/assets/images/home.png");
const ginieIcon = require("@/assets/images/ginie.png");

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
          height: 65,
          paddingHorizontal: 22,
        },
        tabBarLabelStyle: {
          position: "absolute",
          bottom: 8, // Move label slightly up
          fontSize: 10, // Adjust size if needed
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <LinearGradient
              colors={focused ? ["white", "#181818"] : ["#555", "#111"]}
              style={[styles.gradientBorder, { marginBottom: 11 }]}
            >
              <View style={styles.iconContainer}>
                <Image
                  source={homeIcon}
                  style={[
                    styles.icon,
                    { tintColor: focused ? "white" : "#777" },
                  ]}
                  resizeMode="contain"
                />
              </View>
            </LinearGradient>
          ),
        }}
      />
      <Tabs.Screen
        name="yolo"
        options={{
          title: "Yolo Play",
          tabBarIcon: ({ color, size, focused }) => (
            <LinearGradient
              colors={focused ? ["white", "#181818"] : ["#555", "#111"]}
              style={[styles.gradientBorder, { marginBottom: 27 }]}
            >
              <View style={[styles.iconContainer]}>
                <MaterialIcons
                  name="qr-code-scanner"
                  size={focused ? size * 1.2 : size}
                  color={focused ? "white" : "#777"}
                />
              </View>
            </LinearGradient>
          ),
        }}
      />
      <Tabs.Screen
        name="ginie"
        options={{
          title: "Ginie",
          tabBarIcon: ({ color, size, focused }) => (
            <LinearGradient
              colors={focused ? ["white", "#181818"] : ["#555", "#111"]}
              style={[styles.gradientBorder, { marginBottom: 11 }]}
            >
              <View style={[styles.iconContainer]}>
                <MaterialCommunityIcons
                  name="brightness-percent"
                  size={focused ? size * 1.2 : size}
                  color={focused ? "white" : "#777"}
                />
              </View>
            </LinearGradient>
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
  gradientBorder: {
    padding: 2,
    borderRadius: 30,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 27,
    height: 27,
  },
});
