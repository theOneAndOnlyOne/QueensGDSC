import React, { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Feather } from "react-native-vector-icons";

export default function LeaderBoard({ setIsLB }) {
    const [showLocal, setShowLocal] = useState(true);
    const ranking = [
        { user: "🥇Arielle🥇", score: 4867 },
        { user: "🥈Mahida🥈", score: 4265 },
        { user: "🥉Tucker🥉", score: 3900 },
        { user: "Vikram", score: 3525 },
        { user: "Jasmine", score: 3250 },
        { user: "Olivia (You)", score: 3201 },
        { user: "Amanda", score: 3094 },
        { user: "Malika", score: 2934 },
        { user: "James", score: 2783 },
        { user: "Kushi", score: 2781 },
        { user: "Sarah", score: 2563 },
        { user: "Mohammed", score: 2401 },
        { user: "Dilly", score: 2291 },
        { user: "Josh", score: 2092 },
        { user: "Alessia", score: 1523 },
        { user: "Ally", score: 203 },
    ];
    return (
        <SafeAreaView>
            <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                    style={{ position: "absolute", left: 20, top: 15 }}
                    onPress={() => setIsLB(false)}
                >
                    <Feather
                        name="chevrons-left"
                        size={30}
                        color="#5DB075"
                    ></Feather>
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: "600",
                        marginTop: 10,
                    }}
                >
                    Leaderboard
                </Text>
                <View style={styles.tab_bg}>
                    <TouchableOpacity
                        style={
                            showLocal
                                ? styles.tab
                                : {
                                      ...styles.tab,
                                      backgroundColor: "rgba(0, 0, 0, 0)",
                                  }
                        }
                        onPress={() => setShowLocal(true)}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "600",
                                color: showLocal ? "#5DB075" : "#ADADAD",
                            }}
                        >
                            Local
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={
                            !showLocal
                                ? styles.tab
                                : {
                                      ...styles.tab,
                                      backgroundColor: "rgba(0, 0, 0, 0)",
                                  }
                        }
                        onPress={() => setShowLocal(false)}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "600",
                                color: !showLocal ? "#5DB075" : "#ADADAD",
                            }}
                        >
                            World
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {ranking.map((r, index) => (
                        <>
                            <View
                                style={{
                                    flexDirection: "row",
                                    width: 300,
                                    paddingVertical: 10,
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text
                                    style={
                                        r.user === "Olivia (You)"
                                            ? {
                                                  ...styles.text,
                                                  color: "black",
                                                  opacity: 0.8,
                                                  fontWeight: "700",
                                              }
                                            : styles.text
                                    }
                                >
                                    {index + 1}
                                </Text>
                                <Text
                                    style={
                                        r.user === "Olivia (You)"
                                            ? {
                                                  ...styles.text,
                                                  color: "black",
                                                  opacity: 0.8,
                                                  fontWeight: "700",
                                              }
                                            : styles.text
                                    }
                                >
                                    {r.user}
                                </Text>
                                <Text
                                    style={
                                        r.user === "Olivia (You)"
                                            ? {
                                                  ...styles.text,
                                                  color: "black",
                                                  opacity: 0.8,
                                                  fontWeight: "700",
                                              }
                                            : styles.text
                                    }
                                >
                                    {r.score}
                                </Text>
                            </View>
                            <View
                                style={{
                                    height: 1,
                                    borderWidth: 0.5,
                                    width: 300,
                                    opacity: 0.2,
                                }}
                            ></View>
                        </>
                    ))}
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
        marginVertical: 20,
    },
    text: { color: "#4B9460", fontSize: 14, fontWeight: "500" },
});
