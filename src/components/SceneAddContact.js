import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import {
    addContactModifyAddEmail,
    addContactAdd,
} from '../actions/AppActions';

class AddContact extends Component {

    constructor(props) {
        super(props);

        console.log(props);
    }

    renderAddContact() {
        if (this.props.addContactSuccess) {
            return (
                <View style={styles.contentSuccess}>
                    <Text style={styles.textSuccess}>
                        e-maill successfully added
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.flex1}>
                <View style={styles.content}>
                    <TextInput
                        placeholder='e-mail'
                        style={styles.inputText}
                        value={this.props.addContactEmailaddContactEmail}
                        onChangeText={(text) => this.props.addContactModifyAddEmail(text)}
                    />
                    <Text style={styles.textError}>{this.props.addContactError}</Text>
                </View>
                <View style={styles.footer}>
                    {this.renderButtonAdd()}
                </View>
            </View>
        );
    }

    renderButtonAdd() {
        if (this.props.addContactLoading) {
            return (
                <ActivityIndicator size='large' />
            );
        }
        return (
            <TouchableHighlight
                style={styles.footerButton}
                onPress={() => this.props.addContactAdd(this.props.addContactEmail)}
                underlayColor='#4c779b'
            >   
                <Text style={styles.footerText}>Add</Text>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderAddContact()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    inputText: {
        fontSize: 20,
        height: 20,
    },
    footer: {
        flex: 1,
        alignItems: 'center'
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
    textError: {
        color: '#FF0000',
        fontSize: 18,
        paddingTop: 20,
    },
    flex1: {
        flex: 1,
    },
    contentSuccess: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textSuccess: {
        fontSize: 20,
    }
});

const mapStateToProps = state => (
    {
        addContactEmail: state.AppReducer.addContactEmail,
        addContactError: state.AppReducer.addContactError,
        addContactLoading: state.AppReducer.addContactLoading,
        addContactSuccess: state.AppReducer.addContactSuccess,
    }
);

export default connect(mapStateToProps, {
    addContactModifyAddEmail,
    addContactAdd,
})(AddContact);
