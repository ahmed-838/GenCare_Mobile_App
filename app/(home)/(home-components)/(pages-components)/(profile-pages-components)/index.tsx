import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { isAuthenticated } from '@/utils/auth';
import GuestWelcome from './components/GuestWelcome';
import { bgColors } from '@/constants/Colors';

export default function ProfileIndex() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authStatus = await isAuthenticated();
        setIsLoggedIn(authStatus);
        
        if (authStatus) {
          // User is logged in, show the profile splash page
          router.replace('/(home)/(home-components)/(pages-components)/(profile-pages-components)/ProfileSplash');
        } else {
          // User is not logged in, just show the guest welcome component
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#623AA2" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return <GuestWelcome />;
  }

  // This should not be reached as logged in users are redirected
  return <View />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: bgColors.light.background,
  },
});