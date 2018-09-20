import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions
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
    }

    state = {
        hasError : false,
        phonenumber: "",
    };

    componentWillMount(){
        this.state.phonenumber = this.props.phone;
    }

    handleEdit(event){
        let res = [];
        let name = this.props.form.getFieldValue('contact');
        let phonenumber = this.state.phonenumber;
        // alert(JSON.stringify(name));
        // alert(JSON.stringify(phonenumber));
        for(let i=0;i < this.props.contacts.length;i++){
            if(this.props.contacts[i]["name"] === this.props.contact && this.props.contacts[i]["number"] === this.props.phone){
                res = [...res,{name: name,number: phonenumber}];
            }
            else{
                res = [...res,{name: this.props.contacts[i]["name"],number: this.props.contacts[i]["number"]}];
            }
        }
        // alert(JSON.stringify(res));
        storage.save({key:'contacts',data: res});
        this.props.navigation.navigate("Preference");
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
            phonenumber : phone,
        });
    };

    render() {
        const {getFieldProps} = this.props.form;
        return (
            <View>
                <List>
                    <InputItem
                        {...getFieldProps('contact',{
                            initialValue: this.props.contact
                        })}
                        type="contact"
                        placeholder="input your contact"
                    >联系人</InputItem>
                    <InputItem
                        {...getFieldProps('phone',{
                            initialValue: this.props.phone
                        })}
                        type="number"
                        placeholder="input your phone"
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onChange}
                        value={this.state.phonenumber}
                        maxLength={11}
                    >手机号</InputItem>
                </List>
                <View style={{paddingTop:per*30}}/>
                <TouchableOpacity style={styles.btn_C} onPress={this.handleEdit.bind(this)}>
                    <Text style={styles.btnText_C}>
                        保存
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class ContactsEdit extends React.Component{
    static navigationOptions = {
        title: '编辑联系人',
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            contact : this.props.navigation.state.params.name,
            phone : this.props.navigation.state.params.number,
            contacts: [],
        }
    }

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


    handleDelete(event){
        let res = [];
        for(let i=0;i < this.state.contacts.length;i++){
            if(this.state.contacts[i]["name"] !== this.state.contact || this.state.contacts[i]["number"] !== this.state.phone){
                res = [...res,{name: this.state.contacts[i]["name"],number: this.state.contacts[i]["number"]}];
            }
        }
        //alert(JSON.stringify(res));
        storage.save({key:'contacts',data: res});
        this.props.navigation.navigate("Preference");
    }

    render(){
        return(
            <View style={styles.container_C}>
                <View style={styles.header}>
                    <Icon.Button style={styles.icon} name="angle-left" backgroundColor="rgb(247,92,47)"
                                 size={per*30} onPress={() => this.props.navigation.navigate("Preference")}/>
                    <Text style={styles.headerText_P3}>编辑联系人</Text>
                    <TouchableOpacity onPress={this.handleDelete.bind(this)}>
                        <Text style={styles.headerText_P2}>删除</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.contactEditListExample}>
                    <ContactsEditListExample navigation={this.state.navigation} contact={this.state.contact} phone={this.state.phone} contacts={this.state.contacts}/>
                </View>
            </View>
        );
    }
}

const ContactsEditListExample = createForm()(ContactsEditList);

export default ContactsEdit;