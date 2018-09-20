import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import QuitButton from './QuitButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from "./Style";

const styles = style;

class Information extends React.Component{
    static navigationOptions = {
        title: '帮助说明',
        header: null,
        drawerLabel: '帮助说明',
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
                    <Text style={styles.headerText_P}>帮助说明</Text>
                    <QuitButton navigation={this.state.navigation}/>
                </View>
            </View>
        );
    }
}

export default Information;