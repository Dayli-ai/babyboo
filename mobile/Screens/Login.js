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
    Switch
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import url from "./Config/API"

const screenDimension = Dimensions.get('window');
const isBigDevice = screenDimension.height > 600;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const userinfo = { email: 'Admin', password: 'admin' }

const loginUser = async (data) => {
    try {
        const response = await axios.post(`${url}/login`, data);
        return response;
    } catch (e) {
        alert(e);
        this.alertPresent = true;
        return false;
    }
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

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.state = {
            email: '',
            password: '',
            error: null,
            loading: false,
            size: '',
            loggedIn: null,
            check: false,
            showPassword: true,
        }
    }

    // async componentWillMount() {
    //     await AsyncStorage.getItem('userDetails')
    //         .then((value) => value != null ? this.props.navigation.navigate('Auth') : null)
    // }

    toggleSwitch() {
        this.setState({ showPassword: !this.state.showPassword });
    }
    validateEmail() {
        let reg_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg_email.test(this.state.email);
    }

    _signin = async () => {
        var {
            email,
            password
        } = this.state;
        const data = {
            "username": email,
            "password": password
        }

        if (email == "" && password == "") this.setState({ error: "* Email & Password can't be empty" });
        else if (!this.validateEmail())
            this.setState({ error: "* Email is badly formated" });
        // else if (password.length < 8)
        //     this.setState({ error: "* Password should be minimum 8 characters" });

        else {
            console.log(data);
            console.log(data.username);
            await AsyncStorage.setItem('username',data.username);
            const response = await loginUser(data);
            console.log(response.data);
            console.log(response.data.token);
            if (response.data) {
                await AsyncStorage.setItem('logged', '1');
                await AsyncStorage.setItem('token',response.data.token);
                
                this.props.navigation.navigate('App');

            }
            else this.setState({ error: "Incorrect Username Or Password!!" })
        }


        // else if (userinfo.email === this.state.email && userinfo.password === this.state.password) {
        //     await AsyncStorage.setItem('logged', '1');
        //     this.props.navigation.navigate('App');
        // } else this.setState({ error: "Incorrect Username Or Password!!" })
    }

    render() {
        return (
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../assets/background.png')}>
                <View style={styles.container}>
                    <Image
                        style={{ width: 150, height: 150, borderWidth: 0, }}
                        source={require('../assets/logo1.png')}
                        resizeMode='contain'
                    />

                    <View style={[styles.SectionStyle, shadowStyle]}>
                        <TextInput
                            style={[styles.input]}
                            placeholder="Email"
                            keyboardType="email-address"
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email} />
                    </View>

                    <View style={[styles.SectionStyle, shadowStyle]}>
                        <TextInput
                            style={{marginLeft: 15,
                                height: 50,
                                width: 260,
                                paddingLeft: 20,
                                fontSize: 15,
                                borderRadius: 10,
                                backgroundColor: '#fff',}}
                            placeholder="Password"
                            keyboardType="default"
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}
                            secureTextEntry={this.state.showPassword} />
                            
                            <Switch
                            style={{marginRight:20}}
                            onValueChange={this.toggleSwitch}
                            value={!this.state.showPassword}
                        />
                        
                    </View>
                    


                    {/* <Text>Show</Text> */}

                    <Text style={{ color: "red", }}>{this.state.error}</Text>


                    <TouchableOpacity
                        style={[styles.btnSignin, shadowStyle]}
                        onPress={this._signin}>
                        {/* <LinearGradient
                            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                            locations={[0, 0.5, 0.6]}
                            colors={['#a076e8','#5dc4dd']}
                            style={styles.linearGradient}> */}
                        <Text style={{ color: '#a076e8', fontWeight: 'bold', fontSize: 15 }}>Sign In</Text>
                        {/* </LinearGradient> */}
                    </TouchableOpacity>


                    <View style={{ flexDirection: 'row', width: 300, justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            style={[styles.btn, shadowStyle]}>
                            <Image
                                style={{ width: 25, height: 25, borderWidth: 0, }}
                                source={require('../assets/googleplus.png')}
                                resizeMode='contain' />
                            <Text style={{ color: '#db4a39', fontWeight: 'bold', fontSize: 14, marginLeft: 10 }}>Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.btn, shadowStyle]}>
                            <Image
                                style={{ width: 25, height: 25, borderWidth: 0, }}
                                source={require('../assets/facebook.png')}
                                resizeMode='contain' />
                            <Text style={{ color: '#3b5998', fontWeight: 'bold', fontSize: 14, marginLeft: 10 }}>Facebook</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', width: 300, justifyContent: 'space-between', marginTop: 30 }}>
                        <TouchableOpacity
                            style={styles.txt}>
                            <Text style={{ color: '#fff', fontSize: 13, marginLeft: 10 }}>Forgot Password</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.txt}
                            onPress={() => this.props.navigation.navigate('SignUp')}>
                            <Text style={{ color: '#fff', fontSize: 13, marginLeft: 10 }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 10,
        height: 50,
        width: 300,
        margin: 20
    },
    linearGradient: {
        marginLeft: 20,
        borderRadius: 10,
        marginTop: 40,
        justifyContent: 'center',
        width: 300,
        alignItems: 'center',
        marginRight: 20,
        padding: 10,
        height: 50,
    },
    btnSignin: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
        marginLeft: 20,
        borderRadius: 10,
        marginTop: 40,
        width: 300,
        marginRight: 20,
        padding: 10,
        height: 50,
    },
    btn: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        padding: 10,
        height: 40,
        marginTop: 30,
        width: 135,
    },
    txt: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 40,
        width: 135,
    }
})

export default Login;