import React, { useState, useEffect } from "react";
import { Feather, Entypo } from "@expo/vector-icons";
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import moment from "moment";
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from "react-native-vector-icons";
import LeaderBoard from "./LeaderBoard";
import PointsCategory from "./PointsComponents/PointsCategory";

export default function Points({ currentUser }) {
    const [isLB, setIsLB] = useState(false);
    return isLB ? (
        <LeaderBoard setIsLB={setIsLB}></LeaderBoard>
    ) : (
        <SafeAreaView>
            <View style={{ backgroundColor: "#5DB075", height: 280 }}>
                <View
                    style={{
                        marginLeft: 25,
                        marginRight: 25,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 20,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#4F8F62",
                            borderColor: "#5DB075",
                            borderRadius: 55,
                            borderWidth: 1,
                            width: 150,
                            height: 50,
                            justifyContent: "flex-end",
                            alignItems: "center",
                            overflow: "visible",
                            flexDirection: "row",
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontWeight: "500",
                                fontSize: 16,
                                lineHeight: 30,
                                paddingRight: 15,
                            }}
                        >
                            🎉3201
                        </Text>
                        <Image
                            source={{ uri: currentUser.pfp }}
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 30,
                                borderWidth: 2,
                                borderColor: "white",
                                backgroundColor: "#ADADAD",
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => setIsLB(true)}
                        style={{ position: "absolute", right: 5 }}
                    >
                        <MaterialIcons
                            name="leaderboard"
                            size={28}
                            color="#f6f6f6"
                        />
                    </TouchableOpacity>
                </View>
                <Text
                    style={{
                        color: "white",
                        fontWeight: "500",
                        fontSize: 37,
                        alignSelf: "center",
                        textAlign: "center",
                        padding: 20,
                    }}
                >
                    You're up this week by
                    <Text style={{ fontWeight: "200" }}>{` 20 Points`}</Text>
                </Text>
                {/* TO DO: make this following TouchableOpacity go to Leaderboard onPress */}
                <TouchableOpacity style={styles.tab}>
                    {/* I apologize with this mostrosity of styling. TO DO: Fix this */}
                    <View
                        style={{
                            width: 200,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#4F8F62",
                            borderColor: "#5DB075",
                            borderRadius: 55,
                            padding: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontWeight: "500",
                                fontSize: 14,
                            }}
                        >
                            GLOBAL EVENT
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            source={require("../assets/gael.png")}
                            style={styles.gael_img}
                        />
                        <Text
                            style={{
                                flex: 1,
                                paddingLeft: 10,
                                color: "black",
                                fontWeight: "500",
                                fontSize: 12,
                            }}
                        >
                            Your University is 10532 Points ahead of Stanford!
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* TO DO: Add rounded background to searchContainer styling */}
            <View style={styles.searchContainer}>
                <Feather
                    name="search"
                    size={20}
                    color="black"
                    style={{ marginLeft: 1 }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Search for items to redeem"
                />
            </View>
            <ScrollView style={{ height: 300 }}>
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "700",
                        paddingHorizontal: 20,
                    }}
                >
                    Popular Choices
                </Text>
                <View
                    style={{
                        marginTop: 10,
                    }}
                >
                    <ScrollView horizontal={true}>
                        <PointsCategory
                            imageUri={require("../assets/goodwill-inside.jpg")}
                            name="Goodwill @ 10$"
                            points="600"
                        />
                        <PointsCategory
                            imageUri={require("../assets/bag.jpg")}
                            name="Reusable bag"
                            points="200"
                        />
                        <PointsCategory
                            imageUri={require("../assets/bike.jpg")}
                            name="Lyme E-Bike"
                            points="5010"
                        />
                    </ScrollView>
                </View>
                <Text
                    style={{
                        paddingTop: 20,
                        fontSize: 16,
                        fontWeight: "700",
                        paddingHorizontal: 20,
                    }}
                >
                    Starbucks, Kingston
                </Text>
                <View
                    style={{
                        marginTop: 10,
                    }}
                >
                    <ScrollView horizontal={true}>
                        <PointsCategory
                            imageUri={require("../assets/frappuchino.jpg")}
                            name="Vanilla Latte"
                            points="110"
                        />
                        <PointsCategory
                            imageUri={require("../assets/coffee.png")}
                            name="Cappuccino"
                            points="115"
                        />
                        <PointsCategory
                            imageUri={require("../assets/coffee.png")}
                            name="Dark Roast"
                            points="210"
                        />
                    </ScrollView>
                </View>
                <Text
                    style={{
                        paddingTop: 20,
                        fontSize: 16,
                        fontWeight: "700",
                        paddingHorizontal: 20,
                    }}
                >
                    The Goodway E-Tech
                </Text>
                <View
                    style={{
                        marginTop: 10,
                    }}
                >
                    <ScrollView horizontal={true}>
                        <PointsCategory
                            imageUri={require("../assets/bike.jpg")}
                            name="Lyme E-Bike"
                            points="5010"
                        />
                        <PointsCategory
                            imageUri={require("../assets/larq.png")}
                            name="Larq Bottle"
                            points="1750"
                        />
                        <PointsCategory
                            imageUri={require("../assets/crisps.png")}
                            name="Yappah Chips"
                            points="680"
                        />
                        <PointsCategory
                            imageUri={require("../assets/lyric T6.png")}
                            name="Lyric Thermostat"
                            points="6080"
                        />
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    tab: {
        width: 280,
        height: 140,
        backgroundColor: "#f6f6f6",
        borderRadius: 18,
        shadowColor: "#000000",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    tab_bg: {
        flexDirection: "row",
        backgroundColor: "#E8E8E8",
        width: 300,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    gael_img: {
        marginTop: 10,
        marginLeft: 15,
        width: 53,
        height: 65,
    },
    input: {
        fontSize: 12,
        marginLeft: 10,
        width: "90%",
    },
    searchContainer: {
        marginTop: 70,
        marginBottom: 15,
        padding: 15,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "85%",
        backgroundColor: "#E8E8E8",
        alignSelf: "center",
        borderRadius: 25,
    },
});
