import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginStack from "../StackNavigations/LogInStack";
import ProductButtomTab from "../ProductTabs/ProductTab";
import { DeviceEventEmitter, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainNavigator: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkSignInStatus = async () => {
      const signedInStatus = await AsyncStorage.getItem("isLoggedIn");
      setIsSignedIn(signedInStatus === "true");
    };

    const loginSubscription = DeviceEventEmitter.addListener("loginSuccess", () => {
      setIsSignedIn(true);
    });

    const logoutSubscription = DeviceEventEmitter.addListener("logout", () => {
      setIsSignedIn(false);
    });

    checkSignInStatus();

    return () => {
      loginSubscription.remove();
      logoutSubscription.remove();
    };
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <Stack.Screen name="ProductButtomTab" component={ProductButtomTab} />
      ) : (
        <Stack.Screen name="LoginStack" component={LoginStack} />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
