import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TabViewAnimated, SceneMap } from 'react-native-tab-view';

import TabBarMenu from './TabBarMenu';
import SceneListChats from './SceneListChats';
import SceneListContacts from './SceneListContacts';

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
    1: SceneListChats,
    2: SceneListContacts
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
