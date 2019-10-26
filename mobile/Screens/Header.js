import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

class Header extends React.Component {

    render() {
        return (
            
                <LinearGradient
                    colors={['#a076e8', '#5dc4dd']}
                    style={{ flex: 1, borderBottomEndRadius:20, borderBottomStartRadius:20 ,overflow: 'hidden'}}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            

        );
    }
}

export default Header;