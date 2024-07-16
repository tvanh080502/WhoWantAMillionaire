import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './stylePlayQA';

const PlayQAScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3000/api/questions'); // Đúng endpoint
            const text = await response.text();  // Fetch as text first
            console.log('Response text:', text);  // Log the raw response text

            const json = JSON.parse(text);
            setQuestions(json);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleAnswerPress = (answerId, isCorrect) => {
        if (selectedAnswer === null) {
            setSelectedAnswer(answerId);
            setIsAnswerCorrect(isCorrect);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setIsAnswerCorrect(false);
        }
    };

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) {
        return <Text>No questions available</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
            {currentQuestion.answers.map((answer) => (
                <TouchableOpacity
                    key={answer.id}
                    style={[
                        styles.answerButton,
                        selectedAnswer === answer.id ? (answer.isCorrect ? styles.correctAnswer : styles.wrongAnswer) : null
                    ]}
                    onPress={() => handleAnswerPress(answer.id, answer.isCorrect)}
                    disabled={selectedAnswer !== null} 
                >
                    <Text style={styles.answerText}>{answer.text}</Text>
                </TouchableOpacity>
            ))}
            {selectedAnswer !== null && (
                isAnswerCorrect ? (
                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={handleNextQuestion}
                    >
                        <Text style={styles.nextButtonText}>Next Question</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={() => navigation.navigate('Home')} 
                    >
                        <Text style={styles.nextButtonText}>Trở về</Text>
                    </TouchableOpacity>
                )
            )}
        </View>
    );
};

export default PlayQAScreen;



