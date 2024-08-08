import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    header: {
        flex: 1,
        marginBottom: 30,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    nextbutton: {
        width: 50,
        height: 50,
        marginVertical: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    modalclose: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalclosewindow: {
        width: '70%',
        height: '20%',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginHorizontal: '15%',
        marginVertical: '40%',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    modalclosetext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalbutton: {
        flexDirection: 'row',
    },
    closesaveback: {
        width: 70,
        height: 40,
        marginRight: 30,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ff7b70',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    closestop: {
        width: 70,
        height: 40,
        marginLeft: 30,
        backgroundColor: '#ff7b70',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    iconimage: {
        width: 50,
        height: 50,
    },
    timeheader: {
        width: 120,
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    timetextheader: {
        marginRight: 15,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    iconclock: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    closebacktimeout: {
        width: 90,
        height: 45,
        backgroundColor: '#ff7b70',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    banner: {
        flex: 10,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionheader: {
        width: '90%',
        paddingHorizontal: '5%',
        paddingVertical: '2%',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    questionText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    answerButton: {
        minWidth: '75%',
        minHeight: 50,
        backgroundColor: '#ffffff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    answerText: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    },
    orangeAnswer: {
        backgroundColor: '#ff8d21',
    },
    correctAnswer: {
        backgroundColor: '#06D001',
    },
    wrongAnswer: {
        backgroundColor: '#C40C0C',
    },
    nextButton: {
        minWidth: '50%',
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#caf0f8',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    nextButtonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    score: {
        marginTop: '10%',
        marginBottom: '25%',
        minWidth: '60%',
        height: 65,
        borderRadius: 35,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: '#f8ed62',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    scoreText: {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#000',
    },
    scorewin: {
        width: '90%',
        height: 100,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    winText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
    },
    help: {
        flex: 2,
        marginTop: 10,
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    helpbutton: {
        width: 60,
        height: 60,
        marginBottom: 40,
        marginHorizontal: 30,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: '#ffbaba',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    buttonUsed: {
        opacity: 0.4,
    },
    helpimage: {
        width: 50,
        height: 50,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 15,
        color: '#000',
        textAlign: 'center',
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: '#ff7b70',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    closeButtonText: {
        color: '#000',
        fontSize: 17,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
    },
    modalText: {
        fontSize: 16,
        marginVertical: 10,
        textAlign: 'center',
        color: '#333',
    },
    barChart: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        width: '100%',
        height: 200,
    },
});

export default styles;