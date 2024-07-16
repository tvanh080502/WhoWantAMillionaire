import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen/indexHome';
import RuleScreen from '../Screens/RuleScreen/indexRule'
import PlayLQScreen from '../Screens/PlayScreen/PlayScreenListQuestions/indexPlayLQ';
import PlayQAScreen from '../Screens/PlayScreen/PlayScreenQA/indexPlayQA';
import HighscoreScreen from '../Screens/HighscoreScreen/indexHighscore';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="Rule" 
            component={RuleScreen} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="PlayLQ" 
            component={PlayLQScreen} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="PlayQA" 
            component={PlayQAScreen} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="Highscore" 
            component={HighscoreScreen} 
            options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
