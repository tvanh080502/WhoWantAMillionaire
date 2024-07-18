import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './styleHighscore';

const HighscoreScreen = ({navigation}) => {
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
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconback} onPress={() => navigation.navigate('Home')}>
                    <ImageBackground 
                        source={require('../../../assets/icon/back.png')}
                        style={styles.iconback}  
                    />
                </TouchableOpacity>
                <Text style={styles.textrule}>Bảng xếp hạng</Text>
            </View>
            <View style={styles.listrank}>
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
                >
                </FlatList>
            </View>
        </View>
    );
};

export default HighscoreScreen;
