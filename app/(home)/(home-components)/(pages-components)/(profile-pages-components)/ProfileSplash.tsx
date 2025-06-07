import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { bgColors } from '@/constants/Colors';
import Checkbox from 'expo-checkbox';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const slides = [
  {
    id: '1',
    title: 'Welcome to Health App',
    description: 'Your personal health companion for a better lifestyle',
    subDescription: 'Daily tracking • Detailed reports • Health tips',
    image: require('@/assets/Logo/Mob-Logo-removebg-preview.png'),
  },
  {
    id: '2',
    title: 'Smart Notifications',
    description: 'Never miss your medications and appointments',
    subDescription: 'Reminders • Medications • Appointments',
    image: require('@/assets/Logo/Mob-Logo-removebg-preview.png'),
  },
  {
    id: '3',
    title: 'Pregnancy Journey',
    description: 'Track your pregnancy week by week with expert guidance',
    subDescription: 'Weekly updates • Development tracking • Nutrition tips',
    image: require('@/assets/Logo/Mob-Logo-removebg-preview.png'),
  },
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function ProfileSplash() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);
  const [showAgain, setShowAgain] = useState(false);

  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any }) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  useEffect(() => {
    checkSplashStatus();
  }, []);

  const checkSplashStatus = async () => {
    try {
      const splashShown = await AsyncStorage.getItem('profileSplashShown');
      if (splashShown === 'false') {
        router.replace('/(home)/(home-components)/(pages-components)/(profile-pages-components)/components/MainProfile');
      }
    } catch (error) {
      console.error('Error checking splash status:', error);
    }
  };

  const handleNavigation = async () => {
    try {
      await AsyncStorage.setItem('profileSplashShown', showAgain ? 'false' : 'true');
      router.replace('/(home)/(home-components)/(pages-components)/(profile-pages-components)/components/MainProfile');
    } catch (error) {
      console.error('Error saving splash screen preference:', error);
      router.replace('/(home)/(home-components)/(pages-components)/(profile-pages-components)/components/MainProfile');
    }
  };

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem('profileSplashShown', 'true');
      router.replace('/(home)/(home-components)/(pages-components)/(profile-pages-components)/components/MainProfile');
    } catch (error) {
      console.error('Error handling skip:', error);
    }
  };

  const scrollToNextSlide = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true
      });
    }
  };

  const handleButtonPress = () => {
    if (currentIndex === slides.length - 1) {
      handleNavigation();
    } else {
      scrollToNextSlide();
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const imageScale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });

    const imageRotate = scrollX.interpolate({
      inputRange,
      outputRange: ['0deg', '0deg', '360deg'],
    });

    const titleTranslate = scrollX.interpolate({
      inputRange,
      outputRange: [width * 0.2, 0, -width * 0.2],
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.slide}>
        <View style={styles.contentSection}>
          <View style={styles.logoContainer}>
            <Animated.Image
              source={item.image}
              style={[styles.image, {
                transform: [{ scale: imageScale }],
                opacity,
              }]}
            />
          </View>
          <View style={styles.textContainer}>
            <Animated.Text style={[styles.title, { opacity }]}>
              {item.title}
            </Animated.Text>
            <Animated.Text style={[styles.description, { opacity }]}>
              {item.description}
            </Animated.Text>
            <Animated.Text style={[styles.subDescription, { opacity }]}>
              {item.subDescription}
            </Animated.Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <AnimatedFlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item: any) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        ref={slidesRef}
      />

      <View style={styles.bottomSection}>
        <View style={styles.pagination}>
          {slides.map((_, index) => {
            const opacity = scrollX.interpolate({
              inputRange: [(index - 1) * width, index * width, (index + 1) * width],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const scale = scrollX.interpolate({
              inputRange: [(index - 1) * width, index * width, (index + 1) * width],
              outputRange: [1, 1.5, 1],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    opacity,
                    transform: [{ scale }],
                    backgroundColor: currentIndex === index ? '#623AA2' : '#E0E0E0'
                  }
                ]}
              />
            );
          })}
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={showAgain}
            onValueChange={setShowAgain}
            style={styles.checkbox}
            color={showAgain ? '#623AA2' : undefined}
          />
          <Text style={styles.checkboxLabel}>Don't show again</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <MaterialIcons name="arrow-forward" size={24} color="#fff" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColors.light.background,
  },
  headerSection: {
    height: height * 0.12,
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: width * 0.05,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  skipButton: {
    padding: 10,
  },
  contentSection: {
    height: height * 0.68,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.05,
  },
  logoContainer: {
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.08,
  },
  bottomSection: {
    height: height * 0.2,
    justifyContent: 'space-between',
    paddingBottom: height * 0.03,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    height: 20,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: '#E0E0E0',
  },
  activeDot: {
    backgroundColor: '#623AA2',
    width: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 8,
    borderRadius: 4,
  },
  checkboxLabel: {
    color: '#444',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#623AA2',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  skipText: {
    fontSize: 16,
    color: '#623AA2',
    fontWeight: '600',
  },
  slide: {
    width,
    height,
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
  subDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
}); 