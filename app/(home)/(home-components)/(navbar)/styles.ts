import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { bgColors } from '@/constants/Colors';

export const DIMENSIONS = {
  SCREEN_HEIGHT: Dimensions.get('window').height,
  SCREEN_WIDTH: Dimensions.get('window').width,
  NAVBAR_HEIGHT: Math.min(Dimensions.get('window').height * 0.12, 80),
  STATUSBAR_HEIGHT: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0
};

export const styles = StyleSheet.create({
  // ... existing styles
});

const styleExports = {
  DIMENSIONS,
  styles,
};

export default styleExports; 