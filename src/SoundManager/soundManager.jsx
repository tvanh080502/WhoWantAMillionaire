import { useCallback, useRef } from 'react';
import Sound from 'react-native-sound';
import { useFocusEffect } from '@react-navigation/native';

const soundManager = (screenName) => {
    const soundRef = useRef(null);

    const soundFiles = {
        home_sound: require('../../assets/sound/sound_homescreen.mp3'),
        playlq_sound: require('../../assets/sound/sound_playscreenlq.mp3'),
        playqa_sound: require('../../assets/sound/sound_playscreenqa.mp3'),
    };

    const playSound = (soundFile) => {
        if (soundRef.current) {
            soundRef.current.play((success) => {
                if (!success) {
                    console.error('Sound playback failed');
                    soundRef.current.reset();
                    playSound(soundFile);
                }
            });
        } else {
            const sound = new Sound(soundFile, (error) => {
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
            const soundFile = soundFiles[screenName];
            if (soundFile) {
                playSound(soundFile);
            } else {
                console.error(`No sound file found for screen: ${screenName}`);
            }

            return () => {
                if (soundRef.current) {
                    soundRef.current.stop(() => {
                        soundRef.current.release();
                        soundRef.current = null;
                    });
                }
            };
        }, [screenName])
    );

    return soundRef;
};

export default soundManager;
