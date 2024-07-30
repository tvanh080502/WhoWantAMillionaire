import { useCallback, useRef, useContext, useEffect } from 'react';
import Sound from 'react-native-sound';
import VolumeContext from './volumeManager';

Sound.setCategory('Playback');

const soundManager = (screenName) => {
    const soundRef = useRef(null);
    const { volume } = useContext(VolumeContext);

    const soundFiles = {
        home_sound: require('../../assets/sound/sound_homescreen.mp3'),
        playlq_sound: require('../../assets/sound/sound_playscreenlq.mp3'),
        playqa_sound: require('../../assets/sound/sound_playscreenqa.mp3'),
    };

    const loadAndPlaySound = (soundFile) => {
        soundRef.current = new Sound(soundFile, (error) => {
            if (error) {
                console.error('Error loading sound:', error);
                return;
            }
            soundRef.current.setNumberOfLoops(-1);
            soundRef.current.setVolume(volume);
            soundRef.current.play((success) => {
                if (!success) {
                    console.error('Sound playback failed');
                } else {
                    console.log('Sound playback successful');
                }
            });
        });
    };

    const playSound = useCallback((soundFile) => {
        if (soundRef.current) {
            soundRef.current.stop(() => {
                if (soundRef.current) {
                    soundRef.current.release();
                    soundRef.current = null;
                    loadAndPlaySound(soundFile);
                }
            });
        } else {
            loadAndPlaySound(soundFile);
        }
    }, [volume]);

    useEffect(() => {
        const soundFile = soundFiles[screenName];
        if (soundFile) {
            playSound(soundFile);
        } else {
            console.error(`No sound file found for screen: ${screenName}`);
        }

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
    }, [screenName, playSound, soundFiles]);

    useEffect(() => {
        if (soundRef.current) {
            soundRef.current.setVolume(volume);
        }
    }, [volume]);

    return soundRef;
};

export default soundManager;
