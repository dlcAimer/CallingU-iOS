/**
 * Created by Aliez on 2018/3/30.
 */
import React from 'react';
import {
    Image,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from "./Style";

const styles = style;

class PersonalDetails extends React.Component{
    static navigationOptions = {
        title: '个人信息',
        header: null,
        drawerLabel: '个人信息',
        drawerIcon:({tintColor}) => (
            <Icon name="chevron-circle-right"/>
        ),
        drawerPosition: "left",
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
                    <Icon.Button style={styles.icon} name="list" backgroundColor="rgb(247,92,47)"
                                 size={30} onPress={() => this.props.navigation.navigate('DrawerOpen')}/>
                    <Text style={styles.headerText_P}>个人信息</Text>
                    <Text/>
                </View>
            </View>
        );
    }
}

export default PersonalDetails;