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
    KeyboardAvoidingView,
    Switch
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
//import register from "./Config/Action";
import url from "./Config/API"

const screenDimension = Dimensions.get('window');
const isBigDevice = screenDimension.height > 600;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

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

const register = async (data) => {
    const response = await axios.post(`${url}/registerUser`, data);
    return response;
};

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.state = {
            email: '',
            password: '',
            name: '',
            mobile: '',
            error: null,
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
    validateContact() {
        let reg_phone = /^\d{10}$/;

        return reg_phone.test(this.state.mobile);
    }

    _signUp = async () => {
        var {
            email,
            password,
            name,
            mobile,
        } = this.state
        const data = {
            "stream": "bb_stream",
            "key": email,
            "data": {
                "name": name,
                "mobile": mobile,
                "password": password
            }
        }

        if (email == "") this.setState({ error: "* Email can't be empty" });
        else if (!this.validateEmail())
            this.setState({ error: "* Email is badly formated" });
        else if (password == "")
            this.setState({ error: "* Password can't be empty" });
        else if (password.length < 8)
            this.setState({ error: "* Password should be minimum 8 characters" });
        else if (mobile == "")
            this.setState({ error: "* Mobile Number can't be empty" });
        else if (!this.validateContact())
            this.setState({ error: "* Mobile Number is badly formatted" });


        else {
            console.log(data);
            const res = await register(data);
            console.log(res.data);
            if (res.data) {
                alert('User created successfully');
                this.props.navigation.navigate('Auth');
            } else {
                this.setState({ error: 'Invalid username/password' });
            }
            // return axios.post(`${url}/registerUser`, data);

            // this.props.navigation.navigate('Auth');
        }

        // else {
        //     console.log(data);
        //     fetch(`${url}/registerUser`, {
        //         method: 'POST',
        //         data,
        //         headers : { 
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json'
        //            }
        //     })

        //         .then(response => response.json())
        //         .then(resp => {
        //            // console.log(resp);
        //             if (resp.status == 1) {
        //                 AsyncStorage.setItem('userDetails', JSON.stringify(resp.userdata))
        //                     .then(() => {
        //                         this.props.navigation.navigate('Auth');
        //                     }).catch((error) => {
        //                         alert("Something Went Wrong");
        //                     })
        //             }
        //             else if (resp.status == 0) alert(resp.msg);

        //             else {

        //                 alert(resp.msg);

        //             }

        //         })
        //         .catch(err => console.log(err));
        //         //console.log(data);

        // }
    }

    render() {
        return (
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../assets/backgrondsignup.png')}>
                <View style={styles.container}>

                    <Image
                        style={{ width: 150, height: 150, borderWidth: 0, }}
                        source={require('../assets/logo1.png')}
                        resizeMode='contain'
                    />

                    <KeyboardAvoidingView behavior="padding" enabled>
                        <View style={[styles.SectionStyle, shadowStyle]}>
                            <TextInput
                                style={[styles.input]}
                                placeholder="Name"
                                keyboardType="default"
                                onChangeText={(name) => this.setState({ name })} />
                        </View>

                        <View style={[styles.SectionStyle, shadowStyle]}>
                            <TextInput
                                style={[styles.input]}
                                placeholder="Email"
                                keyboardType="email-address"
                                onChangeText={(email) => this.setState({ email })} />
                        </View>

                        <View style={[styles.SectionStyle, shadowStyle]}>
                            <TextInput
                                style={[styles.input]}
                                placeholder="Mobile No"
                                keyboardType="phone-pad"
                                onChangeText={(mobile) => this.setState({ mobile })} />

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

                        
                    </KeyboardAvoidingView>

                    <Text style={{ color: "red", }}>{this.state.error}</Text>

                    <TouchableOpacity
                        style={[styles.btnSignin, shadowStyle]}
                        onPress={() => this._signUp()}>
                        <Text style={{ color: '#a076e8', fontWeight: 'bold', fontSize: 15 }}>Sign Up</Text>
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
                            onPress={() => this.props.navigation.navigate('Auth')}>
                            <Text style={{ color: '#fff', fontSize: 13, marginLeft: 10 }}>Sign In</Text>
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
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 50,
        width: 300,
        marginTop: 20
    },
    btnSignin: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
        marginLeft: 20,
        borderRadius: 10,
        marginTop: 20,
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
        marginTop: 20,
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

export default SignUp;