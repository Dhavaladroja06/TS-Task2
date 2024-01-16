import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetails from "../../Screen/ProductDatils";
import HomeScreen from "../../Screen/Home";

const Stack = createNativeStackNavigator()

const ProductStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default ProductStack