import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Button,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import AddLocation from "./AddLocation";

export default function MapPage({ currentLoc, locations, navigation }) {
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
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
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
                    >
                        <Callout tooltip>
                            <View style={styles.container}>
                                <Text>{loc.name}</Text>
                                {!loc.image ? (
                                    <View
                                        style={{
                                            width: 200,
                                            height: 200,
                                            backgroundColor: "grey",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text>no image</Text>
                                    </View>
                                ) : (
                                    <Image
                                        source={{ uri: loc.image }}
                                        style={{
                                            width: 200,
                                            height: 200,
                                        }}
                                    />
                                )}
                            </View>
                        </Callout>
                    </Marker>
                ))}
                {/* <MapViewDirections
            origin={currentLoc}
            destination={{
                latitude: 37.771707 - 0.001,
                longitude: -122.4053769,
            }}
            apikey="AIzaSyBCRqst2_5hp1HMQpauRqbhtg8C18OwQYI"
        /> */}
            </MapView>
            <TouchableOpacity
                style={{
                    position: "absolute",
                    backgroundColor: "white",
                    width: 200,
                    alignSelf: "center",
                    marginTop: 50,
                }}
                onPress={() => navigation.navigate("AddLocation")}
            >
                <Text>Add your current location as a new recycling place</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    page: { flex: 1 },
    container: {
        backgroundColor: "white",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 10,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
