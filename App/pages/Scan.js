import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
    TouchableOpacity,
    Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SimpleLineIcons } from "react-native-vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapPage from "./MapPage";

const Stack = createNativeStackNavigator();

export default function Scan({ locations, currentLoc }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        openCamera();
    }, []);

    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult =
            await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        if (!result.cancelled) {
            setImage(result.uri);
            console.log(result.uri);
        }
    };
    const Main = ({ navigation }) => {
        return (
            <SafeAreaView>
                {image && (
                    <>
                        <TouchableOpacity onPress={() => openCamera()}>
                            <SimpleLineIcons
                                name="arrow-left-circle"
                                size={30}
                            ></SimpleLineIcons>
                        </TouchableOpacity>

                        <Text>You have scanned</Text>
                        <Image
                            source={{ uri: image }}
                            style={{ width: 200, height: 200 }}
                        />
                        <Button
                            title="Find Nearest Recyling Bin"
                            onPress={() => navigation.navigate("MapPage")}
                        ></Button>
                    </>
                )}
            </SafeAreaView>
        );
    };

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={Main}></Stack.Screen>
            <Stack.Screen name="MapPage" options={{ headerShown: false }}>
                {(props) => (
                    <MapPage
                        {...props}
                        currentLoc={currentLoc}
                        locations={locations}
                        addLocationEnabled={false}
                        scanAnotherEnabled={true}
                    ></MapPage>
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    page: {},
});
