import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen';
import FilesScreen from './Screens/FileScreen';
import AccountScreen from './Screens/AccountScreen';

type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Files: undefined;
  Account: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerTitle: 'Налаштування' }} />
        <Stack.Screen name="Files" component={FilesScreen} options={{ headerTitle: 'Файли' }} />
        <Stack.Screen name="Account" component={AccountScreen} options={{ headerTitle: 'Акаунт' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;