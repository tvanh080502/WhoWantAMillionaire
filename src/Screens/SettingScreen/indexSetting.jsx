import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styleSetting';

const SettingScreen = ({ navigation }) => {
    const [volume, setVolume] = useState(1);

    const handleVolumeChange = async (value) => {
        setVolume(value);
        try {
            await AsyncStorage.setItem('appVolume', value.toString());
        } catch (error) {
            console.error('Failed to save volume:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconback} onPress={() => navigation.navigate('Home')}>
                    <ImageBackground 
                        source={require('../../../assets/icon/back.png')}
                        style={styles.iconback}  
                    />
                </TouchableOpacity>
                <Text style={styles.settingtext}>Cài đặt</Text>
            </View>
            <View style={styles.settingcontent}>
                <Text style={styles.soundtext}>Âm lượng</Text>
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
    );
};

export default SettingScreen;
