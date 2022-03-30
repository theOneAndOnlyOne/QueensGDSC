import React, { useState } from "react";
import {
    TouchableOpacity,
    Image,
    Dimensions,
    Text,
    View,
    TextInput,
    SafeAreaView,
    StyleSheet,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { FontAwesome } from "react-native-vector-icons";

export default function Landing({ navigation }) {
    const [logo, setLogo] = useState(true);
    const [isSignup, setIsSignup] = useState(true);
    const [text, setText] = useState("");
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    return logo ? (
        <TouchableOpacity onPress={() => setLogo(false)}>
            <Image
                source={require("../assets/logo.jpg")}
                style={{ width: windowWidth, height: windowHeight }}
            ></Image>
            <Text
                style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: 24,
                    position: "absolute",
                    bottom: 100,
                    alignSelf: "center",
                }}
            >
                Tap to start...
            </Text>
        </TouchableOpacity>
    ) : isSignup ? (
        <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
            <Text
                style={{
                    fontSize: 32,
                    fontWeight: "700",
                    marginBottom: 20,
                }}
            >
                Sign Up
            </Text>
            <TouchableOpacity
                style={{ position: "absolute", top: 230, right: 60 }}
                onPress={() => setIsSignup(false)}
            >
                <Text
                    style={{
                        color: "#5DB075",
                    }}
                >
                    Log in
                </Text>
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                selectionColor={"#4B9460"}
                placeholder="User Name"
            ></TextInput>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                selectionColor={"#4B9460"}
                placeholder="Email"
            ></TextInput>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                selectionColor={"#4B9460"}
                placeholder="Password"
            ></TextInput>
            <CheckBox
                title="I would like to receive your newsletter and other
                    promotional information."
                textStyle={{ fontWeight: "400", opacity: 0.6, fontSize: 12 }}
                containerStyle={{
                    backgroundColor: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    width: 300,
                }}
            ></CheckBox>
            <TouchableOpacity
                style={{ ...styles.btn, backgroundColor: "#5DB075" }}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "600",
                    }}
                >
                    Sign up
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
                <FontAwesome
                    name="google"
                    color="#5DB075"
                    size={25}
                ></FontAwesome>
                <Text
                    style={{
                        color: "#5DB075",
                        fontSize: 16,
                        fontWeight: "600",
                        marginLeft: 10,
                    }}
                >
                    Sign up with Google
                </Text>
            </TouchableOpacity>
        </View>
    ) : (
        <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
            <Text
                style={{
                    fontSize: 32,
                    fontWeight: "700",
                    marginBottom: 20,
                }}
            >
                Log In
            </Text>
            <TouchableOpacity
                style={{ position: "absolute", top: 285, right: 60 }}
                onPress={() => setIsSignup(true)}
            >
                <Text
                    style={{
                        color: "#5DB075",
                    }}
                >
                    Sign Up
                </Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                selectionColor={"#4B9460"}
                placeholder="User Name or Email"
            ></TextInput>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                selectionColor={"#4B9460"}
                placeholder="Password"
            ></TextInput>
            <TouchableOpacity
                style={{ ...styles.btn, backgroundColor: "#5DB075" }}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "600",
                    }}
                >
                    Log in
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate("MainApp")}
            >
                <FontAwesome
                    name="google"
                    color="#5DB075"
                    size={25}
                ></FontAwesome>
                <Text
                    style={{
                        color: "#5DB075",
                        fontSize: 16,
                        fontWeight: "600",
                        marginLeft: 10,
                    }}
                >
                    Log in with Google
                </Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    input: {
        backgroundColor: "#E5E5E5",
        borderRadius: 12,
        width: 300,
        height: 50,
        paddingLeft: 10,
        marginTop: 10,
    },
    btn: {
        flexDirection: "row",
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 12,
        borderColor: "#5DB075",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        width: 300,
    },
});
