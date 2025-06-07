import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { bgColors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function GuestWelcome() {
  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  const handleSignup = () => {
    router.push('/(auth)/signup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/Logo/Mob-Logo-removebg-preview.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Welcome to GenCare</Text>
          <Text style={styles.welcomeSubtitle}>Your complete pregnancy companion</Text>
        </View>

        <View style={styles.featureContainer}>
          <FeatureItem 
            icon="heart-circle-outline"
            title="Track Your Pregnancy"
            description="Follow your baby's development week by week"
          />
          
          <FeatureItem 
            icon="fitness-outline"
            title="Health Monitoring"
            description="Keep track of important health metrics"
          />
          
          <FeatureItem 
            icon="notifications-circle-outline"
            title="Personalized Insights"
            description="Get recommendations tailored to your journey"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function FeatureItem({ icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIconContainer}>
        <Ionicons name={icon} size={24} color="#623AA2" />
      </View>
      <View style={styles.featureTextContainer}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColors.light.background,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: SCREEN_WIDTH * 0.06,
    paddingTop: SCREEN_HEIGHT * 0.05,
    paddingBottom: SCREEN_HEIGHT * 0.03,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.03,
  },
  logo: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_WIDTH * 0.4,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.04,
  },
  welcomeTitle: {
    fontSize: SCREEN_HEIGHT * 0.035,
    fontWeight: 'bold',
    color: '#623AA2',
    marginBottom: SCREEN_HEIGHT * 0.01,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: SCREEN_HEIGHT * 0.018,
    color: '#666',
    textAlign: 'center',
  },
  featureContainer: {
    marginBottom: SCREEN_HEIGHT * 0.04,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.025,
    paddingHorizontal: SCREEN_WIDTH * 0.02,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(98, 58, 162, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: SCREEN_HEIGHT * 0.02,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: SCREEN_HEIGHT * 0.015,
    color: '#666',
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingTop: SCREEN_HEIGHT * 0.02,
  },
  loginButton: {
    backgroundColor: '#623AA2',
    borderRadius: 12,
    paddingVertical: SCREEN_HEIGHT * 0.018,
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT * 0.015,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: SCREEN_HEIGHT * 0.02,
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: 'rgba(98, 58, 162, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#623AA2',
    paddingVertical: SCREEN_HEIGHT * 0.018,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#623AA2',
    fontSize: SCREEN_HEIGHT * 0.02,
    fontWeight: '600',
  },
}); 