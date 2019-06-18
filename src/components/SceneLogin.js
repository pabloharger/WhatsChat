import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableHighlight,
    ImageBackground,
    ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
    modifyEmail,
    modifyPassword,
    autenticateUser,
} from '../actions/AutenticationActions';

const imgBg = require('../imgs/bg.png');

class SceneLogin extends Component {
    
    constructor(props) {
        super(props);

        this._autenticateUser = this._autenticateUser.bind(this);
        this._renderButtonAutenticate = this._renderButtonAutenticate.bind(this);
    }

    _autenticateUser() {
        const { email, password } = this.props;
        this.props.autenticateUser({ email, password });
    }

    _renderButtonAutenticate() {
        if (this.props.loadingLogin) {
            return (
                <ActivityIndicator size='large' />
            );
        }

        return (
            <TouchableHighlight
                style={styles.footerButton}
                onPress={() => this._autenticateUser()}
                underlayColor='#4c779b'
            >
                <Text style={styles.footerText}>Login</Text>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ImageBackground source={imgBg} style={styles.background}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>WhatsChat</Text>
                    </View>
                    <View style={styles.content}>
                        <TextInput
                            value={this.props.email}
                            style={styles.contentTextInput} 
                            placeholder='E-mail' 
                            placeholderTextColor='#FFF'
                            onChangeText={(text) => this.props.modifyEmail(text) }
                        />
                        <TextInput
                            secureTextEntry
                            value={this.propspassword}
                            style={styles.contentTextInput}
                            placeholder='Password'
                            placeholderTextColor='#FFF'
                            onChangeText={(text) => this.props.modifyPassword(text)}
                        />
                        <Text style={styles.textError}>{this.props.errorLogin}</Text>
                        <TouchableHighlight
                            onPress={() => Actions.register()}
                            underlayColor= 'transparent'
                        >
                            <Text style={styles.contentText}>Not yet registered? Register Now</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.footer}>
                        {this._renderButtonAutenticate()}
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 25,
        color: '#FFF'
    },
    content: {
       flex: 2,
    },
    contentTextInput: {
        fontSize: 20,
        height: 45,
        color: '#FFF'
    },
    contentText: {
        textAlign: 'center',
        color: '#FFF',
        paddingTop: 20
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
    textError: {
        color: '#FF0000',
        fontSize: 18,
    },
});

const mapStateToProps = state => (
    {
        email: state.AutenticationReducer.email,
        password: state.AutenticationReducer.password,
        errorLogin: state.AutenticationReducer.errorLogin,
        loadingLogin: state.AutenticationReducer.loadingLogin
    }
);

export default connect(
    mapStateToProps, 
    {
        modifyEmail, 
        modifyPassword,
        autenticateUser,
    }
    )(SceneLogin);
