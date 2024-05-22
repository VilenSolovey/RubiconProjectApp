import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './Screens/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen';
import FilesScreen from './Screens/FileScreen';

type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Files: undefined;
};

function App() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator 
      initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Files" component={FilesScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
