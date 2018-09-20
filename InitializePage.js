import React, { Component } from 'react';
import {View,StyleSheet,Animated,Dimensions } from 'react-native';
import storage from './src/Util/Param.js';
import style from "./Style"

const styles = style;

const splashImg = require('./img/initial.jpeg');//加载图片

const { width, height } = Dimensions.get('window');

class InitializePage extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(1)
        };
    }

    componentDidMount() {
        Animated.timing(
            this.state.bounceValue, { toValue: 1.2, duration: 1000 }
        ).start();
        this.timer = setTimeout(() => {
            storage.load({key:'isFirst'}).then((result) => {
                    //第二次启动s
                    this.props.navigation.navigate('Welcome');
            }).catch((error) => {
                storage.save({key:'isFirst', data:'true'});
                storage.save({key: 'help', data: 0});
                this.props.navigation.navigate('Guide');
            });
        }, 1000);
    }

    componentWillUpdate = () => {
        clearTimeout(this.timer);
    };

    render() {
        return (
            <View style={styles.container_initial}>
                <Animated.Image
                    style={{
                        width: width,
                        height: height,
                        transform: [{scale: this.state.bounceValue}]
                    }}
                    source={splashImg}
                />
            </View>
        );
    }
}

export default InitializePage;