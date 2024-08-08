import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ImageBackground, Modal, Animated, Alert } from 'react-native';
import Sound from 'react-native-sound';
import styles from './stylePlayQA';
import soundManager from '../../../SoundManager/soundManager';
import VolumeContext from '../../../SoundManager/volumeManager';
import { getQuestion, getCorrectedAnswer, getHelp50, getHelpHall, getHelpCallFriend } from '../../../CallAPI/callAPI';
import PercentageBar from './PercentageBar'; 

const PlayQAScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true); //Trạng thái loading
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
            console.log('Full Question Data:', question);
            setQuestionData(question);
            setToken(token);
            setSessionCookie(sessionCookie);

            const correctIndex = await getCorrectedAnswer(question, token, sessionCookie);
            // console.log('Response Text:', correctIndex);
            setCorrectAnswerIndex(correctIndex - 1);
            setIsLoading(false);
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
                setTimeout(handleShowWrongAnswerModal, 500);
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
        if (currentQuestionIndex < 14) {
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
        navigation.navigate('Home');
    };

    const handleWrongAnswer = () => {
        setModalWrongAnswer(false);
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

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (isWinner) {
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

    const currentQuestion = questionData;

    if (!currentQuestion) {
        return <Text>No questions available</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                style={styles.nextbutton}
                onPress={() => setConfirmationModalVisible(true)}
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
                    onRequestClose={() => setConfirmationModalVisible(false)}
                >
                    <View style={styles.modalclose}>
                        <View style={styles.modalclosewindow}>
                            <Text style={styles.modalclosetext}>Bạn có chắc chắn muốn dừng cuộc chơi không?</Text>
                            <View style={styles.modalbutton}>
                                <TouchableOpacity style={styles.closesaveback} onPress={() => navigation.navigate('Home')}>
                                    <Text style={styles.closeButtonText}>Có</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.closestop} onPress={() => setConfirmationModalVisible(false)}>
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
                                <Text style={styles.nextButtonText}>Câu hỏi tiếp theo</Text>
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
    );
};

export default PlayQAScreen;
