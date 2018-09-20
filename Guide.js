/**
 * Created by Aliez on 2018/3/28.
 */
import React from 'react';
import {
    Text,
    View,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper'
import style from "./Style"

const styles = style;

class GuidePage extends React.Component{
    static navigationOptions={
        title: 'Guide',
        header: null,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons loop={false}>
                <View style={styles.slide1}>
                    <ImageBackground source={{uri:'./img/guide1.jpg'}} style={styles.backgroundImage}>
                    </ImageBackground>
                </View>
                <View style={styles.slide2}>
                    <ImageBackground source={{uri:'./img/guide2.jpg'}} style={styles.backgroundImage}>
                    </ImageBackground>
                </View>
                <View style={styles.slide3}>
                    <ImageBackground source={{uri:'./img/guide3.jpg'}} style={styles.backgroundImage}>
                        <View style={styles.stone_G}/>
                        <View style={styles.stone_G}/>
                        <View style={styles.stone_G}/>
                        <View style={styles.container_G}>
                            <TouchableOpacity style={styles.btn_G}
                                              onPress={() => this.props.navigation.navigate('Welcome')} title="CallingU">
                                <Text style={styles.btnText}>
                                    启动应用
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </Swiper>
        )
    }
}

export default GuidePage;