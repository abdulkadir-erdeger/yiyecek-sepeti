import {
  Text,
  SafeAreaView,
  View,
  Platform,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  ArchiveBoxIcon,
  Bars3Icon,
} from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import Categories from "../compenents/Categories";
import FeaturedRow from "../compenents/FeaturedRow";
import sanityClient from "../sanity";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [featuredCategroies, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type=="featured"]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      
      }
    }
    `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <SafeAreaView
      className=" bg-[#EA004B] pt-5"
      style={{ paddingTop: Platform.OS === "android" ? 50 : 0 }}
    >
      <StatusBar style="light" />
      {/* Header */}

      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Bars3Icon color="white" size={35} />
        <View className="flex-1">
          <Text className="font-bold text-white text-xl">Yiyecek Sepeti</Text>
          <Text className="font-bold text-base ">
            Location
            <ChevronDownIcon color="black" size={15} />
          </Text>
        </View>
        <HeartIcon color="white" size={30} />
        <ArchiveBoxIcon color="white" size={30} />
      </View>
      {/*Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-white p-3 rounded-3xl">
          <MagnifyingGlassIcon color="gray" size={25} />
          <TextInput
            placeholder="Restoran veya mağaza arayın"
            keyboardType="default"
          />
        </View>
      </View>

      {/*Body */}

      <ScrollView
        className="bg-gray-100 flex-1"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <Text className="text-black font-bold mx-4 text-lg">Mutfaklar</Text>
        {/* Categories */}
        <Categories />

        {/* Categories */}
        {featuredCategroies?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
