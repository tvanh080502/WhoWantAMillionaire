import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent', 
    },
    header: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
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
        marginLeft: 10,
        fontSize: 23,
        color: '#ffffff',
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
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
        fontWeight: 'bold', // Use fontWeight instead of fontFamily for bold text
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
