import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
    userContactsFetch,
} from '../actions/AppActions';

class Contacts extends Component {

    componentWillMount() {
        this.props.userContactsFetch();
    }

    renderRow(contact) {
        //alert(JSON.stringify(contact.item));
        if (contact.item === undefined) {
            return <View />;
        }
        return (
            <TouchableHighlight
                onPress={() => Actions.chat(
                    { 
                        title: contact.item.name,
                        contactName: contact.item.name,
                        contactEmail: contact.item.email
                    })
                }
                underlayColor='#FFF'
            >
            <View style={styles.view}>
                <Text style={styles.fontName}>{contact.item.name}</Text>
                <Text style={styles.fontEmail}>{contact.item.email}</Text>
            </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View>
                <FlatList
                    enableEmptySections
                    data={this.props.contacts}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }   
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#CCC',
    },
    fontName: {
        fontSize: 25,
    },
    fontEmail: {
        fontSize: 25,
    }
});

const mapStateToProps = state => {
    const contacts = _.map(state.ContactListReducer, (val, uid) => ({ ...val, uid }));

    return { contacts };
};

export default connect(mapStateToProps, {
    userContactsFetch,
})(Contacts);
