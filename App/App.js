import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MainApp from "./pages/MainApp";
import Landing from "./pages/Landing";
import { getAuth } from "firebase/auth";

import { db } from "./firebase";

const Stack = createNativeStackNavigator();
export default function App() {
    const [currentUser, setCurrentUser] = useState();
    const auth = getAuth();
    const [id, setId] = useState();
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Landing">
                    {(props) => (
                        <Landing
                            {...props}
                            auth={auth}
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                            setId={setId}
                            db={db}
                        ></Landing>
                    )}
                </Stack.Screen>
                <Stack.Screen name="MainApp">
                    {(props) => (
                        <MainApp
                            {...props}
                            auth={auth}
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                            id={id}
                            db={db}
                        ></MainApp>
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
