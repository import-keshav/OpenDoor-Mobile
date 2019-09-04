import { createStackNavigator } from 'react-navigation-stack';

import Camera from './components/camera/camera'
// import Login from './components/user_authentication/login'
// import Register from './components/user_authentication/register';

const Stack = createStackNavigator({
    camera: Camera
});

export default Stack;

// login: Login,
// register: Register,