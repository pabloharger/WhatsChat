import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import {
    userContactsFetch,
} from '../actions/AppActions';
import _ from 'lodash';

class Contacts extends Component {

    componentWillMount() {
        this.props.userContactsFetch();
    }

    render() {
        return (
            <View>
                <Text>Contacts</Text>
            </View>
        );
    }   
}

const mapStateToProps = () => {//(
    //state.userContactsList
    //const contacts = {};
//)
};

export default connect(mapStateToProps, {
    userContactsFetch,
})(Contacts);
