import React,{PropTypes} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Clipboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import QuitButton from './QuitButton';
import storage from './src/Util/Param.js';
import style from "./Style"

const styles = style;

class ChangeLevel extends React.Component {
    static navigationOptions = {
        title: '升级认证',
        header: null,
        drawerLabel: '升级认证',
        drawerIcon: ({tintColor}) => (
            <Icon name="chevron-circle-right"/>
        ),
        drawerPosition: "left",
    };

    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            phone: 0,
        }
    }

    render() {
        return (
            <View style={styles.container_P}>
                <View style={styles.header}>
                    <Icon.Button style={styles.icon} name="list" backgroundColor="rgb(247,92,47)"
                                 size={30} onPress={() => this.props.navigation.navigate('DrawerOpen')}/>
                    <Text style={styles.headerText_P}>升级认证</Text>
                    <QuitButton navigation={this.state.navigation}/>
                </View>
                <View style={styles.container_CL}>
                    <Text style={styles.cLText1}> 您是否有相关急救资质(证书)？</Text>
                    <Text/>
                    <Text style={styles.cLText2}>1.若您未取得急救资质，但想学习急救知识</Text>
                    <Text style={styles.cLText4}>请关注官方微信公众号：</Text>
                    <Text/>
                    <Text style={styles.cLText3}>熠旦科技</Text>
                    <Text style={styles.cLText3}>shyidankeji</Text>
                    <Text/>
                    <TouchableOpacity style={styles.btn_P}  onPress={Clipboard.setString('熠旦科技')}>
                        <Text style={styles.btnText_P}>
                            复制公众号名称
                        </Text>
                    </TouchableOpacity>
                    <Text/>
                    <Text/>
                    <Text style={styles.cLText2}>2.若您已有急救资质，想在本平台救助他人</Text>
                    <Text/>
                    <TouchableOpacity style={styles.btn_P}  onPress={() => this.props.navigation.navigate('UpdateLevel')}>
                        <Text style={styles.btnText_P}>
                            点击上传证书
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default ChangeLevel;