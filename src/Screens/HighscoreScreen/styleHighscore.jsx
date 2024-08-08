import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    iconBack: {
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
    textRule: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    listRank: {
        flex: 10,
        paddingHorizontal: 25,
        marginBottom: 20,
    },
    scoreItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    rank: {
        width: '12%',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFD700', 
        marginRight: 15,
    },
    scoreDetails: {
        flex: 1,
    },
    score: {
        width: '33%',
        fontSize: 16,
        color: '#fff',
    },
    dateTime: {
        width: '55%',
        fontSize: 14,
        color: '#ccc',
    },
});

export default styles;