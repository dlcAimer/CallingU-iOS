/**
 * Created by Aliez on 2018/3/28.
 */
import {StyleSheet,Dimensions} from "react-native";
const per = Dimensions.get('window').width/414;

const style = StyleSheet.create({
    container_G: {
        flex: 1,
    },
    container_W: {
        flex: 1,
    },
    container_P: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    container_S: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgb(255, 255, 255)'
    },
    container_F: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgb(255, 255, 255)'
    },
    container_C: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgb(255, 255, 255)'
    },
    container_M: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgb(255, 255, 255)',
    },
    container_M_Body: {
        flex: 0.4,
        flexDirection: 'column',
    },
    container_M2: {
        flex: 0.5,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: per * 60,
        height: per * 60,
        paddingBottom: per * 20,
        paddingRight: per * 10,
    },
    container_M3:{
        flex:0.4,
    },
    container_V: {
        flex: 0.4,
    },
    container_V_Body: {
        alignItems: 'center',
        paddingTop: per * 60,
    },
    container_T: {
        flex: 0.4,
        flexDirection: 'column',
        alignItems: 'center',
    },
    container_CL: {
        flex: 0.4,
        flexDirection: 'column',
        alignItems: 'center',
    },
    container_H: {
        flex: 0.8,
        flexDirection: 'column',
        alignItems: 'center',
    },
    container_A: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    container_initial: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f8ff',
    },
    container_Modal: {
        flex: 1,
        justifyContent: 'center',
        padding: per * 60,
    },
    inner_Modal: {
        borderRadius: 10,
        alignItems: 'center',
    },

    Modal: {
        flex: 0.08,
        alignItems: 'center',
    },

    img_M: {
        paddingLeft: per * 25,
        width: per * 420,
        height: per * 300,
    },

    PreferenceSelectionListExample: {
        flex: 0.8,
    },

    header: {
        flex: 0.08,
        backgroundColor: 'rgb(247,92,47)',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    header_M: {
        flex: 0.08,
        backgroundColor: 'rgb(247,92,47)',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    headerText: {
        fontSize: per * 20,
        color: '#f0f8ff',
        paddingTop: per * 15,
        paddingRight: per * 30,
    },
    headerText_P: {
        fontSize: per * 20,
        color: '#f0f8ff',
        paddingTop: per * 15,
        paddingRight: per * 5,
    },
    headerText_P2: {
        fontSize: per * 20,
        color: '#f0f8ff',
        paddingTop: per * 15,
        paddingRight: per * 10,
    },
    headerText_P3: {
        fontSize: per * 20,
        color: '#f0f8ff',
        paddingTop: per * 15,
        paddingLeft: per * 20,
    },
    headerText_F: {
        fontSize: per * 20,
        color: '#f0f8ff',
        paddingTop: per * 15,
        paddingRight: per * 15,
    },


    icon: {
        paddingTop: per * 20,
        paddingLeft: per * 10,
    },
    icon2: {
        width: per * 60,
        height: per * 60,
    },

    icon4:{
        paddingRight: per*6,
        width:per*25,
        height:per*25,
    },

    stone_G: {
        flex: 1
    },
    stone_W: {
        flex: 6,
    },


    shift_P: {
        paddingLeft: per * 30,
    },

    wrapper: {},
    slide1: {
        flex: 1,
    },
    slide2: {
        flex: 1,
    },
    slide3: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        zIndex: -1,
        alignItems: 'center',
        justifyContent: 'center',
        width: null,
        height: null,
        backgroundColor: 'rgba(0,0,0,0)',
    },


    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    buttonSpace: {
        flex: 0.25,
    },
    btn_G: {
        width: per * 100,
        height: per * 50,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgb(247,92,47)',
        borderRadius: per * 10
    },
    btn_W: {
        width: per * 160,
        height: per * 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgb(247,92,47)',
        borderRadius: per * 10
    },
    btn_P: {
        width: per * 340,
        height: per * 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgb(247,92,47)',
        borderRadius: per * 10
    },
    btn_S: {
        width: per * 340,
        height: per * 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgb(247,92,47)',
        borderRadius: per * 10
    },
    btn_F: {
        width: per * 340,
        height: per * 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgb(247,92,47)',
        borderRadius: per * 10
    },
    btn_C: {
        width: per * 340,
        height: per * 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgb(247,92,47)',
        borderRadius: per * 10
    },
    btn_M: {
        width: per * 340,
        height: per * 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgb(247,92,47)',
        borderRadius: per * 10,
    },
    btn_A1: {
        width: per * 140,
        height: per * 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        borderRadius: per * 10,
    },
    btn_A2: {
        width: per * 50,
        height: per * 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        borderRadius: per * 10,
    },
    btn_H: {
        width: per * 115,
        height: per * 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        borderRadius: per * 10,
    },
    btn_security_code: {
        width: per * 120,
        height: per * 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',

        borderRadius: per * 10
    },
    btn_askForHelp: {
        width: per * 138,
        height: per * 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255,255,255)',
    },
    btnText: {
        fontSize: per * 18
    },
    btnText_askForHelp: {
        fontSize: per * 18,
        color: '#000000',
    },
    btnText_P: {
        fontSize: per * 18,
        color: '#f0f8ff',
    },
    btnText_S: {
        fontSize: per * 18,
        color: '#f0f8ff',
    },
    btnText_F: {
        fontSize: per * 18,
        color: '#f0f8ff',
    },
    btnText_C: {
        fontSize: per * 18,
        color: '#f0f8ff',
    },
    btnText_M: {
        fontSize: per * 18,
        color: '#f08080',
    },
    btnText_M_: {
        fontSize: per * 18,
        color: '#f0f8ff',
    },
    btnText_A: {
        fontSize: per * 22,
        fontWeight: '700',
        color: '#e9967a',
    },
    btnText_V: {
        fontSize: per * 26,
        fontWeight: '700',
        color: '#b22222',
    },
    btnText_H: {
        fontSize: per * 26,
        fontWeight: '700',
        color: '#b22222',
    },
    btnText_security_code: {
        fontSize: per * 14,
        color: '#f0f8ff',
    },

    modal_btn_Container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: per * 10
    },
    modal_btn_Container_QB: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: per * 10
    },

    feedbackText: {
        fontSize: per * 18,
        color: '#f08080',
    },

    preferText1: {
        fontSize: per * 24,
        color: '#000000',
    },
    preferText2: {
        fontSize: per * 16,
        fontWeight: '800',
        color: '#a9a9a9',
    },
    preferText3: {
        fontSize: per * 22,
        fontWeight: '900',
        color: '#000000',
        paddingTop: per * 5,
        paddingLeft: per * 14,
    },
    messageText: {
        fontSize: per * 18,
        fontWeight: '800',
        color: '#a9a9a9',
        paddingTop: per * 10,
        paddingLeft: per * 14,
    },
    versionText: {
        fontSize: per * 24,
        fontWeight: '800',
        color: '#a9a9a9',
    },
    tlistText: {
        width: per * 400,
        fontSize: per * 24,
        lineHeight: per * 30,
        fontWeight: '800',
        color: '#a9a9a9',
        paddingTop: per * 30,
        paddingLeft: per * 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    helpText: {
        fontSize: per * 24,
        fontWeight: '800',
    },
    helpText1: {
        color: '#a9a9a9',
    },
    helpText2: {
        color: '#a22222',
    },
    introText: {
        flex: 0.25,
        flexDirection: 'column',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    cLText1: {
        width: per * 400,
        fontSize: per * 24,
        lineHeight: per * 30,
        fontWeight: '800',
        color: '#483d8b',
        paddingTop: per * 30,
        paddingLeft: per * 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cLText2: {
        width: per * 400,
        fontSize: per * 18,
        lineHeight: per * 15,
        fontWeight: '600',
        color: '#a9a9a9',
        paddingTop: per * 15,
        paddingLeft: per * 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cLText3: {
        width: per * 400,
        fontSize: per * 18,
        lineHeight: per * 15,
        fontWeight: '600',
        color: '#a9a9a9',
        paddingTop: per * 15,
        paddingLeft: per * 160,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cLText4: {
        width: per * 400,
        fontSize: per * 18,
        lineHeight: per * 15,
        fontWeight: '600',
        color: '#a9a9a9',
        paddingTop: per * 15,
        paddingLeft: per * 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    introTextHeader: {
        fontWeight: 'bold',
        fontSize: per * 30,
        paddingLeft: per * 40,
    },
    introTextContent: {
        fontWeight: 'normal',
        fontSize: per * 20,
        paddingTop: per * 15,
        paddingLeft: per * 40,
        paddingRight: per * 40,
        color: 'rgb(144,144,144)',
    },
    PasswordSignInListExample: {
        flex: 0.5
    },
    forgetPassword: {
        width: per * 110,
        height: per * 50,
        justifyContent: 'center',
        paddingTop: per * 15,
        paddingLeft: per * 40,
    },
    forgetPasswordText: {
        fontSize: per * 15,
        color: '#ff69b4',
    },
    reminder: {
        width: per * 400,
        height: per * 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reminderText: {
        fontSize: 15,
        color: 'rgb(144,144,144)',
    },
    information: {
        fontSize: per * 15,
        color: '#ff69b4',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: per * 10,
    },
    modal_Text_1: {
        fontSize: per * 15,
    },
    modal_Text_2: {
        paddingTop: per * 10,
        fontSize: per * 15,
    },

    ContactListExample: {
        flex: 0.08,
        flexDirection: 'column',
        backgroundColor: '#dcdcdc',
    },
    MessageExample: {
        flex: 0.5,
        flexDirection: 'column',
        backgroundColor: 'rgb(255,255,255)',
    },

    watermakeContainer: {
        flex: 0.25,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: per * 15,
    },
    watermake: {
        fontSize: per * 15,
        color: 'rgb(144,144,144)',
    },

    preferText6: {
        paddingLeft: per * 12,
        paddingTop: per * 9,
    },
    preferText4: {
        fontSize: per * 24,
        fontWeight: '800',
        color: '#000000',
    },
    preferText5: {
        fontSize: per * 24,
        fontWeight: '800',
        color: '#a9a9a9',
    },

    contactEditListExample:{
        flex:0.5,
    },
    contentStyle: {
        borderRadius: per*100,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
});

export default style;