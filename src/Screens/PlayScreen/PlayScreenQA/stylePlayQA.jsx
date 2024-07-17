import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#003459',
    },
    questionheader: {
        width: '100%',
        paddingHorizontal: '10%',
        paddingVertical: '2%',
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    questionText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    answerButton: {
        maxWidth: '90%',
        minHeight: 50,
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 25,
        backgroundColor: '#fff',
        width: '100%',
        alignItems: 'center',
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
        width: '60%',
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
        width: '70%',
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
