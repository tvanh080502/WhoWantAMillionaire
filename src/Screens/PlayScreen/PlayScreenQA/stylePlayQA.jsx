import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#003459',
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
    },
    iconimage: {
        width: 50,
        height: 50,
    },
    timeheader: {
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timetextheader: {
        fontSize: 20,
        fontFamily: 'bold',
    },
    banner: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionheader: {
        width: '90%',
        paddingHorizontal: '10%',
        paddingVertical: '2%',
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    questionText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    answerButton: {
        minWidth: '75%',
        minHeight: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    answerText: {
        fontSize: 18,
        color: '#333',
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
        paddingVertical:10,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButtonText: {
        color: 'black',
        fontSize: 18,
    },
    score: {
        marginTop: '20%',
        marginBottom: '25%',
        minWidth: '60%',
        height: 70,
        borderRadius: 35,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: '#fff',
        justifyContent:'center',
        alignItems: 'center'
    },
    scoreText: {
        fontSize: 27,
        fontFamily: 'bold',
    },
    scorewin: {
        width: '90%',
        height: 100,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    winText: {
        fontSize:30,
        fontFamily: 'bold',
    },
});

export default styles;
