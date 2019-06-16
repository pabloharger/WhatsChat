import React from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Image,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const imgLogo = require('../imgs/logo.png');
const imgBg = require('../imgs/bg.png');

export default () => (
    <ImageBackground source={imgBg} style={styles.background}>
        <View style={styles.container}> 
            <View style={styles.content}>
                <Text style={styles.contentText}>Welcome!</Text>
                <Image source={imgLogo} />
            </View>
            <View style={styles.footer}>
                <TouchableHighlight
                    style={styles.footerButton}
                    onPress={() => Actions.login()}
                >
                    <Text style={styles.footerText}>Login</Text>
                </TouchableHighlight>
            </View>
        </View>
    </ImageBackground>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    content: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentText: {
        fontSize: 20,
        color: '#FFF',
    },
    footer: {
        flex: 1,
        alignItems: 'center',
    },
    footerButton: {
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        backgroundColor: '#68a0cf',
        borderRadius: 10,
    },
    footerText: {
        fontSize: 20,
        color: '#FFF'
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});
