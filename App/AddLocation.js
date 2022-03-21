import React, { useState } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    Button,
    TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function AddLocation({
    currentLoc,
    locations,
    setLocations,
    navigation,
}) {
    const [image, setImage] = useState(null);
    const [locName, setLocName] = useState("");
    const [showPicker, setShowPicker] = useState(false);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
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
        console.log(currentLoc);
        setLocations([
            ...locations,
            {
                name: locName,
                latitude: currentLoc.coords.latitude,
                longitude: currentLoc.coords.longitude,
                image: image,
            },
        ]);
    };
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <TextInput
                onChangeText={setLocName}
                value={locName}
                placeholder="Give a name for this new location"
            />
            {!image && (
                <Button
                    title="Add a photo"
                    onPress={() => setShowPicker(true)}
                ></Button>
            )}

            {image && (
                <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
                />
            )}
            <Button onPress={addNewLoc} title="Done"></Button>
            {showPicker && (
                <View
                    style={{ position: "absolute", backgroundColor: "white" }}
                >
                    <Button onPress={openCamera} title="Open camera" />
                    <Button
                        title="Pick an image from camera roll"
                        onPress={pickImage}
                    />
                </View>
            )}
        </View>
    );
}
