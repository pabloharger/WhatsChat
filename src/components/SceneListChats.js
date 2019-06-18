import React, { Component } from 'react';
import {
    View,
    ListView,
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
        this.createDataSource(this.props.chats);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps.chats);
    }

    createDataSource(chat) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows(chat);
    }

    renderRow(chat) {
        return (
            <TouchableHighlight
                onPress={() => Actions.chat({
                    title: chat.name,
                    contactName: chat.name,
                    contactEmail: chat.email
                })}
                underlayColor='#FFF'
            >
                <View style={styles.chat}>
                    <Text style={styles.chatText}>{chat.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
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
