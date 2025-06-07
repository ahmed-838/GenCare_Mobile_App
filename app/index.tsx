import { useEffect } from 'react';
import { router } from 'expo-router';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  Dimensions, 
  Animated,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { bgColors } from '@/constants/Colors';
import MainButton from '@/constants/MainButton';

export default function LandingScreen() {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <View style={styles.headerSection} />
        
        <View style={styles.contentSection}>
          <View style={styles.logoContainer}>
            <Animated.Image
              source={require('@/assets/Logo/Mob-Logo-removebg-preview.png')}
              style={[
                styles.logo,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
              resizeMode="contain"
            />
          </View>
          <View style={styles.textContainer}>
            <Animated.Text 
              style={[
                styles.title,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              Welcome to GenCare
            </Animated.Text>
            <Animated.Text 
              style={[
                styles.description,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              Your personal pregnancy companion
            </Animated.Text>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <Animated.View 
            style={[
              styles.buttonContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <MainButton 
              title="Get Started"
              onPress={() => router.replace('/(home)/home')}
            />
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: bgColors.light.background,
  },
  container: {
    flex: 1,
  },
  headerSection: {
    height: height * 0.12,
    paddingTop: StatusBar.currentHeight || 0,
  },
  contentSection: {
    height: height * 0.68,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.05,
  },
  logoContainer: {
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.08,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#623AA2',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  bottomSection: {
    height: height * 0.2,
    justifyContent: 'center',
    paddingBottom: height * 0.03,
  },
  buttonContainer: {
    paddingHorizontal: width * 0.1,
  },
});