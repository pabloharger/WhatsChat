import React, { Component } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    ImageBackground,
    TouchableHighlight,
    Text,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import {
    modifyEmail,
    modifyPassword,
    modifyName,
    registerUser,
} from '../actions/AutenticationActions';

const imgBg = require('../imgs/bg.png');

class SceneRegister extends Component {

    constructor(props) {
        super(props);

        this._registerUser = this._registerUser.bind(this);
        this._renderButtonRegister = this._renderButtonRegister.bind(this);
    }

    _registerUser() {
        const { name, email, password } = this.props;
        this.props.registerUser({ name, email, password });
    }

    _renderButtonRegister() {
        if (this.props.loadingRegister ) {
            return (
                <ActivityIndicator size='large' />
            );
        } 

        return (
            <TouchableHighlight
                style={styles.footerButton}
                onPress={() => this._registerUser()}
                underlayColor='#4c779b'
            >
                <Text style={styles.footerText}>Register</Text>
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
                            value={this.props.name}
                            style={styles.contentTextInput}
                            placeholder='Name'
                            placeholderTextColor='#FFF'
                            onChangeText={text => this.props.modifyName(text)}
                        />
                        <TextInput
                            value={this.props.email}
                            style={styles.contentTextInput}
                            placeholder='Email'
                            placeholderTextColor='#FFF'
                            onChangeText={text => this.props.modifyEmail(text)}
                            autoCapitalize='none'
                        />
                        <TextInput
                            secureTextEntry
                            value={this.props.password}
                            style={styles.contentTextInput}
                            placeholder='Password'
                            placeholderTextColor='#FFF'
                            onChangeText={text => this.props.modifyPassword(text)}
                        />
                        <Text style={styles.textError}>{this.props.errorRegister}</Text>
                    </View>
                    <View style={styles.footer}>
                        {this._renderButtonRegister()}
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
        flex: 4,
        justifyContent: 'center',
    },
    contentTextInput: {
        fontSize: 20,
        height: 45,
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
        name: state.AutenticationReducer.name,
        email: state.AutenticationReducer.email,
        password: state.AutenticationReducer.password,
        errorRegister: state.AutenticationReducer.errorRegister,
        loadingRegister: state.AutenticationReducer.loadingRegister,
    }
);

export default connect(
    mapStateToProps, 
    {
        modifyEmail,
        modifyPassword,
        modifyName,
        registerUser,
    }
)(SceneRegister);
