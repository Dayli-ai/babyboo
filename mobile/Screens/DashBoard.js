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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> DashBoard </Text>
                <TouchableOpacity
                    style={styles.btnSignin}
                    onPress={this._signout}>
                    <Text>Sign Out</Text>
                </TouchableOpacity>
            </View>
        )
    }
    _signout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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

export default DashBoard;