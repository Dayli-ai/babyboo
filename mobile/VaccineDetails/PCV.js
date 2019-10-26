import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

class About extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            // <View style={styles.scene}>
            // <ScrollView showsHorizontalScrollIndicator={false}
            //     showsVerticalScrollIndicator={false}>
                <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>
                    <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15,textAlign:'justify' }}>
                        The action of oral polio vaccine (OPV) is two-pronged. OPV produces antibodies in the blood ('humoral' or serum immunity) to all three types of poliovirus, and in the event of infection, this protects the individual against polio paralysis by preventing the spread of poliovirus to the nervous system. Virus. After the vaccine is given, your body makes antibodies that protect you against the virus. These antibodies will fight off the infection
                </Text>

                    <Text style={{ fontSize: 15, marginTop: 15, fontWeight: "bold", marginLeft: 15, marginRight: 15,textAlign:'justify' }}>
                        How does it work?
                </Text>

                    <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15,textAlign:'justify' }}>
                        Inactivated polio vaccine (IPV). IVP produces antibodies in the blood to all three types of poliovirus. In the event of infection, these antibodies prevent the spread of the virus to the central nervous system and protect against paralysis.
                </Text>

                    {/* <TouchableOpacity onPress={() => this.CallFunction_1()}>
                    <Text>Done</Text>
                </TouchableOpacity> */}

                </View>
            // </ScrollView>
            // </View>
        )
    }
}
class Doses extends React.Component {

    render() {
        return (
            <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15,textAlign:'justify' }}>
                    OPV dose at birth (also called 'zero dose'), followed by the primary series of 3 OPV doses and at least 1 IPV dose.
            </Text>
                {/* <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15 }}>
                    0.05 mL dose for children under one year
            </Text>
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15 }}>
                    0.1 mL dose for recipients over one year
            </Text> */}
            </View>
        )
    }
}

class Sideeffects extends React.Component {

    render() {
        return (
            <ScrollView showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>
                    <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, fontWeight: "bold",textAlign:'justify' }}>
                        Local Effects:
            </Text >
                    <Text style={{ fontSize: 15, marginTop: 30, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                        Redness, pain, swelling, or a lump where the shot was given
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                        Low fever
            </Text>

                    <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, fontWeight: "bold",textAlign:'justify' }}>
                        Severe Effects:
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 30, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                        Joint pain
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                        Body aches
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                        Drowsiness
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                        Mild fussiness
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                        Crying
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                        Vomiting
            </Text>

                </View>
            </ScrollView>
        )
    }
}


class PCV extends React.Component {
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
                            OPV
                                </Text>
                            <Text style={{ marginLeft: 15, fontSize: 15, color: "#FFFFFF" }}>
                            Oral Polio Vaccine
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

export default PCV;

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