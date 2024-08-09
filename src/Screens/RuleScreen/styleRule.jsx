import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignItems: 'center',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    iconback: {
        width: 50,
        height: 50,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 25,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    ruleText: {
        marginLeft: 10,
        fontSize: 23,
        color: '#ffffff',
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    textRule: {
        width: '90%',
        marginHorizontal: '5%',
        marginBottom: '8%',
    },
    item: {
        marginBottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light transparent background for items
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    textheader: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: 10,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    text: {
        fontSize: 18,
        color: '#ffffff',
        lineHeight: 24,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});

export default styles;