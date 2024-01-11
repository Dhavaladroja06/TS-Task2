import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigator from './Navigations/MainNavigations/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {

  return (
    <NavigationContainer>
      <MainNavigator/>
    </NavigationContainer>
      
  );
}


