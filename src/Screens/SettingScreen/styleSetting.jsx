import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#003459',
    },
    header: {
        flex: 1,
        width: '100%',
        flexDirection:'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    iconback: {
        width: 50,
        height: 50,
        marginVertical: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingtext: {
        marginLeft: 20,
        fontSize: 23,
        color: '#fff',
    },
    settingcontent: {
        flex: 2,
        width: '90%',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    soundtext: {
        fontSize: 30,
        fontFamily: 'bold',
        color: '#000',
    },
    soundcontent: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsound: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconsound: {
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    slider: {
        width: '60%',
        height: 30,
    },
    volume: {
        marginLeft: 5,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    volumeText: {
        fontSize: 16,
        color: '#000',
    },
    orther: {
        flex: 10,
    },
});

export default styles;