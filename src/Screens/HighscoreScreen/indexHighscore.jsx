import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styleHighscore';
import database from '@react-native-firebase/database';

const HighscoreScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        fetchScores();
    }, []);

    const fetchScores = async () => {
        try {
            // Lấy dữ liệu từ Firebase Realtime Database
            const snapshot = await database().ref('/scores').once('value');
            const data = snapshot.val();

            // Chuyển đổi dữ liệu từ đối tượng thành mảng và sắp xếp theo điểm số
            const scoresArray = data
                ? Object.keys(data).map(key => ({
                      ...data[key],
                      id: key,
                  }))
                : [];
            const sortedScores = scoresArray.sort((a, b) => b.score - a.score).slice(0, 50);

            setScores(sortedScores);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching scores:', error);
        }
    };

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.gradient}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.iconBack} onPress={() => navigation.navigate('Home')}>
                        <ImageBackground
                            source={require('../../../assets/icon/back.png')}
                            style={styles.iconBack}
                        />
                    </TouchableOpacity>
                    <Text style={styles.textRule}>Rankings</Text>
                </View>
                <View style={styles.listRank}>
                    <FlatList
                        data={scores}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.scoreItem}>
                                <Text style={styles.rank}>{index + 1}</Text>
                                <View style={styles.scoreDetails}>
                                    <Text style={styles.score}>Score: {item.score}</Text>
                                    <Text style={styles.dateTime}>Date: {new Date(item.dateTime).toLocaleDateString()}</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        </LinearGradient>
    );
};

export default HighscoreScreen;
