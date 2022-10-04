import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useStripe, CardField } from "@stripe/stripe-react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

export default function PaymentScreen({ route }) {
  const amounts = route.params.value;
  const navigation = useNavigation();

  const LOCAL_URL =
    Platform.OS === "android"
      ? "http://10.0.2.2:4242/"
      : "http://localhost:4242/";

  const { initPaymentSheet, createPaymentMethod } = useStripe();

  const [key, setKey] = useState("");

  const handleConfirmation = async () => {
    const response = fetch(`${LOCAL_URL}create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amounts,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setKey(res.clientSecret);
        initPaymentSheet({ paymentIntentClientSecret: key });
      })
      .catch((e) => Alert.alert(e.message));
    if (key) {
      const billingDetails = {
        email: "nickbey06@gmail.com",
        phone: "+905050005500",
        addressCity: "Ankara",
        addressCountry: "TR",
        addressLine1: "Atış Caddesi",
        addressLine2: "Keçiören",
        addressPostalCode: "06120",
      };
      const { paymentMethod, error } = await createPaymentMethod({
        paymentMethodType: "Card",
        paymentMethodData: {
          billingDetails,
        },
      });

      if (!error) {
        Alert.alert("Alınan ödeme", `${amounts} TL Faturalandı.`);
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <View
      className="flex-1"
      style={{ paddingTop: Platform.OS === "android" ? 50 : 0 }}
    >
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#EA004B] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Ödeme</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-5 left-4 bg-[#EA004B] rounded-full"
          >
            <ArrowLeftIcon size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-1 m-2">
        <View className="bg-[#fff]  rounded-lg  border-[#D3D3D3] border-4">
          <TextInput
            autoCapitalize="none"
            placeholder="Adı Soyadı"
            keyboardType="name-phone-pad"
            className="h-20 font-semibold border-b-[#D3D3D3] border-b-2 ml-4 mr-4"
          />
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: "4242 4242 4242 4242",
            }}
            cardStyle={{
              backgroundColor: "#FFFFFF",
              textColor: "#000000",
            }}
            style={{
              width: "100%",
              height: 50,
              marginVertical: 20,
            }}
            onCardChange={(cardDetails) => {
              console.log("cardDetails", cardDetails);
            }}
            onFocus={(focusedField) => {
              console.log("focusField", focusedField);
            }}
          />
        </View>
      </View>
      <View className="p-5 bg-white mt-5 space-y-4">
        <TouchableOpacity
          className="rounded-lg bg-[#EA004B] p-4"
          onPress={handleConfirmation}
        >
          <Text className="text-center text-white text-base font-bold">
            Ödeme Yap
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
