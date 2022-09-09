import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import ResturantCard from "./ResturantCard";
import sanityClient from "../sanity";

export default function FeaturedRow({ id, title, description }) {
  const [resturants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
  *[_type=="featured" && _id==$id]{
    ...,
    restaurants[]->{
      ...,
      dishes[]->,
  type->{
    name
  }
    
    }
  }[0]
  `,
        { id }
      )
      .then((data) => setRestaurants(data?.restaurants));
  }, []);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#EA004B" size={20} />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Resturand Card */}
        {resturants?.map((resturant) => (
          <ResturantCard
            key={resturant._id}
            id={resturant._id}
            imgUrl={resturant.image}
            address={resturant.address}
            title={resturant.name}
            rating={resturant.rating}
            genre={resturant.type?.name}
            short_description={resturant.short_description}
            dishes={resturant.dishes}
            long={resturant.long}
            lat={resturant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
}
