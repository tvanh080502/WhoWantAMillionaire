import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ImageBackground, Modal, Animated } from 'react-native';
import Sound from 'react-native-sound';
import styles from './stylePlayQA';
import soundManager from '../../../SoundManager/soundManager';
import VolumeContext from '../../../SoundManager/volumeManager';

const PlayQAScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true); //Trạng thái loading
    const [questions, setQuestions] = useState([]); //Lấy câu hỏi từ api
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Setup đếm số lượng câu hỏi dã trả lời đúng liên tiếp là 0
    const [selectedAnswer, setSelectedAnswer] = useState(null); // Kiểm tra có chọn câu trả lời hay không
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false); //Kiểm tra đúng sai câu trả lời
    const [score, setScore] = useState(0); //Setup số điểm ban đầu là 0
    const [seconds, setSeconds] = useState(120); //Setup thời gian đếm ngược là 120s
    const [isWinner, setIsWinner] = useState(false); //Trạng thái kiểm tra người chiến thắng
    const [timerRunning, settimerRunning] = useState(true); //Trạng thái thời gian đếm ngược chạy
    const [modalVisible, setModalVisible] = useState(false);//Trạng thái dóng mở modal trợ giúp
    const [help50, sethelp50] = useState(true);//Trạng thái sử dụng quyền trợ giúp 50/50
    const [helpvote, sethelpvote] = useState(true);//Trạng thái sử dụng quyền trợ giúp vote
    const [helpcallfriend, sethelpcallfriend] = useState(true); //Trạng thái sử dụng quyền trợ giúp helpcall
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false); //Trạng thái để mở của sổ dừng cuộc chơi
    const [modalTimeout, setmodalTimeout] = useState(false); //Trạng thái kiểm tra hết giờ trả lời câu hỏi
    const [modalWrongAnswer, setmodalWrongAnswer] = useState(false); //Trạng thái khi trả lời sai để đóng mở modal
    const [blink, setBlink] = useState(false); // Trạng thái nhấp nháy đáp án
    const [showNextButton, setShowNextButton] = useState(false); // Trạng thái hiển thị nút "Câu hỏi tiếp theo"
    const [answerColor, setAnswerColor] = useState(null); // Trạng thái màu sắc của đáp án được chọn

    const fadeAnim = useRef(new Animated.Value(1)).current; // Giá trị hoạt ảnh

    // Phát âm thanh
    const { volume } = useContext(VolumeContext)
    const soundRef = soundManager('playqa_sound');
    const backgroundSoundRef = useRef(null);

    useEffect(() => {
        if (soundRef.current) {
            soundRef.current.setVolume(volume);
        }
        // Thiết lập âm thanh nền
        backgroundSoundRef.current = soundRef.current;
    }, [volume]);
    

    // Hook đếm ngược và kiếm tra trạng thái đang chạy của thời gian đếm ngược
    useEffect(() => {
        if (seconds > 0 && timerRunning ) {
            const timer = setTimeout(() => {
                setSeconds(seconds - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [seconds, timerRunning]);

    // Hook kiểm tra thời gian đếm ngược đã hết
    useEffect(() => {
        if (seconds === 0) {
            setmodalTimeout(true);
        }
    }, [seconds]);

    // Hook kiểm tra câu trả lời
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

    // Hàm blinkAnswer để làm nhấp nháy đáp án
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
            setShowNextButton(true); // Hiển thị nút "Câu hỏi tiếp theo" sau khi nhấp nháy kết thúc
            // Hiển thị modal sau khi nhấp nháy kết thúc nếu đáp án sai
            if (!isCorrect) {
                sethelp50(false);
                sethelpcallfriend(false);
                sethelpvote(false);
                setTimeout(handleShowWrongAnswerModal, 500); // Thời gian chờ thêm để chắc chắn nhấp nháy kết thúc
            }
        });
    };
    
    // Hàm playCorrectSound để phát âm thanh đúng
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
    
                // Phát lại âm thanh nền
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
    
                // Phát lại âm thanh nền
                if (backgroundSoundRef.current) {
                    backgroundSoundRef.current.play();
                }
            });
        });
    };
    
    // Hàm kiểm tra các trạng thái khi trả lời câu hỏi
    const handleAnswerPress = (answerId, isCorrect) => {
        if (selectedAnswer === null && seconds > 0) {
            setSelectedAnswer(answerId);
            setIsAnswerCorrect(isCorrect);
            settimerRunning(false);
            setAnswerColor('orange'); 
        
            setTimeout(() => {
                if (isCorrect) {
                    playCorrectSound();
                    setAnswerColor(styles.correctAnswer.backgroundColor); // Đổi màu đáp án thành xanh khi bắt đầu nhấp nháy
                } else {
                    playWrongSound();
                    setAnswerColor(styles.wrongAnswer.backgroundColor); // Đổi màu đáp án thành đỏ khi bắt đầu nhấp nháy
                }
                blinkAnswer(isCorrect);
            }, 3000);
        }
    };

    const handleShowWrongAnswerModal = () => {
        setmodalWrongAnswer(true);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < 14) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setIsAnswerCorrect(false);
            settimerRunning(true);
            setSeconds(120);
            setShowNextButton(false);
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

    // Hàm để mở của sổ khi chọn quyền trợ giúp
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
                            selectedAnswer === answer.id 
                                ? { backgroundColor: blink ? 'transparent' : answerColor } 
                                : null
                        ]}
                        onPress={() => handleAnswerPress(answer.id, answer.isCorrect)}
                        disabled={selectedAnswer !== null} 
                    >
                        <Animated.View style={{ opacity: selectedAnswer === answer.id ? fadeAnim : 2 }}>
                            <Text style={styles.answerText}>{answer.text}</Text>
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
                    ) : null
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
