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
            <ScrollView showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>
                    <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15,textAlign:'justify' }}>
                    Rotavirus vaccine is a vaccine used to protect against rotavirus infections, which are the leading cause of severe diarrhea among young children. The vaccines prevent 15–34% of severe diarrhea in the developing world and 37–96% of severe diarrhea in the developed world.
                </Text>

                    <Text style={{ fontSize: 15, marginTop: 15, fontWeight: "bold", marginLeft: 15, marginRight: 15,textAlign:'justify' }}>
                        How does it work?
                </Text>

                    <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15,textAlign:'justify' }}>
                    The vaccine contains live human rotavirus that has been weakened (attenuated), so that it stimulates the immune system but does not cause disease in healthy people. However it should not be given to people who are clinically immunosuppressed (either due to drug treatment or underlying illness). This is because the vaccine strain could replicate too much and cause a serious infection. This includes babies whose mothers have had immunosuppressive treatment while they were pregnant or breastfeeding.
                </Text>

                    {/* <TouchableOpacity onPress={() => this.CallFunction_1()}>
                    <Text>Done</Text>
                </TouchableOpacity> */}

                </View>
             </ScrollView>
            // </View>
        )
    }
}
class Doses extends React.Component {

    render() {
        return (
            <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>
                 <Image
                    style={{ width: 298, height: 200,marginTop: 15,alignSelf:"center",justifyContent:"center",alignItems:"center" }}
                    source={require('../assets/Oral.png')}
                    resizeMode='cover'
                />

                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, fontWeight: "bold", textAlign: 'justify' }}>
                Oral route:
            </Text>
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, textAlign: 'justify' }}>
                Administered by mouth
            </Text>
                <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15,textAlign:'justify' }}>
                The vaccination series consists of two 1-mL doses administered orally. The first dose should be administered to infants beginning at 6 weeks of age. There should be an interval of at least 4 weeks between the first and second dose. The 2-dose series should be completed by 24 weeks of age.
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
                        Redness
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                    Swelling
            </Text>

                    <Text style={{ fontSize: 15, marginTop: 15, marginLeft: 15, marginRight: 15, fontWeight: "bold",textAlign:'justify' }}>
                        Severe Effects:
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 30, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                    Mild fussiness or crying
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                    Mild diarrhea
            </Text>
            <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                        Vomiting
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                    Stuffy nose
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                    Sinus pain
            </Text>
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 30, marginRight: 15,textAlign:'justify' }}>
                    Sore throat
            </Text>
                    

                </View>
            </ScrollView>
        )
    }
}


class RvVaccine extends React.Component {
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
                            RV vaccine
                                </Text>
                            <Text style={{ marginLeft: 15, fontSize: 15, color: "#FFFFFF" }}>
                            Rotavirus vaccine
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

export default RvVaccine;

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