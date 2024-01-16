import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../Components/constent";
import CustomLoader from "../../Components/CustomLoader";

interface ProductDetailsProps {
  route: any;
}

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

const ProductDetails: React.FC<ProductDetailsProps> = ({ route }) => {
  const { productId } = route.params;
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  useEffect(() => {
    fetch(`${API_URL}/products/${productId}`)
      .then((response) => response.json())
      .then((data: Product) => setProductDetails({ ...data, quantity: 1 }))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [productId]);

  const addToCart = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const response = await fetch(`${API_URL}/UserData/${userId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      const existingProductIndex = userData.cart.findIndex(
        (product: Product) => product.title === productDetails?.title
      );

      if (existingProductIndex !== -1) {
        userData.cart[existingProductIndex].quantity += 1;
      } else {
        const updatedUserData = {
          ...userData,
          cart: [...userData.cart, { ...productDetails, quantity: 1 }],
        };

        const updateResponse = await fetch(`${API_URL}/UserData/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
        });

        if (!updateResponse.ok) {
          throw new Error("Failed to update user cart");
        }
      }

      alert("Product added to cart successfully");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleImagePress = (index: number) => {
    setSelectedImageIndex(index);
  };

  if (!productDetails) {
    return (
      <View style={styles.loadingContainer}>
        <CustomLoader/>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainImage}>
        <Image
          source={{ uri: productDetails.images[selectedImageIndex] }}
          style={styles.productImage}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScrollView}
      >
        {productDetails.images.map((image: string, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleImagePress(index)}
          >
            <Image source={{ uri: image }} style={styles.horizontalImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.productDetailsContainer}>
        <Text style={styles.productName}>{productDetails.title}</Text>
        <Text style={styles.productPrice}>$ {productDetails.price}</Text>
        <Text style={styles.productDescription}>
          {productDetails.description}
        </Text>
        <Text style={styles.additionalDetails}>
          Discount: {productDetails.discountPercentage}%
        </Text>
        <Text style={styles.additionalDetails}>
          Stock: {productDetails.stock}
        </Text>
        <Text style={styles.additionalDetails}>
          Brand: {productDetails.brand}
        </Text>
      </View>

      <View style={styles.addToCartButtonContainer}>
        <TouchableOpacity onPress={addToCart} style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainImage: {
    justifyContent: "center",
    paddingTop: 10,
  },
  productImage: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
  productDetailsContainer: {
    padding: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#7e8fee",
  },
  productPrice: {
    fontSize: 20,
    color: "green",
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    color: "#3d51c2",
    marginBottom: 10,
  },
  additionalDetails: {
    fontSize: 16,
    color: "#3d51c2",
    marginBottom: 5,
  },
  horizontalScrollView: {
    marginTop: 5,
    paddingHorizontal: 10,
  },
  horizontalImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#3d51c2",
  },
  addToCartButtonContainer: {
    marginTop: 10,
    padding: 10
  },
  addToCartButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    borderColor: "#3d51c2",
    borderWidth: 2,
    alignItems: "center"
  },
  addToCartButtonText: {
    color: "#3d51c2",
    fontSize: 16,
    fontWeight:"bold"
  },
});

export default ProductDetails;
