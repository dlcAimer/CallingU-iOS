/**
 * Created by Aliez on 2018/3/30.
 */
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import {
    List,
    Switch,
} from 'antd-mobile';
import Icon from 'react-native-vector-icons/FontAwesome';
import storage from './src/Util/Param.js';
import { createForm } from 'rc-form';
import style from "./Style";

const styles = style;

class PreferenceSelectionList extends React.Component{
    constructor(props){
        super(props);
    }

    ComponentWillMount(){}

    render() {
        const {getFieldProps} = this.props.form;
        return (
            <List>
                <List.Item
                    extra={<Switch
                        {...getFieldProps('Switch', {
                            initialValue: false,
                            valuePropName: 'checked',
                        })}
                        platform="ios"
                        color="green"
                    />}
                >
                    <Text style={styles.preferText1}>自动拨打 120</Text>
                    <Text/>
                    <Text style={styles.preferText2}>开启后，当确认呼救时，将自动拨打120</Text>
                </List.Item>
            </List>
        );
    }
}

class ContactsList extends React.Component{
    constructor(props){
        super(props);
    }

    _flatList;

    _renderItem = (item) => {
        let name = item.item.name;
        let number = item.item.number;
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactsEdit',{name: item.item.name,number: item.item.number})}>
                    <View style={{flexDirection: 'row',justifyContent: 'space-around'}}>
                        <Text style={styles.preferText4}>{name}</Text>
                        <Text style={styles.preferText5}>{number}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    };

    render(){

        return (
            <View style={{flex: 0.44}}>
                <FlatList
                    ref={(flatList) => this._flatList = flatList}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.props.contacts}>
                </FlatList>
                <TouchableOpacity style={styles.btn_A1} onPress={() => this.props.navigation.navigate('NewContact')}>
                    <Text style={styles.btnText_A}>
                        ➕
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.MessageExample}>
                <Text style={styles.messageText}>
                    {this.props.message}
                </Text>
                <Text/>
                <TouchableOpacity style={styles.btn_A2} onPress={() => this.props.navigation.navigate('Message'
                    , {
                        refresh: function () {
                            this.forceUpdate();
                        }
                    }
                )}>
                    <Text style={styles.btnText_A}>
                        编辑
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

class PreferenceSelection extends React.Component{
    static navigationOptions = {
        title: '偏好设置',
        header: null,
        drawerLabel: '偏好设置',
        drawerIcon:({tintColor}) => (
            <Icon name="chevron-circle-right"/>
        ),
        drawerPosition: "left",
    };

    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            // value: false,
            message: null,
            contacts: [],
        }
    }

    componentWillMount(){
        storage.load({key:'message'})
            .then((res) => {
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
        storage.load({key: 'contacts'})
            .then((res) => {
                if(res===null || res===[]){
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
            });
    }

    componentWillUnmount(){
        this.timer&&clear(this.timer);
    }

    render(){
        return(
            <View style={styles.container_C}>
                <View style={styles.header}>
                    <Icon.Button style={styles.icon} name="list" backgroundColor="rgb(247,92,47)"
                                 size={30} onPress={() => this.props.navigation.navigate('DrawerOpen')}/>
                    <Text style={styles.headerText_P}>偏好设置</Text>
                    <Text>            </Text>
                </View>
                <View style={styles.PreferenceSelectionListExample}>
                    <Text/>
                    <PreferenceSelectionListExample/>
                    <Text/>
                    <View style={styles.ContactListExample}>
                        <Text style={styles.preferText3}>联系人</Text>
                    </View>
                    <ContactsListExample navigation={this.state.navigation} contacts={this.state.contacts}/>
                    <View style={styles.ContactListExample}>
                        <Text style={styles.preferText3}>短信内容</Text>
                    </View>
                    <MessageExample navigation={this.state.navigation} message={this.state.message}/>
                </View>
            </View>
        );
    }
}

const PreferenceSelectionListExample = createForm()(PreferenceSelectionList);
const ContactsListExample = createForm()(ContactsList);
const MessageExample = createForm()(Message);

export default PreferenceSelection;