import React, { useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VolumeContext from '../../SoundManager/volumeManager';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styleSetting';

const SettingScreen = ({ navigation }) => {
    const { volume, setVolume } = useContext(VolumeContext);

    useEffect(() => {
        const loadVolume = async () => {
            try {
                const savedVolume = await AsyncStorage.getItem('appVolume');
                if (savedVolume !== null) {
                    setVolume(parseFloat(savedVolume));
                }
            } catch (error) {
                console.error('Failed to load volume:', error);
            }
        };
        loadVolume();
    }, [setVolume]);

    const handleVolumeChange = async (value) => {
        setVolume(value);
        try {
            await AsyncStorage.setItem('appVolume', value.toString());
        } catch (error) {
            console.error('Failed to save volume:', error);
        }
    };

    return (
        <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']} 
        style={styles.gradientContainer} 
            >
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.iconback} onPress={() => navigation.navigate('Home')}>
                        <ImageBackground 
                            source={require('../../../assets/icon/back.png')}
                            style={styles.iconback}  
                        />
                    </TouchableOpacity>
                    <Text style={styles.settingtext}>Setting</Text>
                </View>
                <View style={styles.settingcontent}>
                    <Text style={styles.soundtext}>Volume</Text>
                    <View style={styles.soundcontent}>
                        <View style={styles.buttonsound}>
                            <ImageBackground 
                                source={require('../../../assets/icon/sound.png')}
                                style={styles.iconsound}  
                            />
                        </View>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={1}
                            step={0.01}
                            value={volume}
                            onValueChange={handleVolumeChange}
                        />
                        <View style={styles.volume}>
                            <Text style={styles.volumeText}>{Math.round(volume * 100)}%</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.orther}></View>
            </View>
            </LinearGradient>
    );
};

export default SettingScreen;
