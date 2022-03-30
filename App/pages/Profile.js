import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import moment from "moment";

export default function Profile({ ownPosts, navigation }) {
    const [showStats, setShowStats] = useState(true);
    return (
        <SafeAreaView>
            <View style={{ backgroundColor: "#5DB075", height: 180 }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        marginTop: 20,
                    }}
                >
                    <TouchableOpacity onPress={() => {}}>
                        <Text
                            style={{
                                color: "white",
                                fontWeight: "500",
                                fontSize: 16,
                            }}
                        >
                            Settings
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                            color: "white",
                            fontSize: 30,
                            fontWeight: "600",
                        }}
                    >
                        My Profile
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Landing");
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontWeight: "500",
                                fontSize: 16,
                            }}
                        >
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    position: "absolute",
                    alignSelf: "center",
                    top: 110,
                    shadowColor: "black",
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                }}
            >
                <Image
                    source={require("../assets/olivia.jpg")}
                    style={{
                        width: 160,
                        height: 160,
                        borderRadius: 80,
                        borderWidth: 5,
                        borderColor: "white",
                    }}
                />
            </View>

            <View
                style={{
                    alignItems: "center",
                    paddingVertical: 50,
                }}
            >
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: "600",
                    }}
                >
                    Hi, Olivia!
                </Text>
                <View style={styles.tab_bg}>
                    <TouchableOpacity
                        style={
                            showStats
                                ? styles.tab
                                : {
                                      ...styles.tab,
                                      backgroundColor: "rgba(0, 0, 0, 0)",
                                  }
                        }
                        onPress={() => setShowStats(true)}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "600",
                                color: showStats ? "#5DB075" : "#ADADAD",
                            }}
                        >
                            Stats
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={
                            !showStats
                                ? styles.tab
                                : {
                                      ...styles.tab,
                                      backgroundColor: "rgba(0, 0, 0, 0)",
                                  }
                        }
                        onPress={() => setShowStats(false)}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "600",
                                color: !showStats ? "#5DB075" : "#ADADAD",
                            }}
                        >
                            Posts
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ height: 400 }}>
                    {showStats ? (
                        <Image
                            source={require("../assets/stats.png")}
                            style={{
                                width: 360,
                                height: 350,
                                resizeMode: "contain",
                            }}
                        ></Image>
                    ) : (
                        ownPosts.map((post) => (
                            <View
                                style={{
                                    marginVertical: 5,
                                    backgroundColor: "white",
                                    borderRadius: 10,
                                    paddingHorizontal: 20,
                                    paddingVertical: 15,
                                }}
                            >
                                <Text
                                    style={{
                                        position: "absolute",
                                        right: 10,
                                        top: 5,
                                        fontSize: 12,
                                        opacity: 0.5,
                                    }}
                                >{`${moment(post.createdAt).fromNow(
                                    true
                                )} ago`}</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Image
                                        source={{ uri: post.pfp }}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 10,
                                            marginRight: 10,
                                        }}
                                    ></Image>
                                    <View style={{ justifyContent: "center" }}>
                                        <Text
                                            style={{
                                                fontWeight: "700",
                                                fontSize: 16,
                                            }}
                                        >
                                            {post.user}
                                        </Text>
                                        <Text
                                            style={{
                                                opacity: 0.6,
                                                fontSize: 12,
                                            }}
                                        >
                                            {post.userInfo}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={{ marginVertical: 10 }}>
                                    {post.description}
                                </Text>
                                <Image
                                    source={{ uri: post.image }}
                                    style={{
                                        borderRadius: 10,
                                        height: 200,
                                    }}
                                ></Image>
                            </View>
                        ))
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    tab: {
        justifyContent: "center",
        alignItems: "center",
        width: 148,
        height: 36,
        backgroundColor: "#f6f6f6",
        borderRadius: 18,
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
});
