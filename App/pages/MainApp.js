import React, { useState, useEffect } from "react";
import { StatusBar, TouchableOpacityBase, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "react-native-vector-icons";
import UserFeed from "./UserFeed";
import LeaderBoard from "./LeaderBoard";
import Scan from "./Scan";
import AllLocations from "./AllLocations";
import Profile from "./Profile";
import * as Location from "expo-location";

const Tab = createBottomTabNavigator();

export default function MainApp() {
    const [currentLoc, setCurrentLoc] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [locations, setLocations] = useState(null);
    const [ownPosts, setOwnPosts] = useState([
        {
            user: "Olivia",
            userInfo: "CS Student at Queen's",
            pfp: "/Users/oliviachenxu/Documents/QueensGDSC/App/assets/olivia.jpg",
            image: "/Users/oliviachenxu/Documents/QueensGDSC/App/assets/logo.jpg",
            description: "So excited to join the EcoLink community!",
            createdAt: new Date(2022, 4, 27, 17, 24),
        },
    ]);
    const [posts, setPosts] = useState([
        {
            user: "Aaliyah",
            userInfo: "Engineering Student at Queen's",
            pfp: "/Users/oliviachenxu/Documents/QueensGDSC/App/assets/aaliyah.jpeg",
            image: "/Users/oliviachenxu/Documents/QueensGDSC/App/assets/waste.jpeg",
            description:
                "Join me this Saturday for an interactive workshop on how to make the best use of your food waste!",
            createdAt: new Date(2022, 2, 27, 17, 24),
        },
        {
            user: "Joshua",
            userInfo: "Engineering Student at Queen's",
            pfp: "/Users/oliviachenxu/Documents/QueensGDSC/App/assets/josh.jpeg",
            image: "/Users/oliviachenxu/Documents/QueensGDSC/App/assets/beach.png",
            description:
                "Going to the Breakwater Park this weekend to do a beach cleaning, hmu if you would like to join!",
            createdAt: new Date(2022, 2, 25, 17, 24),
        },

        {
            user: "Alessia",
            userInfo: "Engineering Student at Queen's",
            pfp: "/Users/oliviachenxu/Documents/QueensGDSC/App/assets/alessia.jpeg",
            image: "/Users/oliviachenxu/Documents/QueensGDSC/App/assets/recycle1.png",
            description: "Went on a garbage collecting trip!",
            createdAt: new Date(2022, 3, 27, 17, 24),
        },
        {
            user: "Olivia",
            userInfo: "CS Student at Queen's",
            pfp: "/Users/oliviachenxu/Documents/QueensGDSC/App/assets/olivia.jpg",
            image: "/Users/oliviachenxu/Documents/QueensGDSC/App/assets/logo.jpg",
            description: "So excited to join the EcoLink community!",
            createdAt: new Date(2022, 4, 27, 17, 24),
        },
    ]);

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
                        name: "Lenny Hall",
                        latitude: res.coords.latitude + 0.0012,
                        longitude: res.coords.longitude - 0.003,
                        image: null,
                        tags: ["Plastic", "Can"],
                        numOfDropOffs: 234,
                        tonsRecycled: 12,
                    },
                    {
                        name: "Ellis Hall",
                        latitude: res.coords.latitude,
                        longitude: res.coords.longitude + 0.002,
                        image: "/Users/oliviachenxu/Documents/QueensGDSC/App/assets/bins1.jpg",
                        tags: ["Paper", "Plastic", "Can", "Glass", "Landfill"],
                        numOfDropOffs: 52,
                        tonsRecycled: 5,
                    },
                    {
                        name: "Location 21",
                        latitude: res.coords.latitude - 0.0016,
                        longitude: res.coords.longitude - 0.002,
                        image: "/Users/oliviachenxu/Documents/QueensGDSC/App/assets/bins2.jpg",
                        tags: ["Organics", "Can"],
                        numOfDropOffs: 6,
                        tonsRecycled: 1,
                    },
                    {
                        name: "Queen's Center",
                        latitude: res.coords.latitude + 0.002,
                        longitude: res.coords.longitude + 0.001,
                        image: null,
                        tags: ["Paper", "Organics", "Can"],
                        numOfDropOffs: 6,
                        tonsRecycled: 1,
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
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "#4B9460",
                }}
            >
                <Tab.Screen
                    name="UserFeed"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="home" color={color} size={26} />
                        ),
                    }}
                >
                    {(props) => (
                        <UserFeed
                            {...props}
                            posts={posts}
                            setPosts={setPosts}
                            ownPosts={ownPosts}
                            setOwnPosts={setOwnPosts}
                        ></UserFeed>
                    )}
                </Tab.Screen>
                <Tab.Screen
                    name="AllLocations"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons
                                name="add-location-alt"
                                color={color}
                                size={28}
                            />
                        ),
                    }}
                >
                    {(props) => (
                        <AllLocations
                            {...props}
                            currentLoc={currentLoc}
                            locations={locations}
                            setLocations={setLocations}
                            posts={posts}
                            setPosts={setPosts}
                            ownPosts={ownPosts}
                            setOwnPosts={setOwnPosts}
                        ></AllLocations>
                    )}
                </Tab.Screen>
                <Tab.Screen
                    name="Scan"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <View
                                style={{
                                    position: "absolute",
                                    bottom: 0, // space from bottombar
                                    height: 68,
                                    width: 68,
                                    borderRadius: 68,
                                    backgroundColor:
                                        color === "#4B9460"
                                            ? "#4B9460"
                                            : "#5DB075",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Ionicons
                                    name="camera"
                                    color="white"
                                    size={28}
                                />
                            </View>
                        ),
                    }}
                >
                    {(props) => (
                        <Scan
                            {...props}
                            currentLoc={currentLoc}
                            locations={locations}
                            posts={posts}
                            setPosts={setPosts}
                            ownPosts={ownPosts}
                            setOwnPosts={setOwnPosts}
                        ></Scan>
                    )}
                </Tab.Screen>
                <Tab.Screen
                    name="LeaderBoard"
                    component={LeaderBoard}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons
                                name="leaderboard"
                                color={color}
                                size={26}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Ionicons
                                name="person-circle-outline"
                                color={color}
                                size={28}
                            />
                        ),
                    }}
                >
                    {(props) => (
                        <Profile {...props} ownPosts={ownPosts}></Profile>
                    )}
                </Tab.Screen>
            </Tab.Navigator>
        </>
    );
}
