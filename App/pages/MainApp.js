import React, { useState, useEffect } from "react";
import { StatusBar, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    Ionicons,
    MaterialIcons,
    FontAwesome5,
} from "react-native-vector-icons";
import UserFeed from "./UserFeed";
import LeaderBoard from "./LeaderBoard";
import Points from "./Points";
import Scan from "./Scan";
import AllLocations from "./AllLocations";
import Profile from "./Profile";
import * as Location from "expo-location";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
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
        let data = [];
        const locationsSnapshot = await getDocs(collection(db, "locations"));

        locationsSnapshot.forEach(async (doc) => {
            const {
                name,
                coords,
                tags,
                numOfDropOffs,
                tonsRecycled,
                image,
                comments,
            } = doc.data();
            //console.log(doc.data());
            let allComments = [];
            comments.forEach(async (doc) => {
                const commentRef = await getDoc(doc);
                const { text, date } = commentRef.data();
                allComments.push({ text: text, date: date });
            });
            //allComments.sort((a, b) => b.date.seconds - a.date.seconds);
            data.push({
                name,
                latitude: coords.latitude,
                longitude: coords.longitude,
                tags,
                numOfDropOffs,
                tonsRecycled,
                image,
                comments: allComments,
            });
        });
        setTimeout(() => {
            setLocations(data);
            //console.log(data);
        }, 2000);
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
                    name="Points"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5
                                name="medal"
                                color={color}
                                size={26}
                            />
                        ),
                    }}
                >
                    {(props) => (
                        <Points {...props} currentUser={currentUser}></Points>
                    )}
                </Tab.Screen>
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
