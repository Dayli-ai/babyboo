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
    Dimensions, StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from "./Header";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';


class Developmental extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={[styles.scene, { backgroundColor: '#F4F7F9',justifyContent:"center",alignItems:"center" }]}>
                
                <Image
                        style={{ width: 300, height: 300, borderWidth: 0, }}
                        source={require('../assets/ComingSoon.png')}
                        resizeMode='contain'
                    />
            <Text style={{fontSize:25, marginTop:10}}>Coming Soon...</Text>
            </View>
        )
    }
}
class Food extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={[styles.scene, { backgroundColor: '#F4F7F9',justifyContent:"center",alignItems:"center" }]}> 
            <Image
                        style={{ width: 300, height: 300, borderWidth: 0, }}
                        source={require('../assets/ComingSoon.png')}
                        resizeMode='contain'
                    />
            <Text style={{fontSize:25, marginTop:10}}>Coming Soon...</Text>
            </View>
        )
    }
}

class Milestone extends React.Component {
    static navigationOptions =
        {
            title: 'MILESTONE',
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
            index: 0,
            routes: [
                { key: 'developmental', title: 'Developmental' },
                { key: 'food', title: 'Food' },
            ],
        };
    }

    render() {
        return (
            // <View style={styles.container}>
            //     <Text> Coming Soon... </Text>
            // </View>
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    developmental: Developmental,
                    food: Food,
                })}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        indicatorStyle={styles.indicator}
                        activeColor="#A076E8"
                        inactiveColor="#707070"
                        style={styles.tabbar}
                        labelStyle={styles.label}
                    />
                )}
            />
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
    container2: {
        marginTop: StatusBar.currentHeight,
    },
    scene: {
        flex: 1,
    },
    tabbar: {
        backgroundColor: '#F4F7F9',
    },
    indicator: {
        backgroundColor: '#A076E8',
    },
    label: {
        fontWeight: 'bold',
        fontSize:12,
        
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

export default Milestone;