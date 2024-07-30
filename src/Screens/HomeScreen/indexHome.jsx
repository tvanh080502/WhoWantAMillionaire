import React, { useContext, useEffect } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import styles from "./styleHome";
import soundManager from '../../SoundManager/soundManager';
import VolumeContext from '../../SoundManager/volumeManager';

const HomeScreen = ({ navigation }) => {
    const { volume } = useContext(VolumeContext);
    const soundRef = soundManager('home_sound');

    useEffect(() => {
        // Set the volume when the component mounts
        if (soundRef.current) {
            soundRef.current.setVolume(volume);
        }

        // Cleanup sound when component unmounts
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
    }, [volume]);

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
