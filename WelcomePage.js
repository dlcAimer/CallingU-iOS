/**
 * Created by Aliez on 2018/3/20.
 */
import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import style from "./Style"
import storage from './src/Util/Param.js';

const styles = style;

class WelcomePage extends React.Component{
    constructor(props){
        super(props)
    }

    static navigationOptions = {
        title: 'Welcome',
        header: null,
    };

    render() {
        return (
            <View style={styles.container_W}>
                <ImageBackground source={{uri: './img/guide3.jpg'}}
                                 style={styles.backgroundImage}>
                    <View style={styles.stone_W}/>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.btn_W}
                                          onPress={() => this.props.navigation.navigate('Password')}>
                            <Text style={styles.btnText}>
                                登录
                            </Text>
                        </TouchableOpacity>
                        {/*<View style={styles.buttonSpace}/>*/}
                        {/*<TouchableOpacity style={styles.btn_W}*/}
                                          {/*onPress={() => this.props.navigation.navigate('SignUp')}>*/}
                            {/*<Text style={styles.btnText}>*/}
                                {/*注册*/}
                            {/*</Text>*/}
                        {/*</TouchableOpacity>*/}

                    </View>
                    <View style={styles.buttonContainer}>
                        {/*<TouchableOpacity style={styles.btn_W}*/}
                                          {/*onPress={() => this.props.navigation.navigate('MainPage')}>*/}
                            {/*<Text style={styles.btnText}>*/}
                                {/*试用*/}
                            {/*</Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

export default WelcomePage;