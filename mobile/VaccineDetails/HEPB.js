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
                        Hepatitis B is an infection of your liver. It can cause scarring of the organ, liver failure, and cancer. It can be fatal if it isn’t treated. It’s spread when people come in contact with the blood, open sores, or body fluids of someone who has the hepatitis B virus. It's serious, but if you get the disease as an adult, it shouldn’t last a long time. Your body fights it off within a few months, and you’re immune for the rest of your life. That means you can't get it again. But if you get it at birth, it’ unlikely to go away.
                </Text>

                    <Text style={{ fontSize: 15, marginTop: 15, fontWeight: "bold", marginLeft: 15, marginRight: 15,textAlign:'justify' }}>
                        How does it work?
                </Text>

                    <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15,textAlign:'justify' }}>
                        The hepatitis B vaccine stimulates your natural immune system to protect against the hepatitis B e hepatitis B virus in the future.
                </Text>

                </View>
            //</ScrollView>
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
                    style={{ width: 200, height: 200,marginTop: 15,alignSelf:"center",justifyContent:"center",alignItems:"center" }}
                    source={require('../assets/Intramuscular.png')}
                    resizeMode='cover'
                />

                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, fontWeight: "bold", textAlign: 'justify' }}>
                Intramuscular route:
            </Text>
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, textAlign: 'justify' }}>
                Injected into muscle tissue
            </Text>

                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, fontWeight: "bold",textAlign:'justify' }}>
                    First dose
            </Text>
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15,textAlign:'justify' }}>
                    Medically stable infants weighing ≥2,000 grams born to HBsAg-negative mothers: 0.5 ML IM within 24h of birth.
            </Text>
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, fontWeight: "bold" ,textAlign:'justify'}}>
                    Second dose
            </Text>
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15,textAlign:'justify' }}>
                    Administered at age 1-2 months Monovalent HepB vaccine should be used for doses administered before age 6 weeks.
            </Text>

                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, fontWeight: "bold",textAlign:'justify' }}>
                    Final (3rd or 4th) dose
            </Text>
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15,textAlign:'justify' }}>
                    Administered no earlier than age 24 weeks, and at least 16 weeks after the first dose.
            </Text>
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15,textAlign:'justify' }}>
                    A total of 4 doses of HepB vaccine is recommended when a combination vaccine containing HepB is administered after the birth dose.
            </Text>
            </View>
            </ScrollView>
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
                        Pain
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                        Severe itching
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                        Reddening of the skin
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                        Weakness
            </Text>

                    <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, fontWeight: "bold",textAlign:'justify' }}>
                        Severe Effects:
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 30, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                        Feeling unwell (malaise)
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                        Nausea
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                        Vomiting
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                        Abdominal pain/cramps
            </Text>



                </View>
            </ScrollView>
        )
    }
}


class HEPB extends React.Component {
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
                                HEP B
                                </Text>
                            <Text style={{ marginLeft: 15, fontSize: 15, color: "#FFFFFF" }}>
                                Hepatitis B
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

export default HEPB;

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