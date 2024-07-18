import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, ImageBackground } from 'react-native';
import styles from './stylePlayQA';

const PlayQAScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [score, setScore] = useState(0); 
    const [seconds, setSeconds] = useState(120);
    const [isWinner, setIsWinner] = useState(false);
    const [timerRunning, settimerRunning] = useState(true);

    useEffect(() => {
        if (seconds > 0 && timerRunning ) {
            const timer = setTimeout(() => {
                setSeconds(seconds - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [seconds]);

    useEffect(() => {
        if (seconds === 0) {
          handleTimeout();
        }
      }, [seconds]);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3000/api/questions');
            const text = await response.text();
            console.log('Response text:', text);

            const json = JSON.parse(text);
            setQuestions(json);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const getCurrentDateTime = () => {
        const current = new Date();
        return `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
    };

    const saveScore = async (score, dateTime) => {
        try {
            const response = await fetch('http://10.0.2.2:3000/api/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ score, dateTime }),
            });

            const result = await response.json();
            console.log('Score saved:', result);
        } catch (error) {
            console.error('Error saving score:', error);
        }
    };

    const handleAnswerPress = (answerId, isCorrect) => {
        if (selectedAnswer === null && seconds > 0) {
            setSelectedAnswer(answerId);
            setIsAnswerCorrect(isCorrect);
            settimerRunning(false);
            if (isCorrect) {
                setScore(score + 100);  
            } else {
                const dateTime = getCurrentDateTime();
                saveScore(score, dateTime);
                Alert.alert('Bạn đã trả lời sai!', `Điểm số của bạn: ${score}`);
            }
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < 14) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setIsAnswerCorrect(false);
            settimerRunning(true);
            setSeconds(120);
        }
        else {
            settimerRunning(false);
            setIsWinner(true);
        }
    };

    const handleTimeout = () => {
        const dateTime = getCurrentDateTime();
        saveScore(score, dateTime);
        Alert.alert('Thời gian trả lời đã hết', `Điểm số của bạn: ${score}`);
    };

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (isWinner) {
        const dateTime = getCurrentDateTime();
        saveScore(score, dateTime);
        return (
            <View style={styles.container}>
                <View style={styles.scorewin}>
                    <Text style={styles.winText}>Bạn đã chiến thắng!</Text>
                    <Text style={styles.scoreText}>Điểm số: {score}</Text>
                </View>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => navigation.navigate('Highscore')}
                >
                    <Text style={styles.nextButtonText}>Xem bảng xếp hạng</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.nextButtonText}>Trở về</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) {
        return <Text>No questions available</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                style={styles.nextbutton}
                onPress={() => navigation.navigate('PlayLQ')}>
                    <ImageBackground
                        source={require('../../../../assets/icon/back.png')}
                        style={styles.iconimage}
                    >
                    </ImageBackground>
                </TouchableOpacity>
                <View style={styles.timeheader}>
                    <Text style={styles.timetextheader}>{seconds}</Text>
                </View>
            </View> 
            <View style={styles.banner}>
                <View style={styles.questionheader}>
                    <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
                </View>
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
                            <Text style={styles.nextButtonText}>Câu hỏi tiếp theo</Text>
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
                {seconds === 0 && (
                    <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => navigation.navigate('Home')} 
                    >
                        <Text style={styles.nextButtonText}>Trở về</Text>
                    </TouchableOpacity>
                )}
                <View style={styles.score}>
                    <Text style={styles.scoreText}>Điểm số: {score}</Text> 
                </View>
            </View>
        </View>
    );
};

export default PlayQAScreen;
