import React from "react";
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import styles from "./styleRule";

const gameRules = [
  {
    "title": "Question Structure",
    "description": "The player will have to answer a total of 15 questions to win the top prize of 1 billion VND. The questions are arranged in order from easy to difficult, and the prize money increases with each question."
  },
  {
    "title": "Help Options",
    "description": "The player has 3 help options throughout the show:",
    "options": [
      "50:50: Eliminate 2 incorrect answers, leaving only 1 correct answer and 1 incorrect answer.",
      "Phone a Friend: The player will have 30 seconds to call and ask for advice from a pre-registered friend or family member.",
      "Ask the Audience: The studio audience will vote for the answer they think is correct."
    ]
  },
  {
    "title": "Player's Decision",
    "description": "The player has the right to stop at any question and keep their current prize money. If the player answers incorrectly, their score will be recorded as their current score."
  },
  {
    "title": "Question Answering Time",
    "description": "The maximum time for each question is 120 seconds, and the player needs to think carefully before giving their final answer."
  }
];

const RuleScreen = ({navigation}) => {

    return (
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.container}
        >
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconback} onPress={() => navigation.navigate('Home')}>
                    <ImageBackground 
                        source={require('../../../assets/icon/back.png')}
                        style={styles.iconback}  
                    />
                </TouchableOpacity>
                <Text style={styles.ruleText}>Game Rules</Text>
            </View>
            <ScrollView style={styles.textRule}>
                {gameRules.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <Text style={styles.textheader}>{item.title}</Text>
                        <Text style={styles.text}>{item.description}</Text>
                        {item.options && item.options.map((option, id) => (
                            <Text key={id} style={styles.text}>- {option}</Text>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </LinearGradient>
    );
};

export default RuleScreen;