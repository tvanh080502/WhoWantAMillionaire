import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flex: 1,
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
    textrule: {
        marginLeft: 20,
        fontSize: 25,
        fontFamily: 'bold',
        color: '#000',
    },
    listrank: {
        flex: 10,
        width: '80%',
        marginBottom: 20,
        marginHorizontal: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scoreItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    rank: {
        fontSize: 18,
        fontWeight: 'bold',
        width: 50,
    },
    score: {
        fontSize: 18,
        flex: 1,
    },
    dateTime: {
        fontSize: 14,
        color: '#666',
    },
});
  
  export default styles;