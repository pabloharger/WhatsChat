import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    chatsUserFetch
} from '../actions/AppActions';

class SceneListChats extends Component {

    componentWillMount() {
        this.props.chatsUserFetch();
    }

    renderRow(chat) {
        return (
            <TouchableHighlight
                onPress={() => Actions.chat({
                    title: chat.item.name,
                    contactName: chat.item.name,
                    contactEmail: chat.item.email
                })}
                underlayColor='#FFF'
                key={chat.item.email}
            >
                <View style={styles.chat} key={chat.item.email}>
                    <Text style={styles.chatText} key={chat.item.email}>{chat.item.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View>
                <FlatList
                    enableEmptySections
                    data={this.props.chats}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const chats = _.map(state.ListChatsReducer, (val, uid) => ({ ...val, uid }));
    return {
        chats,
    };
};

const styles = StyleSheet.create({
    chat: {
        flex: 1,
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#CCC',
    },
    chatText: {
        fontSize: 25,
    }
});

export default connect(mapStateToProps, { chatsUserFetch })(SceneListChats);
