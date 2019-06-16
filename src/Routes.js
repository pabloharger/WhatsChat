import React from 'react';
import {
    Router,
	Scene,
} from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import SceneLogin from './components/SceneLogin';
import SceneRegister from './components/SceneRegister';
import SceneWelcome from './components/SceneWelcome';
import SceneMain from './components/SceneMain';
import AddContact from './components/AddContact';

const routes = () => (
	<Router
		navigationBarStyle={styles.scene}
		titleStyle={styles.titleStyle}
	>
		<Scene key='root'>
			<Scene
				key='login'
				component={SceneLogin}
				title='Login'
				hideNavBar={true}
				initil 
			/>
			<Scene
				key='register'
				component={SceneRegister}
				title='Register'
				hideNavBar={false}
			/>
			<Scene
				key='welcome'
				component={SceneWelcome}
				title='Welcome'
				hideNavBar={true}
			/>
			<Scene
				key='main'
				component={SceneMain}
				title='WhatsChat'
				hideNavBar={true}
			/>
			<Scene
				key='addContact'
				component={AddContact}
				title='Add Contact'
				hideNavBar={false}
				underlayColor='#115E54'
			/>
		</Scene>
	</Router>
);

const styles = StyleSheet.create({
	scene: {
		backgroundColor: '#115E54',
	},
	sceneTitle: {
		color: '#FFF',
	}
});

export default routes;
