import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";

class PointsCategory extends Component {
    render(){
        return (
            <View style = {{
                height: 130, 
                width:130,
                marginLeft:20,
                borderWidth:0.5,
                borderRadius: 10,
                borderColor:'#dddddd',
                }}>
                <View style={{flex:2}}>
                    <Image
                        source ={this.props.imageUri}
                        style={{
                            flex:1,
                            width:null,
                            height:null,
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                            resizeMode:'cover'
                        }}
                    />
                </View>
                <View style={{
                    flex:1,
                    paddingLeft:10,
                    paddingTop:10,
                    }}>
                    <Text>
                        {this.props.name}{'\n'}🎉
                        <Text style ={{fontWeight:'500'}}>{this.props.points}</Text>
                    </Text>
                </View>
            </View>
        );
    }
}
export default PointsCategory;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})