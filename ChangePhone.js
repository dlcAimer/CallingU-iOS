/**
 * Created by Aliez on 2018/3/28.
 */
import React from 'react';
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

class ChangePhoneList extends React.Component{
    constructor(props) {
        super(props);
    }

    state = {
        hasError: false,
        value: '',
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
                    >旧账户名</InputItem>
                    <InputItem
                        {...getFieldProps('password')}
                        type="password"
                        placeholder="****"
                    >密码</InputItem>
                </List>
                <View style={{paddingTop:30}}/>
                <TouchableOpacity style={styles.btn_C}
                    // onPress={() => this.props.navigation.navigate('PasswordSingIn')} title="密码登录"
                >
                    <Text style={styles.btnText_C}>
                        确定
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class ChangePhone extends React.Component {
    static navigationOptions = {
        title: '账号迁移',
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
        }
    }

    render() {
        return (
            <View style={styles.container_C}>
                <View style={styles.header}>
                    <Icon.Button style={styles.icon} name="angle-left" backgroundColor="rgb(247,92,47)"
                                 size={30} onPress={() => this.props.navigation.goBack()}/>
                    <Text style={styles.headerText}>更改账号</Text>
                    <Text/>
                </View>
                <View style={styles.introText}>
                    <Text style={styles.introTextHeader}>请输入您的旧账号密码。</Text>
                </View>
                <View style={styles.PasswordSignInListExample}>
                    <ChangePhoneListExample navigation={this.state.navigation}/>
                </View>
                <View style={styles.watermakeContainer}>
                    <Text style={styles.watermake}>By LFChicken (2018)</Text>
                </View>
            </View>
        );
    }
}

const ChangePhoneListExample = createForm()(ChangePhoneList);

export default ChangePhone;