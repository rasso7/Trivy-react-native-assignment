import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { faker } from "@faker-js/faker";
import { LinearGradient } from "expo-linear-gradient";
const Yolo = () => {
  const [selected, setSelected] = useState("pay");
  const [isFrozen, setIsFrozen] = useState(true);
  const [showCVV, setShowCVV] = useState(false);

  // State for card details
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  // Animation state
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Generate card details only once when component mounts
  useEffect(() => {
    setCardNumber(faker.finance.creditCardNumber("#### #### #### ####"));
    setExpiryDate(
      faker.date.future().toLocaleDateString("en-GB", {
        month: "2-digit",
        year: "2-digit",
      })
    );
    setCvv(faker.finance.creditCardCVV());
  }, []);

  // Handle fade-in effect
  useEffect(() => {
    if (!isFrozen) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500, // 500ms fade-in effect
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [isFrozen]);

  return (
    <View className="flex-1 bg-black p-6">
      {/* Title */}
      <Text className="text-white text-2xl font-bold mt-4">
        Select Payment Mode
      </Text>
      <Text className="text-gray-400 mt-2 text-lg">
        Choose your preferred payment method to make payment.
      </Text>

      {/* Payment Mode Buttons */}
      <View className="flex-row mt-4">
        {/* Pay Button */}
        <LinearGradient
          colors={["white", "#181818"]}
          style={{
            borderRadius: 25,
            padding: 1,
            marginHorizontal: 5,
          }}
        >
          <View
            style={{
              paddingVertical: 12,
              paddingHorizontal: 40,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black", // Fixed color for Pay button
              borderRadius: 25,
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Pay</Text>
          </View>
        </LinearGradient>

        {/* Card Button */}
        <LinearGradient
          colors={["#A90808", "rgba(169, 8, 8, 0)"]}
          style={{
            borderRadius: 25,
            padding: 1,
            marginHorizontal: 5,
          }}
        >
          <View
            style={{
              paddingVertical: 12,
              paddingHorizontal: 40,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black", // Fixed color for Card button
              borderRadius: 25,
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Card</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Card Section */}
      <Text className="text-gray-400 mt-6">YOUR DIGITAL DEBIT CARD</Text>

      <View className="relative mt-4">
        {isFrozen ? (
          <View className="w-65 h-78 rounded-xl">
            <Image
              source={require("@/assets/images/freeze1.png")}
              className="w-65 h-78 rounded-xl"
              resizeMode="cover"
            />
          </View>
        ) : (
          <Animated.View
            style={{ opacity: fadeAnim }}
            className="w-65 h-78 bg-black rounded-xl p-4 relative"
          >
            <Image
              source={require("@/assets/images/un1.png")}
              className="absolute inset-0 w-65 h-78 rounded-xl"
              resizeMode="cover"
            />

            {/* Logos */}
            <View className="absolute top-4 left-4 flex-row">
              <Image
                source={require("@/assets/images/yolo.png")}
                className="w-14 h-8"
                resizeMode="contain"
              />
            </View>
            <View className="absolute top-4 left-[120px]">
              <Image
                source={require("@/assets/images/yes.png")}
                className="w-12 h-6 mt-1"
                resizeMode="contain"
              />
            </View>

            {/* Card Number */}
            <View className="absolute top-[72px] left-[25px]">
              {cardNumber.split(" ").map((chunk, index) => (
                <Text key={index} className="text-white text-lg">
                  {chunk}
                </Text>
              ))}
            </View>

            {/* Expiry & CVV Section */}
            <View className="absolute top-[72px] left-[88px] flex-col">
              <Text className="text-gray-400 text-sm">expiry</Text>
              <Text className="text-white">{expiryDate}</Text>
            </View>

            <View className="absolute top-[125px] left-[88px] flex-col">
              <Text className="text-gray-400">CVV</Text>
              <View className="flex-row items-center">
                <Text className="text-white text-lg">
                  {showCVV ? (
                    cvv
                  ) : (
                    <>
                      <FontAwesome
                        name="snowflake-o"
                        size={10}
                        color={isFrozen ? "red" : "white"}
                        className="mr-2"
                      />
                      <FontAwesome
                        name="snowflake-o"
                        size={10}
                        color={isFrozen ? "red" : "white"}
                        className="mr-2"
                      />
                      <FontAwesome
                        name="snowflake-o"
                        size={10}
                        color={isFrozen ? "red" : "white"}
                      />
                    </>
                  )}
                </Text>
                <TouchableOpacity
                  onPress={() => setShowCVV(!showCVV)}
                  className="ml-2"
                >
                  <Feather
                    name={showCVV ? "eye" : "eye-off"}
                    size={24}
                    color={showCVV ? "white" : "red"}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Copy Details Button */}
            <TouchableOpacity className="absolute top-[185px] left-[25px] flex-row items-center">
              <FontAwesome5 name="copy" size={15} color="red" />
              <Text className="text-red-600 ml-2 text-base">Copy Details</Text>
            </TouchableOpacity>

            {/* RuPay Logo */}
            <View className="absolute top-[240px] left-[75px]">
              <Image
                source={require("@/assets/images/rupay.png")}
                className="w-32 h-12"
                resizeMode="contain"
              />
            </View>
          </Animated.View>
        )}
      </View>

      {/* Freeze/Unfreeze Button */}
      <TouchableOpacity
        className="absolute bottom-[310px] left-[225px] flex items-center"
        onPress={() => setIsFrozen(!isFrozen)}
      >
        <LinearGradient
          colors={
            isFrozen ? ["#A90808", "rgba(169, 8, 8, 0)"] : ["white", "#181818"]
          }
          style={{
            borderRadius: 25,
            padding: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black",
            }}
          >
            <FontAwesome
              name="snowflake-o"
              size={18}
              color={isFrozen ? "red" : "white"}
            />
          </View>
        </LinearGradient>

        <Text className={`mt-1 ${isFrozen ? "text-red-600" : "text-white"}`}>
          {isFrozen ? "Unfreeze" : "Freeze"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Yolo;
