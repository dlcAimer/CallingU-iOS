import React from 'react';
import {View, Text,Dimensions} from 'react-native';
import {
    StackNavigator,
    DrawerNavigator,
    DrawerItems,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import InitializePage from './InitializePage';
import GuidePage from "./Guide";
import WelcomePage from './WelcomePage';
import PasswordSignIn from './PasswordSignIn';
import SignUp from './SignUp';
import ForgetPassword from './ForgetPassword';
import ChangePhone from './ChangePhone';
import MainPage from './MainPage';
import PreferenceSelection from './PreferenceSelection';
import AskForHelp from './AskForHelp';
import Information from './Information';
import VersionDetail from './VersionDetail';
import HelpList from "./HelpList";
import HelpDetail from './HelpDetail';
import Feedback from "./Feedback";
import Message from "./Message";
import TlistSet from "./TlistSet";
import ContactsEdit from './ContactsEdit';
import NewContact from './NewContact';
import Person from './Person';
import ChangeLevel from './ChangeLevel';
import UpdateLevel from './UpdateLevel';

const per = Dimensions.get('window').width/414;

const myContentComponent = (props) => (
    <View>
        <View style={{
            flexDirection: 'column',
        }}>
            <View style={{
                backgroundColor: '#f50057',
                height: per*220,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View style={{flexDirection: 'row',justifyContent: 'space-around' }}>
                    <Icon name="user-circle" size={per*50} color="white"/>
                    {/*<View style={{flex: 0.25}}/>*/}
                    {/*<View style={{flexDirection: 'column',justifyContent: 'space-around',alignItems: 'center'}}>*/}
                        {/*<Text style={{paddingTop: 5}}>用户名</Text>*/}
                        {/*<Text style={{paddingTop: 5}}>{phone}</Text>*/}
                    {/*</View>*/}
                </View>
            </View>
        </View>
        <DrawerItems {...props}/>
    </View>
);

const App_2 = DrawerNavigator({
    MainPage:{
      screen:MainPage,
    },
    Person:{screen: Person},
    Preference: {screen: PreferenceSelection},
    Information: {screen:Information},
    VersionDetail: {screen:VersionDetail},
    TlistSet: {screen:TlistSet},
    ChangeLevel: {screen:ChangeLevel},
},{
    contentComponent: myContentComponent,
    contentOptions:{
        initialRouteName: MainPage
    }
});


const App_1 = StackNavigator({
    // Initial: {
    //     screen: InitializePage,
    //     navigationOptions: ({navigation}) => ({
    //         gesturesEnabled: false,
    //     }),
    // },
    // Guide: {
    //     screen: GuidePage,
    //     navigationOptions: ({navigation}) => ({
    //         gesturesEnabled: false,
    //     }),
    // },
    // Welcome: {
    //     screen: WelcomePage,
    //     navigationOptions: ({navigation}) => ({
    //         gesturesEnabled: false,
    //     }),
    // },
    Password: {
        screen: PasswordSignIn,
        navigationOptions: ({navigation}) => ({
            gesturesEnabled: false,
        }),
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: ({navigation}) => ({
            gesturesEnabled: false,
        }),
    },
    Forget: {
        screen: ForgetPassword,
        navigationOptions: ({navigation}) => ({
            gesturesEnabled: false,
        }),
    },
    ChangePhone: {
        screen: ChangePhone,
        navigationOptions: ({navigation}) => ({
            gesturesEnabled: false,
        }),
    },
},{
    contentComponent: myContentComponent,
    contentOptions:{
        initialRouteName: InitializePage
    }
});

const App = StackNavigator({
    App:{
        screen: App_1,
        navigationOptions:({navigation})=>({
            gesturesEnabled:false,
        }),
    },
    MainPage:{
        screen: App_2,
        navigationOptions:({navigation})=>({
            gesturesEnabled:false,
            header: null,
        }),
    },
    ContactsEdit: {
        screen: ContactsEdit,
        navigationOptions: ({navigation}) => ({
            gesturesEnabled: false,
            header: null,
        }),
    },
    NewContact: {
        screen: NewContact,
        navigationOptions: ({navigation}) => ({
            gesturesEnabled: false,
            header: null,
        }),
    },
    Message: {
        screen: Message,
        navigationOptions: ({navigation}) => ({
            gesturesEnabled: false,
        }),
    },
},{
    mode: 'modal',
});

const SimpleApp = StackNavigator({
    SimpleApp:{
        screen: App,
        navigationOptions:({navigation})=>({
            gesturesEnabled:false,
        }),
    },
    AskForHelp:{
        screen: AskForHelp,
        navigationOptions:({navigation})=>({
            gesturesEnabled:false,
        }),
    },
    HelpList: {
        screen: HelpList,
        navigationOptions: ({navigation}) => ({
            gesturesEnabled: false,
        }),
    },
    HelpDetail:{
        screen: HelpDetail,
        navigationOptions: ({navigation}) => ({
            gesturesEnabled: false,
            header: null,
        }),
    },
    Feedback: {
        screen: Feedback,
        navigationOptions: ({navigation}) => ({
            gesturesEnabled: false,
        }),
    },
    UpdateLevel: {
        screen: UpdateLevel,
        navigationOptions: ({navigation}) => ({
            gesturesEnabled: false,
        }),
    },
});

export default SimpleApp;