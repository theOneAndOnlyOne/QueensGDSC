import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MainApp from "./pages/MainApp";
import Landing from "./pages/Landing";

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Landing" component={Landing} />
                <Stack.Screen name="MainApp" component={MainApp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
