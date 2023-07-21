import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Logout({ navigation }) {
    useEffect(() => {
        const resetOnboarding = async () => {
            try {
                await AsyncStorage.removeItem('userProfile');
                await AsyncStorage.setItem('isOnboardingComplete', JSON.stringify(false));
                navigation.replace('Onboarding');
            } catch (e) {
                console.log(e);
            }
        };

        resetOnboarding();
    }, []);

    return null;
}