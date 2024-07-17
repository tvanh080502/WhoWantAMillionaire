import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import styles from './styleHighscore';

const HighscoreScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        fetchScores();
    }, []);

    const fetchScores = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3000/api/scores');
            const json = await response.json();
            setScores(json);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching scores:', error);
        }
    };

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bảng xếp hạng</Text>
            <FlatList
                data={scores}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.scoreItem}>
                        <Text style={styles.rank}>{index + 1}</Text>
                        <Text style={styles.score}>Điểm: {item.score}</Text>
                        <Text style={styles.dateTime}>{item.dateTime}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default HighscoreScreen;
