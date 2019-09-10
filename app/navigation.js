import { createStackNavigator } from 'react-navigation-stack';

import Camera from './components/camera/camera';
import CameraRollApp from './components/memories/camerarollapp';
import Login from './components/user_authentication/login'
import Register from './components/user_authentication/register';

const Stack = createStackNavigator({
    camerarollapp: {
        screen: CameraRollApp
    },
    camera: {
        screen: Camera
    },
    login: {
        screen: Login
    },
    register: {
        screen: Register
    },
}, {
    initialRouteName: 'camera'
});

export default Stack;