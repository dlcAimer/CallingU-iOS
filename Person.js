/**
 * Created by Aliez on 2018/5/6.
 */
import React,{PropTypes} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import QuitButton from './QuitButton';
import storage from './src/Util/Param.js';
import style from "./Style"

const styles = style;

class Person extends React.Component {
    static navigationOptions = {
        title: '用户',
        header: null,
        drawerLabel: '用户',
        drawerIcon: ({tintColor}) => (
            <Icon name="chevron-circle-right"/>
        ),
        drawerPosition: "left",
    };

    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            phone: 0,
        }
    }

    componentWillMount() {
        storage.load({key: 'number'})
            .then((res) => {
                this.setState({
                    phone: res,
                })
            })
            .catch((error) => {
            });
    }

    render() {
        return (
            <View style={styles.container_P}>
                <View style={styles.header}>
                    <Icon.Button style={styles.icon} name="list" backgroundColor="rgb(247,92,47)"
                                 size={30} onPress={() => this.props.navigation.navigate('DrawerOpen')}/>
                    <Text style={styles.headerText_P}>用户信息</Text>
                    <QuitButton navigation={this.state.navigation}/>
                </View>
                <TouchableOpacity style={{
                    flex: 0.07, backgroundColor: 'rgb(255,255,255)',
                    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'
                }}>
                    <Text style={{fontSize: 20}}>用户号码：</Text>
                    <Text style={{fontSize: 20}}>{this.state.phone}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Person;