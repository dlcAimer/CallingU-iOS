/**
 * Created by Aliez on 2018/4/11.
 */
import React,{PropTypes} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import storage from './src/Util/Param.js';
import style from "./Style"

const styles = style;
const per = Dimensions.get('window').width/414;

export default class QuitButton extends React.Component {
    static navigationOptions = {
        title: '退出',
        header: null,
    };

    constructor(props){
        super(props);
        this.state={
            isModal: false,
            transparent: true,
        };

        this.showModal = this.showModal.bind(this);
        this.handlePress = this.handlePress.bind(this);
    }

    showModal() {
        this.setState({
            isModal: true
        })
    }

    handlePress(event){
        event.preventDefault();
        storage.remove({key: 'SetCookie'});
        storage.remove({key: 'target', data: this.state.number});
        storage.remove({key: 'sos', data: -1});
        storage.remove({key: 'state', data: -1});
        storage.remove({key: 'phonestate', data: 0});
        storage.save({key: 'number',data: null});
        this.setState({isModal:false});
        this.props.navigation.navigate('App');
    }

    render(){
        let modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : 'red',
        };
        let innerContainerTransparentStyle = this.state.transparent
            ? { backgroundColor: '#fff', padding: per*20 }
            : null;
        return(
            <View>
                <Modal animationType={"fade"} transparent={ true } visible={this.state.isModal}
                       onRequestClose={() => {alert("Modal has been closed.")}}>
                    <View style={[styles.container_Modal, modalBackgroundStyle]}>
                        <View style={[styles.inner_Modal, innerContainerTransparentStyle]}>

                            <Text style={styles.modal_Text_1}>确定退出登录？</Text>
                            <View style={styles.modal_btn_Container_QB}>
                                <TouchableOpacity style={{paddingRight: per*15}} onPress={() => {{
                                    this.setState({
                                        isModal:false
                                    })
                                }}}>
                                    <Text style={styles.btnText_M}>
                                        取消
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.handlePress.bind(this)}>
                                    <Text style={styles.btnText_M}>
                                        确定
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Icon.Button name="power-off" backgroundColor="rgb(247,92,47)" size={per*30} style={{
                    paddingTop: per*20,
                    paddingRight: per*0,}} onPress={() => {this.setState({
                    isModal: true
                })}}/>
            </View>
        );
    }
}