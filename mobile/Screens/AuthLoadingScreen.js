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
    ActivityIndicator,
    StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._loadData();
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
    _loadData = async () => {
        const logged = await AsyncStorage.getItem('logged');
        const logged2 = await AsyncStorage.getItem('childregister');
        this.props.navigation.navigate(logged !== '1' ? 'Auth' : logged2 !== '1' ? 'App' : 'Home');
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

export default AuthLoadingScreen;