import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Curreny from "react-currency-formatter";

export default function BasketIcon() {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length === 0) return null;

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="mx-5 bg-[#EA004B] p-4 rounded-lg flex-row items-center space-x-1"
      >
        <Text className="text-white font-extrabold text-lg bg-[#c0033f] py-1 px-2 ">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-center text-base">
          Sepeti Görüntüle
        </Text>
        <Text className="text-white text-lg font-extralight">
          <Curreny quantity={basketTotal} currency="TRY" />
        </Text>
      </TouchableOpacity>
    </View>
  );
}
