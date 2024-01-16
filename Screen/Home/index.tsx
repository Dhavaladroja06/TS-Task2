import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, DeviceEventEmitter } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../Components/constent";
import Rating from "../../Components/Rating";

interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    rating: number;
}

const HomeScreen: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetch(`${API_URL}/products`)
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);



    const navigateToProductDetails = (productId: number) => {
        navigation.navigate('ProductDetails', { productId });
    }

    const renderItem = ({ item }: { item: Product }) => (
        <TouchableOpacity onPress={() => navigateToProductDetails(item.id)}>
            <View style={styles.productContainer}>
                <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
                <View style={styles.AddTOCartview}>
                    <View style={styles.priceview}>
                    <Text style={styles.productName}>{item.title.length > 23 ? item.title.substring(0, 23) + '...' : item.title}</Text>
                        <Text style={styles.productPrice}>$ {item.price}</Text>
                    </View>
                    <View>
                        <Rating rating={item.rating}></Rating>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        paddingTop: 5,
        backgroundColor: "#fff",
    },
    productContainer: {
        backgroundColor: "#fff",
        padding: 10,
        marginBottom: 8,
        borderRadius: 8,
        elevation: 3,
        borderWidth: 2,
        borderColor: "#4b61da"
    },
    productImage: {
        width: "100%",
        height: 200,
        resizeMode: "contain",
        borderRadius: 8,
        marginBottom: 8,
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#4b61da"
    },
    productPrice: {
        fontSize: 14,
        color: "green",
    },
    Button: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#4b61da",
        width: 120,
        alignItems: "center",
        marginTop: 5
    },
    AddTOCartview: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    priceview: {
        flexDirection: "column"
    },
    buttonText: {
        fontSize: 15,
        padding: 10,
        fontWeight: "bold",
        color: "#4b61da"
    }
});

export default HomeScreen;
