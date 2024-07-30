import React, { useState, useEffect } from 'react';
import { ImageBackground, FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from './stylePlayLQ';
import soundManager from '../../../SoundManager/soundManager';

const PlayLQScreen = ({navigation}) => {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    soundManager('playlq_sound');

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
