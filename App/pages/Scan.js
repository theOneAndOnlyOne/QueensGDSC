import React, { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
    TouchableOpacity,
    Button,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "react-native-vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapPage from "./MapPage";

import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

const Stack = createNativeStackNavigator();

export default function Scan({
    locations,
    currentLoc,
    posts,
    setPosts,
    ownPosts,
    setUpdatePosts,
    db,
    currentUser,
}) {
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(null);
    const [types, setTypes] = useState(null);
    const [uploading, setUploading] = useState(false);
    const API_KEY = "";
    const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
    const storage = getStorage();

    const callGoogleVisionAsync = async (image, uri) => {
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
            results.push({ kind: obj.description, accuracy: obj.score });
        });
        console.log("callGoogleVisionAsync -> result", results);
        setTypes(results);
    };

    const addNewPost = async (image) => {
        setUploading(true);
        const imageRef = ref(
            storage,
            image.substring(image.lastIndexOf("/") + 1)
        );
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", image, true);
            xhr.send(null);
        });
        console.log("uploading");
        uploadBytes(imageRef, blob, { contentType: "image/jpg" })
            .then(async (snapshot) => {
                console.log("Uploaded a blob or file!");
                const path = await getDownloadURL(imageRef);
                const postRef = await addDoc(collection(db, "posts"), {
                    user: doc(db, "users", currentUser.uid),
                    pfp: currentUser.pfp,
                    image: path,
                    description: "🎉 Earned 40 points for scanning an item 🎉",
                    createdAt: new Date(),
                });
                await updateDoc(doc(db, "users", currentUser.uid), {
                    posts: currentUser.posts.concat([
                        doc(db, "posts", postRef.id),
                    ]),
                });
            })
            .then(() => {
                setUpdatePosts(true);
                setUploading(false);
            });
    };
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        const { cancelled, uri, base64 } =
            await ImagePicker.launchImageLibraryAsync({
                base64: true,
            });

        if (!cancelled) {
            setImage(uri);
            try {
                const result = await callGoogleVisionAsync(base64, uri);
                setStatus(result);
                addNewPost(uri);
            } catch (error) {
                setStatus(`Error: ${error.message}`);
            }
        } else {
            setImage(null);
            setStatus(null);
        }
    };
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
                const result = await callGoogleVisionAsync(base64, uri);
                setStatus(result);
                addNewPost(uri);
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
                {image ? (
                    <ScrollView>
                        <View
                            style={{ backgroundColor: "#5DB075", height: 200 }}
                        >
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: 10,
                                }}
                                onPress={() => {
                                    setTypes(null);
                                    setImage(null);
                                }}
                            >
                                <Feather
                                    name="chevrons-left"
                                    size={30}
                                    color="white"
                                ></Feather>
                                <Text
                                    style={{
                                        color: "white",
                                        fontWeight: "600",
                                        fontSize: 16,
                                    }}
                                >
                                    Back
                                </Text>
                            </TouchableOpacity>
                            <Text
                                style={{
                                    alignSelf: "center",
                                    color: "white",
                                    fontSize: 30,
                                    fontWeight: "700",
                                }}
                            >
                                Scan Results 🔎
                            </Text>
                        </View>
                        <View
                            style={{
                                position: "absolute",
                                alignSelf: "center",
                                top: 100,
                                shadowColor: "black",
                                shadowOpacity: 0.2,
                                shadowRadius: 10,
                            }}
                        >
                            <Image
                                source={{ uri: image }}
                                style={{
                                    width: 160,
                                    height: 160,
                                    borderRadius: 80,
                                }}
                            />
                        </View>

                        <View
                            style={{
                                alignItems: "center",
                                paddingVertical: 80,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 28,
                                    fontWeight: "700",
                                }}
                            >
                                You have scanned:
                            </Text>
                            {uploading || !types ? (
                                <ActivityIndicator
                                    size="large"
                                    color="#4B9460"
                                    marginTop={20}
                                />
                            ) : (
                                <>
                                    {types.map((type) => (
                                        <View
                                            style={{
                                                flexDirection: "column",
                                                alignItems: "center",
                                                marginTop: 10,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 20,
                                                    fontWeight: "600",
                                                    opacity: 0.6,
                                                }}
                                            >
                                                {type.kind}
                                            </Text>
                                            <Text
                                                style={{
                                                    opacity: 0.4,
                                                }}
                                            >{`(${(type.accuracy * 100).toFixed(
                                                2
                                            )}% likely)`}</Text>
                                        </View>
                                    ))}
                                    <Text
                                        style={{
                                            fontSize: 24,
                                            fontWeight: "700",
                                            marginTop: 20,
                                        }}
                                    >
                                        🎉 40 Points Earned! 🎉
                                    </Text>
                                    <View style={styles.card}>
                                        <Text
                                            style={{
                                                color: "#4B9460",
                                                fontSize: 20,
                                                fontWeight: "700",
                                            }}
                                        >
                                            Recycling Categories:
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                marginVertical: 10,
                                                justifyContent: "center",
                                            }}
                                        >
                                            <View style={styles.tag}>
                                                <Text style={styles.kind}>
                                                    Can
                                                </Text>
                                            </View>
                                            <View style={styles.tag}>
                                                <Text style={styles.kind}>
                                                    Scrap Metal
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.add}
                                            onPress={() =>
                                                navigation.navigate("MapPage")
                                            }
                                        >
                                            <Text
                                                style={{
                                                    color: "white",
                                                    fontWeight: "700",
                                                    fontSize: 16,
                                                    textAlign: "center",
                                                    marginRight: 10,
                                                }}
                                            >
                                                📍Find Nearest Recyling Bin
                                            </Text>
                                            <Feather
                                                name="chevrons-right"
                                                size={30}
                                                color="white"
                                            ></Feather>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.fact}>
                                        <Text
                                            style={{
                                                color: "#4B9460",
                                                fontSize: 20,
                                                fontWeight: "700",
                                            }}
                                        >
                                            🤔Did you know?
                                        </Text>
                                        <Text style={styles.fact_text}>
                                            Companies can produce as many as
                                            80,000,000 Aluminum cans every year?{" "}
                                        </Text>
                                        <Text style={styles.fact_text}>
                                            That’s a lot of soda!
                                        </Text>
                                    </View>
                                </>
                            )}
                        </View>
                    </ScrollView>
                ) : (
                    <View
                        style={{
                            backgroundColor: "black",
                            justifyContent: "center",
                            height: "100%",
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: "white",
                                alignSelf: "center",
                                borderRadius: 10,
                                shadowColor: "black",
                                shadowOpacity: 0.2,
                                shadowRadius: 50,
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                            }}
                        >
                            <Button
                                onPress={openCamera}
                                title="Open camera"
                                color={"grey"}
                            />
                            <Button
                                title="Pick an image from camera roll"
                                onPress={pickImage}
                                color={"grey"}
                            />
                        </View>
                    </View>
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
    add: {
        alignSelf: "center",
        backgroundColor: "#5DB075",
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignItems: "center",
        flexDirection: "row",
    },
    tag: {
        borderWidth: 1,

        borderColor: "#5DB075",
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 8,
        marginHorizontal: 5,
        marginVertical: 5,
    },
    kind: {
        color: "#5DB075",
        fontSize: 12,
        fontWeight: "500",
    },
    card: {
        backgroundColor: "white",
        width: 320,
        borderRadius: 15,
        marginVertical: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        alignItems: "center",
    },
    fact: {
        width: 320,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 15,
        borderColor: "#5DB075",
        borderWidth: 2,
        borderStyle: "dashed",
    },
    fact_text: {
        // color: "#4B9460",
        marginTop: 10,
        opacity: 0.6,
    },
});
