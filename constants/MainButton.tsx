import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface MainButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
}

const MainButton: React.FC<MainButtonProps> = ({ title, onPress, backgroundColor = '#5E259B' }) => {
  return (
    <TouchableOpacity 
      style={{
        backgroundColor: backgroundColor,
        padding: 15,
        borderRadius: 10,
        minWidth: 150,
        alignItems: 'center'
      }} 
      onPress={onPress}
    >
      <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5E259B',
    borderRadius: screenHeight * 0.03,
    paddingVertical: screenHeight * 0.015,
    paddingHorizontal: screenWidth * 0.08,
    minWidth: screenWidth * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: '#FFFFFF',
    fontSize: screenHeight * 0.02,
    fontWeight: '600',
    textAlign: 'center',
  }
});

export default MainButton;