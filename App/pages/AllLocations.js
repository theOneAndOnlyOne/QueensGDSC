import React, { useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    Button,
    ActivityIndicator,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MapPage from "./MapPage";
import AddLocation from "./AddLocation";

const Stack = createNativeStackNavigator();

export default function AllLocations({
    currentLoc,
    locations,
    setLocations,
    posts,
    setPosts,
    ownPosts,
    setOwnPosts,
    setUpdateLocations,
    db,
    currentUser,
    updatePosts,
    setUpdatePosts,
}) {
    const [addedNew, setAddedNew] = useState(false);
    return !currentLoc ? (
        <ActivityIndicator
            size="large"
            color="#4B9460"
            marginTop={20}
        ></ActivityIndicator>
    ) : (
        <Stack.Navigator>
            <Stack.Screen name="MapPage" options={{ headerShown: false }}>
                {(props) => (
                    <MapPage
                        {...props}
                        currentLoc={currentLoc}
                        locations={locations}
                        addLocationEnabled={true}
                        scanAnotherEnabled={false}
                        addedNew={addedNew}
                        setAddedNew={setAddedNew}
                    ></MapPage>
                )}
            </Stack.Screen>
            <Stack.Screen name="AddLocation" options={{ headerShown: false }}>
                {(props) => (
                    <AddLocation
                        {...props}
                        currentLoc={currentLoc}
                        locations={locations}
                        setLocations={setLocations}
                        setAddedNew={setAddedNew}
                        posts={posts}
                        setPosts={setPosts}
                        ownPosts={ownPosts}
                        setOwnPosts={setOwnPosts}
                        setUpdateLocations={setUpdateLocations}
                        db={db}
                        currentUser={currentUser}
                        updatePosts={updatePosts}
                        setUpdatePosts={setUpdatePosts}
                    ></AddLocation>
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
