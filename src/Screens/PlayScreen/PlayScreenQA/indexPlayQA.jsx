import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ImageBackground, Modal, Animated, Alert } from 'react-native';
import Sound from 'react-native-sound';
import styles from './stylePlayQA';
import soundManager from '../../../SoundManager/soundManager';
import VolumeContext from '../../../SoundManager/volumeManager';
import { getQuestion, getCorrectedAnswer, getHelp50, getHelpHall, getHelpCallFriend } from '../../../CallAPI/callAPI';
import PercentageBar from './PercentageBar'; 
import LinearGradient from 'react-native-linear-gradient';

const PlayQAScreen = ({ navigation }) => {
    const [questionData, setQuestionData] = useState(null); // Dữ liệu câu hỏi
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Setup đếm số lượng câu hỏi dã trả lời đúng liên tiếp là 0
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null); // Đahs số thứ tự cho câu hỏi
    const [selectedAnswer, setSelectedAnswer] = useState(null); // Trạng thái có chọn câu hỏi hay không
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false); // Câu trả lời được chọn
    const [score, setScore] = useState(0); // Lưu điểm chơi
    const [seconds, setSeconds] = useState(120); // Thời gian ban cho mỗi câu hỏi
    const [isWinner, setIsWinner] = useState(false); // Trạng thái người chiến thắng
    const [timerRunning, setTimerRunning] = useState(true); // Trạng thái thời gian đếm ngược chạy
    const [modalVisible, setModalVisible] = useState(false); // Trạng thái cửa sổ modal đóng/mở
    const [help50, setHelp50] = useState(true); // Trạng thái chưa sử dụng  50/50
    const [helpvote, setHelpVote] = useState(true); // Trạng thái chưa sử dụng  help hall
    const [helpcallfriend, setHelpCallFriend] = useState(true); // Trạng thái chưa sử dụng call friend
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false); // Trạng thái xác nhận dừng cuộc chơi
    const [modalTimeout, setModalTimeout] = useState(false); // Trạng thái thời gian kết thúc
    const [modalWrongAnswer, setModalWrongAnswer] = useState(false); // Trạng thái mở cửa sổ modal khi trả lời sai
    const [blink, setBlink] = useState(false); // Trạng thái nhấp nháy của đáp án khi lựa chọn
    const [showNextButton, setShowNextButton] = useState(false); // Trạng thái hiển thị button 'Câu hỏi tiếp theo'
    const [answerColor, setAnswerColor] = useState(null); // Trạng thái màu sắc của đáp án được chọn
    const [token, setToken] = useState(null); // Lấy token từ getQuestion
    const [sessionCookie, setSessionCookie] = useState(null); // Lấy session cookie từ getQuestion
    const [hallPercentages, setHallPercentages] = useState([]); // Dữ liệu của help hall trả về
    const [friendAdvice, setFriendAdvice] = useState(null); // Dữ liệu của call friend trả về
    const [stophelp, setstophelp] = useState(false); // Kiểm soát để khi đã chọn đáp án không thẻ chọn quyền trợ giúp

    const fadeAnim = useRef(new Animated.Value(1)).current; //Khởi tạo giá trị hiệu ứng
    const { volume } = useContext(VolumeContext); // Lấy giá trị âm thanh từ setting
    const soundRef = soundManager('playqa_sound'); // Phát âm nhac trên màn hình
    const backgroundSoundRef = useRef(null); // Khởi tạo giá trị âm thanh nền

    useEffect(() => {
        if (soundRef.current) {
            soundRef.current.setVolume(volume);
        }
        backgroundSoundRef.current = soundRef.current;
    }, [volume]);

    useEffect(() => {
        fetchNextQuestion();

        return () => {
            if (backgroundSoundRef.current) {
                backgroundSoundRef.current.stop();
            }
        };
    }, []);

    useEffect(() => {
        if (seconds > 0 && timerRunning) {
            const timer = setTimeout(() => {
                setSeconds(seconds - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [seconds, timerRunning]);

    useEffect(() => {
        if (seconds === 0) {
            setModalTimeout(true);
        }
    }, [seconds]);

    useEffect(() => {
        if (!isAnswerCorrect) {
            setModalWrongAnswer(true);
        }
    }, [isAnswerCorrect]);

    const fetchNextQuestion = async () => {
        try {
            const questionKey = 10;
            const result = await getQuestion(questionKey);

            if (!result || !result.question) {
                throw new Error('Failed to load question data.');
            }

            const { question, token, sessionCookie } = result;
            // console.log('Full Question Data:', question);
            setQuestionData(question);
            setToken(token);
            setSessionCookie(sessionCookie);

            const correctIndex = await getCorrectedAnswer(question, token, sessionCookie);
            // console.log('Response Text:', correctIndex);
            setCorrectAnswerIndex(correctIndex - 1);
        } catch (error) {
            console.error('Error fetching question:', error);
            Alert.alert('Error', 'Failed to load question data.');
        }
    };

    const handleAnswerPress = async (selectedIndex) => {
        if (selectedAnswer === null && seconds > 0) {
            setSelectedAnswer(selectedIndex);
            const isCorrect = selectedIndex === correctAnswerIndex;
            setIsAnswerCorrect(isCorrect);
            setTimerRunning(false);
            setAnswerColor('orange');

            setTimeout(() => {
                if (isCorrect) {
                    playCorrectSound();
                    setAnswerColor(styles.correctAnswer.backgroundColor);
                } else {
                    playWrongSound();
                    setAnswerColor(styles.wrongAnswer.backgroundColor);
                }
                blinkAnswer(isCorrect);
            }, 3000);
        }
    };

    // Hàm lấy giá trị thời gian
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

    const blinkAnswer = (isCorrect) => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]),
            {
                iterations: 4,
            }
        ).start(() => {
            if (isCorrect) {
                if ((currentQuestionIndex + 1) % 5 !== 0) { 
                    setScore((prevScore) => prevScore + 100); // Cộng điểm khi nhấp nháy kết thúc
                } else {
                    setScore((prevScore) => prevScore + 300); // Cộng điểm khi nhấp nháy kết thúc
                }
            }
            setShowNextButton(true);
            if (!isCorrect) {
                setHelp50(false);
                setHelpCallFriend(false);
                setHelpVote(false);
                setTimeout(handleShowWrongAnswerModal, 100);
            }
        });
    };

    const playCorrectSound = () => {
        if (backgroundSoundRef.current) {
            backgroundSoundRef.current.stop();
        }

        const sound = new Sound(require('../../../../assets/sound/sound_correct_answer.mp3'), (error) => {
            if (error) {
                console.error('Error loading correct sound:', error);
                return;
            }
            sound.setVolume(volume);
            sound.play((success) => {
                if (!success) {
                    console.error('Sound playback failed for correct sound');
                }
                sound.release();

                if (backgroundSoundRef.current) {
                    backgroundSoundRef.current.play();
                }
            });
        });
    };

    const playWrongSound = () => {
        if (backgroundSoundRef.current) {
            backgroundSoundRef.current.stop();
        }

        const sound = new Sound(require('../../../../assets/sound/sound_wrong_answer.mp3'), (error) => {
            if (error) {
                console.error('Error loading incorrect sound:', error);
                return;
            }
            sound.setVolume(volume);
            sound.play((success) => {
                if (!success) {
                    console.error('Sound playback failed for wrong sound');
                }
                sound.release();

                if (backgroundSoundRef.current) {
                    backgroundSoundRef.current.play();
                }
            });
        });
    };

    const handleShowWrongAnswerModal = () => {
        setModalWrongAnswer(true);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < 2) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setIsAnswerCorrect(false);
            setTimerRunning(true);
            setSeconds(120);
            setShowNextButton(false);
            fetchNextQuestion();
            }
        else {
            setTimerRunning(false);
            setIsWinner(true);
        }
    };

    const handleTimeout = () => {
        setModalTimeout(false);
        const dateTime = getCurrentDateTime();
        saveScore(score, dateTime);
        navigation.navigate('Home');
    };

    const handleWrongAnswer = () => {
        setModalWrongAnswer(false);
        const dateTime = getCurrentDateTime();
        saveScore(score, dateTime);
        navigation.navigate('Home');
    };

    const handleHelp50 = async () => {
        try {
            const help50Data = await getHelp50(questionData, token);
            if (help50Data) {
                setQuestionData(help50Data);
                setHelp50(false);
                setTimerRunning(false);
                // Alert.alert('50:50 Help', 'The question has been updated with the 50:50 help.');
            } else {
                throw new Error('Failed to get 50:50 help.');
            }
        } catch (error) {
            console.error('[API] getHelp50 error:', error);
            Alert.alert('Error', 'There was a problem with the 50:50 help request. Please try again later.');
        }
    };

    const handleHelpvote = async () => {
        try {
            const helpHallData = await getHelpHall(questionData, token);
            if (helpHallData) {
                setHallPercentages(helpHallData);
                setFriendAdvice(null);
                setModalVisible(true);
                setHelpVote(false);
                setTimerRunning(false);
            } else {
                throw new Error('Failed to get hall help.');
            }
        } catch (error) {
            console.error('[API] getHelpHall failed:', error);
            // Alert.alert('Error', 'There was a problem with the hall help request. Please try again later.');
        }
    };

    const handleHelpcallfriend = async () => {
        try {
            const advice = await getHelpCallFriend(questionData, token);
            if (advice) {
                setFriendAdvice(advice);
                setHallPercentages([]);
                setModalVisible(true);
                setHelpCallFriend(false);
                setTimerRunning(false);
            } else {
                throw new Error('Failed to get call friend help.');
            }
        } catch (error) {
            console.error('[API] getHelpCallFriend failed:', error);
            // Alert.alert('Error', 'There was a problem with the call friend request. Please try again later.');
        }
    };

    const handleCloseModalHelp = () => {
        setModalVisible(false);
        setTimerRunning(true);
    };

    const handleShowConfirmationModal = () => {
        setConfirmationModalVisible(true);
        setTimerRunning(false);
    };
    
    const handleConfirmStopGame = () => {
        const dateTime = getCurrentDateTime();
        saveScore(score, dateTime);
        setConfirmationModalVisible(false);
        navigation.navigate('Home');
    };
    
    const handleCancelStopGame = () => {
        setConfirmationModalVisible(false);
        setTimerRunning(true);
    };

    if (isWinner) {
        return (
            <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.container}
            >
            <View style={styles.container}>
                <View style={styles.scorewin}>
                    <View style={styles.winnercontent}>
                        <Text style={styles.winText}>You won</Text>
                        <ImageBackground
                        source={require('../../../../assets/icon/winner.png')}
                        style={styles.iconwinner}
                        />
                    </View>
                    <Text style={styles.scoreText}>Scores: {score}</Text>
                </View>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => navigation.navigate('Highscore')}
                >
                    <Text style={styles.nextButtonText}>View Ranking</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.nextButtonText}>Return</Text>
                </TouchableOpacity>
                </View>
            </LinearGradient>
        );
    }

    const currentQuestion = questionData;

    if (!currentQuestion) {
        return <Text></Text>;
    }

    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.container}
        >
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
                            <Text style={styles.modalclosetext}>Are you sure you want to stop playing?</Text>
                            <View style={styles.modalbutton}>
                                <TouchableOpacity style={styles.closesaveback} onPress={handleConfirmStopGame}>
                                    <Text style={styles.closeButtonText}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.closestop} onPress={handleCancelStopGame}>
                                    <Text style={styles.closeButtonText}>No</Text>
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
                    <Text style={styles.questionText}>{`Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`}</Text>
                </View>
                {currentQuestion.answers.map((answer, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.answerButton,
                            selectedAnswer === index 
                                ? { backgroundColor: blink ? 'transparent' : answerColor } 
                                : null
                        ]}
                        onPress={() => handleAnswerPress(index)}
                        disabled={selectedAnswer !== null} 
                    >
                        <Animated.View style={{ opacity: selectedAnswer === index ? fadeAnim : 1 }}>
                            <Text style={styles.answerText}>{answer.answer}</Text>
                        </Animated.View>
                    </TouchableOpacity>
                ))}
                {selectedAnswer !== null && (
                    showNextButton ? (
                        isAnswerCorrect ? (
                            <TouchableOpacity
                                style={styles.nextButton}
                                onPress={handleNextQuestion}
                            >
                                <Text style={styles.nextButtonText}>Next Question</Text>
                            </TouchableOpacity>
                        ) : (
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalWrongAnswer}
                                onRequestClose={handleWrongAnswer}
                            >
                                <View style={styles.modalclose}>
                                    <View style={styles.modalclosewindow}>
                                        <Text style={styles.modalclosetext}>You answered wrong</Text>
                                        <Text style={styles.modalclosetext}>Your score: {score}</Text>
                                        <View style={styles.modalbutton}>
                                            <TouchableOpacity style={styles.closebacktimeout} onPress={handleWrongAnswer}>
                                                <Text style={styles.closeButtonText}>Return</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        )
                    ) : null
                )}
                {modalTimeout && (
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalTimeout}
                    onRequestClose={handleTimeout}
                    >
                        <View style={styles.modalclose}>
                            <View style={styles.modalclosewindow}>
                                <Text style={styles.modalclosetext}>Time's up</Text>
                                <Text style={styles.modalclosetext}>Your scores: {score}</Text>
                                <View style={styles.modalbutton}>
                                    <TouchableOpacity style={styles.closebacktimeout} onPress={handleTimeout}>
                                        <Text style={styles.closeButtonText}>Return</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                )}
                <View style={styles.score}>
                    <Text style={styles.scoreText}>Scores: {score}</Text> 
                </View>
            </View>
            <View style={styles.help}>
                <TouchableOpacity 
                    style={[styles.helpbutton, !help50 ? styles.buttonUsed : null]}
                    onPress={handleHelp50}
                    disabled={!help50 || selectedAnswer !== null}
                >
                    <ImageBackground
                    style={styles.helpimage}
                    source={require('../../../../assets/icon/50.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.helpbutton, !helpvote ? styles.buttonUsed : null]}
                    onPress={handleHelpvote}
                    disabled={!helpvote || selectedAnswer !== null}
                >
                    <ImageBackground
                    style={styles.helpimage}
                    source={require('../../../../assets/icon/voters.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.helpbutton, !helpcallfriend ? styles.buttonUsed : null]}
                    onPress={handleHelpcallfriend}
                    disabled={!helpcallfriend || selectedAnswer !== null}
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
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            {friendAdvice ? (
                                <>
                                    <Text style={styles.modalTitle}>Call a Friend</Text>
                                    <Text style={styles.modalText}>{friendAdvice}</Text>
                                </>
                            ) : (
                                <>
                                    <Text style={styles.modalTitle}>Hall Assistance</Text>
                                    <View style={styles.barChart}>
                                        {hallPercentages.map((item, index) => (
                                            <PercentageBar
                                                key={index}
                                                label={item.label}
                                                percent={item.percent}
                                                color="#00b4d8"
                                            />
                                        ))}
                                    </View>
                                </>
                            )}
                            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModalHelp}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
        </LinearGradient>
    );
};

export default PlayQAScreen;
