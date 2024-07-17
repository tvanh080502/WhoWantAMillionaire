import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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