import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

class About extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, textAlign: 'justify' }}>
                    BCG, or bacillus Calmette-Guérin, is a vaccine for tuberculosis (TB) disease. Many foreign-born persons have been BCG-vaccinated. BCG is used in many countries with a high prevalence of TB to prevent childhood tuberculous meningitis and miliary disease.
                </Text>

                <Text style={{ fontSize: 15, marginTop: 15, fontWeight: "bold", marginLeft: 15, marginRight: 15, textAlign: 'justify' }}>
                    How does it work?
                </Text>

                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, textAlign: 'justify' }}>
                    The BCG vaccine contains a weakened strain of TB bacteria, which builds up immunity and encourages the body to fight TB if infected with it, without causing the disease itself.
                </Text>

                {/* <TouchableOpacity onPress={() => this.CallFunction_1()}>
                    <Text>Done</Text>
                </TouchableOpacity> */}

            </View>
        )
    }
}
class Doses extends React.Component {

    render() {
        return (
            <ScrollView showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
            <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>

                <Image
                    style={{ width: 298, height: 200,marginTop: 15,alignSelf:"center",justifyContent:"center",alignItems:"center" }}
                    source={require('../assets/Intradermal.png')}
                    resizeMode='cover'
                />

                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, fontWeight: "bold", textAlign: 'justify' }}>
                    Intradermal route:
            </Text>
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, textAlign: 'justify' }}>
                    Injected into layers of the skin
            </Text>
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, fontWeight: "bold", textAlign: 'justify' }}>
                    Dose:
            </Text>
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, textAlign: 'justify' }}>
                    0.05 mL dose for children under one year
            </Text>
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, textAlign: 'justify' }}>
                    0.1 mL dose for recipients over one year
            </Text>
            </View>
            </ScrollView>
        )
    }
}

class Sideeffects extends React.Component {

    render() {
        return (
            <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, fontWeight: "bold", textAlign: 'justify' }}>
                    Local Effects:
            </Text >
                <Text style={{ fontSize: 15, marginTop: 30, marginLeft: 30, marginRight: 15, textAlign: 'justify' }}>
                    Swollen lymph nodes
            </Text>
                <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15, textAlign: 'justify' }}>
                    Small red areas at the site of injection.
            </Text>

                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, fontWeight: "bold", textAlign: 'justify' }}>
                    Severe Effects:
            </Text>
                <Text style={{ fontSize: 15, marginTop: 30, marginLeft: 30, marginRight: 15, textAlign: 'justify' }}>
                    Fever
            </Text>
                <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15, textAlign: 'justify' }}>
                    Blood in the urine
            </Text>
                <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15, textAlign: 'justify' }}>
                    Frequent or painful urination
            </Text>
                <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15, textAlign: 'justify' }}>
                    Upset stomach
            </Text>
                <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15, textAlign: 'justify' }}>
                    Vomiting
            </Text>

            </View>
        )
    }
}


class BCG extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                dialogVisible: true,
                index: 0,
                routes: [
                    { key: 'about', title: 'About' },
                    { key: 'doses', title: 'Doses' },
                    { key: 'sideeffects', title: 'Side effects' },
                ],
            }
    }

    hideDialog() {
        this.setState({ dialogVisible: false });
    };

    render() {
        return (
            <View style={{ width: 354, height: 450, borderRadius: 20 }}>
                {/* <LinearGradient
                    colors={['#a076e8', '#5dc4dd']}
                    style={{ borderTopEndRadius: 20, borderTopStartRadius: 20, }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}> */}
                <View style={{ height: 50, backgroundColor: "#5dc4dd", marginTop: 14, borderTopEndRadius: 20, borderTopStartRadius: 20, }}>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <View style={{ flexDirection: "column", width: "80%" }}>
                            <Text style={{ fontWeight: "bold", marginLeft: 15, fontSize: 15, color: "#FFFFFF" }}>
                                BCG
                                </Text>
                            <Text style={{ marginLeft: 15, fontSize: 15, color: "#FFFFFF" }}>
                                Bacillus Calmette–Guérin
                                </Text>
                        </View>
                    </View>
                </View>
                {/* </LinearGradient> */}
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        about: About,
                        doses: Doses,
                        sideeffects: Sideeffects,
                    })}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                    renderTabBar={props => (
                        <TabBar
                            {...props}

                            indicatorStyle={styles.indicator}
                            style={styles.tabbar}
                            labelStyle={styles.label}
                        />
                    )}
                />

            </View>
        )
    }
}

export default BCG;

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        // borderBottomStartRadius: 20,
        // borderBottomEndRadius: 20,
    },
    tabbar: {
        backgroundColor: '#5dc4dd',
    },
    indicator: {
        backgroundColor: '#ffeb3b',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 12,
        color: "#FFFFFF"
    },
})