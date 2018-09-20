import React from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import QuitButton from './QuitButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import storage from './src/Util/Param.js';
import style from "./Style";

const styles = style;

class VersionDetail extends React.Component{
    static navigationOptions = {
        title: '版本信息',
        header: null,
        drawerLabel: '版本信息',
        drawerIcon:({tintColor}) => (
            <Icon name="chevron-circle-right"/>
        ),
        drawerPosition: "left",
    };

    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            versionCode: 2,
            versionName: '2.0',
            versionDetail: '',
            setCookie: null,
        };
        this.handlePress = this.handlePress.bind(this)
    }

    componentWillMount(){
        storage.load({key:'SetCookie'})
            .then((res) => {
                this.state.setCookie = res;
            })
            .catch((error) => {
                alert(error);
            });
    }

    handlePress(){
        fetch('https://www.xiaobenji.net/api/check-new?versionCode='+this.state.versionCode.toLocaleString(),{
            headers:{
                'set-cookie': this.state.setCookie,
            },
        })
            .then((res)=> {
                if (res.status === 200) {
                  res.json().then((res)=>{
                      if(res.versionCode>this.state.versionCode)
                          alert("请前往AppStore更新");
                      else{
                          alert("已是最新版本");
                      }
                  })
                }
                else if (res.status === 201)
                    return Promise.reject("验证码错误或无效");
                else if (res.status === 202)
                    return Promise.reject("接受请求，请求已经进入后台排队");
                else if (res.status === 203)
                    return Promise.reject("未知错误");
                else if (res.status === 400)
                    return Promise.reject("请求失败");
                else if (res.status === 500)
                    return Promise.reject("服务器错误");
            })

            .catch((err)=>console.error(err));
    }

    render(){
        return(
            <View style={styles.container_C}>
                <View style={styles.header}>
                    <Icon.Button style={styles.icon} name="list" backgroundColor="rgb(247,92,47)"
                                 size={30} onPress={() => this.props.navigation.navigate('DrawerOpen')}/>
                    <Text style={styles.headerText_P}>版本信息</Text>
                    <QuitButton navigation={this.state.navigation}/>
                </View>
                <View style={styles.container_V}>
                <View style={styles.container_V_Body}>
                    <Image source={require('./img/logo.png')}/>
                    <Text/>
                    <Text/>
                    <Text style={styles.versionText}>一键呼救 {this.state.versionName}</Text>
                    <Text/>
                    <Text/>
                    <Text/>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Feedback')}>
                        <Text style={styles.btnText_V}>反馈</Text>
                    </TouchableOpacity>
                    <Text/>
                    <Text/>
                    <TouchableOpacity onPress={this.handlePress.bind(this)}>
                        <Text style={styles.btnText_V}>检查更新</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        );
    }
}

export default VersionDetail;