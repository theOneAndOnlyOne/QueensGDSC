import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Button,
    Modal,
    ImageStore,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { Feather, FontAwesome, Ionicons } from "react-native-vector-icons";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import Animated from "react-native-reanimated";
import { BottomSheet } from "react-native-elements";

export default function MapPage({
    currentLoc,
    locations,
    navigation,
    addLocationEnabled,
    scanAnotherEnabled,
    addedNew,
    setAddedNew,
}) {
    const [showInfo, setShowInfo] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedLoc, setSelectedLoc] = useState(null);

    const InfoCard = () => {
        return (
            selectedLoc && (
                <BottomSheet
                    isVisible={showInfo}
                    containerStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        top: 100,
                        marginHorizontal: 10,
                    }}
                >
                    <View style={styles.info}>
                        <TouchableOpacity
                            onPress={() => {
                                setShowInfo(false);
                            }}
                        >
                            <FontAwesome
                                name="sort-down"
                                size={30}
                                style={{ opacity: 0.5 }}
                            ></FontAwesome>
                        </TouchableOpacity>
                        <ScrollView style={{ height: 350 }}>
                            {!selectedLoc.image ? (
                                <View style={styles.no_image}>
                                    <Text>no image</Text>
                                </View>
                            ) : (
                                <>
                                    <Image
                                        source={{ uri: selectedLoc.image }}
                                        style={styles.loc_image}
                                        // onLoadStart={() => setLoading(true)}
                                        // onLoadEnd={() => setLoading(false)}
                                    ></Image>
                                    {/* {loading && (
                                        <ActivityIndicator
                                            size="large"
                                            color="#4B9460"
                                            marginTop={20}
                                        />
                                    )} */}
                                </>

                                // <>
                                //     <TouchableOpacity
                                //         onPress={() => setShowImage(true)}
                                //     >

                                //     </TouchableOpacity>
                                // </>
                            )}
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: "700",
                                    marginVertical: 8,
                                }}
                            >
                                {selectedLoc.name}
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                }}
                            >
                                {selectedLoc.tags.map((tag) => (
                                    <View style={styles.tags}>
                                        <Text
                                            style={{
                                                color: "white",
                                                fontSize: 12,
                                                fontWeight: "500",
                                            }}
                                        >
                                            {tag}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                            <Text
                                style={styles.text}
                            >{`Number of community drop offs: ${selectedLoc.numOfDropOffs}`}</Text>
                            <Text
                                style={styles.text}
                            >{`Total tons of garbage recycled: ${selectedLoc.tonsRecycled}`}</Text>

                            <View></View>
                        </ScrollView>
                    </View>
                </BottomSheet>
            )
        );
    };

    return !locations ? (
        <></>
    ) : (
        <View style={styles.page}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: currentLoc.coords.latitude,
                    longitude: currentLoc.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.02,
                }}
                showsUserLocation={true}
                followsUserLocation={true}
                showsMyLocationButton={true}
            >
                {locations.map((loc) => (
                    <Marker
                        coordinate={{
                            latitude: loc.latitude,
                            longitude: loc.longitude,
                        }}
                        onPress={() => {
                            setShowInfo(true);
                            setSelectedLoc(loc);
                        }}
                    >
                        <Ionicons
                            name="location"
                            size={40}
                            color="#4B9460"
                        ></Ionicons>
                        <Callout tooltip style={styles.container}>
                            <View>
                                <Text>{`📍 ${loc.name} 📍`}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <SafeAreaView>
                {scanAnotherEnabled && (
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            position: "absolute",
                            top: 60,
                        }}
                        onPress={() => navigation.navigate("Main")}
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
                )}
                {addLocationEnabled && (
                    <>
                        <TouchableOpacity
                            style={styles.add}
                            onPress={() => navigation.navigate("AddLocation")}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontWeight: "700",
                                    fontSize: 16,
                                    textAlign: "center",
                                }}
                            >
                                Record Current Location!
                            </Text>
                        </TouchableOpacity>
                        <BottomSheet
                            isVisible={addedNew}
                            containerStyle={{
                                backgroundColor: "rgba(0, 0, 0, 0)",
                                top: 120,
                                marginHorizontal: 10,
                            }}
                        >
                            <View style={styles.reward}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setAddedNew(false);
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "600",
                                            color: "#5DB075",
                                            textAlign: "center",
                                            marginBottom: 10,
                                        }}
                                    >
                                        New Location Added!
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 24,
                                            fontWeight: "700",
                                            textAlign: "center",
                                        }}
                                    >
                                        🎉 100 Points Earned! 🎉
                                    </Text>
                                    {/* <FontAwesome
                                        name="sort-down"
                                        size={30}
                                        style={{
                                            opacity: 0.5,
                                        }}
                                    ></FontAwesome> */}
                                </TouchableOpacity>
                            </View>
                        </BottomSheet>
                    </>
                )}
                <InfoCard></InfoCard>
                {/* {selectedLoc && (
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={showImage}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                setShowImage(false);
                            }}
                        >
                            <Image
                                source={{
                                    uri: selectedLoc.image,
                                    width: 200,
                                    height: 200,
                                }}
                            ></Image>
                        </TouchableOpacity>
                    </Modal>
                )} */}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    page: { flex: 1 },
    text: { opacity: 0.6, marginTop: 1 },
    container: {
        backgroundColor: "white",
        width: 150,
        borderRadius: 5,
        alignItems: "center",
        padding: 10,
    },
    add: {
        width: 200,
        alignSelf: "center",
        backgroundColor: "#5DB075",
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignItems: "center",
    },
    bin: { width: 15, height: 25 },
    info: {
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    no_image: {
        width: 300,
        height: 200,
        backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 8,
        borderRadius: 10,
    },
    loc_image: {
        width: 300,
        height: 200,
        marginVertical: 8,
        borderRadius: 10,
    },
    tags: {
        backgroundColor: "#5DB075",
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 8,
        marginRight: 5,
        marginBottom: 10,
    },
    reward: {
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        //justifyContent: "center",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
