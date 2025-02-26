import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { faker } from "@faker-js/faker";

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
      <Text className="text-white text-2xl font-bold mt-2">
        Select Payment Mode
      </Text>
      <Text className="text-gray-400 mt-4 text-lg">
        Choose your preferred payment method to make payment.
      </Text>

      {/* Payment Mode Buttons */}
      <View className="flex-row mt-4">
        <TouchableOpacity
          className={`px-10 py-3 border border-white rounded-full ${
            selected === "pay" ? "bg-black" : "bg-transparent"
          }`}
          onPress={() => setSelected("pay")}
        >
          <Text className="text-lg text-white">Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`ml-4 px-10 py-3 border border-red-600 rounded-full ${
            selected === "card" ? "bg-red-600" : "bg-transparent"
          }`}
          onPress={() => setSelected("card")}
        >
          <Text
            className={`text-lg ${
              selected === "card" ? "text-white" : "text-red-600"
            }`}
          >
            Card
          </Text>
        </TouchableOpacity>
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
        <View
          className={`w-12 h-12 rounded-full flex items-center justify-center border ${
            isFrozen ? "border-red-700 bg-black" : "border-white bg-transparent"
          }`}
        >
          <FontAwesome
            name="snowflake-o"
            size={18}
            color={isFrozen ? "red" : "white"}
          />
        </View>
        <Text className={`mt-1 ${isFrozen ? "text-red-600" : "text-white"}`}>
          {isFrozen ? "Unfreeze" : "Freeze"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Yolo;
