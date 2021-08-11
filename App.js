/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
Text, 
  StyleSheet,
 
} from 'react-native';


;
import {  NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
const HomeStackNaviagtor=createStackNavigator()
const App=()=>
 {

  return (
    <SafeAreaView
    style={
      {
        flex:1
      }
    }
    >
      <NavigationContainer>
        <HomeStackNaviagtor.Navigator
        initialRouteName="Home"
        >
            <HomeStackNaviagtor.Screen
           
           options={
             {
               headerShown:false
             }
           }
            name="Home"
            component={Home}
            >

            </HomeStackNaviagtor.Screen>
        </HomeStackNaviagtor.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};



export default App;
