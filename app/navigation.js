import { createStackNavigator } from 'react-navigation-stack';

import Camera from './components/camera/camera';
import CameraRollApp from './components/memories/camerarollapp';
// import Login from './components/user_authentication/login'
// import Register from './components/user_authentication/register';

const Stack = createStackNavigator({
    camerarollapp: CameraRollApp
});

export default Stack;

// camera: Camera,

// login: Login,
// register: Register,