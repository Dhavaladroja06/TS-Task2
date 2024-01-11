import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image,DeviceEventEmitter  } from "react-native";
import { useForm } from "react-hook-form";
import Textinput from "../../Components/Textinput";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginFormData {
    phoneNumber: string;
}

const LoginScreen: React.FC = () => {
    const navigation = useNavigation();
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginFormData>();

    const [errorMessage, setErrorMessage] = React.useState<string>("");

    const goToRegister = () => {
        navigation.navigate("Register");
    };

    const onLogin = async (data: LoginFormData) => {
        try {
            const response = await fetch(`http://192.168.1.6:3000/UserData?phoneNumber=${data.phoneNumber}`);
            if (response.ok) {
                const userData = await response.json();
                if (userData.length > 0) {
                    console.log("Matching phone number found:", userData[0]);
                    reset();
                    setErrorMessage("");
                    await AsyncStorage.setItem('isLoggedIn', 'true');
                    await AsyncStorage.setItem('userId', userData[0].id.toString());
                    DeviceEventEmitter.emit("loginSuccess")
                } else {
                    console.log("Phone number not found");
                    setErrorMessage("Phone number not found");
                }
            } else {
                console.error("Failed to fetch data from server");
            }
        } catch (error) {
            console.error("Error occurred while fetching data:", error);
            setErrorMessage("Error occurred while logging in")
        }
    };

    return (
        <View style={styles.Maincontainer}>
            <View style={styles.Registercontainer}>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 33,
                    }}
                >
                    <View
                        style={{
                            position: "absolute",
                            bottom: 1,
                            zIndex: 1,
                            justifyContent: "center",
                            padding: 10,
                        }}
                    >
                        <Image
                            source={require("../../assets/Logo.png")}
                            style={styles.logo}
                        />
                    </View>
                </View>

                <Textinput
                    label="Phone Number"
                    icon="call-outline"
                    placeholder="Enter your phone number"
                    control={control}
                    name="phoneNumber"
                    rules={{
                        required: "Phone number is required",
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Please enter a valid phone number",
                        },
                    }}
                    error={errors.phoneNumber}
                    keyboardType="phone-pad"
                    maxLength={10}
                />
                 {errorMessage !== "" && ( 
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                )}
                <TouchableOpacity onPress={handleSubmit(onLogin)} style={styles.ButtonContainer}>
                    <Text style={styles.ButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToRegister}>
                    <Text style={styles.registerLink}>
                        Not registered yet? Register here
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    Maincontainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#7e8fee",
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3
    },
    Registercontainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10
    },
    ButtonContainer: {
        backgroundColor: "#495cc9",
        padding: 11,
        margin: 4,
        borderRadius: 4,
        alignItems: "center",
    },
    ButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "800"
    },
    registerLink: {
        marginTop: 10,
        alignSelf: "center",
        textDecorationLine: "underline",
        color: "#495cc9",
    },
    logo: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        backgroundColor: "#ffffff",
        borderRadius: 150,
        borderWidth: 4,
        borderColor: "#7e8fee",
    },
    errorMessage: {
        color: "red",
        textAlign: "right",
        marginRight: 5
    },
});

export default LoginScreen;
