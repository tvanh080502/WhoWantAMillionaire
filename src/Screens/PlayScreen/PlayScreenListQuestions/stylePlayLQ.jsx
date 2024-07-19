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
    viewlist: {
        flex: 1,
        marginBottom: 20,
    },
    listQ: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    QA: {
        flexDirection: 'row',
        minWidth: '80%',
        height: 50,
        backgroundColor: '#F4A460',
        marginBottom: 20,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textid: {
        fontSize: 25,
        marginHorizontal: 5,
    },
    iconquestion: {
        width: 25,
        height:25,
        borderRadius: 12.5,
    },
});

export default styles;