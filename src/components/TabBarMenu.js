import React from 'react';
import {
    View,
    StatusBar,
    StyleSheet,
    Text,
    Image,
    TouchableHighlight,
} from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { updateSuccess } from '../actions/AppActions';
import { loginSignOut } from '../actions/AutenticationActions';

const imgAddContact = require('../imgs/add-contact.png');

const TabBarMenu = props => (
    <View style={styles.container}>
        <StatusBar style={styles.statusBar} />
        
        <View style={styles.content}>
            <View style={styles.header}>
                <Text style={styles.headerText}>WhatsChat</Text>
            </View>
            <View style={styles.headerControls}>
                <View style={styles.headControlsImage}>
                    <TouchableHighlight
                        underlayColor='transparent'
                        onPress={() => {
                            props.updateSuccess(false);
                            Actions.addContact();
                        }}
                    >
                        <Image source={imgAddContact} />
                    </TouchableHighlight>
                </View>
                <View style={styles.headerControlsContentText}>
                    <TouchableHighlight
                        underlayColor='transparent'
                        onPress={() => props.loginSignOut()}
                    >
                        <Text style={styles.headControlsText}>Sign Out</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>

        <TabBar style={styles.tabBar} {...props} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        elevation: 4,
        marginBottom: 6,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 70,
        paddingTop: 40,
        backgroundColor: '#114D44',
    },
    statusBar: {
        backgroundColor: '#114D44',
    },
    tabBar: {
        backgroundColor: '#114D44',
        elevation: 0,
    },
    header: {
        justifyContent: 'center',
        backgroundColor: '#114D44'
    },
    headerText: {
        color: '#FFF',
        fontSize: 20,
        marginLeft: 20,
    },
    headerControls: {
        flexDirection: 'row',
        backgroundColor: '#114D44',
        marginRight: 20,
    },
    headControlsImage: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headControlsText: {
        fontSize: 20,
        color: '#FFF',
    },
    headerControlsContentText: {
        justifyContent: 'center',     
    },
});

export default connect(null, { updateSuccess, loginSignOut })(TabBarMenu);
