import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styleHighscore';
import { fetchScores } from './callapiHighscore'; 

const HighscoreScreen = ({ navigation }) => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const loadScores = async () => {
            const scoresArray = await fetchScores();
            setScores(scoresArray);
        };

        loadScores();
    }, []);

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
                        ListEmptyComponent={
                            <Text style={styles.noDataText}></Text>
                        }
                    />
                </View>
            </View>
        </LinearGradient>
    );
};

export default HighscoreScreen;
