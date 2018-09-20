import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from "./Style";
import { createForm } from 'rc-form';
import { List, InputItem, Toast } from 'antd-mobile';
import storage from "./src/Util/Param";

const styles = style;
const per = Dimensions.get('window').width/414;

class ContactsEditList extends React.Component{
    constructor(props){
        super(props);
        this.handlePress = this.handlePress.bind(this);
    }

    state = {
        hasError : false,
        contacts: [],
        name: '',
        number: '',
    };


    componentWillMount(){
        storage.load({key: 'contacts'})
            .then((res) => {
                if(res === null || res === []){
                    this.setState({
                        contacts:[],
                    });
                    storage.save({key:'contacts',data: []});
                }
                else{
                    this.setState({
                        contacts:res,
                    });
                }
            })
            .catch((error) => {
                //alert('错误');
            });
    }


    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('请输入11位手机号码');
        }
    };

    onChange = (phone) => {
        if (phone.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            phone,
            number: phone,
        });
    };

    handlePress(event){
        this.state.name = this.props.form.getFieldValue('contact');
        this.state.contacts = [...this.state.contacts,{name: this.state.name,number: this.state.number}];
        storage.save({key:'contacts',data: this.state.contacts});
        this.props.navigation.navigate("Preference");
    }

    render() {
        const {getFieldProps} = this.props.form;
        return (
            <View>
                <List>
                    <InputItem
                        {...getFieldProps('contact')}
                        type="contact"
                        placeholder="input your contact"
                    >联系人</InputItem>
                    <InputItem
                        {...getFieldProps('phone')}
                        type="number"
                        placeholder="input your phone"
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onChange}
                        value={this.state.phone}
                        maxLength={11}
                    >手机号</InputItem>
                </List>
                <View style={{paddingTop:per*30}}/>
                <TouchableOpacity style={styles.btn_C} onPress={this.handlePress.bind(this)}>
                    <Text style={styles.btnText_C}>
                        保存
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class NewContact extends React.Component{
    static navigationOptions = {
        title: '新建联系人',
        header: null,
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
                    <Icon.Button style={styles.icon} name="angle-left" backgroundColor="rgb(247,92,47)"
                                 size={per*30} onPress={() => this.props.navigation.navigate("Preference")}/>
                    <Text style={styles.headerText_P}>新建联系人</Text>
                    <Text>     </Text>
                </View>
                <View style={styles.contactEditListExample}>
                    <ContactsEditListExample navigation={this.state.navigation}/>
                </View>
            </View>
        );
    }
}

const ContactsEditListExample = createForm()(ContactsEditList);

export default NewContact;