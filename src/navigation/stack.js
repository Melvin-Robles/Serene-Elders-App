import React, { useState, useEffect } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginComponent from "../components/login";

const Stack = createStackNavigator();


const NavigationStack = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
