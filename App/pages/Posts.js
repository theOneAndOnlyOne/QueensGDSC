import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import moment from "moment";

export default function Posts({ navigation, posts }) {
    return (
        <SafeAreaView>
            <ScrollView style={{ marginHorizontal: 20 }}>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Text style={{ fontWeight: "600", fontSize: 32 }}>
                        Welcome,{`  `}
                    </Text>
                    <Text style={{ fontWeight: "300", fontSize: 32 }}>
                        Olivia!
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.add}
                    onPress={() => navigation.navigate("AddPost")}
                >
                    <Text
                        style={{
                            color: "white",
                            fontWeight: "700",
                            fontSize: 16,
                            textAlign: "center",
                        }}
                    >
                        Create New Post
                    </Text>
                </TouchableOpacity>
                {posts.map((post) => (
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
                        >{`${moment(post.createdAt).fromNow(true)} ago`}</Text>
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
                                <Text style={{ opacity: 0.6, fontSize: 12 }}>
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
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    add: {
        backgroundColor: "#5DB075",
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center",
        marginHorizontal: 0,
        marginVertical: 10,
    },
});
