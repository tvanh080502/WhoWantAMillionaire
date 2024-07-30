import React, { useCallback, useRef } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import Sound from 'react-native-sound';
import { useFocusEffect } from '@react-navigation/native';
import styles from "./styleHome";

const HomeScreen = ({ navigation }) => {

    const soundRef = useRef(null);

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
            const sound = new Sound(require('../../../assets/sound/sound_homescreen.mp3'), (error) => {
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
