import React, { useState, useEffect, useContext } from 'react';
import { ImageBackground, FlatList, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient for gradient backgrounds
import styles from './stylePlayLQ';
import soundManager from '../../../SoundManager/soundManager';
import VolumeContext from '../../../SoundManager/volumeManager';

const PlayLQScreen = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { volume } = useContext(VolumeContext);
    const soundRef = soundManager('playlq_sound');

    useEffect(() => {
        // Khởi tạo danh sách 15 câu hỏi
        const initialQuestions = Array.from({ length: 15 }, (_, index) => ({
            id: index + 1,
            question: `Question ${index + 1}`,
        }));

        setQuestions(initialQuestions);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        return () => {
            if (soundRef.current) {
                soundRef.current.stop(() => {
                    if (soundRef.current) {
                        soundRef.current.release();
                        soundRef.current = null;
                    }
                });
            }
        };
    }, []);

    useEffect(() => {
        if (soundRef.current) {
            soundRef.current.setVolume(volume);
        }
    }, [volume]);

    const renderQuestion = ({ item, index }) => {
        let points = 0;
        for (let i = 0; i < index; i++) {
            points += (i + 1) % 5 === 0 ? 300 : 100;
        }
        points += (index + 1) % 5 === 0 ? 300 : 100;

        return (
            <View key={item.id} style={styles.QA}>
                <Text style={styles.textid}>{`Question ${item.id}`}</Text>
                <ImageBackground
                    source={require('../../../../assets/icon/question.png')}
                    style={styles.iconquestion}
                />
                <Text style={styles.textPoints}>{points}</Text> 
            </View>
        );
    };

    const handlePress = () => {
        setTimeout(() => {
            navigation.navigate('PlayQA');
        }, 500); 
    };

    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.container}
        >
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.nextbutton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <ImageBackground
                        source={require('../../../../assets/icon/back.png')}
                        style={styles.iconimage}
                    />
                </TouchableOpacity>
                <View style={styles.headertext}>
                    <Text style={styles.textheader}>Return</Text>
                    <Text style={styles.textheader}>Start Game</Text>
                </View>
                <TouchableOpacity
                    style={styles.nextbutton}
                    onPress={handlePress}
                >
                    <ImageBackground
                        source={require('../../../../assets/icon/next.png')}
                        style={styles.iconimage}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.viewlist}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#FFF" />
                ) : (
                    <FlatList
                        data={questions}
                        renderItem={renderQuestion}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.listQ}
                    />
                )}
            </View>
        </LinearGradient>
    );
};

export default PlayLQScreen;
