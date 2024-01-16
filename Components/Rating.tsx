import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const iconName = i <= rating ? "star" : "star-outline";
      stars.push(<Ionicons name={iconName} size={20} color="#4b61da" key={i} />);
    }
    return stars;
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {renderStars()}
      <Text style={{ marginLeft: 5 }}></Text>
    </View>
  );
};

export default Rating;
