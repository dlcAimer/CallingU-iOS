import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
    RefreshControl
} from 'react-native';
import { Card, WingBlank, WhiteSpace, List } from 'antd-mobile';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from "./Style";
import qs from 'qs';
import storage from "./src/Util/Param";

const styles = style;
const per = Dimensions.get('window').width/414;


class HelpList extends React.Component{
    static navigationOptions = {
        title: '呼救信息',
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            navigation: this.props.navigation,
            setCookie: null,
            number: this.props.navigation.state.params.number,
            longitude: this.props.navigation.state.params.longitude,
            latitude: this.props.navigation.state.params.latitude,
            helpList: [],
        };

    }

    _flatList;

    reloadDate = () => {
        let transfer_json_to_form = (params) => {
            return qs.stringify(params)
        };
        fetch('http://apis.map.qq.com/ws/coord/v1/translate?locations='+this.state.latitude.toLocaleString()+','
            +this.state.longitude.toLocaleString()+ '&type=3&key=RL6BZ-VJ6C6-4L2ST-EGUUA-LTB3O-ZFBCO&output=json')
            .then((res) => res.json())
            .then((res) => {
                if(res.status === 0){
                    let text = {
                        "number": this.state.number, "latitude": res.locations[0].latitude,
                        "longitude": res.locations[0].longitude,
                    };
                    let data = transfer_json_to_form(text);
                    // this.timer = setInterval(() => {
                        fetch('https://www.xiaobenji.net/api/get-all', {
                            method: 'POST',
                            headers: {
                                'set-cookie': this.state.setCookie,
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: data,
                        })
                            .then((res) => {
                                if (res.status === 200) {
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
                                        this.setState({
                                            helpList: result,
                                        });
                                    })
                                }
                                else if (res.status === 203)
                                    return Promise.reject("未知错误");
                                else if (res.status === 400)
                                    return Promise.reject("请求失败");
                                else if (res.status === 500)
                                    return Promise.reject("服务器错误");
                            })
                            .catch((err) => console.error(err));
                    // }, 1000);
                }
            })
            .catch((err) => console.error(err));
    };

    _renderItem = (item) => {

        let phoneNumber = item.item.number;
        let sos = item.item.sos;
        let latitude2 = item.item.latitude;
        let longitude2 = item.item.longitude;
        let plaintext = item.item.plaintext;
        let state = item.item.state;
        let wrong = item.item.wrong;
        let finish = item.item.finish;

        //此处测算距离有问题，使用的是百度自己的单位制
        let radLat1 = this.state.latitude * Math.PI/180.0;
        let radLat2 = latitude2 * Math.PI/180.0;
        let a = radLat1 - radLat2;
        let b = this.state.longitude * Math.PI / 180.0 - longitude2 * Math.PI / 180.0;
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137;
        s = Math.round(s * 10000) / 10000;
        //单位是km

        if(sos === 1 && finish === 0 && wrong === 0 && state === 0
            // && s <= 5
        ) {
            return (
                <WingBlank size="lg">
                    <WhiteSpace size="lg"/>
                    <TouchableOpacity style={{
                        flex: 0.18, backgroundColor: 'rgb(255,255,255)',
                        flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'
                    }} onPress={() => this.state.navigation.navigate('HelpDetail',
                        {number: this.state.number,target: phoneNumber,latitude: this.state.latitude,longitude: this.state.longitude})}>
                        <Icon name="location-arrow" backgroundColor="rgb(255,255,255)"
                              size={per * 50}>
                            <View style={{flexDirection: 'column',justifyContent: 'space-around',alignItems: 'center'}}>
                                <Text style={{fontSize: 20}}>求救者：{phoneNumber}     |详情></Text>
                                {/*<Text style={{fontSize: 15}}>距离：{s}km   求救原因：{plaintext}</Text>*/}
                            </View>
                        </Icon>
                    </TouchableOpacity>
                    <WhiteSpace size="lg"/>
                </WingBlank>
            )
        }
        else{
            return <View style={{height: 0}}/>;
        }

    };

    _header = () => {
        if(this.state.helpList.length < 1) {
            return (
                <View>
                    <View style={{height: per*2, backgroundColor: 'rgba(0,0,0,0)'}}/>
                    <WingBlank size="lg">
                        <WhiteSpace size="lg"/>
                        <View style={styles.introText}>
                            <Text style={styles.introTextContent}>            暂无附近人员发起求救</Text>
                        </View>
                    </WingBlank>
                </View>
            );
        }
        else {
            return <View style={{height: per*2, backgroundColor: 'rgba(0,0,0,0)'}}/>;
        }
    };

    componentWillMount() {

        storage.load({key:'SetCookie'})
            .then((res) => {
                this.state.setCookie = res;
            })
            .catch((error) => {
                alert(error);
            });

        let transfer_json_to_form = (params) => {
            return qs.stringify(params)
        };
        fetch('http://apis.map.qq.com/ws/coord/v1/translate?locations='+this.state.latitude.toLocaleString()+','
            +this.state.longitude.toLocaleString()+ '&type=3&key=RL6BZ-VJ6C6-4L2ST-EGUUA-LTB3O-ZFBCO&output=json')
            .then((res) => res.json())
            .then((res) => {
                if(res.status === 0){
                    let text = {
                        "number": this.state.number, "latitude": res.locations[0].latitude,
                        "longitude": res.locations[0].longitude,
                    };
                    let data = transfer_json_to_form(text);
                    // this.timer = setInterval(() => {
                        fetch('https://www.xiaobenji.net/api/get-all', {
                            method: 'POST',
                            headers: {
                                'set-cookie': this.state.setCookie,
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: data,
                        })
                            .then((res) => {
                                if (res.status === 200) {
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
                                        this.setState({
                                            helpList: result,
                                        });
                                    })
                                }
                                else if (res.status === 203)
                                    return Promise.reject("未知错误");
                                else if (res.status === 400)
                                    return Promise.reject("请求失败");
                                else if (res.status === 500)
                                    return Promise.reject("服务器错误");
                            })
                            .catch((err) => console.error(err));
                    // }, 1000);
                }
            })
            .catch((err) => console.error(err));
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    render(){
        let data = this.state.helpList;
        return(
            <View style={styles.container_P}>
                <View style={styles.header}>
                    <Icon.Button style={styles.icon} name="angle-left" backgroundColor="rgb(247,92,47)"
                                 size={30} onPress={() => this.props.navigation.goBack()}/>
                    <Text style={styles.headerText_P}>呼救信息列表</Text>
                    <Text/>
                </View>
                <View style={{flex: 0.8,}}>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.reloadDate.bind(this)}
                            />}
                        ref={(flatList) => this._flatList = flatList}
                        renderItem={this._renderItem}
                        ListHeaderComponent={this._header}
                        keyExtractor={(item, index) => index.toString()}
                        data={data}>
                    </FlatList>
                </View>
            </View>
        );
    }
}

export default HelpList;