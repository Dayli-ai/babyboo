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
            <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, textAlign: 'justify' }}>
                    The vaccines available for vaccination against polio are the IPV (inactivated polio vaccine) and the OPV (oral polio vaccine). IPV (inactivated polio vaccine) is given as a shot in the arm or leg. OPV (oral polio vaccine) is the preferred vaccine for most children.
                </Text>

                <Text style={{ fontSize: 15, marginTop: 15, fontWeight: "bold", marginLeft: 15, marginRight: 15, textAlign: 'justify' }}>
                    How does it work?
                </Text>

                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, textAlign: 'justify' }}>
                    IPV is given by intramuscular or intradermal injection and needs to be administered by a trained health worker. IVP produces antibodies in the blood to all three types of poliovirus. In the event of infection, these antibodies prevent the spread of the virus to the central nervous system and protect against paralysis.
                </Text>

            </View>
        )
    }
}
class Doses extends React.Component {

    render() {
        return (

            <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>
                <Image
                    style={{ width: 298, height: 200,marginTop: 15,alignSelf:"center",justifyContent:"center",alignItems:"center" }}
                    source={require('../assets/Intramuscular.png')}
                    resizeMode='cover'
                />

                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, fontWeight: "bold", textAlign: 'justify' }}>
                Intramuscular route:
            </Text>
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, textAlign: 'justify' }}>
                Injected into muscle tissue
            </Text>
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, textAlign: 'justify' }}>
                    Children get 4 doses of IPV at these ages: 2 months, 4 months, 6-18 months, and a booster dose at 4-6 years.
            </Text>
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
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, fontWeight: "bold", textAlign: 'justify' }}>
                    Local Effects:
            </Text >
                <Text style={{ fontSize: 15, marginTop: 30, marginLeft: 30, marginRight: 15, textAlign: 'justify' }}>
                    Redness
            </Text>
                <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15, textAlign: 'justify' }}>
                    Pain
            </Text>
                <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15, textAlign: 'justify' }}>
                    Swelling
            </Text>
                <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15, textAlign: 'justify' }}>
                    Lump where the shot was given
            </Text>
                <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15, textAlign: 'justify' }}>
                    Low fever
            </Text>

                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, fontWeight: "bold", textAlign: 'justify' }}>
                    Severe Effects:
            </Text>
                <Text style={{ fontSize: 15, marginTop: 30, marginLeft: 30, marginRight: 15, textAlign: 'justify' }}>
                    Joint pain
            </Text>
                <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15, textAlign: 'justify' }}>
                    Body aches
            </Text>
                <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15, textAlign: 'justify' }}>
                    Drowsiness
            </Text>
                <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15, textAlign: 'justify' }}>
                    Mild fussiness or crying
            </Text>
                <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15, textAlign: 'justify' }}>
                    Vomiting
            </Text>
            </View>
            </ScrollView>

        )
    }
}


class IPV extends React.Component {
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
                                IPV
                                </Text>
                            <Text style={{ marginLeft: 15, fontSize: 15, color: "#FFFFFF" }}>
                                Inactivated polio vaccine
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

export default IPV;

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