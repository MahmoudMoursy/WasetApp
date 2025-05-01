import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Signup from "./page/Signup";
import Login from "./page/Login";
import Home from "./page/Home";
import Housing from "./page/Housing";
import Community from "./page/Community";
import Comments from "./page/Comments";
import Tourise from "./page/Tourise";
import AboutUsScreen from "./page/AboutAs";
import ProfileForm from "./page/ProfileForm";
import Services from "./page/Services";
import AddServiceForm from "./page/AddServiceForm";
import RestaurantsPage from "./page/RestaurantsPage";
import SupermarketsPage from "./page/SupermarketsPage";
import PharmaciesPage from "./page/PharmaciesPage";
import DoctorsPage from "./page/DoctorsPage";
import Chats from "./page/Chats";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import Profile from "./page/Profile";
import store from "./Redux/Store";
import Notifications from "./page/Notifications";

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
            <Stack.Screen name="Community" component={Community} />
            <Stack.Screen name="Comments" component={Comments} />
            <Stack.Screen name="Tourise" component={Tourise} />
            <Stack.Screen name="AboutUs" component={AboutUsScreen} />
            <Stack.Screen name="ProfileForm" component={ProfileForm} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Services" component={Services} />
            <Stack.Screen name="AddServiceForm" component={AddServiceForm} />
            <Stack.Screen name="RestaurantsPage" component={RestaurantsPage} />
            <Stack.Screen name="SupermarketsPage" component={SupermarketsPage} />
            <Stack.Screen name="PharmaciesPage" component={PharmaciesPage} />
            <Stack.Screen name="DoctorsPage" component={DoctorsPage} />
            <Stack.Screen name="Housing" component={Housing} />
            <Stack.Screen name="Chats" component={Chats} />
            <Stack.Screen name="Notifications" component={Notifications} />
          </Stack.Navigator>

        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
