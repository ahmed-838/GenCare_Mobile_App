import { View, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Link, router } from 'expo-router';
import { theme } from '@/constants/Colors1';
import { bgColors } from '@/constants/Colors';
import MainButton from '@/constants/MainButton';
import { useState, useRef } from 'react';
import { HeaderHomeFont } from '@/constants/Fonts';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function AiPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleAITest = () => {
    router.push('./(pages-components)/ai-splash-page');   
  };

  return (
    <View style={styles.mainContainer}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        <ThemedText style={styles.title}>Fetal's Brain AI Test</ThemedText>
      </View>

      {/* Carousel Container */}
      <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            const slideSize = event.nativeEvent.layoutMeasurement.width;
            const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
            setActiveIndex(index);
          }}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToInterval={SCREEN_WIDTH * 0.8}
          snapToAlignment="center"
          contentContainerStyle={styles.scrollContent}
        >
          {steps.map((item, index) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardImageContainer}>
                <Image source={item.image} style={styles.cardImage} />
                <View style={styles.overlay} />
                <View style={styles.stepIndicator}>
                  <ThemedText style={styles.stepNumber}>{index + 1}/3</ThemedText>
                </View>
              </View>
              <View style={styles.cardContent}>
                <ThemedText style={styles.stepTitle}>{item.title}</ThemedText>
                <ThemedText style={styles.description}>{item.description}</ThemedText>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Button Container */}
      <View style={styles.buttonContainer}>
        <MainButton 
          title="Start Test"
          onPress={handleAITest}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: bgColors.light.background,
  },
  headerContainer: {
    flex: 0.15,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
  },
  title: {
    fontFamily: HeaderHomeFont.fontFamily,
    color: HeaderHomeFont.color,
    fontSize: HeaderHomeFont.fontSize,
    fontWeight: '900',
  },
  carouselContainer: {
    flex: 0.78,
    height: SCREEN_HEIGHT * 0.6,

  },
  scrollContent: {
    paddingHorizontal: SCREEN_WIDTH * 0.05, // left and right padding
    backgroundColor: bgColors.light.background,
  },
  card: {
    width: SCREEN_WIDTH * 0.8,
    height: '90%',
    backgroundColor: '#FFF',
    borderRadius: SCREEN_WIDTH * 0.03,
    marginHorizontal: SCREEN_WIDTH * 0.02,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardImageContainer: {
    height: '60%',
    width: '100%',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(94, 37, 155, 0.1)',
  },
  stepIndicator: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.02,
    right: SCREEN_WIDTH * 0.04,
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    paddingVertical: SCREEN_HEIGHT * 0.01,
    borderRadius: SCREEN_WIDTH * 0.06,
  },
  stepNumber: {
    color: '#FFF',
    fontSize: SCREEN_WIDTH * 0.035,
    fontWeight: '700',
  },
  cardContent: {
    flex: 1,
    padding: SCREEN_WIDTH * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: SCREEN_WIDTH * 0.05,
    fontWeight: '800',
    color: theme.colors.secondary,
    marginBottom: SCREEN_HEIGHT * 0.01,
  },
  description: {
    fontSize: SCREEN_WIDTH * 0.035,
    color: '#666',
    textAlign: 'center',
    lineHeight: SCREEN_WIDTH * 0.05,
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: SCREEN_HEIGHT * 0.02,
  },
});

const steps = [
  {
    id: '1',
    image: require('@/assets/ai_components/home/card1.jpg'),
    title: 'Step 1',
    description: 'Sonographic Image'
  },
  {
    id: '2',
    image: require('@/assets/ai_components/home/card2.jpg'),
    title: 'Step 2',
    description: 'Upload Image'
  },
  {
    id: '3',
    image: require('@/assets/ai_components/home/card3.jpg'),
    title: 'Step 3',
    description: 'AI Result'
  }
];
