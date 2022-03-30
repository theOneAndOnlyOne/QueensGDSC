import React, { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Button,
} from "react-native";
import { FontAwesome, Feather } from "react-native-vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function AddPost({
    navigation,
    posts,
    setPosts,
    ownPosts,
    setOwnPosts,
}) {
    const [image, setImage] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const [text, setText] = useState("");
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            //allowsEditing: true,
            //aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
        setShowPicker(false);
    };
    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult =
            await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        // Explore the result
        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            setShowPicker(false);
            console.log(result.uri);
        }
    };

    const addNewPost = () => {
        navigation.navigate("Posts");
        setPosts([
            {
                user: "Olivia",
                userInfo: "CS Student at Queen's",
                pfp: "/Users/oliviachenxu/Documents/QueensGDSC/App/assets/olivia.jpg",
                image: image,
                description: text,
                createdAt: new Date(),
            },
            ...posts,
        ]);
        console.log(ownPosts);
        setOwnPosts([
            {
                user: "Olivia",
                userInfo: "CS Student at Queen's",
                pfp: "/Users/oliviachenxu/Documents/QueensGDSC/App/assets/olivia.jpg",
                image: image,
                description: text,
                createdAt: new Date(),
            },
            ...ownPosts,
        ]);

        setImage(null);
        setText(null);
    };
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "white",
                paddingHorizontal: 40,
            }}
        >
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    position: "absolute",
                    top: 60,
                }}
                onPress={() => {
                    navigation.navigate("Posts");
                    setImage(null);
                    setText(null);
                }}
            >
                <Feather
                    name="chevrons-left"
                    size={30}
                    color="#5DB075"
                ></Feather>
                <Text
                    style={{
                        color: "#5DB075",
                        fontWeight: "600",
                        fontSize: 16,
                    }}
                >
                    Back
                </Text>
            </TouchableOpacity>
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "700",
                    marginBottom: 20,
                }}
            >
                Create New Post
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                selectionColor={"#4B9460"}
                placeholder="Say something..."
                multiline={true}
            />
            {!image && (
                <TouchableOpacity
                    style={styles.add_photo}
                    onPress={() => setShowPicker(true)}
                >
                    <FontAwesome
                        name="photo"
                        size={30}
                        color="#5DB075"
                    ></FontAwesome>
                    <Text
                        style={{
                            color: "#5DB075",
                            fontSize: 18,
                            fontWeight: "600",
                            marginLeft: 20,
                        }}
                    >
                        Add A Photo
                    </Text>
                </TouchableOpacity>
            )}

            {image && (
                <Image
                    source={{ uri: image }}
                    style={{
                        height: 200,
                        borderRadius: 10,
                        marginTop: 15,
                    }}
                />
            )}

            <TouchableOpacity
                style={{ ...styles.add_photo, backgroundColor: "#5DB075" }}
                onPress={addNewPost}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "600",
                    }}
                >
                    Done
                </Text>
            </TouchableOpacity>
            {showPicker && (
                <View
                    style={{
                        position: "absolute",
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
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    add_photo: {
        flexDirection: "row",
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 12,
        borderColor: "#5DB075",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },
    input: {
        backgroundColor: "#F6F6F6",
        borderRadius: 12,
        height: 150,
        paddingHorizontal: 15,
        paddingTop: 10,
        marginBottom: 10,
    },
});
