import React, { useState } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    Button,
    TextInput,
} from "react-native";
import { FontAwesome, Feather } from "react-native-vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function AddLocation({
    currentLoc,
    locations,
    setLocations,
    setAddedNew,
    posts,
    setPosts,
    ownPosts,
    setOwnPosts,
    navigation,
}) {
    const [image, setImage] = useState(null);
    const [locName, setLocName] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [tags, setTags] = useState([
        { type: "Plastic", selected: false },
        { type: "Paper", selected: false },
        { type: "Can", selected: false },
        { type: "Organics", selected: false },
        { type: "Landfill", selected: false },
        { type: "Glass", selected: false },
        { type: "Scrap Metal", selected: false },
        { type: "Fabrics", selected: false },
        { type: "Batteries", selected: false },
    ]);

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
    const addNewLoc = () => {
        navigation.navigate("MapPage");

        const selectedTags = [];
        tags.forEach((tag) => {
            if (tag.selected === true) {
                selectedTags.push(tag.type);
            }
        });
        setLocations([
            ...locations,
            {
                name: locName,
                latitude: currentLoc.coords.latitude,
                longitude: currentLoc.coords.longitude,
                image: image,
                tags: selectedTags,
                numOfDropOffs: 0,
                tonsRecycled: 0,
            },
        ]);
        setPosts([
            {
                user: "Olivia",
                userInfo: "CS Student at Queen's",
                pfp: "/Users/oliviachenxu/Documents/QueensGDSC/App/assets/olivia.jpg",
                image: image,
                description: "🎉 Earned 100 points for adding a location 🎉",
                createdAt: new Date(),
            },
            ...posts,
        ]);
        setOwnPosts([
            {
                user: "Olivia",
                userInfo: "CS Student at Queen's",
                pfp: "/Users/oliviachenxu/Documents/QueensGDSC/App/assets/olivia.jpg",
                image: image,
                description: "🎉 Earned 100 points for adding a location 🎉",
                createdAt: new Date(),
            },
            ...ownPosts,
        ]);
        setAddedNew(true);
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
                onPress={() => navigation.navigate("MapPage")}
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
            <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 20 }}>
                Enter New Location
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={setLocName}
                value={locName}
                selectionColor={"#4B9460"}
                placeholder="Give a name for this new location"
            />
            <Text
                style={{ fontSize: 18, fontWeight: "700", marginVertical: 10 }}
            >
                What can be recycled there?{" "}
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}
            >
                {tags.map((tag) => (
                    <TouchableOpacity
                        style={
                            tag.selected ? styles.selected : styles.not_selected
                        }
                        onPress={() =>
                            setTags(
                                tags.map((t) =>
                                    t == tag
                                        ? {
                                              type: t.type,
                                              selected: !t.selected,
                                          }
                                        : t
                                )
                            )
                        }
                    >
                        <Text
                            style={{
                                color: tag.selected ? "white" : "#5DB075",
                                fontSize: 12,
                                fontWeight: "500",
                            }}
                        >
                            {tag.type}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
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
                onPress={addNewLoc}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "600",
                        marginLeft: 20,
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
    input: {
        backgroundColor: "#F6F6F6",
        borderRadius: 12,
        height: 50,
        paddingLeft: 10,
        marginBottom: 10,
    },
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
    selected: {
        backgroundColor: "#5DB075",
        borderWidth: 1,
        borderColor: "#5DB075",
        color: "white",
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 8,
        marginRight: 5,
        marginVertical: 5,
    },
    not_selected: {
        borderWidth: 1,
        borderColor: "#5DB075",
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 8,
        marginRight: 5,
        marginVertical: 5,
    },
});
