import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from "./Style";
import storage from './src/Util/Param.js';
import {TextareaItem} from 'antd-mobile';
import {createForm} from 'rc-form';

const styles = style;
const per = Dimensions.get('window').width/414;

class MessageEdit extends React.Component{
    constructor(props){
        super(props);
        this.handlePress = this.handlePress.bind(this);
    }

    handlePress(event){
        storage.save({key:'message',data: this.props.form.getFieldValue('message')});
        this.props.navigation.navigate("Preference");
    }

    render(){
        const { getFieldProps } = this.props.form;
        return (
            <View style={{flexDirection: 'column'}}>
                <TextareaItem
                    {...getFieldProps('message', {
                        initialValue: this.props.message
                    })}
                    // keyboardType="phone-pad"
                    returnKeyType="done"
                    rows={10}
                    count={100}
                />
                <Text/>
                <View style={styles.container_M3}>
                    <TouchableOpacity style={styles.btn_M} onPress={this.handlePress.bind(this)}>
                        <Text style={styles.btnText_C}>
                            保存
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

class Message extends React.Component{
    static navigationOptions = {
        title: '编辑短信',
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            message: null,
        };
    }

    componentWillMount(){
        storage.load({key:'message'})
            .then((res) => {
                //alert(res);
                this.setState({
                    message : res,
                });
            })
            .catch((error) => {
                this.setState({
                    message : "我遇到麻烦了，请救救我！",
                });
                storage.save({key:'message',data: "我遇到麻烦了，请救救我！"});
            });

    }

    render(){
        return(
            <View style={styles.container_C}>
                <View style={styles.header}>
                    <Icon.Button style={styles.icon} name="angle-left" backgroundColor="rgb(247,92,47)"
                                 size={per*30} onPress={() => {
                                 this.props.navigation.navigate("Preference")}}/>
                    <Text style={styles.headerText_P}>编辑短信</Text>
                    <Text>     </Text>
                </View>
                <View style={styles.ContactListExample}>
                    <MessageEditExample navigation={this.state.navigation} message={this.state.message}/>
                </View>
            </View>
        );
    }
}

const MessageEditExample = createForm()(MessageEdit);

export default Message;