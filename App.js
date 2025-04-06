import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Signup from "./page/Signup"; 
import Login from "./page/Login";
import Home from "./page/Home";
import Donation from "./page/Donation";
import Housing from "./page/Hosing";
  const Stack = createStackNavigator();
  export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignUp">
          <Stack.Screen name="SignUp" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Donation" component={Donation} />
          <Stack.Screen name="Housing" component={Housing} />
        </Stack.Navigator>        
      </NavigationContainer>
    );
  }
