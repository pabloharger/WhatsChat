import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Image,
    TouchableHighlight,
    FlatList,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    chatModifyMessageSend,
    chatSendMessage,
    chatUserFetch,
} from '../actions/AppActions';

const imgSendMessage = require('../imgs/send_message.png');

class SceneChat extends Component {

    constructor(props) {
        super(props);

        // eslint-disable-next-line no-underscore-dangle
        this._sendMessage = this._sendMessage.bind(this);
    }

    componentWillMount() {
        this.props.chatUserFetch(this.props.contactEmail);
    }

    _sendMessage() {
        const { chatMessageToSend, contactName, contactEmail } = this.props;
        this.props.chatSendMessage(chatMessageToSend, contactName, contactEmail);
    }

    renderRow(message) {
        if (message.item.type === 's') {
            return (
                <View style={styles.messageSend}>
                    <Text style={styles.messageTextSend}>{message.item.message}</Text>
                </View>
            );
        }

        return (
            <View style={styles.messageReceived}>
                <Text style={styles.messageTextReceived}>{message.item.message}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.messages}>
                    <FlatList
                        enableEmptySections
                        data={this.props.chat}
                        renderItem={this.renderRow}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={styles.send}>
                    <TextInput
                        style={styles.sendInputText}
                        onChangeText={text => this.props.chatModifyMessageSend(text)}
                        value={this.props.chatMessageToSend}
                    />
                    <TouchableHighlight
                        // eslint-disable-next-line no-underscore-dangle
                        onPress={() => this._sendMessage()}
                        underlayColor='#EEE4DC'
                    >
                        <Image source={imgSendMessage} />
                    </TouchableHighlight>
                </View>
            </View>        
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE4DC',
        padding: 10,
    },
    messages: {
        flex: 1,
        paddingBottom: 20,
    },
    send: {
        flexDirection: 'row',
        height: 60,
    },
    sendInputText: {
        flex: 4,
        backgroundColor: '#FFF',
        fontSize: 18,
    },
    messageSend: {
        alignItems: 'flex-end',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 40,
    },
    messageReceived: {
        alignItems: 'flex-start',
        marginTop: 5,
        marginBottom: 5,
        marginRight: 40,
    },
    messageTextSend: {
        fontSize: 18,
        color: '#000',
        padding: 10,
        backgroundColor: '#DBF5D4',
        elevation: 1,
    },
    messageTextReceived: {
        fontSize: 18,
        color: '#000',
        padding: 10,
        backgroundColor: '#F7F7F7',
        elevation: 1,
    }
});

const mapStateToProps = state => {
    const chat = _.map(state.ListChatReducer, (val, uid) => ({ ...val, uid }));
    return {
        chat,
        chatMessageToSend: state.AppReducer.chatMessageToSend
    };
};

export default connect(mapStateToProps, {
    chatModifyMessageSend,
    chatSendMessage,
    chatUserFetch,
})(SceneChat);
