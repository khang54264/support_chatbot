// filepath: d:\DATN\supportchatbot\frontenduser\src\App.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import Sidebar from './components/Sidebar/Sidebar';
import ContextProvider from './context/context';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MainDrawer = () => (
  <Drawer.Navigator
    drawerContent={(props) => <Sidebar {...props} />}
  >
    <Drawer.Screen name="Main" component={Main} />
  </Drawer.Navigator>
);

const App = () => {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="MainDrawer"
            component={MainDrawer} // Pass the component directly
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;