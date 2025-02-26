import { Link, router } from "expo-router";
import React from "react";
import { View, Text, ImageBackground, StatusBar } from "react-native";

const Home = () => {
  return (
    <ImageBackground
      source={require("@/assets/images/main.jpg")} // Replace with your actual image URL
      className="flex-1 justify-end"
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
    </ImageBackground>
  );
};

export default Home;
