import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003459',
    },
    header: {
        flexDirection:'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
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
    Rule: {
        marginLeft: 20,
        fontSize: 23,
        color: '#fff',
    },
    textRule: {
        width: '90%',
        height: '90%',
        marginHorizontal: '5%',
    },
    item: {
        marginBottom: 16,
    },
    textheader: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        marginLeft: 20,
        fontSize: 18,
        fontFamily:'bold',
        color: '#fff',
    },
});

export default styles;