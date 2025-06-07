import { View, StyleSheet, Image, Animated, FlatList, Dimensions, useWindowDimensions, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useEffect, useRef, useState } from 'react';
import { bgColors } from '@/constants/Colors';
import MainButton from '@/constants/MainButton';

const NAVBAR_HEIGHT = 60;
const slides = [
  {
    id: '1',
    image: require('@/assets/home_swiper/swiper_card1-removebg-preview.png'),
    title: 'How Does Your Baby Look Like Now ?',
    button: 'Show Baby'
  },
  {
    id: '2',
    image: require('@/assets/home_swiper/swiper_card2-removebg-preview.png'),
    title: 'Want Baby Name ?\n Check Out Our Baby Names Lists',
    button: 'Baby Names'
  },
  {
    id: '3',
    image: require('@/assets/home_swiper/swiper_card3-removebg-preview.png'),
    title: 'What Does Your Baby\n Look Like Now?',
    button: 'Show My Baby'
  }
];

type Slide = {
  id: string;
  image: any;
  title: string;
  button: string;
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function UpperSwiper({ scrollViewRef }: { scrollViewRef?: React.RefObject<ScrollView> }) {
  const flatListRef = useRef<FlatList>(null);
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleButtonPress = (buttonType: 'AI Test' | 'Baby Names' | 'Show My Baby') => {
    const scrollPositions = {
      'AI Test': 1200,
      'Baby Names': 1200,
      'Show My Baby': 1200
    };
    scrollViewRef?.current?.scrollTo({
      y: scrollPositions[buttonType],
      animated: true
    });
  };

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={[styles.slide, { width }]}>
      <View style={styles.cardContainer}>
        <Image 
          source={item.image}
          style={styles.image}
          resizeMode="contain"
        />
        <ThemedText style={styles.title}>{item.title}</ThemedText>
        <View style={styles.buttonContainer}>
          <MainButton 
            title={item.button}
            onPress={() => handleButtonPress(item.button as 'AI Test' | 'Baby Names' | 'Show My Baby')}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          setCurrentIndex(Math.round(event.nativeEvent.contentOffset.x / width));
        }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: NAVBAR_HEIGHT,
    backgroundColor: bgColors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    paddingHorizontal: SCREEN_WIDTH * 0.04,
  },
  cardContainer: {
    backgroundColor: bgColors.card.background,
    alignItems: 'center',
    paddingTop: SCREEN_HEIGHT * 0.01,
    paddingBottom: SCREEN_HEIGHT * 0.01,
    paddingHorizontal: SCREEN_WIDTH * 0.03,
    marginHorizontal: SCREEN_WIDTH * 0.03,
    marginTop: SCREEN_HEIGHT * 0.04,
    flexDirection: 'column', 
    justifyContent: 'space-between',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: SCREEN_HEIGHT * 0.02,
  },
  image: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.28,
    resizeMode: 'contain',
  },
  title: {
    fontSize: SCREEN_WIDTH * 0.05,
    fontWeight: '500',
    color: '#89CFF0',
    textAlign: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.02,
    letterSpacing: 0.5,
    height: SCREEN_HEIGHT * 0.12,
    justifyContent: 'center',
    marginVertical: SCREEN_HEIGHT * 0.02,
  },
  buttonContainer: {
    marginBottom: SCREEN_HEIGHT * 0.02,
  },
});