import React, {Component} from 'react';
import {
    CameraRoll,
    Text,
    View
} from 'react-native';


class CameraRollApp extends Component {

    constructor() {
        super();
        this.state = {};
        this.getCameraRollPics = this.getCameraRollPics.bind(this);
    };

    static navigationOptions = {
        header: null
    };

    getCameraRollPics = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
        }).then((response) => {
            console.log('done')
            this.setState({
                photos: response.edges});
        }).catch((err) => {
            console.warn(err);
        })
    };

    render() {
        console.warn(this.state)
        return (
            <View>
                <Text>CameraRoll</Text>
            </View>
        )
    }
};

export default CameraRollApp;
