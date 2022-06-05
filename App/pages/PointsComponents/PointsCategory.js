import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

class PointsCategory extends Component {
    render() {
        return (
            <View
                style={{
                    height: 200,
                    width: 130,
                    marginLeft: 20,
                    borderWidth: 0.5,
                    borderRadius: 10,
                    borderColor: "#dddddd",
                    shadowColor: "#000000",
                    shadowOffset: { width: -2, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                }}
            >
                <Image
                    source={this.props.imageUri}
                    style={{
                        flex: 3,
                        width: null,
                        height: null,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        resizeMode: "cover",
                    }}
                />
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: 10,
                        paddingTop: 10,
                    }}
                >
                    <Text style={{ opacity: 0.5 }}>{this.props.name}</Text>
                    <Text
                        style={{
                            fontWeight: "500",
                            marginTop: 5,
                            fontSize: 12,
                        }}
                    >
                        {`🎉 ${this.props.points}`}
                    </Text>
                </View>
            </View>
        );
    }
}
export default PointsCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
