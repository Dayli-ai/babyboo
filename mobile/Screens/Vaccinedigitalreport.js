import React from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
    TextInput,
    ImageBackground,
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity,
    LayoutAnimation, Platform, UIManager,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from "./Header";
import { HeaderBackButton } from 'react-navigation-stack';
import axios from 'axios';
import url from "./Config/API"

const register = async (data) => {
    const response = await axios.post(`${url}/getUserInfo`, data);
    return response;
};


class Vaccinedigitalreport extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Home')} />,
        title: 'Vaccine Digital Report',
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
    });
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            dataSource: [],
            isLoading: true,
            expanded1: false,
            expanded2: false,
            expanded3: false,
            expanded4: false,
            expanded5: false,
            expanded6: false
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded });
    }
    changeLayout1 = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded1: !this.state.expanded1 });
    }
    changeLayout2 = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded2: !this.state.expanded2 });
    }
    changeLayout3 = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded3: !this.state.expanded3 });
    }
    changeLayout4 = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded4: !this.state.expanded4 });
    }
    changeLayout5 = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded5: !this.state.expanded5 });
    }
    changeLayout6 = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded6: !this.state.expanded6 });
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
            dataSource: response.data.childVaccines
        })
        console.log("height");
        console.log(this.state.dataSource.birth.height)
        console.log("duedate");
        console.log(this.state.dataSource[`6Months`])
        return response;
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <ScrollView showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        <View style={{ width: 322, borderRadius: 15, marginTop: 20, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center", flex: 1 }}>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: 80 }}>

                                <View style={{ width: "30%", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                                        At Birth
                                </Text>
                                </View>

                                <View style={{ width: "55%", flexDirection: "column", marginTop: 7 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ color: "#707070" }}>
                                            Due Date:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource.birth.dueDate}
                                        </Text>
                                    </View>
                                    {this.state.dataSource.birth.givenDate === "" ? null :
                                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                                            <Text style={{ color: "#707070", }}>
                                                Given Date:
                                        </Text>
                                            <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                {this.state.dataSource.birth.givenDate}
                                            </Text>
                                        </View>}


                                </View>

                                <View style={{ width: "15%", }}>

                                    {this.state.dataSource.birth.givenDate === "" ? <Image
                                        style={{ width: 27, height: 27, }}
                                        source={require('../assets/downarrow.png')}
                                        resizeMode='cover'
                                    /> : this.state.expanded ?
                                            <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout}>
                                                <Image
                                                    style={{ width: 27, height: 27, }}
                                                    source={require('../assets/uparrowblue.png')}
                                                    resizeMode='cover'
                                                />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout}>
                                                <Image
                                                    style={{ width: 27, height: 27, }}
                                                    source={require('../assets/downarrowblue.png')}
                                                    resizeMode='cover'
                                                />
                                            </TouchableOpacity>
                                    }
                                </View>
                            </View>

                            <View style={{ height: this.state.expanded ? null : 0, overflow: 'hidden', }}>

                                <View style={{ flexDirection: "column", marginLeft: "30%" }}>
                                    <View style={{ flexDirection: "row", }}>
                                        <Text style={{ color: "#707070" }}>
                                            Height:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource.birth.height} cm
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                                        <Text style={{ color: "#707070", }}>
                                            Weight:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource.birth.weight} kg
                                        </Text>
                                    </View>
                                </View>
                                {/* <FlatList
                        data={this.state.dataSource.birth.vaccines}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => 
                        <View style={{ flexDirection: "row", marginTop: 10, width: 322 }}>

                        <View style={{ width: "30%", alignItems: "center", }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                                {item.name}
                        </Text>
                        </View>

                        <View style={{ width: "55%", flexDirection: "column", }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: "#707070" }}>
                                    Brand:
                        </Text>
                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                    {item.brand}
                        </Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                <Text style={{ color: "#707070", color: "#707070" }}>
                                    Mfg Date:
                        </Text>
                                <Text style={{ marginLeft: 5 }}>
                                {item.mfgDate}
                        </Text>
                            </View>

                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                <Text style={{ color: "#707070", color: "#707070" }}>
                                    Exp Date:
                        </Text>
                                <Text style={{ marginLeft: 5 }}>
                                {item.expDate}
                        </Text>
                            </View>

                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                <Text style={{ color: "#707070", color: "#707070" }}>
                                    Batch No.:
                        </Text>
                                <Text style={{ marginLeft: 5 }}>
                                {item.batchNumber}
                        </Text>
                            </View>

                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                <Text style={{ color: "#707070", color: "#707070" }}>
                                    Hospital:
                        </Text>
                                <Text style={{ marginLeft: 5 }}>
                                {item.hospital}
                        </Text>
                            </View>

                        </View>

                    </View>
                }/> */}
                                {this.state.dataSource.birth.vaccines.map((item) => (
                                    <View style={{ flexDirection: "row", marginTop: 10, width: 322 }}>

                                        <View style={{ width: "30%", alignItems: "center", }}>
                                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                                                {item.name}
                                            </Text>
                                        </View>

                                        <View style={{ width: "55%", flexDirection: "column", }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Brand:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.brand}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070", }}>
                                                    Mfg Date:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.mfgDate}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070", }}>
                                                    Exp Date:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.expDate}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070", color: "#707070" }}>
                                                    Batch No.:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.batchNumber}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Hospital:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.hospital}
                                                </Text>
                                            </View>

                                        </View>

                                    </View>
                                ))}
                            </View>

                        </View>



                        <View style={{ width: 322, borderRadius: 15, marginTop: 20, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center", flex: 1 }}>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: 80 }}>

                                <View style={{ width: "30%", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                                        6 Weeks
                                </Text>
                                </View>

                                <View style={{ width: "55%", flexDirection: "column", marginTop: 10 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ color: "#707070" }}>
                                            Due Date:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource[`6Weeks`].dueDate}
                                        </Text>
                                    </View>
                                    {this.state.dataSource[`6Weeks`].givenDate === "" ? null :
                                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                                            <Text style={{ color: "#707070", }}>
                                                Given Date:
                                </Text>
                                            <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                {this.state.dataSource[`6Weeks`].givenDate}
                                            </Text>
                                        </View>
                                    }

                                </View>

                                <View style={{ width: "15%", }}>

                                    {this.state.dataSource[`6Weeks`].givenDate === "" ? <Image
                                        style={{ width: 27, height: 27, }}
                                        source={require('../assets/downarrow.png')}
                                        resizeMode='cover'
                                    /> :
                                        this.state.expanded1 ?
                                            <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout1}>
                                                <Image
                                                    style={{ width: 27, height: 27, }}
                                                    source={require('../assets/uparrowblue.png')}
                                                    resizeMode='cover'
                                                />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout1}>
                                                <Image
                                                    style={{ width: 27, height: 27, }}
                                                    source={require('../assets/downarrowblue.png')}
                                                    resizeMode='cover'
                                                />
                                            </TouchableOpacity>
                                    }
                                </View>
                            </View>

                            <View style={{ height: this.state.expanded1 ? null : 0, overflow: 'hidden', }}>

                                <View style={{ flexDirection: "column", marginLeft: "30%", }}>
                                    <View style={{ flexDirection: "row", }}>
                                        <Text style={{ color: "#707070" }}>
                                            Height:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource[`6Weeks`].height} cm
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                                        <Text style={{ color: "#707070", }}>
                                            Weight:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource[`6Weeks`].weight} kg
                                        </Text>
                                    </View>
                                </View>
                                {this.state.dataSource[`6Weeks`].vaccines.map((item) => (
                                    <View style={{ flexDirection: "row", marginTop: 10, width: 322 }}>

                                        <View style={{ width: "30%", alignItems: "center", }}>
                                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                                                {item.name}
                                            </Text>
                                        </View>

                                        <View style={{ width: "55%", flexDirection: "column", }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Brand:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.brand}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Mfg Date:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.mfgDate}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Exp Date:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.expDate}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Batch No.:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.batchNumber}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Hospital:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.hospital}
                                                </Text>
                                            </View>

                                        </View>

                                    </View>
                                ))}
                            </View>

                        </View>



                        <View style={{ width: 322, borderRadius: 15, marginTop: 20, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center", flex: 1 }}>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: 80 }}>

                                <View style={{ width: "30%", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                                        10 Weeks
                                </Text>
                                </View>

                                <View style={{ width: "55%", flexDirection: "column", marginTop: 10 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ color: "#707070" }}>
                                            Due Date:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource[`10Weeks`].dueDate}
                                        </Text>
                                    </View>
                                    {this.state.dataSource[`10Weeks`].givenDate === "" ? null :
                                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                                            <Text style={{ color: "#707070", }}>
                                                Given Date:
                                            </Text>
                                            <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                {this.state.dataSource[`10Weeks`].givenDate}
                                            </Text>
                                        </View>
                                    }

                                </View>

                                <View style={{ width: "15%", }}>
                                    {this.state.dataSource[`10Weeks`].givenDate === "" ? <Image
                                        style={{ width: 27, height: 27, }}
                                        source={require('../assets/downarrow.png')}
                                        resizeMode='cover'
                                    /> :
                                        this.state.expanded2 ?
                                            <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout2}>
                                                <Image
                                                    style={{ width: 27, height: 27, }}
                                                    source={require('../assets/uparrowblue.png')}
                                                    resizeMode='cover'
                                                />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout2}>
                                                <Image
                                                    style={{ width: 27, height: 27, }}
                                                    source={require('../assets/downarrowblue.png')}
                                                    resizeMode='cover'
                                                />
                                            </TouchableOpacity>
                                    }
                                </View>
                            </View>

                            <View style={{ height: this.state.expanded2 ? null : 0, overflow: 'hidden', }}>

                                <View style={{ flexDirection: "column", marginLeft: "30%", }}>
                                    <View style={{ flexDirection: "row", }}>
                                        <Text style={{ color: "#707070" }}>
                                            Height:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource[`10Weeks`].height} cm
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                                        <Text style={{ color: "#707070", }}>
                                            Weight:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource[`10Weeks`].weight} kg
                                        </Text>
                                    </View>
                                </View>
                                {this.state.dataSource[`10Weeks`].vaccines.map((item) => (
                                    <View style={{ flexDirection: "row", marginTop: 10, width: 322 }}>

                                        <View style={{ width: "30%", alignItems: "center", }}>
                                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                                                {item.name}
                                            </Text>
                                        </View>

                                        <View style={{ width: "55%", flexDirection: "column", }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Brand:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.brand}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Mfg Date:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.mfgDate}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Exp Date:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.expDate}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Batch No.:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.batchNumber}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Hospital:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.hospital}
                                                </Text>
                                            </View>

                                        </View>

                                    </View>
                                ))}
                            </View>

                        </View>


                        <View style={{ width: 322, borderRadius: 15, marginTop: 20, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center", flex: 1 }}>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: 80 }}>

                                <View style={{ width: "30%", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                                        14 Weeks
                                </Text>
                                </View>

                                <View style={{ width: "55%", flexDirection: "column", marginTop: 10 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ color: "#707070" }}>
                                            Due Date:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource[`14Weeks`].dueDate}
                                        </Text>
                                    </View>
                                    {this.state.dataSource[`14Weeks`].givenDate === "" ? null :
                                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                                            <Text style={{ color: "#707070", }}>
                                                Given Date:
                                            </Text>
                                            <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                {this.state.dataSource[`14Weeks`].givenDate}
                                            </Text>
                                        </View>
                                    }

                                </View>

                                <View style={{ width: "15%", }}>
                                    {this.state.dataSource[`14Weeks`].givenDate === "" ? <Image
                                        style={{ width: 27, height: 27, }}
                                        source={require('../assets/downarrow.png')}
                                        resizeMode='cover'
                                    /> :
                                        this.state.expanded3 ?
                                            <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout3}>
                                                <Image
                                                    style={{ width: 27, height: 27, }}
                                                    source={require('../assets/uparrowblue.png')}
                                                    resizeMode='cover'
                                                />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout3}>
                                                <Image
                                                    style={{ width: 27, height: 27, }}
                                                    source={require('../assets/downarrowblue.png')}
                                                    resizeMode='cover'
                                                />
                                            </TouchableOpacity>
                                    }
                                </View>
                            </View>

                            <View style={{ height: this.state.expanded3 ? null : 0, overflow: 'hidden', }}>

                                <View style={{ flexDirection: "column", marginLeft: "30%", }}>
                                    <View style={{ flexDirection: "row", }}>
                                        <Text style={{ color: "#707070" }}>
                                            Height:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource[`14Weeks`].height} cm
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                                        <Text style={{ color: "#707070", }}>
                                            Weight:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource[`14Weeks`].weight} kg
                                        </Text>
                                    </View>
                                </View>
                                {this.state.dataSource[`14Weeks`].vaccines.map((item) => (
                                    <View style={{ flexDirection: "row", marginTop: 10, width: 322 }}>

                                        <View style={{ width: "30%", alignItems: "center", }}>
                                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                                                {item.name}
                                            </Text>
                                        </View>

                                        <View style={{ width: "55%", flexDirection: "column", }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Brand:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.brand}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Mfg Date:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.mfgDate}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Exp Date:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.expDate}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Batch No.:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.batchNumber}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Hospital:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.hospital}
                                                </Text>
                                            </View>

                                        </View>

                                    </View>
                                ))}
                            </View>

                        </View>


                        <View style={{ width: 322, borderRadius: 15, marginTop: 20, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center", flex: 1 }}>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: 80 }}>

                                <View style={{ width: "30%", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                                        6 Months
                                </Text>
                                </View>

                                <View style={{ width: "55%", flexDirection: "column", marginTop: 10 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ color: "#707070" }}>
                                            Due Date:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource[`6Months`].dueDate}
                                        </Text>
                                    </View>
                                    {this.state.dataSource[`6Months`].givenDate === "" ? null :
                                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                                            <Text style={{ color: "#707070", }}>
                                                Given Date:
                                            </Text>
                                            <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                {this.state.dataSource[`6Months`].givenDate}
                                            </Text>
                                        </View>
                                    }

                                </View>

                                <View style={{ width: "15%", }}>
                                    {this.state.dataSource[`6Months`].givenDate === "" ? <Image
                                        style={{ width: 27, height: 27, }}
                                        source={require('../assets/downarrow.png')}
                                        resizeMode='cover'
                                    /> :
                                        this.state.expanded4 ?
                                            <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout4}>
                                                <Image
                                                    style={{ width: 27, height: 27, }}
                                                    source={require('../assets/uparrowblue.png')}
                                                    resizeMode='cover'
                                                />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout4}>
                                                <Image
                                                    style={{ width: 27, height: 27, }}
                                                    source={require('../assets/downarrowblue.png')}
                                                    resizeMode='cover'
                                                />
                                            </TouchableOpacity>
                                    }
                                </View>
                            </View>

                            <View style={{ height: this.state.expanded4 ? null : 0, overflow: 'hidden', }}>

                                <View style={{ flexDirection: "column", marginLeft: "30%", }}>
                                    <View style={{ flexDirection: "row", }}>
                                        <Text style={{ color: "#707070" }}>
                                            Height:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource[`6Months`].height} cm
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                                        <Text style={{ color: "#707070", }}>
                                            Weight:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource[`6Months`].weight} kg
                                        </Text>
                                    </View>
                                </View>
                                {this.state.dataSource[`6Months`].vaccines.map((item) => (
                                    <View style={{ flexDirection: "row", marginTop: 10, width: 322 }}>

                                        <View style={{ width: "30%", alignItems: "center", }}>
                                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                                                {item.name}
                                            </Text>
                                        </View>

                                        <View style={{ width: "55%", flexDirection: "column", }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Brand:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.brand}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Mfg Date:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.mfgDate}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Exp Date:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.expDate}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Batch No.:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.batchNumber}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Hospital:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.hospital}
                                                </Text>
                                            </View>

                                        </View>

                                    </View>
                                ))}
                            </View>

                        </View>


                        <View style={{ width: 322, borderRadius: 15, marginTop: 20, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center", flex: 1 }}>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: 80 }}>

                                <View style={{ width: "30%", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                                        9 Months
                                </Text>
                                </View>

                                <View style={{ width: "55%", flexDirection: "column", marginTop: 10 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ color: "#707070" }}>
                                            Due Date:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource[`9Months`].dueDate}
                                        </Text>
                                    </View>
                                    {this.state.dataSource[`9Months`].givenDate === "" ? null :
                                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                                            <Text style={{ color: "#707070", }}>
                                                Given Date:
                                            </Text>
                                            <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                {this.state.dataSource[`9Months`].givenDate}
                                            </Text>
                                        </View>
                                    }

                                </View>

                                <View style={{ width: "15%", }}>
                                    {this.state.dataSource[`9Months`].givenDate === "" ? <Image
                                        style={{ width: 27, height: 27, }}
                                        source={require('../assets/downarrow.png')}
                                        resizeMode='cover'
                                    /> :
                                        this.state.expanded5 ?
                                            <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout5}>
                                                <Image
                                                    style={{ width: 27, height: 27, }}
                                                    source={require('../assets/uparrowblue.png')}
                                                    resizeMode='cover'
                                                />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout5}>
                                                <Image
                                                    style={{ width: 27, height: 27, }}
                                                    source={require('../assets/downarrowblue.png')}
                                                    resizeMode='cover'
                                                />
                                            </TouchableOpacity>
                                    }
                                </View>
                            </View>

                            <View style={{ height: this.state.expanded5 ? null : 0, overflow: 'hidden', }}>

                                <View style={{ flexDirection: "column", marginLeft: "30%", }}>
                                    <View style={{ flexDirection: "row", }}>
                                        <Text style={{ color: "#707070" }}>
                                            Height:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource[`9Months`].height} cm
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                                        <Text style={{ color: "#707070", }}>
                                            Weight:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource[`9Months`].weight} kg
                                        </Text>
                                    </View>
                                </View>
                                {this.state.dataSource[`9Months`].vaccines.map((item) => (
                                    <View style={{ flexDirection: "row", marginTop: 10, width: 322 }}>

                                        <View style={{ width: "30%", alignItems: "center", }}>
                                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                                                {item.name}
                                            </Text>
                                        </View>

                                        <View style={{ width: "55%", flexDirection: "column", }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Brand:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.brand}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Mfg Date:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.mfgDate}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Exp Date:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.expDate}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Batch No.:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.batchNumber}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Hospital:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.hospital}
                                                </Text>
                                            </View>

                                        </View>

                                    </View>
                                ))}
                            </View>

                        </View>


                        <View style={{ width: 322, borderRadius: 15, marginTop: 20, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center", flex: 1 }}>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: 80 }}>

                                <View style={{ width: "30%", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                                        12 Months
                                </Text>
                                </View>

                                <View style={{ width: "55%", flexDirection: "column", marginTop: 10 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ color: "#707070" }}>
                                            Due Date:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource[`12Months`].dueDate}
                                        </Text>
                                    </View>
                                    {this.state.dataSource[`12Months`].givenDate === "" ? null :
                                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                                            <Text style={{ color: "#707070", }}>
                                                Given Date:
                                            </Text>
                                            <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                {this.state.dataSource[`12Months`].givenDate}
                                            </Text>
                                        </View>
                                    }

                                </View>

                                <View style={{ width: "15%", }}>
                                    {this.state.dataSource[`12Months`].givenDate === "" ? <Image
                                        style={{ width: 27, height: 27, }}
                                        source={require('../assets/downarrow.png')}
                                        resizeMode='cover'
                                    /> :
                                        this.state.expanded6 ?
                                            <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout6}>
                                                <Image
                                                    style={{ width: 27, height: 27, }}
                                                    source={require('../assets/uparrowblue.png')}
                                                    resizeMode='cover'
                                                />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout6}>
                                                <Image
                                                    style={{ width: 27, height: 27, }}
                                                    source={require('../assets/downarrowblue.png')}
                                                    resizeMode='cover'
                                                />
                                            </TouchableOpacity>
                                    }
                                </View>
                            </View>

                            <View style={{ height: this.state.expanded6 ? null : 0, overflow: 'hidden', }}>

                                <View style={{ flexDirection: "column", marginLeft: "30%", }}>
                                    <View style={{ flexDirection: "row", }}>
                                        <Text style={{ color: "#707070" }}>
                                            Height:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource[`12Months`].height} cm
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                                        <Text style={{ color: "#707070", }}>
                                            Weight:
                                </Text>
                                        <Text style={{ marginLeft: 5, color: "#707070" }}>
                                            {this.state.dataSource[`12Months`].weight} kg
                                        </Text>
                                    </View>
                                </View>
                                {this.state.dataSource[`12Months`].vaccines.map((item) => (
                                    <View style={{ flexDirection: "row", marginTop: 10, width: 322 }}>

                                        <View style={{ width: "30%", alignItems: "center", }}>
                                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                                                {item.name}
                                            </Text>
                                        </View>

                                        <View style={{ width: "55%", flexDirection: "column", }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Brand:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.brand}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Mfg Date:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.mfgDate}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Exp Date:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.expDate}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Batch No.:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.batchNumber}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#707070" }}>
                                                    Hospital:
                    </Text>
                                                <Text style={{ marginLeft: 5, color: "#707070" }}>
                                                    {item.hospital}
                                                </Text>
                                            </View>

                                        </View>

                                    </View>
                                ))}
                            </View>

                        </View>



                        <View style={{ height: 20 }} />
                    </ScrollView>
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f7f9',
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
    btnSignin: {
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#707070',
        alignItems: 'center',
        marginLeft: 15,
        width: 300,
        marginRight: 15,
        padding: 10,
    }
})

export default Vaccinedigitalreport;