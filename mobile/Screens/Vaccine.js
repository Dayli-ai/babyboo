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
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import VaccineSchedule from "./VaccineSchedule";
import Header from "./Header";
import axios from 'axios';
import url from "./Config/API"


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
class Vaccine extends React.Component {
    static navigationOptions =
        {
            title: 'VACCINE',
            headerBackground: (
                <Header />
            ),

            headerTitleStyle: {
                color: '#FFFFFF',
                fontSize: 20,
            },
            headerStyle: {
                backgroundColor: 'transparent',
            }
        };
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isLoading: true,
        }
    }

    async componentDidMount() {
        //http://34.207.213.121:3001/getUserInfo?stream=bb_stream&key=trinu1@gmail.com
        const login = await AsyncStorage.getItem('username');
        const token = await AsyncStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(
            `${url}/getUserInfo/?stream=bb_stream&key=${login}`,
        );
        console.log(response);
        const dataSource = response.data;

        //construct data object here from the response and pass to FlatList component
        let data = [];
        console.log('datasourceChildvaccines', dataSource.childVaccines);
        for (let key in dataSource.childVaccines) {
            const vaccineObject = {};
            dataSource.childVaccines[key].vaccines.forEach((vaccine, index) => {
                vaccineObject[`vaccine${index + 1}`] = vaccine.name;
            });
            vaccineObject[`color1`] = '#00afbf';
            vaccineObject[`color2`] = '#aafac3';
            vaccineObject['date'] = dataSource.childVaccines[key].dueDate;
            vaccineObject['name'] = dataSource.child.name;
            vaccineObject['duration'] = key;
            data.push(vaccineObject);
        }
        this.setState({
            isLoading: false,
            dataSource,
            data,
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    <View style={[styles.card, shadowStyle]}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginLeft: 15, marginRight: 15 }}>
                            <Text style={{ fontSize: 18, color: "#707070", fontWeight: "bold" }}>Next Due Vaccine</Text>
                            {/* <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Nextduevaccine')}> */}
                                <Text style={{ fontSize: 10, color: "#707070", alignSelf: "flex-end" }}>View All</Text>
                            {/* </TouchableOpacity> */}
                        </View>

                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}>

                            <FlatList
                                data={this.state.data}
                                horizontal={true}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            console.log('item clicked', item);
                                            this.props.navigation.navigate('Nextduevaccine', item);
                                        }}>
                                        <View style={[styles.cardvaccine]}>
                                            <LinearGradient
                                                colors={[item.color1, item.color2]}
                                                style={{ flex: 1, borderRadius: 10 }}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        marginTop: 7,
                                                        marginLeft: 7,
                                                    }}>
                                                    <View
                                                        style={{
                                                            flexDirection: 'column',
                                                            width: '50%',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}>
                                                        <View
                                                            style={{
                                                                width: 86,
                                                                height: 86,
                                                                borderRadius: 400,
                                                                backgroundColor: 'white',
                                                            }}>
                                                            <Image
                                                                style={{
                                                                    width: 86,
                                                                    height: 86,
                                                                    borderRadius: 400,
                                                                }}
                                                                source={require('../assets/baby.jpg')}
                                                                resizeMode="cover"
                                                            />
                                                        </View>
                                                        <View style={{ marginTop: 10 }}>
                                                            <Text
                                                                style={{
                                                                    fontSize: 15,
                                                                    fontWeight: 'bold',
                                                                    color: '#FFFFFF',
                                                                }}>
                                                                {item.name}
                                                            </Text>
                                                        </View>
                                                        <View style={{ marginTop: 5 }}>
                                                            <Text style={{ fontSize: 11, color: '#FFFFFF' }}>
                                                                {item.duration}
                                                            </Text>
                                                        </View>
                                                    </View>

                                                    <View
                                                        style={{
                                                            flexDirection: 'column',
                                                            width: '50%',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            height: '100%',
                                                        }}>
                                                        <View>
                                                            <Text
                                                                style={{
                                                                    fontSize: 11,
                                                                    fontWeight: 'bold',
                                                                    color: '#FFFFFF',
                                                                }}>
                                                                {item.date}
                                                            </Text>
                                                        </View>
                                                        <View style={{ marginTop: 20 }}>
                                                            <Text style={{ fontSize: 11, color: '#FFFFFF' }}>
                                                                {item.vaccine1}
                                                            </Text>
                                                        </View>
                                                        <View style={{ marginTop: 3 }}>
                                                            <Text style={{ fontSize: 11, color: '#FFFFFF' }}>
                                                                {item.vaccine2}
                                                            </Text>
                                                        </View>
                                                        <View style={{ marginTop: 3 }}>
                                                            <Text style={{ fontSize: 11, color: '#FFFFFF' }}>
                                                                {item.vaccine3}
                                                            </Text>
                                                        </View>
                                                        <View style={{ marginTop: 3 }}>
                                                            <Text style={{ fontSize: 11, color: '#FFFFFF' }}>
                                                                {item.vaccine4}
                                                            </Text>
                                                        </View>
                                                        <View style={{ marginTop: 3 }}>
                                                            <Text style={{ fontSize: 11, color: '#FFFFFF' }}>
                                                                {item.vaccine5}
                                                            </Text>
                                                        </View>
                                                        <View style={{ marginTop: 3 }}>
                                                            <Text style={{ fontSize: 11, color: '#FFFFFF' }}>
                                                                {item.vaccine6}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </LinearGradient>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                            {/* <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Nextduevaccine')}>
                                <View style={[styles.cardvaccine]}>
                                    <LinearGradient
                                        colors={['#00afbf', '#aafac3']}
                                        style={{ flex: 1, borderRadius: 10 }}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}>
                                        <View style={{ flexDirection: "row", marginTop: 7, marginLeft: 7, }}>
                                            <View style={{ flexDirection: "column", width: "50%", justifyContent: "center", alignItems: "center" }}>
                                                <View style={{ width: 86, height: 86, borderRadius: 400, backgroundColor: "white" }}>
                                                    <Image
                                                        style={{ width: 86, height: 86, borderRadius: 400 }}
                                                        source={require('../assets/baby.jpg')}
                                                        resizeMode='cover'
                                                    />
                                                </View>
                                                <View style={{ marginTop: 10 }}>
                                                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "#FFFFFF" }}>Emma</Text>
                                                </View>
                                                <View style={{ marginTop: 5 }}>
                                                    <Text style={{ fontSize: 11, color: "#FFFFFF" }}>At Birth</Text>
                                                </View>

                                            </View>

                                            <View style={{ flexDirection: "column", width: "50%", alignItems: "center" }}>
                                                <View>
                                                    <Text style={{ fontSize: 11, fontWeight: "bold", color: "#FFFFFF", }}>26 Sept 2019</Text>
                                                </View>
                                                <View style={{ marginTop: 20 }}>
                                                    <Text style={{ fontSize: 11, color: "#FFFFFF" }}>BCG</Text>
                                                </View>
                                                <View style={{ marginTop: 3 }}>
                                                    <Text style={{ fontSize: 11, color: "#FFFFFF" }}>OPV O</Text>
                                                </View>
                                                <View style={{ marginTop: 3 }}>
                                                    <Text style={{ fontSize: 11, color: "#FFFFFF" }}>HEP-B1</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </LinearGradient>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Nextduevaccine')}>
                                <View style={[styles.cardvaccine]}>
                                    <LinearGradient
                                        colors={['#a076e8', '#5dc4dd']}
                                        style={{ flex: 1, borderRadius: 10 }}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}>

                                        <View style={{ flexDirection: "row", marginTop: 7, marginLeft: 7, }}>
                                            <View style={{ flexDirection: "column", width: "50%", justifyContent: "center", alignItems: "center" }}>
                                                <View style={{ width: 86, height: 86, borderRadius: 400, backgroundColor: "white" }}>
                                                    <Image
                                                        style={{ width: 86, height: 86, borderRadius: 400 }}
                                                        source={require('../assets/baby.jpg')}
                                                        resizeMode='cover'
                                                    />
                                                </View>
                                                <View style={{ marginTop: 10 }}>
                                                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "#FFFFFF" }}>Emma</Text>
                                                </View>
                                                <View style={{ marginTop: 5 }}>
                                                    <Text style={{ fontSize: 11, color: "#FFFFFF" }}>6 Weeks</Text>
                                                </View>

                                            </View>

                                            <View style={{ flexDirection: "column", width: "50%", alignItems: "center" }}>
                                                <View>
                                                    <Text style={{ fontSize: 11, fontWeight: "bold", color: "#FFFFFF", }}>7 Nov 2019</Text>
                                                </View>
                                                <View style={{ marginTop: 20 }}>
                                                    <Text style={{ fontSize: 11, color: "#FFFFFF" }}>DTwP 1</Text>
                                                </View>
                                                <View style={{ marginTop: 3 }}>
                                                    <Text style={{ fontSize: 11, color: "#FFFFFF" }}>IPV 1</Text>
                                                </View>
                                                <View style={{ marginTop: 3 }}>
                                                    <Text style={{ fontSize: 11, color: "#FFFFFF" }}>HEP-B2</Text>
                                                </View>
                                                <View style={{ marginTop: 3 }}>
                                                    <Text style={{ fontSize: 11, color: "#FFFFFF" }}>Hib 1</Text>
                                                </View>
                                                <View style={{ marginTop: 3 }}>
                                                    <Text style={{ fontSize: 11, color: "#FFFFFF" }}>RV VACCINE 1</Text>
                                                </View>
                                                <View style={{ marginTop: 3 }}>
                                                    <Text style={{ fontSize: 11, color: "#FFFFFF" }}>PCV 1</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </LinearGradient>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Nextduevaccine')}>
                                <View style={[styles.cardvaccine]}>
                                    <LinearGradient
                                        colors={['#ff9dae', '#feea93']}
                                        style={{ flex: 1, borderRadius: 10 }}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}>
                                        <View style={{ flexDirection: "row", marginTop: 7, marginLeft: 7, }}>
                                            <View style={{ flexDirection: "column", width: "50%", justifyContent: "center", alignItems: "center" }}>
                                                <View style={{ width: 86, height: 86, borderRadius: 400, backgroundColor: "white" }}>
                                                    <Image
                                                        style={{ width: 86, height: 86, borderRadius: 400 }}
                                                        source={require('../assets/baby.jpg')}
                                                        resizeMode='cover'
                                                    />
                                                </View>
                                                <View style={{ marginTop: 10 }}>
                                                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "#FFFFFF" }}>Emma</Text>
                                                </View>
                                                <View style={{ marginTop: 5 }}>
                                                    <Text style={{ fontSize: 11, color: "#FFFFFF" }}>10 Weeks</Text>
                                                </View>

                                            </View>

                                            <View style={{ flexDirection: "column", width: "50%", alignItems: "center" }}>
                                                <View>
                                                    <Text style={{ fontSize: 11, fontWeight: "bold", color: "#FFFFFF", }}>7 Nov 2019</Text>
                                                </View>
                                                <View style={{ marginTop: 20 }}>
                                                    <Text style={{ fontSize: 11, color: "#FFFFFF" }}>DTwP 2</Text>
                                                </View>
                                                <View style={{ marginTop: 3 }}>
                                                    <Text style={{ fontSize: 11, color: "#FFFFFF" }}>IPV 2</Text>
                                                </View>
                                                <View style={{ marginTop: 3 }}>
                                                    <Text style={{ fontSize: 11, color: "#FFFFFF" }}>Hlb 2</Text>
                                                </View>
                                                <View style={{ marginTop: 3 }}>
                                                    <Text style={{ fontSize: 11, color: "#FFFFFF" }}>RV VACCINE 2</Text>
                                                </View>
                                                <View style={{ marginTop: 3 }}>
                                                    <Text style={{ fontSize: 11, color: "#FFFFFF" }}>PCV 2</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </LinearGradient>
                                </View>
                            </TouchableOpacity> */}


                            <View style={{ width: 15, backgroundColor: "#FFFFFF" }} />
                        </ScrollView>

                    </View>


                    <TouchableOpacity style={[styles.digitalreport, shadowStyle]}
                        onPress={() => this.props.navigation.navigate('Vaccinedigitalreport')}>
                        <View style={{ flexDirection: "row", marginLeft: 15, marginRight: 15, justifyContent: "center", alignItems: "center" }}>

                            <View style={{ width: "15%" }}>
                                <Image
                                    style={{ width: 31, height: 28 }}
                                    source={require('../assets/digitalreport.png')}
                                    resizeMode='contain'
                                />
                            </View>

                            <View style={{ flexDirection: "column", width: "80%" }}>
                                <View>
                                    <Text style={{ fontSize: 15, color: "#747474", fontWeight: "bold" }}>
                                        Vaccine Digital Report
                                    </Text>
                                    <Text style={{ fontSize: 12, color: "#747474", marginTop: 7 }}>
                                        See your Baby’s Vaccine Digital Report
                                    </Text>
                                </View>
                            </View>

                            <View style={{ width: "5%" }}>
                                <Image
                                    style={{ width: 15, height: 15 }}
                                    source={require('../assets/leftarrow.png')}
                                    resizeMode='contain'
                                />
                            </View>

                        </View>

                    </TouchableOpacity>

                    <VaccineSchedule />

                    <View style={{ height: 20 }} />

                </ScrollView>
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

export default Vaccine;