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
    const [status, setStatus] = useState(null);
    const [types, setTypes] = useState(null);

    const API_KEY = "AIzaSyBCRqst2_5hp1HMQpauRqbhtg8C18OwQYI";
    const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

    async function callGoogleVisionAsync(image) {
        const body = {
            requests: [
                {
                    image: {
                        content: image,
                    },
                    features: [
                        {
                            type: "LABEL_DETECTION",
                            maxResults: 3,
                        },
                    ],
                },
            ],
        };

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const result = await response.json();

        const results = [];
        result.responses[0].labelAnnotations.map((obj) => {
            results.push(obj.description);
        });
        console.log("callGoogleVisionAsync -> result", results);
        setTypes(results);
    }

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

        const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
            base64: true,
        });

        if (!cancelled) {
            setImage(uri);
            setStatus("Loading...");
            try {
                const result = await callGoogleVisionAsync(base64);
                setStatus(result);
            } catch (error) {
                setStatus(`Error: ${error.message}`);
            }
        } else {
            setImage(null);
            setStatus(null);
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
                        {types && types.map((type) => <Text>{type}</Text>)}
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
