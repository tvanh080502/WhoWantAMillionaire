import { StyleSheet } from "react-native"

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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headertext: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconimage: {
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
    textheader: {
        fontSize: 23,
        color: '#fff',
    },
    listQ: {
        flex: 1,
    },
    QA: {
        width: '80%',
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'red',
        marginHorizontal: '10%',
        marginVertical: 10,
    }
});

export default styles;