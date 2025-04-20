import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Signup from "./page/Signup"; 
import Login from "./page/Login";
import Home from "./page/Home";
import Housing from "./page/Hosing"; 
import Community from "./page/Community";
import Comments from "./page/Comments";
import Tourise from "./page/Tourise";
import AboutUsScreen from "./page/AboutAs";
import ProfileForm from "./page/ProfileForm";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import Profile from "./page/Profile";
import store from "./Redux/Store";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignUp">
          <Stack.Screen name="SignUp" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Housing" component={Housing} />
          <Stack.Screen name="Community" component={Community} />
          <Stack.Screen name="Comments" component={Comments} />
          <Stack.Screen name="Tourise" component={Tourise} />
          <Stack.Screen name="AboutUs" component={AboutUsScreen} />
          <Stack.Screen name="ProfileForm" component={ProfileForm} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>        
      </NavigationContainer>
    </PaperProvider>
    </Provider>
  );
}
