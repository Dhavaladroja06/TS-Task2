import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../Screen/Login";
import RegisterScreen from "../../Screen/Register";

const stack = createNativeStackNavigator()

const LoginStack: React.FC = () => {
    return (
        <stack.Navigator>
            <stack.Screen name="Login" component={LoginScreen} />
            <stack.Screen name="Register" component={RegisterScreen} />
        </stack.Navigator>
    )
}

export default LoginStack