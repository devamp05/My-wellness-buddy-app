import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Switch,
  ActivityIndicator,
  FlatList,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer, useNavigation, DefaultTheme  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CalendarMain, CalendarScreen } from './screens/CalendarScreen.js';
import { CookbookMain, CookbookScreen } from './screens/CookbookScreen.js';
import { MainLogFood } from './screens/LogFood.js';
import { MainHomeScreen } from './screens/HomeScreen.js';
import { MainMealPlan } from './screens/MealPlan.js';
import { ProfileMain } from './screens/ProfileScreen.js';
import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

import filter from 'lodash.filter';

import { styles, MyTheme} from './Styles.js'


const MainNavBar = createBottomTabNavigator();

const Stack = createNativeStackNavigator();



const Separator = () => <View style={styles.separator} />;


function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <MainNavBar.Navigator
        initialRouteName=" Home "
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'black', // Set the active tab icon and text color
          tabBarInactiveTintColor: 'lightgrey', // Set the inactive tab icon and text color
        }}
      >
        <MainNavBar.Screen 
          name=" Home " 
          options={{
            headerShown: false, 
            tabBarIcon: ({ focused, color, size }) => {
              const iconName ='home'; // Change icon names based on focus
              const iconColor = focused ? 'black' : 'lightgrey'; // Change icon color based on focus
              return <AntDesign name={iconName} size={size} color={iconColor} />;
            }, }} 
          component={MainHomeScreen} 
          
          />
        <MainNavBar.Screen 
          name=" Cookbook "  
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              const iconName ='book'; // Change icon names based on focus
              const iconColor = focused ? 'black' : 'lightgrey'; // Change icon color based on focus
              return <AntDesign name={iconName} size={size} color={iconColor} />;
            }, }} 
          component={CookbookMain} />
        <MainNavBar.Screen 
          name=" Log Food "  
          options={{
            headerShown: false, 
            tabBarIcon: ({ focused, color, size }) => {
              const iconName ='plus'; // Change icon names based on focus
              const iconColor = focused ? 'black' : 'lightgrey'; // Change icon color based on focus
              return <AntDesign name={iconName} size={size} color={iconColor} />;
            }, }} 
          component={MainLogFood} />
        {/* <MainNavBar.Screen 
          name=" Meal Plan " 
          options={{
            headerShown: false, 
            tabBarIcon: () => (<SimpleLineIcons name="pencil" size={30} color="lightgrey" />), }} 
          component={MainMealPlan} /> */}
        <MainNavBar.Screen 
          name=" Calendar " 
          options={{
            headerShown: false, 
            tabBarIcon: ({ focused, color, size }) => {
              const iconName ='calendar'; // Change icon names based on focus
              const iconColor = focused ? 'black' : 'lightgrey'; // Change icon color based on focus
              return <AntDesign name={iconName} size={size} color={iconColor} />;
            }, }} 
          component={CalendarMain} />
          <MainNavBar.Screen 
          name=" Profile " 
          options={{
            headerShown: false, 
            tabBarIcon: ({ focused, color, size }) => {
              const iconName ='person-outline'; // Change icon names based on focus
              const iconColor = focused ? 'black' : 'lightgrey'; // Change icon color based on focus
              return <Ionicons name={iconName} size={size} color={iconColor} />;
            }, }} 
          component={ProfileMain} />
      </MainNavBar.Navigator>

    </NavigationContainer>
  );
}



export default App;

