import React, { useEffect } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Sound from 'react-native-sound';
import { useFocusEffect } from '@react-navigation/native';
import styles from "./styleHome";

// Cài đặt danh mục âm thanh
Sound.setCategory('Playback');

const HomeScreen = ({ navigation }) => {
    // Đối tượng âm thanh sẽ được sử dụng
    let sound; 

    // Hàm để phát âm thanh
    const playSound = (soundFileName) => {
        sound = new Sound(soundFileName, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Failed to load the sound', error);
                return;
            }
            sound.play((success) => {
                if (!success) {
                    console.log('Playback failed due to audio decoding errors');
                }
            });
        });
    };

    useFocusEffect(
        React.useCallback(() => {
            // Đặt tên file âm thanh cho màn hình chính
            playSound('sound_homescreen.mp3'); 

            return () => {
                if (sound) {
                    // Dừng âm thanh và giải phóng tài nguyên khi màn hình không còn hiển thị
                    sound.stop(() => sound.release()); 
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
                    onPress={() => {
                        navigation.navigate('PlayLQ');
                    }}
                >
                    <Text style={styles.textbutton}>PLAY</Text>
                    <ImageBackground 
                        source={require('../../../assets/icon/play.png')}
                        style={styles.icon}  
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.navigate('Highscore');
                }}>
                    <Text style={styles.textbutton}>HIGH SCORE</Text>
                    <ImageBackground 
                        source={require('../../../assets/icon/bar-chart.png')}
                        style={styles.icon}  
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.navigate('Rule');
                }}>
                    <Text style={styles.textbutton}>RULE</Text>
                    <ImageBackground 
                        source={require('../../../assets/icon/rule-gaming.png')}
                        style={styles.icon}  
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
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
