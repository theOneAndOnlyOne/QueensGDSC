import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Posts from "./Posts";
import AddPost from "./AddPost";

const Stack = createNativeStackNavigator();

export default function UserFeed({ posts, setPosts, ownPosts, setOwnPosts }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Posts" options={{ headerShown: false }}>
                {(props) => <Posts {...props} posts={posts}></Posts>}
            </Stack.Screen>
            <Stack.Screen name="AddPost" options={{ headerShown: false }}>
                {(props) => (
                    <AddPost
                        {...props}
                        posts={posts}
                        setPosts={setPosts}
                        ownPosts={ownPosts}
                        setOwnPosts={setOwnPosts}
                    ></AddPost>
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
