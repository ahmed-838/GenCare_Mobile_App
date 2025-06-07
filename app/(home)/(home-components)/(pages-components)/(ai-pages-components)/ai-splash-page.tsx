import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { bgColors } from '@/constants/Colors';
import { useFonts } from 'expo-font';
import MainButton from '@/constants/MainButton';
import { isAuthenticated } from '@/utils/auth';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function AiSplashPage() {
  const [fontsLoaded] = useFonts({
    'FugazOne': require('@/assets/fonts/Fugaz_One/FugazOne-Regular.ttf'),
    'Actor': require('@/assets/fonts/Actor/Actor-Regular.ttf'),
    'ADLaMDisplay': require('@/assets/fonts/ADLaM_Display/ADLaMDisplay-Regular.ttf'),
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    checkLoginStatus();
  }, []);
  
  const checkLoginStatus = async () => {
    try {
      const loggedIn = await isAuthenticated();
      setIsLoggedIn(loggedIn);
    } catch (error) {
      console.error('Error checking login status:', error);
      setIsLoggedIn(false);
    }
  };

  const handleTryAI = () => {
    if (isLoggedIn) {
      router.push('/(home)/(home-components)/(pages-components)/ai-page-components');
    } else {
      router.push('/(auth)/login');
    }
  };
  

  if (!fontsLoaded) {
    return null; 
  }
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.skyContainer}>
        <Image source={require('@/assets/ai_components/splash/sky.png')} style={styles.cloud} />
        <Image source={require('@/assets/ai_components/splash/sky.png')} style={styles.cloud2} />
        <Image
          source={require('@/assets/ai_components/splash/baby-unscreen.gif')}
          style={styles.baby}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Experience the Power{'\n'}of GenCare AI</Text>
      </View>
      <View style={styles.journeyContainer}>
        <Text style={styles.journeyTitle}>Start Your AI Trip Now :</Text>
        <View style={styles.journeyContent}>
          <Text style={styles.journeyText}>Upload your sonogram now {'\n'}and experience 
          the peace of mind{'\n'}that comes with cutting-edge technology</Text>
          <Image 
            source={require('@/assets/ai_components/splash/baby-sleep-unscreen.gif')} 
            style={styles.moon}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>Why Trust GenCare AI?</Text>
        
        <View style={styles.featureItem}>
          <Text style={styles.featureLabel}>Accuracy: ✓</Text>
          <Text style={styles.featureText}>"Trained on thousands of medical records for unmatched precision."</Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureLabel}>Performance: ✓</Text>
          <Text style={styles.featureText}>"Delivers results within seconds to save you time."</Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureLabel}>Reliability: ✓</Text>
          <Text style={styles.featureText}>"Trusted by medical professionals and reviewed for quality assurance."</Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureLabel}>Fairness: ✓</Text>
          <Text style={styles.featureText}>"Our AI is designed to provide unbiased insights for all cases."</Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureLabel}>Privacy: ✓</Text>
          <Text style={styles.featureText}>"We prioritize your data security and never share your information."</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton 
          title={isLoggedIn ? "Try AI Now" : "Login to Continue"} 
          onPress={handleTryAI} 
          backgroundColor={isLoggedIn ? undefined : '#4F2FA2'}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgColors.light.background,
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  skyContainer: {
    height: screenHeight * 0.25,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.09,
    marginBottom: -screenHeight * 0.05,
  },
  cloud: {
    position: 'absolute',
    left: '5%',
    top: screenHeight * 0.05,
    width: screenWidth * 0.25,
    height: screenHeight * 0.08,
    transform: [{ scaleX: -1 }],
  },
  cloud2: {
    position: 'absolute',
    right: '5%',
    top: screenHeight * 0.05,
    width: screenWidth * 0.25,
    height: screenHeight * 0.08,
  },
  baby: {
    position: 'absolute',
    width: screenWidth * 0.35,
    height: screenHeight * 0.2,
    resizeMode: 'contain',
  },
  titleContainer: {
    marginTop: screenHeight * 0.02,
    alignItems: 'center',
  },
  title: {
    fontSize: screenHeight * 0.035,
    fontFamily: 'FugazOne',
    color: '#4F2FA2',
    textAlign: 'center',
    lineHeight: screenHeight * 0.045,
  },
  journeyContainer: {
    marginTop: screenHeight * 0.03,
    paddingHorizontal: screenWidth * 0.05,
  },
  journeyTitle: {
    fontSize: screenHeight * 0.028,
    fontFamily: 'FugazOne',
    color: '#4F2FA2',
    marginTop: screenHeight * 0.04,
    marginBottom: screenHeight * 0.01,
  },
  journeyContent: {
    position: 'relative',
    marginBottom: screenHeight * 0.05,
    width: '100%',
    padding: screenWidth * 0.005,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  journeyText: {
    flex: 1,
    fontSize: screenHeight * 0.02,
    fontFamily: 'Actor',
    lineHeight: screenHeight * 0.03,
    color: '#000000',
  },
  moon: {
    position: 'absolute',
    right: 0,
    bottom: -screenHeight * 0.16,
    width: screenWidth * 0.35,
    height: screenWidth * 0.35,
    resizeMode: 'contain',
    transform: [{ scaleX: -1 }],
  },
  featuresContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: screenWidth * 0.05,
    paddingTop: screenHeight * 0.02,
  },
  featuresTitle: {
    fontSize: screenHeight * 0.028,
    fontFamily: 'FugazOne',
    color: '#4F2FA2',
    marginTop: screenHeight * 0.06,
    marginBottom: screenHeight * 0.016,
    
  },
  featureItem: {
    marginBottom: screenHeight * 0.015,
  },
  featureLabel: {
    fontSize: screenHeight * 0.022,
    fontFamily: 'ADLaMDisplay',
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: screenHeight * 0.018,
    fontFamily: 'Actor',
    marginTop: screenHeight * 0.005,
  },
  buttonContainer: {
    marginTop: screenHeight * 0.05,
    alignItems: 'center',
    width: '100%',
  },
});

