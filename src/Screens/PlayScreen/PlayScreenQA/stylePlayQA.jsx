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
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#fff',
        width: '100%',
        alignItems: 'center',
    },
    answerText: {
        fontSize: 18,
        color: '#333',
    },
    correctAnswer: {
        backgroundColor: 'green',
    },
    wrongAnswer: {
        backgroundColor: 'red',
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
});

export default styles;
