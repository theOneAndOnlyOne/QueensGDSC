import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import UserFeed from "./pages/UserFeed";
import TBD from "./pages/TBD";
import Scan from "./pages/Scan";
import AllLocations from "./pages/AllLocations";
import Profile from "./pages/Profile";
import * as Location from "expo-location";

const Tab = createBottomTabNavigator();

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
        <>
            <StatusBar barStyle="dark-content"></StatusBar>
            <NavigationContainer>
                <Tab.Navigator screenOptions={{ headerShown: false }}>
                    <Tab.Screen name="UserFeed" component={UserFeed} />
                    <Tab.Screen name="TBD" component={TBD} />
                    <Tab.Screen name="Scan">
                        {(props) => (
                            <Scan
                                {...props}
                                currentLoc={currentLoc}
                                locations={locations}
                            ></Scan>
                        )}
                    </Tab.Screen>
                    <Tab.Screen name="AllLocations">
                        {(props) => (
                            <AllLocations
                                {...props}
                                currentLoc={currentLoc}
                                locations={locations}
                                setLocations={setLocations}
                            ></AllLocations>
                        )}
                    </Tab.Screen>
                    <Tab.Screen name="Profile" component={Profile} />
                </Tab.Navigator>
            </NavigationContainer>
        </>
    );
}
