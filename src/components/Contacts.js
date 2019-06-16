import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    StyleSheet,
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
    userContactsFetch,
} from '../actions/AppActions';

class Contacts extends Component {

    componentWillMount() {
        this.props.userContactsFetch();
        this.createDataSource(this.props.contacts);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps.contacts);
    }

    createDataSource(contacts) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows(contacts);
    }

    render() {
        return (
            <ListView 
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={data => (
                    <View style={styles.view}>
                        <Text style={styles.fontName}>{data.name}</Text>
                        <Text style={styles.fontEmail}>{data.email}</Text>
                    </View>
                )}
            />
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
