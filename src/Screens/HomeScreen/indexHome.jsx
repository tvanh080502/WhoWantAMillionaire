import React, { useState, useCallback } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import Sound from 'react-native-sound';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styleHome";

// Cài đặt danh mục âm thanh
Sound.setCategory('Playback');

const HomeScreen = ({ navigation }) => {
    const [sound, setSound] = useState(null); // Trạng thái âm thanh
    const [volume, setVolume] = useState(1); // Trạng thái âm lượng

    // Hàm để tải âm thanh và phát nó
    const playSound = async () => {
        const soundPath = require('../../../assets/sound/sound_homescreen.mp3');

        const newSound = new Sound(soundPath, '', (error) => {
            if (error) {
                console.log('Failed to load the sound', error);
                return;
            }
            newSound.setVolume(volume); 
            newSound.setNumberOfLoops(-1); // Lặp lại vô hạn
            newSound.play((success) => {
                if (!success) {
                    console.log('Playback failed due to audio decoding errors');
                }
            });
        });
        setSound(newSound);
    };

    // Hàm để tải âm lượng từ AsyncStorage và phát âm thanh
    useFocusEffect(
        useCallback(() => {
            const loadVolume = async () => {
                try {
                    const storedVolume = await AsyncStorage.getItem('appVolume');
                    // Giá trị mặc định là 1
                    setVolume(storedVolume ? parseFloat(storedVolume) : 1); 
                } catch (error) {
                    console.error('Failed to fetch volume:', error);
                }
            };

            loadVolume().then(playSound);

            return () => {
                if (sound) {
                    // Dừng âm thanh và giải phóng tài nguyên khi màn hình không còn hiển thị
                    sound.stop(() => sound.release()); 
                }
            };
        }, [sound, volume])
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ImageBackground 
                    source={require('../../../assets/image/ALTP_LOGO.png')}
                    style={styles.image}
                />
            </View>
            <View style={styles.listchoice}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('PlayLQ')}
                >
                    <Text style={styles.textbutton}>PLAY</Text>
                    <ImageBackground 
                        source={require('../../../assets/icon/play.png')}
                        style={styles.icon}  
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Highscore')}>
                    <Text style={styles.textbutton}>HIGH SCORE</Text>
                    <ImageBackground 
                        source={require('../../../assets/icon/bar-chart.png')}
                        style={styles.icon}  
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Rule')}>
                    <Text style={styles.textbutton}>RULE</Text>
                    <ImageBackground 
                        source={require('../../../assets/icon/rule-gaming.png')}
                        style={styles.icon}  
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Setting')}>
                    <Text style={styles.textbutton}>SETTING</Text>
                    <ImageBackground 
                        source={require('../../../assets/icon/settings.png')}
                        style={styles.icon}  
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeScreen;
