import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import styles from "./styleHome";
import soundManager from '../../SoundManager/soundManager';

const HomeScreen = ({ navigation }) => {

    soundManager('home_sound');

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
