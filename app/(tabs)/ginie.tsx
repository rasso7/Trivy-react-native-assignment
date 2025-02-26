import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";

const options = [
  {
    title: "Personal information",
    icon: "person-outline",
    content: "Update your personal details like name, email, etc.",
  },
  {
    title: "Login and security",
    icon: "lock-closed-outline",
    content: "Manage your password and two-factor authentication.",
  },
  {
    title: "Customer Support",
    icon: "headset-outline",
    content: "Contact support for any issues or queries.",
  },
  {
    title: "Language",
    icon: "globe-outline",
    content: "Change the language of the app.",
  },
  {
    title: "Share the app",
    icon: "share-outline",
    chevron: "chevron-forward-outline",
    content: "Share this app with your friends and family.",
  },
];

const Ginie = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const navigation = useNavigation();

  const toggleDropdown = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <ScrollView
      className="flex-1 bg-[#F6F6F6] mt-6 mb-[100px]"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 mb-4">
        {/* Upper Section */}
        <View className="bg-[#28023a] h-72 justify-center items-center relative">
          {/* Back Button */}
          <View className="absolute top-4 left-4">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="border border-white rounded-full p-2 bg-white/20"
            >
              <Ionicons name="arrow-back-outline" size={22} color="white" />
            </TouchableOpacity>
          </View>

          {/* Profile Image */}
          <Image
            source={require("@/assets/images/profile.jpg")}
            className="w-24 h-24 rounded-full border-2 border-white shadow-lg"
          />
          <Text className="text-xl font-semibold text-white mt-2">
            Md Rashid
          </Text>
          <Text className="text-sm text-white/90">mdrashid.123@gmail.com</Text>
        </View>

        {/* Info Section */}
        <View className="flex-row justify-around bg-white py-4 -mt-12 rounded-2xl mx-4 shadow-md border border-gray-200">
          {[
            { value: "72 kg", label: "Weight" },
            { value: "5ft 11", label: "Height" },
            { value: "21 yrs", label: "Age" },
          ].map((item, index) => (
            <TouchableOpacity key={index} className="items-center">
              <Text className="text-lg font-bold text-gray-900">
                {item.value}
              </Text>
              <Text className="text-sm text-gray-600 font-medium">
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Options Section */}
        <View className="mt-3 px-4">
          {options.map((item, index) => (
            <View key={index} className="mb-2">
              <TouchableOpacity
                onPress={() => toggleDropdown(index)}
                className="flex-row items-center justify-between p-4 rounded-lg bg-white shadow-sm border border-gray-200"
              >
                <View className="flex-row items-center space-x-4">
                  <Ionicons name={item.icon} size={22} color="#128C7E" />
                  <Text className="text-base text-gray-800 ml-2">
                    {item.title}
                  </Text>
                </View>
                <Ionicons
                  name={
                    expandedItem === index
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                  size={20}
                  color="#128C7E"
                />
              </TouchableOpacity>
              {expandedItem === index && (
                <View className="bg-gray-100 p-4 rounded-b-lg border border-gray-200">
                  <Text className="text-sm text-gray-700">{item.content}</Text>
                </View>
              )}
            </View>
          ))}

          {/* Logout */}
          <TouchableOpacity
            onPress={() => router.push("/")}
            className="flex-row items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 mt-2"
          >
            <View className="flex-row items-center space-x-4">
              <Ionicons name="power-outline" size={24} color="red" />
              <Text className="text-base text-red-500 font-semibold">
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="mt-6 px-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-sm text-gray-500">Member ID</Text>
            <TouchableOpacity className="flex-row items-center space-x-1">
              <Text className="text-sm text-gray-500 mr-2">19202033724</Text>
              <Ionicons name="copy-outline" size={16} color="gray" />
            </TouchableOpacity>
          </View>
          <Text className="text-sm text-gray-500 mt-2">Version: 03</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Ginie;
