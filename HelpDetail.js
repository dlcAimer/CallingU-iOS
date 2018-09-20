import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Linking,
    Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';
import { Card, WingBlank, WhiteSpace, List } from 'antd-mobile';
import storage from './src/Util/Param.js';
import qs from 'qs';
import style from "./Style";

const styles = style;
const per = Dimensions.get('window').width/414;


class HelpDetail extends React.Component{
    static navigationOptions = {
        title: '求救详情',
        header: null,
    };

    _flatList;

    _renderItem = (item) => {
        let phoneNumber = item.item.number;
        return (
            <WingBlank size="lg">
                <View style={{
                    flex: 0.18, backgroundColor: 'rgb(255,255,255)',
                    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'
                }}>
                    <Icon name="location-arrow" backgroundColor="rgb(255,255,255)"
                          size={per * 50}>
                        <View style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center',}}>
                            <Text style={{fontSize: 20}}>救助者：{phoneNumber}</Text>
                            <Icon.Button name="phone-square" backgroundColor="rgb(255,255,255)" size={per*30}
                                         color="black" onPress={() => Linking.openURL('tel:'+JSON.stringify(phoneNumber))}/>
                        </View>
                    </Icon>
                </View>
            </WingBlank>
        )
    };

    _header = () => {
        let phoneNumber = this.state.target;
        return (
            <WingBlank size="lg">
                <View style={{
                    flex: 0.18, backgroundColor: 'rgb(255,255,255)',
                    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'
                }}>
                    <Icon name="location-arrow" backgroundColor="rgb(255,255,255)"
                          size={per * 50}>
                        <View style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center',}}>
                            <Text style={{fontSize: 20}}>求救者：{phoneNumber}</Text>
                            <Icon.Button name="phone-square" backgroundColor="rgb(255,255,255)" size={per*30}
                                         color="black" onPress={() => Linking.openURL('tel:'+JSON.stringify(phoneNumber))}/>
                        </View>
                    </Icon>
                </View>
            </WingBlank>
        );
    };

    constructor(props) {
        super(props);
        this.state = {
            enter: null,
            isModal: false,
            transparent: true,
            navigation: this.props.navigation,
            target: this.props.navigation.state.params.target,
            number: this.props.navigation.state.params.number,
            mayType: MapTypes.NORMAL,
            zoom: 15,
            center: {
                number: this.props.navigation.state.params.number,
                longitude: this.props.navigation.state.params.longitude,
                latitude: this.props.navigation.state.params.latitude,
            },
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            markers: [
                {
                    number: this.props.navigation.state.params.number,
                    longitude: this.props.navigation.state.params.longitude,
                    latitude: this.props.navigation.state.params.latitude,
                    title: 'My Position',//救助者My Position,求救者Help
                },],
            searchText: 'AED',
            setCookie: null,
            state: 1,
            rescuer: [],
            transformResult: [],
        };

        this.handleEnter = this.handleEnter.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleQuit = this.handleQuit.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
    }

