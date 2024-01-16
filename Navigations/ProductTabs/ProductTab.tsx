import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { DeviceEventEmitter } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartScreen from "../../Screen/Cart";
import MyOrder from "../../Screen/MyOrder";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import ProductStack from "./ProductStack";

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
        headerLeft: () => (
          <Image
            source={require("../../assets/Logo.png")}
            style={styles.Logo}
          />
        ),
        title:"Shopping Go",
        headerTintColor:"#fff",
        headerTitleStyle:{
          fontSize:24
        },
        tabBarStyle: {
          backgroundColor: "#7e8fee",
        },
        tabBarActiveTintColor: "#7e8fee",
        tabBarInactiveTintColor: "#ffffff",
        tabBarActiveBackgroundColor: "#ffffff",
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIconStyle: {
          marginBottom: -5,
        },
        headerStyle:{
          backgroundColor:"#7e8fee",
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={ProductStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Myorder"
        component={MyOrder}
        options={{
          tabBarLabel: "My Order",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list-alt" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  Logo: {
    width: 50,
    height: 50,
    marginLeft: 10,
    padding: 5  ,
    backgroundColor: "#fff",
    borderRadius: 25
  }
})

export default ProductButtomTab;
