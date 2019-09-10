import React, {Component} from 'react';
import {
    CameraRoll,
    Image,
    ScrollView,
    View
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import styles from './styles'

class CameraRollApp extends Component {

    constructor() {
        super();
        this.state = {};

        // Extracting images from external memory.
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
        }).then((response) => {
            photos_list = response.edges
            image_tag_list = []
            photos_list.forEach(photo => {
                image_tag_list.push(
                    <Image style={styles.image_tag}
                        source={{uri: photo.node.image.uri}}
                    />
                )
            });
            this.setState({
                photos: image_tag_list
            })
        }).catch((err) => {
            console.warn(err);
        })
    };

    static navigationOptions = {
        header: null
    };

    onSwipe = (direction) => {
        if (direction === 'SWIPE_RIGHT') {
            this.props.navigation.navigate('camera')
        }
    };

    render() {

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
          };

          return (
            <GestureRecognizer
                style={styles.container}
                onSwipe={(direction) => {this.onSwipe(direction)}}
                config={config}>
                <View>
                    <ScrollView>
                        {this.state.photos}
                    </ScrollView>
                </View>
            </GestureRecognizer>
        )
    }
};

export default CameraRollApp;
