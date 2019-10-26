import * as React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Splash from "./Splash";
import Login from "./Login";
import DashBoard from "./DashBoard";
import AuthLoadingScreen from "./AuthLoadingScreen";
import SignUp from "./SignUp";
import RegisterChild from "./RegisterChild";
import Relationship from "./Relationship";
import Vaccine from "./Vaccine";
import Milestone from "./Milestone";
import Home from "./Home";
import Profile from "./Profile";
import Nextduevaccine from "./Nextduevaccine";
import Vaccinedigitalreport from "./Vaccinedigitalreport";
import { HeaderBackButton } from 'react-navigation-stack';

const navigationOptions = ({ navigation }) => ({
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
})


const VaccineScreen = createStackNavigator(
    {
        Vaccine: { screen: Vaccine },
    },
    {headerLayoutPreset: 'center'}
)
const MilestoneScreen = createStackNavigator(
    {
        Milestone: { screen: Milestone }
    },
    {headerLayoutPreset: 'center'}
)
const HomeScreen = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {headerLayoutPreset: 'center'}
)

const ProfileScreen = createStackNavigator(
    {
        Profile: { screen: Profile,
            navigationOptions: {
                header: null,
                tabBarVisible: false,
            }, }
    },
    {headerLayoutPreset: 'center'}
)

const NextduevaccineScreen = createStackNavigator(
    {
        Nextduevaccine: { screen: Nextduevaccine }
    },
    {headerLayoutPreset: 'center'}
)
const VaccinedigitalreportScreen = createStackNavigator(
    {
        Vaccinedigitalreport: { screen: Vaccinedigitalreport }
    },
    {headerLayoutPreset: 'center'}
)

const BottomTabNavigator = createBottomTabNavigator({
    
    Home: { screen: HomeScreen },
    Vaccine: { screen: VaccineScreen },
    Milestone: { screen: MilestoneScreen },  
    Profile: { screen: ProfileScreen },
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Vaccine') {
                    //   iconName = `qrcode-scan${focused ? '' : ''}`;
                    return <Image
                        style={{ width: 31, height: 31, borderWidth: 0, }}
                        source={require('../assets/injectionmenu.png')}
                        resizeMode='contain' />;
                } else if (routeName === 'Milestone') {
                    return <Image
                        style={{ width: 31, height: 31, borderWidth: 0, }}
                        source={require('../assets/milesronemenu.png')}
                        resizeMode='contain' />;
                } else if (routeName === 'Home') {
                    return <Image
                        style={{ width: 31, height: 31, borderWidth: 0, }}
                        source={require('../assets/house.png')}
                        resizeMode='contain' />;
                } else if (routeName === 'Profile') {
                    return <Image
                        style={{ width: 31, height: 31, borderWidth: 0, }}
                        source={require('../assets/usermenu.png')}
                        resizeMode='contain' />;
                }
            },
        }),
        tabBarOptions: {
            activeTintColor: '#a076e8',
            inactiveTintColor: '#747474',
            style: {
                backgroundColor: '#FFFFFF'
            }
        },
    });


const AppStack = createStackNavigator({

    RegisterChild: {
        screen: RegisterChild,
        navigationOptions: {
            header: null,
            tabBarVisible: false,
        },
    },
    Relationship: {
        screen: Relationship,
        navigationOptions: {
            header: null,
            tabBarVisible: false,
        },
    },

})

const AuthStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
            tabBarVisible: false,
        },
    },
})

const SplashStack = createStackNavigator(
    {
        Splash: {
            screen: Splash,
            navigationOptions: {
                header: null,
                tabBarVisible: false,
            }
        },
    },
);

const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            Splash: SplashStack,
            AuthLoading: AuthLoadingScreen,

            App: AppStack,

            Auth: AuthStack,

            SignUp: {
                screen: SignUp,
                navigationOptions: {
                    header: null,
                    tabBarVisible: false,
                }
            },
            BottomTabNavigator: {
                screen: BottomTabNavigator,
                navigationOptions: {
                    header: null,
                    tabBarVisible: false,
                },
            },
            Nextduevaccine : {
                screen: NextduevaccineScreen
            },
            Vaccinedigitalreport: {
                screen: VaccinedigitalreportScreen
            }
        }, {
        initialRouteName: 'Splash',
    }
    )
);

export default class Navigation extends React.Component {
    render() {
        return <AppContainer />;
    }
}