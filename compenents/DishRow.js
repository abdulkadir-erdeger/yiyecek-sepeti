import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Curreny from "react-currency-formatter";
import { urlFor } from "../sanity";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  RemoveFromBasket,
  SelectBasketItemsWithId,
} from "../features/basketSlice";

export default function DishRow({ id, name, description, price, image }) {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => SelectBasketItemsWithId(state, id));
  const dispach = useDispatch();

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispach(RemoveFromBasket({ id }));
  };

  const addItemToBasket = () => {
    dispach(addToBasket({ id, name, description, price, image }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 
        ${isPressed && "border-b-0"}`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-480">{description}</Text>
            <Text className="text-gray-400 mt-2">
              <Curreny quantity={price} currency="TRY" />
            </Text>
          </View>
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#F3F3F4",
                resizeMode: "contain",
              }}
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity onPress={removeItemFromBasket}>
              <MinusCircleIcon color={"white"} fill={"gray"} size={40} />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon color={"white"} fill={"#EA004B"} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}
