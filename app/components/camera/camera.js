import React, {Component} from 'react';
import {
    CameraRoll,
    PermissionsAndroid,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { RNCamera } from 'react-native-camera';


class Camera extends Component {

    constructor() {
        super();
        this.takePicture = this.takePicture.bind(this);
        this.savePicture = this.savePicture.bind(this);
        this.state = {};

        async function requestCameraPermission() {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                  title: 'Cool Photo App Camera Permission',
                  message:
                    'Cool Photo App needs access to your camera ' +
                    'so you can take awesome pictures.',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
                },
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
              } else {
                console.log('Camera permission denied');
              }
            } catch (err) {
              console.warn(err);
            }
        }

    };

    static navigationOptions = {
        header: null
    };

    takePicture = async() => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            if(data) {
                CameraRoll.saveToCameraRoll(data.uri);
                console.log('saved')
            }
        }
    };


    savePicture() {
        console.log('saving image');
        CameraRoll.saveToCameraRoll(this.state.image);
        console.log('save succesfully');
    }

    render() {


        return(
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

                <View style={[styles.button, styles.save_button]}>                
                    <TouchableOpacity onPress={this.savePicture} style={styles.camera_button_text}>
                        <Text>Save</Text>  
                    </TouchableOpacity>
                </View>

            </View>

        )
    };
}

const styles = {
    container: {
        flex: 1,
    },
    camera: {
        flex: 1
    },
    button: {
        height: 70,
        borderWidth: 5,
        borderColor: '#16a085'
    },
    camera_button: {
        backfaceVisibility: 'visible'
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