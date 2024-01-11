import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, Text } from "react-native";
import HomeScreen from "../../Screen/Home";
import { DeviceEventEmitter } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

const ProductButtomTab: React.FC = () => {
  const handleLogout = () => {
    AsyncStorage.removeItem("isLoggedIn");
    DeviceEventEmitter.emit("logout");
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 10 }}>
            <Text>Logout</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default ProductButtomTab;
