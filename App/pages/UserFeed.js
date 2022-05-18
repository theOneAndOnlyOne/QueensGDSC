import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Posts from "./Posts";
import AddPost from "./AddPost";

import {
    collection,
    getDocs,
    getDoc,
    orderBy,
    query,
} from "firebase/firestore";

const Stack = createNativeStackNavigator();

export default function UserFeed({
    ownPosts,
    setOwnPosts,
    currentUser,
    db,
    updatePosts,
    setUpdatePosts,
}) {
    const [posts, setPosts] = useState();

    const getPosts = async () => {
        setPosts(null);
        const data = [];
        const postsSnapshot = await getDocs(
            query(collection(db, "posts"), orderBy("createdAt", "desc"))
        );

        postsSnapshot.forEach(async (doc) => {
            const { createdAt, description, image } = doc.data();
            const user = await getDoc(doc.data().user);
            const { name, info, pfp } = user.data();
            data.push({
                createdAt,
                description,
                image,
                user: name,
                userInfo: info,
                pfp,
            });
        });
        //console.log("setting posts", data[0]);
        setTimeout(() => setPosts(data), 1000);

        //console.log("posts updated", data[0]);
        //setIsLoading(false);
    };
    useEffect(() => {
        getPosts();
    }, []);
    useEffect(() => {
        getPosts();
        setUpdatePosts(false);
    }, [updatePosts]);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Posts" options={{ headerShown: false }}>
                {(props) => (
                    <Posts
                        {...props}
                        currentUser={currentUser}
                        posts={posts}
                        db={db}
                        getPosts={getPosts}
                        //isLoading={isLoading}
                        //setIsLoading={setIsLoading}
                    ></Posts>
                )}
            </Stack.Screen>
            <Stack.Screen name="AddPost" options={{ headerShown: false }}>
                {(props) => (
                    <AddPost
                        {...props}
                        posts={posts}
                        currentUser={currentUser}
                        setPosts={setPosts}
                        ownPosts={ownPosts}
                        setOwnPosts={setOwnPosts}
                        db={db}
                        getPosts={getPosts}
                        //setIsLoading={setIsLoading}
                        setUpdatePosts={setUpdatePosts}
                    ></AddPost>
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
