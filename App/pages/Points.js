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
import LeaderBoard from "./LeaderBoard";
import PointsCategory from "./PointsComponents/PointsCategory";

export default function Points({}) {
    return (
        <SafeAreaView>
            <View style={{ backgroundColor: "#5DB075", height: 280 }}>
                <View
                    style={{
                        marginLeft: 25,
                        marginRight: 25,
                        flexDirection: "row",
                        justifyContent: "space-between",
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
                            &lt; Back
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity underlayColor = '#5DB075'>
                        {/* TO DO: Add Profile picture to View, note to adjust paddingRight */}
                        <View style={{
                                backgroundColor:'#4F8F62',
                                borderColor:'#5DB075',
                                borderRadius: 55,
                                borderWidth: 1,
                                paddingTop: 15,
                                paddingBottom:15,
                                paddingLeft: 10,
                                paddingRight: 60,
                                color: "white",
                                fontWeight: "500",
                                fontSize: 16,
                                overflow: 'hidden',
                            }}>
                            <Text style = {{color: "white",
                                fontWeight: "500",
                                fontSize: 16,
                                lineHeight: 30,}}>
                            🎉1250
                            </Text>
                            
                            
                        </View>
                        
                    </TouchableOpacity>
                </View>
                <View>
                    {/* Find a better way to center this instead of padding */}
                    <Text style = {{ paddingLeft:15,
                                paddingTop:25,
                                color: "white",
                                fontWeight: "500",
                                fontSize: 37,
                                lineHeight: 30,}}>
                    You're up this week
                    </Text>
                    <Text style = {{ paddingLeft:17,
                                paddingTop:25,
                                color: "white",
                                fontWeight: "500",
                                fontSize: 37,
                                lineHeight: 30,}}>
                    by <Text style = {{fontWeight: "200",}}>20 Points</Text>
                    </Text>
                </View>
                {/* TO DO: make this following TouchableOpacity go to Leaderboard onPress */}
                <TouchableOpacity style={styles.tab}>
                    {/* I apologize with this mostrosity of styling. TO DO: Fix this */}
                    <View style={{
                                width:170,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor:'#4F8F62',
                                borderColor:'#5DB075',
                                borderRadius: 55,
                                marginTop: 10,
                                marginLeft: 10,
                                paddingTop: 5,
                                paddingBottom:5,
                                paddingLeft: 5,
                                paddingRight: 5,
                                color: "white",
                                fontWeight: "500",
                                fontSize: 16,
                                overflow: 'hidden',
                            }}>
                        <Text style = {{ paddingLeft:10,
                                color: "white",
                                fontWeight: "500",
                                fontSize: 14,
                                lineHeight: 30,}}>
                            COMMUNITY EVENT
                        </Text>
                    </View>
                    <View style={{
                        marginRight: 25,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <Image source={require('../assets/gael.png')} style ={styles.gael_img}/>
                        <Text style = {{ 
                            paddingTop:1,
                            paddingLeft:10,
                            color: "black",
                            fontWeight: "500",
                            fontSize: 12,}}>Your University is 10532 points{"\n"}
                            away from your monthly goal!</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* TO DO: Add rounded background to searchContainer styling */}
            <View style={styles.searchContainer}>
                <Feather
                    name="search"
                    size={20}
                    color="black"
                    style ={{marginLeft:1}}
                />
                <TextInput
                    style={styles.input}
                    placeholder="You deserve a break! Try Some Coffee"
                />
            </View>
            <View>
                <ScrollView scrollEventThrottle={16} style={{height:320}}>
                    <View style = {{
                        flex:1, 
                        paddingTop:20
                    }}>
                        <Text style ={{
                            fontSize:24,
                            fontWeight:'700',
                            paddingHorizontal: 20}}
                        >
                            Popular
                        </Text>
                        <View style = {{
                            height:130, 
                            marginTop: 20
                        }}>
                            <ScrollView
                                horizontal = {true}
                            >
                                <PointsCategory 
                                    imageUri={require('../assets/frappuchino.jpg')}
                                    name="🎉125 Vanilla Latte"
                                />
                                <PointsCategory 
                                    imageUri={require('../assets/coffee.png')}
                                    name="🎉125 Cappuccino"
                                />
                                <PointsCategory 
                                    imageUri={require('../assets/coffee.png')}
                                    name="🎉125 Dark Roast"
                                />
                            </ScrollView>
                        </View>
                        <Text style ={{
                            paddingTop:20,
                            fontSize:24,
                            fontWeight:'700',
                            paddingHorizontal: 20}}
                        >
                            Starbucks, Kingston
                        </Text>
                        <View style = {{
                            height:130, 
                            marginTop: 20
                        }}>
                            <ScrollView
                                horizontal = {true}
                            >
                                <PointsCategory 
                                    imageUri={require('../assets/frappuchino.jpg')}
                                    name="🎉125 Vanilla Latte"
                                />
                                <PointsCategory 
                                    imageUri={require('../assets/coffee.png')}
                                    name="🎉125 Cappuccino"
                                />
                                <PointsCategory 
                                    imageUri={require('../assets/coffee.png')}
                                    name="🎉125 Dark Roast"
                                />
                            </ScrollView>
                        </View>
                        <Text style ={{
                            paddingTop:20,
                            fontSize:24,
                            fontWeight:'700',
                            paddingHorizontal: 20}}
                        >
                            The Goodway Thrift Store
                        </Text>
                        <View style = {{
                            height:130, 
                            marginTop: 20
                        }}>
                            <ScrollView
                                horizontal = {true}
                            >
                                <PointsCategory 
                                    imageUri={require('../assets/frappuchino.jpg')}
                                    name="🎉125 Vanilla Latte"
                                />
                                <PointsCategory 
                                    imageUri={require('../assets/coffee.png')}
                                    name="🎉125 Cappuccino"
                                />
                                <PointsCategory 
                                    imageUri={require('../assets/coffee.png')}
                                    name="🎉125 Dark Roast"
                                />
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    tab: {
        width: 280,
        height: 140,
        backgroundColor: "#f6f6f6",
        borderRadius: 18,
        marginTop:10,
        marginLeft: 55,
        shadowColor: '#000000',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
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
    gael_img:
    {
        marginTop: 10,
        marginLeft: 10,
        width: 53,
        height: 65,
    },
    input: {
        fontSize: 12,
        marginLeft: 10,
        width: "90%",
      },
    searchContainer: {
        marginTop:80,
        paddingHorizontal:20,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "76%",
    
      },
});
