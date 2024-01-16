import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigator from './Navigations/MainNavigations/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';
import ProductStack from './Navigations/ProductTabs/ProductStack';
import ProductButtomTab from './Navigations/ProductTabs/ProductTab';


export default function App() {

  return (
    <NavigationContainer>
      <MainNavigator/>
    </NavigationContainer>
      
  );
}


