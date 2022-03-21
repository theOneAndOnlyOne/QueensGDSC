import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, Text, Image, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import MapPage from "./MapPage";
import AddLocation from "./AddLocation";

const Stack = createNativeStackNavigator();

export default function App() {
    const [currentLoc, setCurrentLoc] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [locations, setLocations] = useState(null);

    useEffect(() => {
        (async () => {
            console.log("hey");
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            await Location.getCurrentPositionAsync({}).then((res) => {
                console.log(res);
                setCurrentLoc(res);
                setLocations([
                    {
                        name: "Recycling station 1",
                        latitude: res.coords.latitude + 0.005,
                        longitude: res.coords.longitude,
                        image: null,
                    },
                    {
                        name: "Recycling station 2",
                        latitude: res.coords.latitude,
                        longitude: res.coords.longitude + 0.005,
                        image: null,
                    },
                    {
                        name: "Recycling station 3",
                        latitude: res.coords.latitude - 0.02,
                        longitude: res.coords.longitude - 0.01,
                        image: null,
                    },
                ]);
            });
        })();
    }, []);

    useEffect(() => {}, [locations]);

    let text = "Waiting..";
    if (errorMsg) {
        text = errorMsg;
    } else if (currentLoc) {
        text = JSON.stringify(currentLoc);
    }
    return (
        currentLoc && (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="MapPage"
                        options={{ headerShown: false }}
                    >
                        {(props) => (
                            <MapPage
                                {...props}
                                currentLoc={currentLoc}
                                locations={locations}
                            ></MapPage>
                        )}
                    </Stack.Screen>
                    <Stack.Screen
                        name="AddLocation"
                        options={{ headerShown: false }}
                    >
                        {(props) => (
                            <AddLocation
                                {...props}
                                currentLoc={currentLoc}
                                locations={locations}
                                setLocations={setLocations}
                            ></AddLocation>
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        )
    );
}
