import React, { useState, useEffect, useCallback } from 'react';
import { ImageBackground, FlatList, Text, TouchableOpacity, View } from 'react-native';
import Sound from 'react-native-sound';
import { useFocusEffect } from '@react-navigation/native';
import styles from './stylePlayLQ';

const PlayLQScreen = ({navigation}) => {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const soundRef = React.useRef(null);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3000/api/questions');
            const text = await response.text();
            console.log('Response text:', text);

            const json = JSON.parse(text);
            setQuestions(json.slice(0, 15));
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            playSound();

            return () => {
                if (soundRef.current) {
                    soundRef.current.stop(() => {
                        soundRef.current.release();
                        soundRef.current = null;
                    });
                }
            };
        }, [])
    );

    const playSound = () => {
        if (soundRef.current) {
            soundRef.current.play((success) => {
                if (!success) {
                    console.error('Sound playback failed');
                    soundRef.current.reset();
                    playSound();
                }
            });
        } else {
            const sound = new Sound(require('../../../../assets/sound/sound_homescreen.mp3'), (error) => {
                if (error) {
                    console.error('Error loading sound:', error);
                    return;
                }
                sound.setNumberOfLoops(-1);
                soundRef.current = sound;
                sound.play((success) => {
                    if (!success) {
                        console.error('Sound playback failed');
                    }
                });
            });
        }
    };

    const renderQuestion = ({ item, index }) => {
        const points = (index + 1) * 100;
        return (
            <View key={item.id} style={styles.QA}>
                <Text style={styles.textid}>{item.id}</Text>
                <ImageBackground
                    source={require('../../../../assets/icon/question.png')}
                    style={styles.iconquestion}
                >
                </ImageBackground>
                <Text style={styles.textid}>{points}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                style={styles.nextbutton}
                onPress={() => navigation.navigate('Home')}>
                    <ImageBackground
                        source={require('../../../../assets/icon/back.png')}
                        style={styles.iconimage}
                    >
                    </ImageBackground>
                </TouchableOpacity>
                <View style={styles.headertext}> 
                    <Text style={styles.textheader}>Trở về</Text>
                    <Text style={styles.textheader}>Bắt đầu</Text>
                </View>
                <TouchableOpacity 
                style={styles.nextbutton}
                onPress={() => navigation.navigate('PlayQA')}>
                    <ImageBackground
                        source={require('../../../../assets/icon/next.png')}
                        style={styles.iconimage}
                    >
                    </ImageBackground>
                </TouchableOpacity>
            </View> 
            <View style={styles.viewlist}>
                {isLoading ? (
                    <Text>Đang tải câu hỏi...</Text>
                ) : (
                    <FlatList
                        data={questions}
                        renderItem={renderQuestion}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.listQ}
                    />
                )}
            </View>
        </View>
    );
}

export default PlayLQScreen;
