import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../Components/constent";
import Icon from "react-native-vector-icons/FontAwesome";

interface CartScreenProps { }

interface Product {
    thumbnail: string;
    title: string;
    price: number;
    description: string;
    images: string[];
    discountPercentage: number;
    stock: number;
    brand: string;
    quantity: number;
}

const CartScreen: React.FC<CartScreenProps> = () => {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const userId = await AsyncStorage.getItem("userId");
                const response = await fetch(`${API_URL}/UserData/${userId}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const userData = await response.json();
                setCartProducts(userData.cart);
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };

        fetchCartData();
    }, []);

    const handleQuantityChange = async (index: number, newQuantity: number) => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            const response = await fetch(`${API_URL}/UserData/${userId}`);

            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }

            const userData = await response.json();
            userData.cart[index].quantity = newQuantity;

            const updateResponse = await fetch(`${API_URL}/UserData/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!updateResponse.ok) {
                throw new Error("Failed to update user cart");
            }

            setCartProducts([...userData.cart]);
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handleRemoveItem = async (index: number) => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            const response = await fetch(`${API_URL}/UserData/${userId}`);

            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }

            const userData = await response.json();
            userData.cart.splice(index, 1);

            const updateResponse = await fetch(`${API_URL}/UserData/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!updateResponse.ok) {
                throw new Error("Failed to update user cart");
            }

            setCartProducts([...userData.cart]);
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };


    const renderCartItem = ({ item, index }: { item: Product; index: number }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.thumbnail }} style={styles.cartItemImage} />
            <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemTitle}>{item.title}</Text>
                <Text style={styles.cartItemPrice}>$ {item.price}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => handleQuantityChange(index, item.quantity - 1)}>
                        <Icon name="minus" size={18} color="#fff" style={styles.quantityIcon} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => handleQuantityChange(index, item.quantity + 1)}>
                        <Icon name="plus" size={18} color="#fff" style={styles.quantityIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleRemoveItem(index)} style={styles.removeButton}>
                        <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {cartProducts.length > 0 ? (
                <FlatList
                    data={cartProducts}
                    keyExtractor={(item) => item.title}
                    renderItem={renderCartItem}
                    contentContainerStyle={styles.cartList}
                />
            ) : (
                <Text style={styles.emptyCartText}>Your cart is empty</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    cartList: {
        paddingBottom: 20,
    },
    cartItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#7e8fee",
        paddingVertical: 10,
    },
    cartItemImage: {    
        width: 120,
        height: 120,
        resizeMode: "contain",
        marginRight: 20,
        borderRadius: 8,
        marginLeft: 10
    },
    cartItemDetails: {
        flex: 1,
    },
    cartItemTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#7e8fee",
    },
    cartItemPrice: {
        fontSize: 16,
        color: "green",
        marginTop: 5,
    },
    emptyCartText: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 50,
        color: "#3344a0",
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    quantityIcon: {
        marginHorizontal: 5,
        padding: 3,
        backgroundColor: "#3344a0",
        borderRadius: 5,
    },
    quantityText: {
        fontSize: 16,
        fontWeight: "500",
        marginHorizontal: 3,
        color: "#3344a0"
    },
    removeButton: {
        backgroundColor: "#fd5656",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginLeft: "25%",
    },
    removeButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default CartScreen;
