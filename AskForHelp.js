/**
 * Created by Aliez on 2018/4/7.
 */
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Linking
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

class AskForHelp extends React.Component {
    static navigationOptions = {
        title: '求救界面',
        header: null,
    };

    _flatList;

    _renderItem = (item) => {
        let phoneNumber = item.item.number;
        if(phoneNumber === this.state.number){
            return null;
        }
        else if(item.item.finish === 0) {
            return (
                <WingBlank size="lg">
                    <WhiteSpace size="lg"/>
                    <TouchableOpacity style={{
                        flex: 0.1, backgroundColor: 'rgb(255,255,255)',
                        flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'
                    }}>
                        <Icon name="location-arrow" backgroundColor="rgb(255,255,255)"
                              size={per * 50}/>
                        <Text style={{fontSize: 20}}>救援者：</Text>
                        <Text style={{fontSize: 20}}>{phoneNumber}</Text>
                        <Icon.Button name="phone-square" backgroundColor="rgb(255,255,255)" size={per * 30}
                                     color="black" onPress={() => Linking.openURL('tel:' + JSON.stringify(phoneNumber))}/>
                    </TouchableOpacity>
                    <WhiteSpace size="lg"/>
                </WingBlank>
            )
        }
        else {
            return null;
        }
    };

    _header = () => {
        let count = 0;
        for(let i=0;i<this.state.rescuer.length;i++){
            if(this.state.rescuer[i].finish === 0)
                count++;
        }
        //默认发回的第一个是本机号码
        if(this.state.rescuer.length <= 1 || count === 0) {
            return (
                <View>
                    <View style={{height: per*2, backgroundColor: 'rgba(0,0,0,0)'}}/>
                    <WingBlank size="lg">
                        <WhiteSpace size="lg"/>
                        <View style={styles.introText}>
                            <Text style={styles.introTextContent}>我发送了突然昏厥的求救信号</Text>
                            <Text style={styles.introTextContent}>暂时未发现救助人员</Text>
                        </View>
                    </WingBlank>
                </View>
            );
        }
        else {
            return <View style={{height: per*2, backgroundColor: 'rgba(0,0,0,0)'}}/>;
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            number: this.props.navigation.state.params.number,
            navigation: this.props.navigation,
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
                    title: 'Your location'
                },],
            searchText: 'AED',
            setCookie: null,
            rescuer: this.props.navigation.state.params.rescuer,
        };


        this.handleSearchAED = this.handleSearchAED.bind(this);
        this.handleSearchHospital = this.handleSearchHospital.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
    }

    componentWillMount() {
        storage.load({key: 'number'})
            .then((res) => {
                this.state.target = res;
                this.state.number = res;
            })
            .catch((error) => {
                alert(error);
            });
        storage.load({key: 'SetCookie'})
            .then((res) => {
                this.state.setCookie = res;
            })
            .catch((error) => {
                alert(error);
            });

        let transfer_json_to_form = (params) => {
            return qs.stringify(params)
        };
        let text;
        if(this.state.latitude === undefined){
            fetch('http://apis.map.qq.com/ws/coord/v1/translate?locations='+this.props.navigation.state.params.latitude.toLocaleString()+','
                +this.props.navigation.state.params.longitude.toLocaleString()+ '&type=3&key=RL6BZ-VJ6C6-4L2ST-EGUUA-LTB3O-ZFBCO&output=json')
                .then((res) => res.json())
                .then((res) => {
                    if(res.status === 0) {
                        text = {
                            "number": this.props.navigation.state.params.number, "latitude": res.locations[0].lat,
                            "longitude": res.locations[0].lng, "sos": 1, "state": 0,
                        };
                        let data = transfer_json_to_form(text);
                        this.timer = setInterval(() => {
                            fetch('https://www.xiaobenji.net/api/get-help', {
                                method: 'POST',
                                headers: {
                                    'set-cookie': this.state.setCookie,
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                body: data,
                            })
                                .then((res) => {
                                    if (res.status === 200)
                                        res.json().then((result) => {
                                            for (let i = 0; i < result.length; i++) {
                                                fetch('http://api.map.baidu.com/geoconv/v1/?coords=' +result[i].longitude.toLocaleString()
                                                    + ',' + result[i].latitude.toLocaleString() + '&from=3&to=5&ak=R2GE2Dos0neHI4eEb8PwQeRGyGN7MWL7')
                                                    .then((res) => res.json())
                                                    .then((res) => {
                                                        if (res.status === 0) {
                                                            result[i].latitude = res.result[0].y;
                                                            result[i].longitude = res.result[0].x;
                                                        }
                                                    })
                                                    .catch((err) => console.error(err));
                                            }
                                            let temp = [];
                                            let count = 1;
                                            for (let i = 0; i < this.state.markers.length; i++) {
                                                if (this.state.markers[i].title !== 'rescuer')
                                                    temp.push(this.state.markers[i]);
                                                else {
                                                    if (count < result.length) {
                                                        temp.push({
                                                            latitude: result[count].latitude,
                                                            longitude: result[count].longitude,
                                                            title: 'rescuer',
                                                        });
                                                        count++;
                                                    } else {
                                                        temp.push({});
                                                    }
                                                }
                                            }
                                            this.state.markers = temp;
                                            for (; count < result.length; count++) {
                                                this.state.markers = [...this.state.markers, {
                                                    latitude: result[count].latitude,
                                                    longitude: result[count].longitude,
                                                    title: 'rescuer',
                                                }];
                                            }
                                            this.setState({
                                                rescuer: result,
                                                markers: this.state.markers,
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
                        }, 1000 * 5);
                    }
                })
                .catch((err) => console.error(err));
        }else {
            fetch('http://apis.map.qq.com/ws/coord/v1/translate?locations='+this.state.latitude.toLocaleString()+','
                +this.state.longitude.toLocaleString()+ '&type=3&key=RL6BZ-VJ6C6-4L2ST-EGUUA-LTB3O-ZFBCO&output=json')
                .then((res) => res.json())
                .then((res) => {
                    if(res.status === 0){
                        text = {
                            "number": this.state.number, "latitude": res.locations[0].lat, "longitude": res.locations[0].lng,
                            "sos": 1, "state": 0,
                        };
                        let data = transfer_json_to_form(text);
                        this.timer = setInterval(() => {
                            fetch('https://www.xiaobenji.net/api/get-help', {
                                method: 'POST',
                                headers: {
                                    'set-cookie': this.state.setCookie,
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                body: data,
                            })
                                .then((res) => {
                                    if (res.status === 200)
                                        res.json().then((result) => {
                                            for(let i =0;i<result.length;i++) {
                                                fetch('http://api.map.baidu.com/geoconv/v1/?coords='+result[i].longitude.toLocaleString()
                                                    +','+result[i].latitude.toLocaleString()+'&from=3&to=5&ak=R2GE2Dos0neHI4eEb8PwQeRGyGN7MWL7')
                                                    .then((res) => res.json())
                                                    .then((res) => {
                                                        if (res.status === 0) {
                                                            result[i].latitude = res.result[0].y;
                                                            result[i].longitude = res.result[0].x;
                                                        }
                                                    })
                                                    .catch((err) => console.error(err));
                                            }
                                            let temp = [];
                                            let count = 0;
                                            for (let i = 0; i < this.state.markers.length ; i++) {
                                                if (this.state.markers[i].title !== 'rescuer')
                                                    temp.push(this.state.markers[i]);
                                                else {
                                                    if(count<result.length) {
                                                        temp.push({
                                                            latitude: result[count].latitude,
                                                            longitude: result[count].longitude,
                                                            title: 'rescuer',
                                                        });
                                                        count++;
                                                    }else {
                                                        temp.push({});
                                                    }
                                                }
                                            }
                                            this.state.markers = temp;
                                            for (; count < result.length ; count++) {
                                                this.state.markers = [...this.state.markers,{
                                                    latitude: result[count].latitude,
                                                    longitude: result[count].longitude,
                                                    title: 'rescuer',
                                                }];
                                            }
                                            this.setState({
                                                rescuer: result,
                                                markers: this.state.markers,
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
                        }, 1000*5);
                    }
                })
                .catch((err) => console.error(err));

        }

    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    handleSearchAED(event) {
        event.preventDefault();
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
                    this.setState({
                        markers: this.state.markers,
                    })
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
    }

    handleSearchHospital(event) {
        event.preventDefault();
        fetch('http://api.map.baidu.com/place/v2/search?query=医院&location=' + this.state.center.latitude.toLocaleString() +
            ',' + this.state.center.longitude.toLocaleString() + '&radius=2000&output=json&ak=R2GE2Dos0neHI4eEb8PwQeRGyGN7MWL7')
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 0) {
                    for (let i = 0; i < res.results.length; i++) {
                        this.state.markers = [...this.state.markers, {
                            latitude: res.results[i].location.lat,
                            longitude: res.results[i].location.lng,
                            title: 'Hospital'
                        }];
                    }
                    this.setState({
                        markers: this.state.markers,
                    })
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
    }

    handleClear(event){
        event.preventDefault();
        let temp = [];
        for (let i = 0; i < this.state.markers.length ; i++) {
            if (this.state.markers[i].title !== 'AED'&&this.state.markers[i].title !== 'Hospital')
                temp.push(this.state.markers[i]);
        }
        this.setState({
            markers: temp,
        })
    }

    handleFinish(event){
        event.preventDefault();
        storage.save({key: 'help',data: 0});
        storage.save({key: 'sos', data: -1});
        storage.save({key: 'state', data: -1});
        let transfer_json_to_form = (params) => {
            return qs.stringify(params)
        };
        let text1 = {
            "number": this.state.number, "target": this.state.number,
            "phonestate": 0, "state": -1,
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

    render() {
        let data = this.state.rescuer;
        return (
            <View style={styles.container_A}>
                <View style={styles.header}>
                    <Icon.Button style={styles.icon} name="angle-left" backgroundColor="rgb(247,92,47)"
                                 size={per * 30} onPress={() => this.props.navigation.goBack()}/>
                </View>
                <MapView
                    trafficEnabled={this.state.trafficEnabled}
                    baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                    zoom={this.state.zoom}
                    mapType={this.state.mapType}
                    center={this.state.center}
                    marker={this.state.marker}
                    markers={this.state.markers}
                    style={{flex: 0.4}}
                    onMarkerClick={(e) => {
                        console.warn(JSON.stringify(e));
                    }}
                    onMapClick={(e) => {
                    }}/>
                <View style={{flex: 0.01}}/>

                <View style={{flex: 0.05, flexDirection: 'column'}}>
                    <View style={{flex: 0.1, flexDirection: 'row', justifyContent: 'space-around'}}>
                        <TouchableOpacity onPress={this.handleSearchAED.bind(this)} style={styles.btn_askForHelp}>
                            <Text style={styles.btnText_askForHelp}>
                                搜索AED
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.handleSearchHospital.bind(this)} style={styles.btn_askForHelp}>
                            <Text style={styles.btnText_askForHelp}>
                                搜索医院
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.handleClear.bind(this)} style={styles.btn_askForHelp}>
                            <Text style={styles.btnText_askForHelp}>
                                清除搜索
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flex: 0.4 ,}}>
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
                        <TouchableOpacity onPress={this.handleFinish.bind(this)} style={styles.btn_M}>
                            <Text style={styles.btnText_P}>
                                结束求救
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}

export default AskForHelp;