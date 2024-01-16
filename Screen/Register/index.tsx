import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { useForm } from "react-hook-form";
import Textinput from "../../Components/Textinput";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../Components/constent";


interface FormData {
    userName: string;
    phoneNumber: string;
}

const RegisterScreen: React.FC = () => {

    const navigation = useNavigation();
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const onSubmit = async (data: FormData,) => {
        try {
            const response = await fetch(`${API_URL}/UserData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                console.log('Data successfully stored on the server.');
                reset();
            } else {
                console.error('Failed to store data on the server.');
            }
            
        } catch (error) {
            console.error('Error occurred while storing data:', error);
        }
    };

    const goToLogin = () => {
        navigation.navigate("Login");
      };

    return (
        <View style={styles.Maincontainer}>
            <View style={styles.Registercontainer} >
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
                        <Image source={require("../../assets/Logo.png")} style={styles.logo} />
                    </View>
                </View>

                <Textinput
                    label="User Name"
                    icon="person-outline"
                    placeholder="Enter your username"
                    control={control}
                    name="userName"
                    rules={{ required: "Username is required" }}
                    error={errors.userName}
                />
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
                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.ButtonContainer}>
                    <Text style={styles.ButtonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToLogin}>
                <Text style={styles.loginLink}>
              Already registered? Go to Login
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
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        alignSelf: "center",
        color: "#7e8fee"
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
    logo: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        backgroundColor: "#ffffff",
        borderRadius: 150,
        borderWidth: 4,
        borderColor: "#7e8fee",
    },
    loginLink: {
        marginTop: 10,
        alignSelf: "center",
        textDecorationLine: "underline",
        color: "#495cc9",
      },
});

export default RegisterScreen;
