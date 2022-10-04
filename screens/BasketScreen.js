import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { XCircleIcon, TrashIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  RemoveFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { urlFor } from "../sanity";
import Curreny from "react-currency-formatter";

export default function BasketScreen() {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();
  const [groupItemsInBasket, setGroundItemsInBasket] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroundItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingTop: Platform.OS === "android" ? 50 : 0 }}
    >
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#EA004B] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Sepet</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-2 right-4 bg-gray-100 rounded-full"
          >
            <XCircleIcon size={50} color="#EA004B" />
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200 top-5">
          {Object.entries(groupItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text>{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>

              <Text className="text-gray-600">
                <Curreny quantity={items[0]?.price} currency="TRY" />
              </Text>

              <TouchableOpacity
                onPress={() => dispatch(RemoveFromBasket({ id: key }))}
              >
                <TrashIcon size={25} color="#EA004B" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Toplam</Text>
            <Text className="text-gray-400">
              <Curreny quantity={basketTotal} currency="TRY" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Teslimat Ücreti</Text>
            <Text className="text-gray-400">
              <Curreny quantity={10.0} currency="TRY" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="font-extrabold">Tutar</Text>
            <Text className="font-extrabold">
              <Curreny quantity={basketTotal + 10.0} currency="TRY" />
            </Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Payment", { value: basketTotal + 10 })
            }
            className="rounded-lg bg-[#EA004B] p-4"
          >
            <Text className="text-center text-white text-base font-bold">
              Sipariş Ver
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
