/**
 * Created by Aliez on 2018/5/6.
 */
import React,{PropTypes} from 'react';
import {
    View,
    Text,
    TouchableOpacity, Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import storage from './src/Util/Param.js';
import style from "./Style"
import CameraButton from "./CameraButton";

const styles = style;
const per = Dimensions.get('window').width/414;


class UpdateLevel extends React.Component {
    static navigationOptions = {
        title: '上传证书',
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
        }
    }

    async uploadFile(url, params, fileUrl, fileName) {
        let data = new FormData();

        data.append('file', {
            uri: fileUrl,
            name: fileName,
            type: 'image/jpeg'
        });

        Object.keys(params).forEach((key) => {
            if (params[key] instanceof Date) {
                data.append(key, value.toISOString())
            } else {
                data.append(key, String(params[key]))
            }
        });

        return fetch('https://www.xiaobenji.net/api/apply-upgrade', {
            method: 'POST',
            headers: {
                'set-cookie': this.state.setCookie,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data,
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

    }

    uploadImage(params, fileUrl,fileName) {
        return this.uploadFile(`${config.UploadImage}`, params, fileUrl,fileName)
    }

    uploadAvatar(params, fileUrl, fileName) {
        return dispatch=> {
            return this.uploadImage(params, fileUrl, fileName)
                .then(result=> {
                    dispatch({
                        type: UPDATE_AVATAR,
                        path: result.path
                    });
                    return result
                })
        }
    }

    onFileUpload(file, fileName){
        return this.props.uploadAvatar({
            id: this.props.user.ID,
            type:'logo',
            obj:'user',
            corpId: this.props.cropId,
        }, file, fileName)
    }



    render(){
        return (
            <View style={styles.container_C}>
                <View style={styles.header}>
                    <Icon.Button style={styles.icon} name="angle-left" backgroundColor="rgb(247,92,47)"
                                 size={per*30} onPress={() => {
                        this.props.navigation.navigate("ChangeLevel")}}/>
                    <Text style={styles.headerText_P}>上传证书</Text>
                    <Text>     </Text>
                </View>
                <CameraButton style={styles.cameraBtn}
                              photos={[]}
                              onFileUpload={this.onFileUpload} />
            </View>
        )
    }
}

export default UpdateLevel;