import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ImageBackground,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker';
import { bold } from 'colorette';
import axios from 'axios';
import url from "./Config/API"

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

class RegisterChild extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                date: null,
                select: false,
                error: null,
                name: '',
                dob: '',
                boy:"m",
                girl: "f",
                gender: null,
                dataSource: [],
                isLoading: true,
            }
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('token');
        const login = await AsyncStorage.getItem('username');
        console.log(token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const response = await axios.get(`${url}/getUserInfo/?stream=bb_stream&key=${login}`);
        console.log(response.data.child);
        this.setState({
            isLoading: false,
            dataSource: response.data.child
          })
          console.log(this.state.dataSource)
          if(this.state.dataSource.name !=='' ? this.props.navigation.navigate('Home') : null)
        return response;
        // axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 

    }

    genderselect = () => {

        if (this.state.status1 == false && this.state.status2 == true) {
            this.setState({ status1: true })
            this.setState({ status2: false })
            return this.setState({gender:'m'})
        }
        else {
            this.setState({ status1: false })
            this.setState({ status2: true })
            return this.setState({gender:'f'})
        }
    }

    next = () => {

        var {
            name,
            date,
            gender
        } = this.state;

        const data = {
            "gender": gender,
            "name": name,
            "dob": date
        }

        if (name == "" && date == "") {this.setState({ error: "* Child Name & DOB can't be empty" });}
        else {
            this.props.navigation.navigate('Relationship',{childdata:data})
           // console.log(this.genderselect);
            console.log(data);
            // console.log(this.state.status1);
            // console.log(this.state.status2);
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <ActivityIndicator />
              </View>
            );
          }
        return (
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../assets/background.png')}>
                <ScrollView showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <View>
                            <Text style={{ fontSize: 19, color: "#707070" }}> Add Child </Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity
                                style={[styles.myButton, shadowStyle]}
                            // onPress={this._signout}
                            >
                                <Image
                                    style={{ height: 27, width: 32 }}
                                    source={require('../assets/camera.png')}
                                    resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginLeft: 20, marginTop: 25 }}>
                        <Text style={{ fontSize: 16, color: "#707070" }}>What’s your Baby’s Gender?</Text>
                    </View>


                    <View style={{ width: 322, marginLeft: 60, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: "50%" }}>
                            <TouchableOpacity style={[styles.btngender, shadowStyle]}
                                onPress={this.genderselect}>
                                {
                                    this.state.status1 ?
                                        <View style={{
                                            height: 91,
                                            width: 91,
                                            borderRadius: 400,
                                            borderWidth: 2,
                                            borderColor: "#91E1F5", alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <Image
                                                style={{ height: 60, width: 35 }}
                                                source={require('../assets/boy.png')}
                                                resizeMode="contain" />
                                            <Text style={{ fontSize: 11, color: "#91E1F5", alignSelf: "center" }}>Boy</Text>
                                        </View>

                                        :
                                        <View>
                                            <Image
                                                style={{ height: 60, width: 35 }}
                                                source={require('../assets/boy.png')}
                                                resizeMode="contain" />
                                            <Text style={{ fontSize: 11, color: "#91E1F5", alignSelf: "center" }}>Boy</Text>
                                        </View>
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "50%" }}>
                            <TouchableOpacity style={[styles.btngender, shadowStyle]}
                                onPress={this.genderselect}>
                                {
                                    this.state.status2 ?
                                        <View style={{
                                            height: 91,
                                            width: 91,
                                            borderRadius: 400,
                                            borderWidth: 2,
                                            borderColor: "#D23C69", alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <Image
                                                style={{ height: 60, width: 35 }}
                                                source={require('../assets/girl.png')}
                                                resizeMode="contain" />
                                            <Text style={{ fontSize: 11, color: "#D23C69" }}>Girl</Text>
                                        </View>
                                        :
                                        <View>
                                            <Image
                                                style={{ height: 60, width: 35 }}
                                                source={require('../assets/girl.png')}
                                                resizeMode="contain" />
                                            <Text style={{ fontSize: 11, color: "#D23C69", alignSelf: "center" }}>Girl</Text>
                                        </View>
                                }
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={styles.container}>
                        <View style={[styles.SectionStyle, shadowStyle]}>
                            <TextInput
                                style={[styles.input]}
                                placeholder="What’s your Baby’s Name?"
                                keyboardType="default"
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name} />
                        </View>

                        <DatePicker
                            style={{
                                height: 50,
                                width: 300,
                                borderRadius: 10,
                                backgroundColor: "#FFFFFF",
                            }}
                            date={this.state.date} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            placeholder="What’s your Baby’s Birthday?"
                            placeHolderTextStyle={{ color: "#707070", fontSize: 15, }}
                            format="DD/MM/YYYY"
                            minDate="01-01-1900"
                            maxDate="01-01-2100"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'relative',

                                    alignItems: 'flex-end'

                                },
                                dateInput: {
                                    borderWidth: 0,
                                    fontSize: 15,
                                    height: 50,
                                    width: 300,
                                }
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />

                        <Text style={{ color: "red", }}>{this.state.error}</Text>

                        <TouchableOpacity
                            style={[styles.btnSignin, shadowStyle]}
                            onPress={() => this.next()}>
                            <Text style={{ color: '#a076e8', fontWeight: 'bold', fontSize: 15 }}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </ImageBackground >
        )
    }
    _signout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35
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
        height: 91,
        width: 91,
        borderRadius: 400,
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
        marginTop: 30,
        width: 300,
        marginRight: 20,
        padding: 10,
        height: 50,
    },
})

export default RegisterChild;