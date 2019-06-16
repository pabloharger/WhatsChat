import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TabViewAnimated, SceneMap } from 'react-native-tab-view';

import TabBarMenu from './TabBarMenu';
import Chats from './Chats';
import Contacts from './Contacts';

export default class SceneMain extends Component {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Chats' },
      { key: '2', title: 'Contacts' }
    ],
  };

  _handleChangeTab = index => this.setState({ index });

  _renderHeader = props => <TabBarMenu {...props} />;

  _renderScene = SceneMap({
    1: Chats,
    2: Contacts
  });

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
        onIndexChange={this._handleChangeTab}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
