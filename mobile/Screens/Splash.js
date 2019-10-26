import React from 'react';
import { Button, View, Text, StyleSheet, ImageBackground, Image, Animated } from 'react-native';

class ImageLoader extends React.Component {
    state = {
        opacity: new Animated.Value(0),
    }

    onLoad = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }

    render() {
        return (
            <Animated.Image
                onLoad={this.onLoad}
                {...this.props}
                style={[
                    {
                        opacity: this.state.opacity,
                        transform: [
                            {
                                scale: this.state.opacity.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.85, 1],
                                })
                            }
                        ]
                    },
                    this.props.style,
                ]}
            />
        )
    }
}

class Splash extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            console.log("splash_Screen");
            this.props.navigation.navigate('AuthLoading');
        }, 2500);
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageLoader
                    style={{ width: 150, height: 150, borderWidth: 0, }}
                    source={require('../assets/logo1.png')}
                    resizeMode='contain'
                />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
})

export default Splash;