import { useCallback, useRef, useContext, useEffect } from 'react';
import Sound from 'react-native-sound';
import VolumeContext from './volumeManager';
// Import từng tệp âm thanh
import homeSound from '../../assets/sound/sound_homescreen.mp3';
import playlqSound from '../../assets/sound/sound_playscreenlq.mp3';
import playqaSound from '../../assets/sound/sound_playscreenqa.mp3';

Sound.setCategory('Playback');

const soundManager = (screenName) => {
    const soundRef = useRef(null);
    const { volume } = useContext(VolumeContext);

    const soundFiles = {
        home_sound: homeSound,
        playlq_sound: playlqSound,
        playqa_sound: playqaSound,
    };

    const loadAndPlaySound = (soundFile) => {
        const sound = new Sound(soundFile, (error) => {
            if (error) {
                console.error('Error loading sound:', error.message);
                return;
            }
            soundRef.current = sound; // Gán giá trị khi âm thanh đã sẵn sàng
            soundRef.current.setNumberOfLoops(-1);
            soundRef.current.setVolume(volume);
            soundRef.current.play((success) => {
                if (!success) {
                    console.error('Sound playback failed');
                } else {
                    // console.log('Sound playback successful');
                }
            });
        });
    };

    const playSound = useCallback((soundFile) => {
        try {
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
        } catch (error) {
            console.error('Error playing sound:', error);
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
