import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import BasketScreen from "./screens/BasketScreen";
import store from "./store";
import { StripeProvider } from "@stripe/stripe-react-native";
import PaymentScreen from "./screens/PaymentScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StripeProvider
      publishableKey="pk_test_51Lfk0lBKh2rUDIsL5kBZ36FfMLipojl2u22aOimJiprKd9ShzSKCeFefqsScKEnOL89zvl45nfABmew7Nl09c8ze00Fk1tZ7Rk"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
            <Stack.Screen
              name="Basket"
              component={BasketScreen}
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Payment"
              component={PaymentScreen}
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    </StripeProvider>
  );
}
