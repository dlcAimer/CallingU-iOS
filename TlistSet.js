import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Linking,
} from 'react-native';
import QuitButton from './QuitButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from "./Style";

const styles = style;

class TlistSet extends React.Component{
    static navigationOptions = {
        title: '权限设置',
        header: null,
        drawerLabel: '权限设置',
        drawerIcon:({tintColor}) => (
            <Icon name="chevron-circle-right"/>
        ),
        drawerPosition: "left",
    };

    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
        }
    }

    render(){
        return(
            <View style={styles.container_C}>
                <View style={styles.header}>
                    <Icon.Button style={styles.icon} name="list" backgroundColor="rgb(247,92,47)"
                                 size={30} onPress={() => this.props.navigation.navigate('DrawerOpen')}/>
                    <Text style={styles.headerText_P}>手机权限</Text>
                    <QuitButton navigation={this.state.navigation}/>
                </View>
                <View style={styles.container_T}>
                    <Text style={styles.tlistText}>
                        请开启本软件使用所需的手机权限，否则软件无法正常使用。需开启的手机权限有：定位、拨打电话、发送短信、读写手机存储、获取手机信息。
                    </Text>
                    <Text/>
                    <Text/>
                    <Text/>
                    <TouchableOpacity onPress={() => Linking.openURL('app-settings:')}>
                        <Text style={styles.btnText_V}>设置手机权限</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default TlistSet;