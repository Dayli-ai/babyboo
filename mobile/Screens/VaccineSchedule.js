import React from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    ImageBackground,
    Image,
    YellowBox,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
// import image from "../../assets"

YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Module RCTImageLoader requires',
]);

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
class VaccineSchedule extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ borderTopStartRadius: 10, width: 322, marginTop: 25, borderTopEndRadius: 10, borderBottomStartRadius: 10, borderBottomEndRadius: 10, backgroundColor: 'transparent' }}>
                <LinearGradient
                    colors={['#00afbf', '#aafac3']}
                    style={{
                        flex: 1, borderTopStartRadius: 10, borderTopEndRadius: 10, height: 50, justifyContent: 'center', alignItems: 'center',
                        overflow: 'hidden'}}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <Text style={{ fontSize: 15, color: "#FFFFFF", fontWeight: "bold" }}>Vaccine Schedule </Text>
                </LinearGradient>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row", borderBottomWidth: 1, backgroundColor: "#FFFFFF", height: 50, borderBottomColor: "#707070" }}>
                    <View style={{ width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.vaccinestext}>Age</Text>
                    </View>
                    <View style={{ width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.vaccinestext}>Vaccines</Text>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row", borderBottomWidth: 1, backgroundColor: "#FFFFFF", height: 90, borderBottomColor: "#707070" }}>
                    <View style={{ width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.vaccinestext}>At Birth</Text>
                    </View>
                    <View style={{ width: "50%", justifyContent: 'center', }}>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>BCG</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/drop.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>OPV O</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>HEP-B1</Text>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row", borderBottomWidth: 1, backgroundColor: "#FFFFFF", height: 175, borderBottomColor: "#707070" }}>
                    <View style={{ width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.vaccinestext}>6 Weeks</Text>
                    </View>
                    <View style={{ width: "50%", justifyContent: 'center', }}>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>DTwP 1</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>IPV 1</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>HEP-B2</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>Hib 1</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>RV VACCINE 1</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>PCV 1</Text>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row", borderBottomWidth: 1, backgroundColor: "#FFFFFF", height: 150, borderBottomColor: "#707070" }}>
                    <View style={{ width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.vaccinestext}>10 Weeks</Text>
                    </View>
                    <View style={{ width: "50%", justifyContent: 'center', }}>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>DTwP 2</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>IPV 2</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>Hib 2</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>RV VACCINE 2</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>PCV 2</Text>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row", borderBottomWidth: 1, backgroundColor: "#FFFFFF", height: 150, borderBottomColor: "#707070" }}>
                    <View style={{ width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.vaccinestext}>14 Weeks</Text>
                    </View>
                    <View style={{ width: "50%", justifyContent: 'center', }}>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>DTwP 3</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/drop.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>IPV 3</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>Hib 3</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>RV VACCINE 3</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>PCV 3</Text>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row", borderBottomWidth: 1, backgroundColor: "#FFFFFF", height: 75, borderBottomColor: "#707070" }}>
                    <View style={{ width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.vaccinestext}>6 Months</Text>
                    </View>
                    <View style={{ width: "50%", justifyContent: 'center', }}>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>HEP-B3</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/drop.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>OPV 1</Text>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row", borderBottomWidth: 1, backgroundColor: "#FFFFFF", height: 75, borderBottomColor: "#707070" }}>
                    <View style={{ width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.vaccinestext}>9 Months</Text>
                    </View>
                    <View style={{ width: "50%", justifyContent: 'center', }}>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>MMR-1</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/drop.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>OPV 2</Text>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row", borderBottomWidth: 1, backgroundColor: "#FFFFFF", height: 75, borderBottomColor: "#707070" }}>
                    <View style={{ width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.vaccinestext}>9-12 Months</Text>
                    </View>
                    <View style={{ width: "50%", justifyContent: 'center', }}>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>TYPHOID CONJUGATE VACCINE</Text>
                        </View>
                        {/* <View style={{ flexDirection: "row", }}>
                                    <Image
                                        style={{ width: 17, height: 17 }}
                                        source={require('../assets/drop.png')}
                                        resizeMode='contain'
                                    />
                                    <Text style={styles.vaccinestext}></Text>
                                </View> */}
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row", borderBottomWidth: 1, backgroundColor: "#FFFFFF", height: 75, borderBottomColor: "#707070" }}>
                    <View style={{ width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.vaccinestext}>12 Months</Text>
                    </View>
                    <View style={{ width: "50%", justifyContent: 'center', }}>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>HEP-A1</Text>
                        </View>
                        {/* <View style={{ flexDirection: "row", }}>
                                    <Image
                                        style={{ width: 17, height: 17 }}
                                        source={require('../assets/drop.png')}
                                        resizeMode='contain'
                                    />
                                    <Text style={styles.vaccinestext}></Text>
                                </View> */}
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row", borderBottomWidth: 1, backgroundColor: "#FFFFFF", height: 90, borderBottomColor: "#707070" }}>
                    <View style={{ width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.vaccinestext}>15 Months</Text>
                    </View>
                    <View style={{ width: "50%", justifyContent: 'center', }}>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>MMR 2</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>VARICELLA 1</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>PCV BOOSTER</Text>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row", borderBottomWidth: 1, backgroundColor: "#FFFFFF", height: 90, borderBottomColor: "#707070" }}>
                    <View style={{ width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.vaccinestext}>16-18 Months</Text>
                    </View>
                    <View style={{ width: "50%", justifyContent: 'center', }}>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>DTwP B1/DTaP B1</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>IPV B1</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>Hib B1</Text>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row", borderBottomWidth: 1, backgroundColor: "#FFFFFF", height: 90, borderBottomColor: "#707070" }}>
                    <View style={{ width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.vaccinestext}>18 Months</Text>
                    </View>
                    <View style={{ width: "50%", justifyContent: 'center', }}>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>HEP-A2</Text>
                        </View>
                        {/*  */}
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row", borderBottomWidth: 1, backgroundColor: "#FFFFFF", height: 90, borderBottomColor: "#707070" }}>
                    <View style={{ width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.vaccinestext}>2 Years</Text>
                    </View>
                    <View style={{ width: "50%", justifyContent: 'center', }}>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>TYPHOID BOOSTER</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>CONJUGATE VACCINE</Text>
                        </View>
                        {/*  */}
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row", borderBottomWidth: 1, backgroundColor: "#FFFFFF", height: 90, borderBottomColor: "#707070" }}>
                    <View style={{ width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.vaccinestext}>4-6 Years</Text>
                    </View>
                    <View style={{ width: "50%", justifyContent: 'center', }}>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>DTwP B2/DTaP B2</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>OPV3/VARICELLA 2</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>MMR 3</Text>
                        </View>
                    </View>
                </View>

                {/* <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row", borderBottomWidth: 1, backgroundColor: "#FFFFFF", height: 90, borderBottomColor: "#707070" }}>
                            <View style={{ width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.vaccinestext}>10-12 Years</Text>
                            </View>
                            <View style={{ width: "50%", justifyContent: 'center', }}>
                                <View style={{ flexDirection: "row", }}>
                                    <Image
                                        style={{ width: 17, height: 17 }}
                                        source={require('../assets/injection.png')}
                                        resizeMode='contain'
                                    />
                                    <Text style={styles.vaccinestext}>TDAP/TD</Text>
                                </View>
                                <View style={{ flexDirection: "row", }}>
                                    <Image
                                        style={{ width: 17, height: 17 }}
                                        source={require('../assets/drop.png')}
                                        resizeMode='contain'
                                    />
                                    <Text style={styles.vaccinestext}>HPV</Text>
                                </View>
                                <View style={{ flexDirection: "row", }}>
                                    <Image
                                        style={{ width: 17, height: 17 }}
                                        source={require('../assets/injection.png')}
                                        resizeMode='contain'
                                    />
                                    <Text style={styles.vaccinestext}></Text>
                                </View>
                            </View>
                        </View> */}

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: "row", backgroundColor: "#FFFFFF", height: 185, borderBottomStartRadius: 10, borderBottomEndRadius: 10 }}>
                    <View style={{ width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.vaccinestext}>10-12 Years</Text>
                    </View>
                    <View style={{ width: "50%", justifyContent: 'center', }}>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>HEPATITIS B</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>TDAP</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>MMR</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>TYPHOID CONJUGATE VACCINE</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>VARICELLA</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Image
                                style={{ width: 17, height: 17 }}
                                source={require('../assets/injection.png')}
                                resizeMode='contain'
                            />
                            <Text style={styles.vaccinestext}>HPV</Text>
                        </View>
                    </View>
                </View>


                {/* <View style={{ backgroundColor: "red", height: 10, borderBottomStartRadius: 10, borderBottomEndRadius: 10 }} /> */}

            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f7f9',
    },
    vaccinestext: {
        fontSize: 15,
        color: "#707070",
        marginLeft: 10,
        marginTop: 7
    },
    card: {
        height: 234,
        width: 322,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginTop: 15
    },
    cardvaccine: {
        height: 151,
        width: 200,
        backgroundColor: "transparent",
        borderRadius: 10,
        marginLeft: 15,
        marginTop: 20,
    },
    input: {
        margin: 15,
        height: 50,
        width: 300,
        padding: 5,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    digitalreport: {
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        width: 322,
        marginTop: 25,
        height: 69,
        borderRadius: 10
    },
})

export default VaccineSchedule;