    componentWillMount() {
        storage.load({key: 'enter'})
            .then((res) => {
                if(res){
                    this.state.enter = true;
                }else {
                    this.state.enter = false;
                }
            })
            .catch((error) => {
            this.state.enter = false;
            });
        storage.load({key: 'SetCookie'})
            .then((res) => {
                this.state.setCookie = res;
            })
            .catch((error) => {
                alert(error);
            });

        //将AED在地图上标注出来
        fetch('http://api.map.baidu.com/place/v2/search?query=AED&location=' + this.state.center.latitude.toLocaleString() +
            ',' + this.state.center.longitude.toLocaleString() + '&radius=2000&output=json&ak=R2GE2Dos0neHI4eEb8PwQeRGyGN7MWL7')
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 0) {
                    for (let i = 0; i < res.results.length; i++) {
                        this.state.markers = [...this.state.markers, {
                            latitude: res.results[i].location.lat,
                            longitude: res.results[i].location.lng,
                            title: 'AED'
                        }];
                    }
                }
                else if (res.status === 2)
                    alert('数据请求格式不正确');
                else if (res.status === 3)
                    alert('权限校验失败');
                else if (res.status === 4)
                    alert('配额校验失败');
                else if (res.status === 5)
                    alert('ak不存在或者非法');
            })
            .catch((err) => console.error(err));

        let transfer_json_to_form = (params) => {
            return qs.stringify(params)
        };

        this.timer = setInterval(() => {
            Geolocation.getCurrentPosition()
                .then(data => {
                    this.state.center.longitude = data.longitude;
                    this.state.center.latitude = data.latitude;
                    this.state.markers[0].longitude = data.longitude;
                    this.state.markers[0].latitude = data.latitude;
                })
                .catch(e => {
                    // console.warn(e, 'error');
                });

            //将本机获取的百度地图位置信息转换成腾讯地图位置信息
            fetch('http://apis.map.qq.com/ws/coord/v1/translate?locations=' + this.state.center.latitude.toLocaleString() + ','
                + this.state.center.longitude.toLocaleString() + '&type=3&key=RL6BZ-VJ6C6-4L2ST-EGUUA-LTB3O-ZFBCO&output=json')
                .then((res) => res.json())
                .then((res) => {
                    if (res.status === 0) {
                        let text1 = {
                            "number": this.state.number, "latitude": res.locations[0].lat, "longitude": res.locations[0].lng,
                            "target": this.state.target, "state": this.state.state,
                        };
                        let data1 = transfer_json_to_form(text1);

                        //向后端获取求救信息
                        fetch('https://www.xiaobenji.net/api/get-details', {
                            method: 'POST',
                            headers: {
                                'set-cookie': this.state.setCookie,
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: data1,
                        })
                            .then((res) => {
                                if (res.status === 200)
                                    res.json().then((result) => {
                                        let transform = '';
                                        for (let i = 0; i < result.length; i++) {
                                            if(i !== result.length - 1) {
                                                transform += result[i].longitude.toLocaleString() + ',' + result[i].latitude.toLocaleString() + ';';
                                            }
                                            else {
                                                transform += result[i].longitude.toLocaleString() + ',' + result[i].latitude.toLocaleString();
                                            }
                                        }

                                        //将后端传回的求救信息中的腾讯地图位置信息转换为百度地图位置信息
                                        fetch('http://api.map.baidu.com/geoconv/v1/?coords=' + transform + '&from=3&to=5&ak=R2GE2Dos0neHI4eEb8PwQeRGyGN7MWL7')
                                            .then((res) => res.json())
                                            .then((res) => {
                                                if (res.status === 0) {
                                                    this.setState({
                                                        transformResult: res.result,
                                                    })
                                                }
                                            })
                                            .catch((err) => console.error(err));

                                        if(this.state.transformResult !== []){
                                            for (let i = 0; i < result.length; i++) {
                                                result[i].longitude = this.state.transformResult[i].x;
                                                result[i].latitude = this.state.transformResult[i].y;
                                            }
                                        }

                                        let length = result.length;
                                        let temp = new Array();
                                        let temp2 = new Array();
                                        let i;
                                        temp.push(this.state.markers[0]);
                                        for (i = 1; i < this.state.markers.length; i++) {
                                            if (this.state.markers[i].title === 'AED') {
                                                temp.push(this.state.markers[i]);
                                            }
                                        }
                                        for (i = 0; i < length; i++) {
                                            if (result[i].state === 0) {
                                                temp.push({
                                                    longitude: result[i].longitude,
                                                    latitude: result[i].latitude,
                                                    title: 'Help',
                                                });
                                            } else if (result[i].state > 2) {
                                                temp.push({
                                                    longitude: result[i].longitude,
                                                    latitude: result[i].latitude,
                                                    title: 'My Position',
                                                });
                                                temp2.push({
                                                    number: result[i].number,
                                                });
                                            }
                                            else if (result[i].state === -1) {
                                                alert("求助者已被救援");
                                                let transfer_json_to_form = (params) => {
                                                    return qs.stringify(params)
                                                };
                                                let text1 = {
                                                    "number": this.state.number, "target": this.state.number,
                                                    "phonestate": 0, "state": 1,
                                                };
                                                let data1 = transfer_json_to_form(text1);
                                                fetch('https://www.xiaobenji.net/api/report-state-changed', {
                                                    method: 'POST',
                                                    headers: {
                                                        'set-cookie': this.state.setCookie,
                                                        'Content-Type': 'application/x-www-form-urlencoded',
                                                    },
                                                    body: data1,
                                                })
                                                    .then((res) => {
                                                        if (res.status === 200)
                                                            res.json().then((res) => {
                                                            });
                                                        else if (res.status === 203)
                                                            return Promise.reject("未知错误");
                                                        else if (res.status === 400)
                                                            return Promise.reject("请求失败");
                                                        else if (res.status === 500)
                                                            return Promise.reject("服务器错误");
                                                    })
                                                    .catch((err) => console.error(err));
                                                this.props.navigation.goBack();
                                            }
                                        }
                                        this.setState({
                                            markers: temp,
                                            rescuer: temp2,
                                        });
                                    });
                                else if (res.status === 203)
                                    return Promise.reject("未知错误");
                                else if (res.status === 400)
                                    return Promise.reject("请求失败");
                                else if (res.status === 500)
                                    return Promise.reject("服务器错误");
                            })
                            .catch((err) => console.error(err));
                    }
                })
                .catch((err) => console.error(err));
        }, 1000);
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    handleEnter(event){
        event.preventDefault();
        storage.save({key: 'state', data: 3});
        storage.save({key: 'enter', data: true});
        this.state.enter = true;
        let transfer_json_to_form = (params) => {
            return qs.stringify(params)
        };
        let text1 = {
            "number": this.state.number, "target": this.state.target,
            "phonestate": 0, "state": 3,
        };
        let data1 = transfer_json_to_form(text1);
        fetch('https://www.xiaobenji.net/api/report-state-changed', {
            method: 'POST',
            headers: {
                'set-cookie': this.state.setCookie,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data1,
        })
            .then((res) => {
                if (res.status === 200)
                    res.json().then((res) => {
                        this.setState({
                            isModal: false,
                        })
                    });
                else if (res.status === 203)
                    return Promise.reject("未知错误");
                else if (res.status === 400)
                    return Promise.reject("请求失败");
                else if (res.status === 500)
                    return Promise.reject("服务器错误");
            })
            .catch((err) => console.error(err));
    }

    showModal() {
        this.setState({
            isModal: true
        })
    }

    handleQuit(event){
        event.preventDefault();
        storage.save({key: 'enter', data: false});
        let transfer_json_to_form = (params) => {
            return qs.stringify(params)
        };
        let text1 = {
            "number": this.state.number, "target": this.state.number,
            "phonestate": 0, "state": 1,
        };
        let data1 = transfer_json_to_form(text1);
        fetch('https://www.xiaobenji.net/api/report-state-changed', {
            method: 'POST',
            headers: {
                'set-cookie': this.state.setCookie,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data1,
        })
            .then((res) => {
                if (res.status === 200)
                    res.json().then((res) => {
                    });
                else if (res.status === 203)
                    return Promise.reject("未知错误");
                else if (res.status === 400)
                    return Promise.reject("请求失败");
                else if (res.status === 500)
                    return Promise.reject("服务器错误");
            })
            .catch((err) => console.error(err));
        this.props.navigation.goBack();
    }

    handleFinish(event){
        event.preventDefault();
        storage.save({key: 'enter', data: false});
        let transfer_json_to_form = (params) => {
            return qs.stringify(params)
        };
        let text1 = {
            "number": this.state.number, "target": this.state.target,
            "phonestate": 0, "state": 4,
        };
        let data1 = transfer_json_to_form(text1);
        fetch('https://www.xiaobenji.net/api/report-state-changed', {
            method: 'POST',
            headers: {
                'set-cookie': this.state.setCookie,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data1,
        })
            .then((res) => {
                if (res.status === 200)
                    res.json().then((res) => {
                    });
                else if (res.status === 203)
                    return Promise.reject("未知错误");
                else if (res.status === 400)
                    return Promise.reject("请求失败");
                else if (res.status === 500)
                    return Promise.reject("服务器错误");
            })
            .catch((err) => console.error(err));

        let text2 = {
            "number": this.state.number, "target": this.state.target,
        };
        let data2 = transfer_json_to_form(text2);
        fetch('https://www.xiaobenji.net/api/report-finish', {
            method: 'POST',
            headers: {
                'set-cookie': this.state.setCookie,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data2,
        })
            .then((res) => {
                if (res.status === 200)
                    res.json().then((res) => {
                    });
                else if (res.status === 203)
                    return Promise.reject("未知错误");
                else if (res.status === 400)
                    return Promise.reject("请求失败");
                else if (res.status === 500)
                    return Promise.reject("服务器错误");
            })
            .catch((err) => console.error(err));

        let text3 = {
            "number": this.state.number, "target": this.state.number,
            "phonestate": 0, "state": 1,
        };
        let data3 = transfer_json_to_form(text3);
        fetch('https://www.xiaobenji.net/api/report-state-changed', {
            method: 'POST',
            headers: {
                'set-cookie': this.state.setCookie,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data3,
        })
            .then((res) => {
                if (res.status === 200)
                    res.json().then((res) => {
                    });
                else if (res.status === 203)
                    return Promise.reject("未知错误");
                else if (res.status === 400)
                    return Promise.reject("请求失败");
                else if (res.status === 500)
                    return Promise.reject("服务器错误");
            })
            .catch((err) => console.error(err));
        this.props.navigation.goBack();
    }

    render() {
        let modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : 'red',
        };
        let innerContainerTransparentStyle = this.state.transparent
            ? {backgroundColor: '#fff', padding: 20}
            : null;
        let data = this.state.rescuer;
        if(!this.state.enter) {
            return (
                <View style={styles.container_C}>
                    <View style={styles.header}>
                        <Icon.Button style={styles.icon} name="angle-left" backgroundColor="rgb(247,92,47)"
                                     size={30} onPress={() => this.props.navigation.goBack()}/>
                    </View>

                    <Modal animationType={"fade"} transparent={ true } visible={this.state.isModal}
                           onRequestClose={() => {
                               alert("Modal has been closed.")
                           }}>
                        <View style={[styles.container_Modal, modalBackgroundStyle]}>
                            <View style={[styles.inner_Modal, innerContainerTransparentStyle]}>
                                <Text style={styles.modal_Text_1}>您即将参与本次求救，将您的位置广播给附近的志愿者</Text>
                                <Text style={styles.modal_Text_2}>是否确定参与救援？</Text>
                                <View style={styles.modal_btn_Container}>
                                    <TouchableOpacity style={{paddingRight: 15}} onPress={() => {
                                        {
                                            this.setState({
                                                isModal: false
                                            })
                                        }
                                    }}>
                                        <Text style={styles.btnText_M}>
                                            取消
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this.handleEnter.bind(this)}>
                                        <Text style={styles.btnText_M}>
                                            确定
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <MapView
                        trafficEnabled={this.state.trafficEnabled}
                        baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                        zoom={this.state.zoom}
                        mapType={this.state.mapType}
                        center={this.state.center}
                        markers={this.state.markers}
                        style={{flex: 0.4}}
                        onMarkerClick={(e) => {
                            console.warn(JSON.stringify(e));
                        }}
                        onMapClick={(e) => {
                        }}/>
                    <View style={{flex: 0.01}}/>

                    <View style={{flex: 0.4}}>
                        <FlatList
                            ref={(flatList) => this._flatList = flatList}
                            renderItem={this._renderItem}
                            ListHeaderComponent={this._header}
                            keyExtractor={(item, index) => index.toString()}
                            data={data}>
                        </FlatList>
                    </View>

                    <View style={{flex: 0.03, flexDirection: 'column'}}>
                        <View style={{flex: 0.1, flexDirection: 'row', justifyContent: 'center'}}>
                            <TouchableOpacity onPress={this.showModal.bind(this)}
                                              style={{
                                                  width: 80,
                                                  height: 20,
                                                  justifyContent: 'center',
                                                  alignItems: 'center'
                                              }}>
                                <Text style={styles.btnText_M}>
                                    参与救助
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            );
        }
        else {
            return(
                <View style={styles.container_C}>
                    <View style={styles.header}>
                        <Icon.Button style={styles.icon} name="angle-left" backgroundColor="rgb(247,92,47)"
                                     size={30} onPress={() => this.props.navigation.goBack()}/>
                    </View>

                    <Modal animationType={"fade"} transparent={ true } visible={this.state.isModal}
                           onRequestClose={() => {
                               alert("Modal has been closed.")
                           }}>
                        <View style={[styles.container_Modal, modalBackgroundStyle]}>
                            <View style={[styles.inner_Modal, innerContainerTransparentStyle]}>
                                <Text style={styles.modal_Text_1}>您即将参与本次求救，将您的位置广播给附近的志愿者</Text>
                                <Text style={styles.modal_Text_2}>是否确定参与救援？</Text>
                                <View style={styles.modal_btn_Container}>
                                    <TouchableOpacity style={{paddingRight: 15}} onPress={() => {
                                        {
                                            this.setState({
                                                isModal: false
                                            })
                                        }
                                    }}>
                                        <Text style={styles.btnText_M}>
                                            取消
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this.handleEnter.bind(this)}>
                                        <Text style={styles.btnText_M}>
                                            确定
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <MapView
                        trafficEnabled={this.state.trafficEnabled}
                        baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                        zoom={this.state.zoom}
                        mapType={this.state.mapType}
                        center={this.state.center}
                        markers={this.state.markers}
                        style={{flex: 0.4}}
                        onMarkerClick={(e) => {
                            console.warn(JSON.stringify(e));
                        }}
                        onMapClick={(e) => {
                        }}/>
                    <View style={{flex: 0.01}}/>

                    <View style={{flex: 0.4}}>
                        <FlatList
                            ref={(flatList) => this._flatList = flatList}
                            renderItem={this._renderItem}
                            ListHeaderComponent={this._header}
                            keyExtractor={(item, index) => index.toString()}
                            data={data}>
                        </FlatList>
                    </View>

                    <View style={{flex: 0.03, flexDirection: 'column'}}>
                    <View style={{flex: 0.1, flexDirection: 'row', justifyContent: 'space-around'}}>
                        <TouchableOpacity onPress={this.handleQuit.bind(this)} style={{
                            width: 80,
                            height: 20,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>>
                            <Text style={styles.btnText_M}>
                                退出救援
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.handleFinish.bind(this)} style={{
                            width: 80,
                            height: 20,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>>
                            <Text style={styles.btnText_M}>
                                成功救援
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </View>

                </View>
            );
        }
    }
}

export default HelpDetail;