import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import {
  CardField,
  initPaymentSheet,
  paymentIntent,
  customAppearance,
  confirmPayment,
  useConfirmPayment,
  useStripe,
} from "@stripe/stripe-react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

export default function PaymentScreen() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [adress, setAdress] = useState();
  const navigation = useNavigation();

  /*const stripe = useStripe();

  const subscribe = async () => {
    try {
      const response = await fetch("http://localhost:8080/pay", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: {
          "Context-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      Alert.alert("Ödeme Tamamlandı");
    } catch (err) {
      console.error(err);
      Alert.alert("Try Again");
    }
  };*/

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
        <TextInput
          autoCapitalize="none"
          placeholder="E-mail"
          keyboardType="email-address"
          onChangeText={(text) => setName(text)}
          className="bg-white pb-4 text-base rounded-sm mb-5"
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Adress"
          keyboardType="default"
          onChange={(value) => setAdress(value.nativeEvent.text)}
          className="bg-white pb-4 text-base rounded-sm"
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
      <View className="p-5 bg-white mt-5 space-y-4">
        <TouchableOpacity
          className="rounded-lg bg-[#EA004B] p-4"
          onPress={subscribe}
        >
          <Text className="text-center text-white text-base font-bold">
            Ödeme Yap
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
