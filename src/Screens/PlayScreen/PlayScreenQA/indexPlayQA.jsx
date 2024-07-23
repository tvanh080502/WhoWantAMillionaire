import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, ImageBackground, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';
import styles from './stylePlayQA';

// Cài đặt danh mục âm thanh
Sound.setCategory('Playback');

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
    const [modalVisible, setModalVisible] = useState(false);
    const [help50, sethelp50] = useState(true);
    const [helpvote, sethelpvote] = useState(true);
    const [helpcallfriend, sethelpcallfriend] = useState(true);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [modalTimeout, setmodalTimeout] = useState(false);
    const [modalWrongAnswer, setmodalWrongAnswer] = useState(false);
    const [sound, setSound] = useState(null); // Trạng thái âm thanh
    const [volume, setVolume] = useState(1); // Trạng thái âm lượng

    // Hàm để tải âm lượng từ AsyncStorage và phát âm thanh
    useFocusEffect(
        useCallback(() => {
            const loadVolume = async () => {
                try {
                    const storedVolume = await AsyncStorage.getItem('appVolume');
                    // Giá trị mặc định là 1
                    setVolume(storedVolume ? parseFloat(storedVolume) : 1); 
                } catch (error) {
                    console.error('Failed to fetch volume:', error);
                }
            };

            loadVolume().then(playSound);

            return () => {
                if (sound) {
                    // Dừng âm thanh và giải phóng tài nguyên khi màn hình không còn hiển thị
                    sound.stop(() => sound.release()); 
                }
            };
        }, [sound, volume])
    );

    useEffect(() => {
        if (seconds > 0 && timerRunning ) {
            const timer = setTimeout(() => {
                setSeconds(seconds - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [seconds, timerRunning]);

    useEffect(() => {
        if (seconds === 0) {
            setmodalTimeout(true);
        }
    }, [seconds]);

    useEffect(() => {
        if (!isAnswerCorrect) {
            setmodalWrongAnswer(true);
        }
    }, [isAnswerCorrect]);

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
                sethelp50(false);
                sethelpcallfriend(false);
                sethelpvote(false);
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
        setmodalTimeout(false);
        const dateTime = getCurrentDateTime();
        saveScore(score, dateTime);
        navigation.navigate('Home');
    };

    const handleWrongAnswer = () => {
        setmodalWrongAnswer(false);
        const dateTime = getCurrentDateTime();
        saveScore(score, dateTime);
        navigation.navigate('Home');
    };

    const handleOpenModalHelp = () => {
        setModalVisible(true);
        settimerRunning(false);
    };

    const handleHelp50 = () => {
        if (help50) {
            sethelp50(false);
            handleOpenModalHelp();
        }
    };
    
    const handleHelpvote = () => {
        if (helpvote) {
            sethelpvote(false);
            handleOpenModalHelp();
        }
    };
    
    const handleHelpcallfriend = () => {
        if (helpcallfriend) {
            sethelpcallfriend(false);
            handleOpenModalHelp();
        }
    };
    
    const handleCloseModalHelp = () => {
        setModalVisible(false);
        settimerRunning(true);
    };

    const handleShowConfirmationModal = () => {
        setConfirmationModalVisible(true);
        settimerRunning(false);
    };
    
    const handleConfirmStopGame = () => {
        const dateTime = getCurrentDateTime();
        saveScore(score, dateTime);
        setConfirmationModalVisible(false);
        navigation.navigate('Home');
    };
    
    const handleCancelStopGame = () => {
        setConfirmationModalVisible(false);
        settimerRunning(true);
    };

    const handleTimeoutStopGame = () => {
        setmodalTimeout(false);
    };
    
    const handleWrongAnswerGame = () => {
        setmodalWrongAnswer(false);
    };

    // Hàm để tải âm thanh và phát nó
    const playSound = async () => {
        const soundPath = require('../../../../assets/sound/sound_playscreenqa.mp3');

        const newSound = new Sound(soundPath, '', (error) => {
            if (error) {
                console.log('Failed to load the sound', error);
                return;
            }
            newSound.setVolume(volume); 
            newSound.setNumberOfLoops(-1); // Lặp lại vô hạn
            newSound.play((success) => {
                if (!success) {
                    console.log('Playback failed due to audio decoding errors');
                }
            });
        });
        setSound(newSound);
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
                onPress={handleShowConfirmationModal}
                >
                    <ImageBackground
                        source={require('../../../../assets/icon/back.png')}
                        style={styles.iconimage}
                    >
                    </ImageBackground>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={confirmationModalVisible}
                    onRequestClose={handleCancelStopGame}
                >
                    <View style={styles.modalclose}>
                        <View style={styles.modalclosewindow}>
                            <Text style={styles.modalclosetext}>Bạn có chắc chắn muốn dừng cuộc chơi không?</Text>
                            <View style={styles.modalbutton}>
                                <TouchableOpacity style={styles.closesaveback} onPress={handleConfirmStopGame}>
                                    <Text style={styles.closeButtonText}>Có</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.closestop} onPress={handleCancelStopGame}>
                                    <Text style={styles.closeButtonText}>Không</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={styles.timeheader}>
                    <Text style={styles.timetextheader}>{seconds}</Text>
                    <ImageBackground
                        source={require('../../../../assets/icon/clock.png')}
                        style={styles.iconclock}
                    >
                    </ImageBackground>
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
                        <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalWrongAnswer}
                        onRequestClose={handleWrongAnswerGame}
                        >
                            <View style={styles.modalclose}>
                                <View style={styles.modalclosewindow}>
                                    <Text style={styles.modalclosetext}>Bạn đã trả lời sai</Text>
                                    <Text style={styles.modalclosetext}>Điểm số của bạn: {score}</Text>
                                    <View style={styles.modalbutton}>
                                        <TouchableOpacity style={styles.closebacktimeout} onPress={handleWrongAnswer}>
                                            <Text style={styles.closeButtonText}>Trở về</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    )
                )}
                {modalTimeout && (
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalTimeout}
                    onRequestClose={handleTimeoutStopGame}
                    >
                        <View style={styles.modalclose}>
                            <View style={styles.modalclosewindow}>
                                <Text style={styles.modalclosetext}>Thời gian đã hết</Text>
                                <Text style={styles.modalclosetext}>Điểm số của bạn: {score}</Text>
                                <View style={styles.modalbutton}>
                                    <TouchableOpacity style={styles.closebacktimeout} onPress={handleTimeout}>
                                        <Text style={styles.closeButtonText}>Trở về</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                )}
                <View style={styles.score}>
                    <Text style={styles.scoreText}>Điểm số: {score}</Text> 
                </View>
            </View>
            <View style={styles.help}>
                <TouchableOpacity 
                    style={[styles.helpbutton, !help50 ? styles.buttonUsed : null]}
                    onPress={handleHelp50}
                    disabled={!help50}
                >
                    <ImageBackground
                    style={styles.helpimage}
                    source={require('../../../../assets/icon/50.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.helpbutton, !helpvote ? styles.buttonUsed : null]}
                    onPress={handleHelpvote}
                    disabled={!helpvote}
                >
                    <ImageBackground
                    style={styles.helpimage}
                    source={require('../../../../assets/icon/voters.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.helpbutton, !helpcallfriend ? styles.buttonUsed : null]}
                    onPress={handleHelpcallfriend}
                    disabled={!helpcallfriend}
                >
                    <ImageBackground
                    style={styles.helpimage}
                    source={require('../../../../assets/icon/call-friend.png')}
                    />
                </TouchableOpacity>
                <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={handleCloseModalHelp}
                    >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Quyền trợ giúp đã hiển thị</Text>
                            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModalHelp}>
                                <Text style={styles.closeButtonText}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

export default PlayQAScreen;
