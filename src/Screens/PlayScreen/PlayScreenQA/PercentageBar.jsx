import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PercentageBar = ({ label, percent, color }) => {
  return (
    <View style={styles.barContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={styles.barBackground}>
        <Text style={styles.percentText}>{`${percent}%`}</Text>
        <View style={[styles.bar, { height: `${percent}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  labelContainer: {
    marginBottom: 5,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  barBackground: {
    width: 42,
    height: 150,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  percentText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 12,
  },
});

export default PercentageBar;
