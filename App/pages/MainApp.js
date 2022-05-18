import React, { useState, useEffect } from "react";
import { StatusBar, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "react-native-vector-icons";
import UserFeed from "./UserFeed";
import LeaderBoard from "./LeaderBoard";
import Scan from "./Scan";
import AllLocations from "./AllLocations";
import Profile from "./Profile";
import * as Location from "expo-location";
import { collection, doc, getDocs } from "firebase/firestore";
const Tab = createBottomTabNavigator();

export default function MainApp({ auth, currentUser, setCurrentUser, db }) {
    const [currentLoc, setCurrentLoc] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [locations, setLocations] = useState(null);
    const [updatePosts, setUpdatePosts] = useState(false);
    const [updateLocations, setUpdateLocations] = useState(false);
    const [posts, setPosts] = useState();
    const [ownPosts, setOwnPosts] = useState();

    const getLocations = async () => {
        setLocations(null);
        const data = [];
        const locationsSnapshot = await getDocs(collection(db, "locations"));

        locationsSnapshot.forEach((doc) => {
            const { name, coords, tags, numOfDropOffs, tonsRecycled, image } =
                doc.data();

            data.push({
                name,
                latitude: coords.latitude,
                longitude: coords.longitude,
                tags,
                numOfDropOffs,
                tonsRecycled,
                image,
            });
        });
        setTimeout(() => setLocations(data), 2000);
        //console.log(locations);
    };
    // useEffect(() => {

    // }, []);
    // useEffect(() => {
    //     getLocations();
    //     setUpdateLocations(false);
    // }, [updateLocations]);
    useEffect(() => {
        (async () => {
            console.log("hey");
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }
            getLocations();
            await Location.getCurrentPositionAsync({}).then((res) => {
                console.log(res);
                setCurrentLoc(res);
            });
        })();
    }, []);
    useEffect(() => {
        getLocations();
        setUpdateLocations(false);
    }, [updateLocations]);

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
                            currentUser={currentUser}
                            {...props}
                            posts={posts}
                            setPosts={setPosts}
                            ownPosts={ownPosts}
                            setOwnPosts={setOwnPosts}
                            db={db}
                            updatePosts={updatePosts}
                            setUpdatePosts={setUpdatePosts}
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
                            setUpdateLocations={setUpdateLocations}
                            db={db}
                            currentUser={currentUser}
                            updatePosts={updatePosts}
                            setUpdatePosts={setUpdatePosts}
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
                            setUpdatePosts={setUpdatePosts}
                            currentUser={currentUser}
                            db={db}
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
                        <Profile
                            {...props}
                            ownPosts={ownPosts}
                            auth={auth}
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                            updatePosts={updatePosts}
                            setUpdatePosts={setUpdatePosts}
                            db={db}
                        ></Profile>
                    )}
                </Tab.Screen>
            </Tab.Navigator>
        </>
    );
}
