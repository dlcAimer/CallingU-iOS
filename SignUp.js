/**
 * Created by Aliez on 2018/3/27.
 */
import React,{PropTypes} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { List, InputItem, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import style from "./Style"

const styles = style;

class SignUpList extends React.Component{
    constructor(props) {
        super(props);
    }

    state = {
        hasError: false,
        value: '',
    };

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

    render() {
        const {getFieldProps} = this.props.form;
        return (
            <View>
                <List>
                    <InputItem
                        {...getFieldProps('phone')}
                        type="phone"
                        placeholder="input your phone"
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onChange}
                        value={this.state.value}
                    >手机号码</InputItem>
                    <InputItem
                        {...getFieldProps('password_1')}
                        type="password"
                        placeholder="****"
                    >密码</InputItem>
                    <InputItem
                        {...getFieldProps('password_2')}
                        type="password"
                        placeholder="****"
                    >确认密码</InputItem>
                    <InputItem
                        {...getFieldProps('security_code')}
                        type="number"
                        placeholder="****"
                        maxLength={6}
                    >验证码</InputItem>
                </List>
            </View>
        );
    }
}

class SignUp extends React.Component {
    static navigationOptions = {
        title: 'SignUp',
        header: null,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container_S}>
                <View style={styles.header}>
                    <Icon.Button style={styles.icon} name="angle-left" backgroundColor="rgb(247,92,47)"
                                 size={30} onPress={() => this.props.navigation.goBack()}/>
                    <Text style={styles.headerText}>注册</Text>
                    <Text/>
                </View>
                <View style={styles.introText}>
                    <Text style={styles.introTextHeader}>注册账号</Text>
                </View>
                <View style={styles.PasswordSignInListExample}>
                    <SignUpListExample/>
                    <View style={styles.forgetPassword}/>
                    <TouchableOpacity style={styles.btn_S}
                        // onPress={() => this.props.navigation.navigate('PasswordSingIn')} title="密码登录"
                    >
                        <Text style={styles.btnText_S}>
                            确定
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.reminder}>
                        <View style={styles.row}>
                            <Text style={styles.reminderText}>注册成功成为用户后，即默认同意</Text>
                            <TouchableOpacity
                                // style={styles.btn}
                                onPress={this._onPress}>
                                <Text style={styles.information}>
                                    使用条例
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.reminderText}>点击此处查看</Text>
                            <TouchableOpacity
                                // style={styles.btn}
                                onPress={this._onPress}>
                                <Text style={styles.information}>
                                    使用说明
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.watermakeContainer}>
                    <Text style={styles.watermake}>By LFChicken (2018)</Text>
                </View>
            </View>
        );
    }
}

const SignUpListExample = createForm()(SignUpList);

export default SignUp;