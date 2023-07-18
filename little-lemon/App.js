import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import SplashScreen from './screens/SplashScreen'; // import SplashScreen

const Stack = createNativeStackNavigator();

export default function App() {
  const [isOnboardingComplete, setOnboardingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadOnboardingStatus = async () => {
    try {
      const status = await AsyncStorage.getItem('isOnboardingComplete');
      if (status !== null) {
        // value previously stored
        setOnboardingComplete(JSON.parse(status));
      }
    } catch(e) {
      // error reading value
      console.log(e);
    }
    setIsLoading(false);
  }

  const handleOnboardingComplete = async (firstName, email, navigation) => {
    try {
      await AsyncStorage.setItem('isOnboardingComplete', JSON.stringify(true));
      setOnboardingComplete(true);
      navigation.navigate('Profile', { firstName, email });
    } catch(e) {
      // error saving value
      console.log(e);
    }
  }  
  
  useEffect(() => {
    loadOnboardingStatus();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isOnboardingComplete ? (
          <Stack.Screen name="Profile" component={Profile} options={{headerShown: false }} />
        ) : (
          <Stack.Screen name="Onboarding" options={{headerShown: false }}>
            {props => <Onboarding {...props} onDone={(firstName, email) => handleOnboardingComplete(firstName, email, props.navigation)} />}
          </Stack.Screen>

        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
