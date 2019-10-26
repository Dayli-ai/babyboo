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
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15,textAlign:'justify' }}>
                    DPT (also DTP and DTwP) is a class of combination vaccines against three infectious diseases in humans: diphtheria, pertussis (whooping cough), and tetanus in which the pertussis component is acellular. This is in contrast to whole-cell, inactivated DTP (DTwP).
                </Text>

                <Text style={{ fontSize: 15, marginTop: 15, fontWeight: "bold", marginLeft: 15, marginRight: 15,textAlign:'justify' }}>
                    How does it work?
                </Text>

                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15,textAlign:'justify' }}>
                    The acellular vaccine uses selected antigens of the pertussis pathogen to induce immunity. Because it uses fewer antigens than the whole-cell vaccines, it is considered to cause fewer side effects, but it is also more expensive.
                </Text>

            </View>
            //</ScrollView>
        )
    }
}
class Doses extends React.Component {

    render() {
        return (
           
                <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>
                    <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, fontWeight: "bold",textAlign:'justify' }}>
                        Primary dose
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15,textAlign:'justify' }}>
                        The primary series of DTwP or DTaP containing vaccines should be given in 3 doses to all infants, starting at a minimum age of 6 weeks, given at 4 week intervals.
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, fontWeight: "bold",textAlign:'justify' }}>
                        Booster dose
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15,textAlign:'justify' }}>
                        1-2 Booster doses should be given for better protection against the disease. First one  at 16-24 months of age, followed by a second in  4-7 yrs of age.
            </Text>
                </View>
           
        )
    }
}

class Sideeffects extends React.Component {

    render() {
        return (
            // <ScrollView showsHorizontalScrollIndicator={false}
            //     showsVerticalScrollIndicator={false}>
                <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>
                    <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, fontWeight: "bold",textAlign:'justify' }}>
                        Local Effects:
            </Text >
                    <Text style={{ fontSize: 15, marginTop: 30, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                    Local redness
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                    Swelling
            </Text>

                    <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, fontWeight: "bold",textAlign:'justify' }}>
                        Severe Effects:
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 30, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                    Fever
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                    Pain
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                    Mild fever and agitation 
            </Text>
                </View>
            
        )
    }
}


class DTwP extends React.Component {
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
                                DTwP
                                </Text>
                            {/* <Text style={{ marginLeft: 15, fontSize: 15, color: "#FFFFFF" }}>
                                
                                </Text> */}
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

export default DTwP;

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