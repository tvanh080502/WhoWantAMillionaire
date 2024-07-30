import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VolumeContext = createContext();

export const VolumeProvider = ({ children }) => {
    const [volume, setVolume] = useState(1.0);

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
    }, []);

    const handleVolumeChange = async (value) => {
        setVolume(value);
        try {
            await AsyncStorage.setItem('appVolume', value.toString());
        } catch (error) {
            console.error('Failed to save volume:', error);
        }
    };

    return (
        <VolumeContext.Provider value={{ volume, setVolume: handleVolumeChange }}>
            {children}
        </VolumeContext.Provider>
    );
};

export default VolumeContext;
