import React from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
    TextInput,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import url from "./Config/API"

const registerChild = async (data) => {
        const token = await AsyncStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const response = await axios.post(`${url}/registerChild`, data);
        return response;
};

const shadowStyle = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
}

class Relationship extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                select: false,
                relation: null
            }
    }
    // async componentDidMount() {
    //     const token = await AsyncStorage.getItem('token');
    //     console.log(token);
    //     console.log(this.props.navigation.state.params.childdata); 
        
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    // }
    genderselect = () => {

        if (this.state.status1 == false && this.state.status2 == true) {
            this.setState({ status1: true })
            this.setState({ status2: false })
            return this.setState({relation:'father'})
            
        }
        else {
            this.setState({ status1: false })
            this.setState({ status2: true })
            return this.setState({relation:'mother'})
        }
    }

    _submit = async () =>{

        const childdata = this.props.navigation.state.params.childdata;

        var {
            relation,
        } = this.state;

        const data = {
            "gender": childdata.gender,
            "name": childdata.name,
            "dob": childdata.dob,
            "relation": relation
        }
        
        console.log("hiii");
        console.log(data);
        const res = await registerChild(data);
            console.log(res.data);
            if (res.data) {
                alert('Child created successfully');
                await AsyncStorage.setItem('childregister', '1');
                this.props.navigation.navigate('Home')
            } else {
                this.setState({ error: 'Something is wrong' });
            }

        
    }

    render() {
        return (
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../assets/backgrondsignup.png')}>
                <View style={styles.container}>
                    <Text style={{ fontSize: 19, color: "#707070" }}>What’s Your Relationship with the Baby?</Text>

                    <View style={{ width: 322, marginLeft: 60, marginTop: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: "50%" }}>
                            <TouchableOpacity style={[styles.btngender, shadowStyle]}
                                onPress={this.genderselect}>
                                {
                                    this.state.status1 ?
                                        <View style={{
                                            height: 108,
                                            width: 87,
                                            borderRadius: 15, borderWidth: 2,
                                            borderColor: "#91E1F5",
                                            alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <Image
                                                style={{ height: 96, width: 87 }}
                                                source={require('../assets/man.png')}
                                                resizeMode="contain" />
                                        </View>
                                        :
                                        <Image
                                            style={{ height: 96, width: 87 }}
                                            source={require('../assets/man.png')}
                                            resizeMode="contain" />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "50%" }}>
                            <TouchableOpacity style={[styles.btngender, shadowStyle]}
                                onPress={this.genderselect}>
                                {
                                    this.state.status2 ?
                                        <View style={{
                                            height: 108,
                                            width: 87,
                                            borderRadius: 15, borderWidth: 2,
                                            borderColor: "#D23C69",
                                            alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <Image
                                                style={{ height: 96, width: 87 }}
                                                source={require('../assets/women.png')}
                                                resizeMode="contain" />
                                        </View>
                                        :
                                        <Image
                                            style={{ height: 96, width: 87 }}
                                            source={require('../assets/women.png')}
                                            resizeMode="contain" />

                                }
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.btnSignin, shadowStyle]}
                        onPress={() => this._submit()}>
                        <Text style={{ color: '#a076e8', fontWeight: 'bold', fontSize: 15 }}>Done</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        )
    }
    _signout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: "center",
        flex: 1

    },
    myButton: {
        padding: 5,
        height: 163,
        width: 163,
        borderRadius: 400,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btngender: {
        padding: 5,
        height: 108,
        width: 87,
        borderRadius: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        height: 50,
        width: 300,
        margin: 20
    },
    input: {
        margin: 15,
        height: 50,
        width: 300,
        paddingLeft: 20,
        fontSize: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    btn: {
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#707070',
        alignItems: 'center',
        marginLeft: 15,
        width: 300,
        marginRight: 15,
        padding: 10,
    },
    btnSignin: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
        marginLeft: 20,
        borderRadius: 10,
        marginTop: 100,
        width: 300,
        marginRight: 20,
        padding: 10,
        height: 50,
    },
})

export default Relationship;