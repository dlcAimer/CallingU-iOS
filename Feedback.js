import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from "./Style";
import qs from 'qs';
import storage from './src/Util/Param.js';
import {TextareaItem} from 'antd-mobile';
import {createForm} from 'rc-form';

const styles = style;

class FeedbackEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            back: '',
            setCookie: null,
        };

        this.handlePress = this.handlePress.bind(this);
        this.onChange = this.onChange.bind(this);
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

    onChange(event){
        this.state.back = this.props.form.getFieldValue('feedback');
    }

    handlePress(event){
        this.state.back = this.props.form.getFieldValue('feedback');
        let transfer_json_to_form = (params) => { return qs.stringify(params) };
        let text={number: '17317609569',feedback: this.state.back};
        let data=transfer_json_to_form(text);
        fetch('https://www.xiaobenji.net/api/feedback',{
            method:'POST',
            headers: {
                'set-cookie': this.state.setCookie,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data,
        })
            .then((res)=>{
                if (res.status === 200)
                    res.json() .then((res)=>{
                    alert("反馈成功");
                    });
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
        const { getFieldProps } = this.props.form;
        return (
            <View style={{flexDirection: 'column'}}>
                <TextareaItem
                    {...getFieldProps('feedback')}
                    returnKeyType="done"
                    onEndEditing={this.onChange.bind(this)}
                    rows={10}
                    count={1000}
                />
            <TouchableOpacity style={styles.btn_H} onPress={this.handlePress.bind(this)}>
                <Text style={styles.feedbackText}>提交</Text>
            </TouchableOpacity>
            </View>
        )
    }
}

class Feedback extends React.Component{
    static navigationOptions = {
        title: '反馈信息',
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
        };
    }

    render(){
        return(
            <View style={styles.container_C}>
                <View style={styles.header}>
                    <Icon.Button style={styles.icon} name="angle-left" backgroundColor="rgb(247,92,47)"
                                 size={30} onPress={() => this.props.navigation.goBack()}/>
                    <Text style={styles.headerText_F}>反馈</Text>
                    <Text/>
                </View>
                <View style={styles.ContactListExample}>
                    <FeedbackEditExample/>
                </View>
            </View>
        );
    }
}

const FeedbackEditExample = createForm()(FeedbackEdit);

export default Feedback;