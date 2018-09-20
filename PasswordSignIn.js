/**
 * Created by Aliez on 2018/3/25.
 */
import React,{PropTypes} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import storage from './src/Util/Param.js';
import { InputItem, Toast } from 'antd-mobile';
import qs from 'qs';
import style from "./Style"

const styles = style;

class PasswordSignIn extends React.Component {
    static navigationOptions = {
        title: '密码登录',
        header: null,
        headerTitle: 'Main',
    };

    static defaultProps = {

        normalTxt: '获取验证码',
        endTxt: '重新发送',
        countdownTxt: '秒后重新发送',
        auto: false,
    };

    componentWillMount(){
        storage.load({key:'isFirst'}).then((result) => {
            //第二次启动s
        }).catch((error) => {
            storage.save({key:'isFirst', data:'true'});
            storage.save({key: 'help', data: 0});
            storage.save({key: 'sos', data: -1});
            storage.save({key: 'state', data: -1});
            storage.save({key: 'phonestate', data: 0});
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            maxTime: 60,
            countdownTxt: props.normalTxt,
            text: "获取验证码",
            btnDisabled: false,
            navigation: this.props.navigation,
            number: '',
            code: '',
            hasError: true,
            value: '',
            setCookie: '',
        };
        this.handlePress = this.handlePress.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onChangeCode = this.onChangeCode.bind(this);
        this.handleSubmmit = this.handleSubmmit.bind(this)
    }

    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('请输入11位手机号码');
        }
    };

    onChange = (value) => {
        if (value.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            value,
        });
    };

    onChangeNumber(event) {
        this.setState({number: event.nativeEvent.text});
    }

    onChangeCode(event) {
        this.setState({code: event.nativeEvent.text});
    }

    onChangeDisabled(event) {
        this.setState({btnDisabled: !this.state.btnDisabled});
    }

    handlePress(event) {
        event.preventDefault();
        let transfer_json_to_form = (params) => {
            return qs.stringify(params)
        };
        let text = {"number": this.state.number};
        let data = transfer_json_to_form(text);
        if (!this.state.hasError) {
            fetch('https://www.xiaobenji.net/api/identify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: data,
            })
                .then((res) => {
                    if (res.status === 200)
                        res.json().then((res) => {
                            this.setState({
                                btnDisabled: true,
                                text: this.state.maxTime+'s后重新发送',
                            });
                        });
                    else if (res.status === 203)
                        return Promise.reject("未知错误");
                    else if (res.status === 400)
                        return Promise.reject("请求失败");
                    else if (res.status === 500)
                        return Promise.reject("服务器错误");
                })
                .catch((err) => console.error(err));
        }
        else {
            Toast.info('请输入11位手机号码');
        }
    }

    handleSubmmit(event) {
        event.preventDefault();
        let transfer_json_to_form = (params) => {
            return qs.stringify(params)
        };
        let text = {"number": this.state.number, "code": this.state.code};
        let data = transfer_json_to_form(text);
        if (!this.state.hasError) {
            fetch('https://www.xiaobenji.net/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: data,
            })
                .then((res) => {
                    if (res.status === 200) {
                        this.state.setCookie = res.headers.map["set-cookie"];
                        res.json().then((res) => {
                            if (res.result === 1) {
                                storage.save({key: 'SetCookie', data: this.state.setCookie});
                                storage.save({key: 'number', data: this.state.number});
                                this.state.navigation.navigate('MainPage');
                            }
                            else if (res.result === 2)
                                alert("验证码错误");
                        })
                    }
                    else if (res.status === 203)
                        return Promise.reject("未知错误");
                    else if (res.status === 400)
                        return Promise.reject("请求失败");
                    else if (res.status === 500)
                        return Promise.reject("服务器错误");
                })
                .catch((err) => alert(err));
        }
        else {
            Toast.info('请输入11位手机号码');
        }
    }

    render() {
        if(this.state.btnDisabled) {
            this.timer = setTimeout(() => {
                this.state.maxTime = this.state.maxTime - 1;
                if (this.state.maxTime <= 0) {
                    this.setState({
                        btnDisabled: false,
                        text: "获取验证码",
                        maxTime: 60,
                    });
                    clearTimeout(this.timer);
                } else {
                    this.setState({
                        text: this.state.maxTime + 's后重新发送',
                    });
                }
            }, 1000);
        }
        let btnBackgroundColor = {
            backgroundColor: this.state.btnDisabled ? '#d3d3d3' : 'rgb(247,92,47)',
        };
        return (
            <View style={styles.container_P}>
                <View style={styles.header}>
                    <Text style={styles.icon}>        </Text>
                    {/*<Icon.Button style={styles.icon} name="angle-left" backgroundColor="rgb(247,92,47)"*/}
                                 {/*size={30} onPress={() => this.props.navigation.goBack()}/>*/}
                    <Text style={styles.headerText}>登录</Text>
                    <Text/>
                </View>
                <View style={styles.introText}>
                    <Text style={styles.introTextHeader}>验证码登录</Text>
                    <Text style={styles.introTextContent}>请输入您的手机号以获取验证码</Text>
                </View>
                <View style={styles.PasswordSignInListExample}>
                    {/*<PasswordSignInListExample navigation={this.state.navigation}/>*/}
                    <InputItem
                        type="number"
                        placeholder="input your phone"
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onChange}
                        onEndEditing={this.onChangeNumber.bind(this)}
                        value={this.state.value}
                        maxLength={11}
                        keyboardType="phone-pad"
                        returnKeyType="done"
                        clearButtonMode="while-editing"
                    >手机号</InputItem>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{width: 200}}>
                            <InputItem
                                type="number"
                                placeholder=""
                                maxLength={4}
                                keyboardType="phone-pad"
                                returnKeyType="done"
                                onEndEditing={this.onChangeCode.bind(this)}
                                clearButtonMode="while-editing">验证码</InputItem>
                        </View>
                        <View style={{paddingLeft: 56.5, paddingTop: 5}}>
                            <TouchableOpacity style={[styles.btn_security_code, btnBackgroundColor]}
                                              disabled={this.state.btnDisabled}
                                              onPress={this.handlePress.bind(this)}>
                                <Text style={styles.btnText_security_code}>
                                    {this.state.text}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.forgetPassword}>
                        {/*<TouchableOpacity onPress={() => this.props.navigation.navigate('Forget')}>*/}
                        {/*<Text style={styles.forgetPasswordText}>*/}
                        {/*忘记密码?*/}
                        {/*</Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                    <TouchableOpacity style={styles.btn_P}
                                      onPress={this.handleSubmmit.bind(this)}>
                        <Text style={styles.btnText_P}>
                            确定
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.reminder}>
                        {/*<View style={styles.row}>*/}
                            {/*<Text style={styles.reminderText}>登录后后，即默认同意</Text>*/}
                            {/*<TouchableOpacity*/}
                                {/*// style={styles.btn}*/}
                                {/*onPress={this._onPress}>*/}
                                {/*<Text style={styles.information}>*/}
                                    {/*使用条例*/}
                                {/*</Text>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                        {/*<View style={styles.row}>*/}
                            {/*<Text style={styles.reminderText}>点击此处查看</Text>*/}
                            {/*<TouchableOpacity*/}
                                {/*// style={styles.btn}*/}
                                {/*onPress={this._onPress}>*/}
                                {/*<Text style={styles.information}>*/}
                                    {/*使用说明*/}
                                {/*</Text>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                        {/*<View style={styles.reminder}>*/}
                        {/*<View style={styles.row}>*/}
                        {/*<TouchableOpacity style={styles.shift_P}*/}
                        {/*onPress={this._onPress}>*/}
                        {/*<Text style={styles.information}>*/}
                        {/*微信登录*/}
                        {/*</Text>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity style={styles.shift_P}*/}
                        {/*onPress={() => this.props.navigation.navigate('ChangePhone')}>*/}
                        {/*<Text style={styles.information}>*/}
                        {/*更换手机号*/}
                        {/*</Text>*/}
                        {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                        {/*</View>*/}
                    </View>
                </View>
                <View style={styles.watermakeContainer}>
                    <Text style={styles.watermake}>By LFChicken (2018)</Text>
                </View>
            </View>
        );
    }
}

export default PasswordSignIn;