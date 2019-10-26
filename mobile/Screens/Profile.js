import React from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
    TextInput,
    ImageBackground,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from "./Header";
import LinearGradient from 'react-native-linear-gradient';

const screenDimension = Dimensions.get('window');
const isBigDevice = screenDimension.height > 600;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import axios from 'axios';
import url from "./Config/API"


class Profile extends React.Component {
    // static navigationOptions =
    //     {
    //         title: 'PROFILE',
    //         headerBackground: (
    //             <Header />
    //         ),
    //         headerTitleStyle: {
    //             color: '#FFFFFF',
    //             fontSize: 20,
    //         },
    //     };
    constructor(props) {
        super(props);
        this.state ={
            dataSource: [],
            isLoading: true,
        }
    }

    async componentDidMount() {
        //http://34.207.213.121:3001/getUserInfo?stream=bb_stream&key=trinu1@gmail.com
        const login = await AsyncStorage.getItem('username');
        const token = await AsyncStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const response = await axios.get(`${url}/getUserInfo/?stream=bb_stream&key=${login}`);
        console.log(response);
        console.log("hiii");
        this.setState({
            isLoading: false,
            dataSource: response.data
        })
        console.log("data");
        console.log(this.state.dataSource)
        return response;


    }


    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                <View style={{ borderBottomEndRadius: 20, borderBottomStartRadius: 20,flex:1 }}>
                    <LinearGradient
                        colors={['#FA9FD3'  ,'#A076E8']}
                        style={{ borderBottomEndRadius: 20, borderBottomStartRadius: 20,overflow: 'hidden',justifyContent:"center",alignItems:"center" }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}>
                            <Text style={{fontSize:20,color:"#FFFFFF",fontWeight:"bold",marginTop:15}}>Profile</Text>
                        <View style={{ width: 234, height: 234, borderRadius: 400, backgroundColor: "white",marginTop:20 }}>
                            <Image
                                style={{ width: 234, height: 234, borderRadius: 400 }}
                                source={require('../assets/baby.jpg')}
                                resizeMode='cover'
                            />
                        </View>
                        <Text style={{fontSize:23,color:"#FFFFFF",fontWeight:"bold",marginTop:15}}>
                            {this.state.dataSource.child.name}
                        </Text>
                        {this.state.dataSource.child.gender === 'm' ? 
                        <Text style={{fontSize:15,color:"#FFFFFF",marginTop:10}}>
                            Baby Boy
                        </Text> 
                        : 
                        <Text style={{fontSize:15,color:"#FFFFFF",marginTop:10}}>
                            Baby Girl
                        </Text> }
                        
                        <View style={{height:10}}/>

                    </LinearGradient>

                </View>

                <View style={styles.SectionStyle}>
                <Image
                                style={{ width: 32, height: 32,marginLeft:15 }}
                                source={require('../assets/cake.png')}
                                resizeMode='cover'
                            />
                    <Text style={{ flex: 1, marginLeft: 30 }}>
                    {this.state.dataSource.child.dob} </Text>

                </View>

                <View style={styles.SectionStyle}>
                    {this.state.dataSource.child.relation === 'father' ? 
                    <Image
                                style={{ width: 32, height: 32,marginLeft:15 }}
                                source={require('../assets/man.png')}
                                resizeMode='cover'
                            /> 
                            : 
                             <Image
                            style={{ width: 32, height: 32,marginLeft:15 }}
                            source={require('../assets/women.png')}
                            resizeMode='cover'
                        />}
                
                    <Text style={{ flex: 1, marginLeft: 30 }}>
                    {this.state.dataSource.name} </Text>

                </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f7f9',
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        alignSelf:"center",
        height: 50,
        width: 300,
        borderRadius: 10,
        marginTop: 30
    },
})

export default Profile;