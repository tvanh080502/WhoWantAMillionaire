import React from 'react';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './stylePlayLQ';

const PlayLQScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                style={styles.nextbutton}
                onPress={() => navigation.navigate('Home')}>
                    <ImageBackground
                        source={require('../../../../assets/icon/back.png')}
                        style={styles.iconimage}
                    >
                    </ImageBackground>
                </TouchableOpacity>
                <View style={styles.headertext}> 
                    <Text style={styles.textheader}>Trở về</Text>
                    <Text style={styles.textheader}>Bắt đầu</Text>
                </View>
                <TouchableOpacity 
                style={styles.nextbutton}
                onPress={() => navigation.navigate('PlayQA')}>
                    <ImageBackground
                        source={require('../../../../assets/icon/next.png')}
                        style={styles.iconimage}
                    >
                    </ImageBackground>
                </TouchableOpacity>
            </View> 
            <ScrollView style={styles.listQ}>
                <View style={styles.QA}>
                </View>
            </ScrollView>   
        </View>
    );
}


export default PlayLQScreen;
