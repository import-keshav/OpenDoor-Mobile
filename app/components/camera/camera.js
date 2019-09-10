'use strict';
import React, {Component} from 'react';
import {
    PermissionsAndroid,
    Platform,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import { RNCamera } from 'react-native-camera';
import GestureRecognizer from 'react-native-swipe-gestures';


class Camera extends Component {

    constructor() {
        super();
        this.takePicture = this.takePicture.bind(this);
        this.savePicture = this.savePicture.bind(this);
        this.requestCameraPermission = this.requestCameraPermission.bind(this);
        this.state = {};
    };

    static navigationOptions = {
        header: null
    };


    requestCameraPermission = async () => {
        try {
            const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
            await PermissionsAndroid.request(permission);
            Promise.resolve();
        } catch (error) {
            Promise.reject(error);
        }
    }


    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true,  doNotSave: false};
            const data = await this.camera.takePictureAsync(options);
            if(data) {
                this.savePicture();
            }
        }
    };


    savePicture = async () => {
        try {
            if (Platform.OS === 'android') {
                await this.requestCameraPermission();
            }
            CameraRoll.saveToCameraRoll(data.uri);
            Promise.resolve()
        } catch (error) {
            Promise.reject(error)
        }
    }


    onSwipe = (direction) => {
        if (direction === 'SWIPE_LEFT') {
            this.props.navigation.navigate('camerarollapp')
        }
    }


    render() {

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
          };

        return(
            <GestureRecognizer
                    onSwipe={(direction) => this.onSwipe(direction)}
                    config={config}
                    style={styles.container}>

                <View style={styles.container}>

                <RNCamera 
                    ref = { ref => {this.camera = ref; }}
                    style = {styles.camera}
                    type={RNCamera.Constants.Type.back}
                />

                <View style={styles.button}>                
                    <TouchableOpacity onPress={this.takePicture} style={styles.camera_button_text}>
                        <Text>Click</Text>  
                    </TouchableOpacity>
                </View>

                {/* <View style={[styles.button, styles.save_button]}>                
                    <TouchableOpacity onPress={this.savePicture} style={styles.camera_button_text}>
                        <Text>Save</Text>  
                    </TouchableOpacity>
                </View> */}

                </View>
            </GestureRecognizer>

        )
    };
}

const styles = {
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    button: {
        height: 70,
        borderWidth: 5,
        borderColor: '#16a085',
    },
    camera_button_text: {
        color: 'black',
        left: 170,
        top: 25,
    },
    save_button:{
        backfaceVisibility: 'hidden'
    }
}

export default Camera;
