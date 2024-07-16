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
        width: '80%',
        paddingHorizontal: '10%',
        backgroundColor: '#fff',
    },
    questionText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
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
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default styles;
