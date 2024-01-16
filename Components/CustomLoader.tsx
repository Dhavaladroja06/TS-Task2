// components/CustomLoader.tsx
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const CustomLoader: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomLoader;
