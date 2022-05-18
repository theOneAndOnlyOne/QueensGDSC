import React, { useState, useEffect } from "react";
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
import { signOut } from "firebase/auth";
import {
    collection,
    getDocs,
    getDoc,
    doc,
    orderBy,
    query,
} from "firebase/firestore";

export default function Profile({
    auth,
    ownPosts,
    navigation,
    currentUser,
    setCurrentUser,
    updatePosts,
    setUpdatePosts,
    db,
}) {
    const [showStats, setShowStats] = useState(true);
    const [posts, setPosts] = useState();
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigation.navigate("Landing");
                setCurrentUser(null);
            })
            .catch((error) => alert(error.message));
    };
    const getOwnPosts = async () => {
        setPosts(null);
        const data = [];
        const userRef = doc(db, "users", currentUser.uid);
        const ownPosts = await (await getDoc(userRef)).data().posts;
        //console.log(ownPosts);
        ownPosts.forEach(async (doc) => {
            const post = await getDoc(doc);
            const { createdAt, description, image } = post.data();
            data.push({
                createdAt,
                description,
                image,
                user: currentUser.name,
                userInfo: currentUser.info,
                pfp: currentUser.pfp,
            });
            data.sort((a, b) => b.createdAt - a.createdAt);
            setTimeout(() => setPosts(data), 1000);
        });
        // const postsSnapshot = await getDocs(
        //     query(collection(db, "posts"), orderBy("createdAt", "desc"))
        // );

        // postsSnapshot.forEach(async (doc) => {
        //     const { createdAt, description, image } = doc.data();
        //     const user = await getDoc(doc.data().user);
        //     const { name, info, pfp } = user.data();
        //     data.push({
        //         createdAt,
        //         description,
        //         image,
        //         user: name,
        //         userInfo: info,
        //         pfp,
        //     });
        // });
        // console.log("setting posts", data[0]);
        // setTimeout(() => setPosts(data), 2000);

        // console.log("posts updated", data[0]);
        // //setIsLoading(false);
    };
    useEffect(() => {
        getOwnPosts();
    }, []);
    useEffect(() => {
        getOwnPosts();
        setUpdatePosts(false);
    }, [updatePosts]);

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
                    <TouchableOpacity onPress={handleSignOut}>
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
                    source={{ uri: currentUser.pfp }}
                    style={{
                        width: 160,
                        height: 160,
                        borderRadius: 80,
                        borderWidth: 5,
                        borderColor: "white",
                        backgroundColor: "#ADADAD",
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
                    {`Hi, ${currentUser.name}!`}
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
                    ) : !posts ? (
                        <ActivityIndicator
                            size="large"
                            color="#4B9460"
                            marginTop={20}
                        ></ActivityIndicator>
                    ) : (
                        posts.map((post) => (
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
                                >{`${moment(
                                    post.createdAt.seconds * 1000
                                ).fromNow(true)} ago`}</Text>
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
