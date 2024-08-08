import React, { useState, useEffect, useContext } from 'react';
import { ImageBackground, FlatList, Text, TouchableOpacity, View } from 'react-native';
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
                <Text style={styles.textid}>{points}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
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
                    <Text style={styles.textheader}>Trở về</Text>
                    <Text style={styles.textheader}>Bắt đầu</Text>
                </View>
                <TouchableOpacity
                    style={styles.nextbutton}
                    onPress={() => navigation.navigate('PlayQA')}
                >
                    <ImageBackground
                        source={require('../../../../assets/icon/next.png')}
                        style={styles.iconimage}
                    />
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
