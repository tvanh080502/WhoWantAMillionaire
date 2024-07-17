import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003459',
    },
    header: {
        marginTop: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listchoice: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        width: '60%',
        height: 70,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 35,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textbutton: {
        fontSize: 23,
        fontWeight: 'bold',
    },
    icon: {
        marginLeft: 10,
        paddingHorizontal: 20,
        width: 30,
        height:30,
    },
});

export default styles;