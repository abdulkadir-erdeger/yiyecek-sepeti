import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StarIcon, MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

export default function ResturantCard({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        })
      }
      className="bg-white mr-3 shadow w-[255px]"
    >
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className="h-36 w-64 rounded-sm "
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2"> {title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="#EA004B" size={22} opacity={0.5} />
          <Text className="text-xs text-gray-500">
            <Text className="text-[#EA004B]">{rating}</Text> - {genre}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="gray" size={22} opacity={0.4} />
          <Text className="text-xs text-gray-500 truncate block">
            {address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
