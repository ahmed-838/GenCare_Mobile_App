import { View, Image, StyleSheet, TouchableOpacity, ScrollView, Animated, Text, Dimensions, FlatList } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { bgColors } from '@/constants/Colors';
import Navbar from '../../(navbar)/navbar';
import DiseaseCard from './DiseaseCard';
import DiseaseDetails from './DiseaseDetails';
import { diseases } from '@/data/diseases';
import { useLocalSearchParams } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const NAVBAR_HEIGHT = 100;

export default function DiseasesPage() {
  const { diseaseId } = useLocalSearchParams();
  const selectedDisease = diseases.find(d => d.id === Number(diseaseId));
  const [selectedDiseaseState, setSelectedDiseaseState] = useState<typeof diseases[number] | null>(selectedDisease || null);
  const scrollY = new Animated.Value(0);
  const horizontalScrollRef = useRef<FlatList>(null);
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  useEffect(() => {
    if (selectedDisease) {
      const index = diseases.findIndex(d => d.id === selectedDisease.id);
      horizontalScrollRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5
      });
    }
  }, [selectedDisease]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true, listener: () => {} }
  );

  return (
    <View style={styles.container}>
      <View style={styles.navbarWrapper}>
        <Navbar scrollY={scrollY} showLanguageToggle={true} />
      </View>

      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.diseasesListWrapper}>
          <FlatList
            ref={horizontalScrollRef}
            horizontal
            data={diseases}
            renderItem={({ item }) => (
              <DiseaseCard
                key={item.id}
                disease={item}
                onSelect={setSelectedDiseaseState}
                isArabic={isArabic}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
            getItemLayout={(data, index) => ({
              length: CARD_WIDTH + 15,
              offset: (CARD_WIDTH + 15) * index,
              index,
            })}
            inverted={isArabic}
            onScrollToIndexFailed={(info) => {
              const wait = new Promise(resolve => setTimeout(resolve, 500));
              wait.then(() => {
                horizontalScrollRef.current?.scrollToIndex({
                  index: info.index,
                  animated: true,
                  viewPosition: 0.5
                });
              });
            }}
          />
        </View>

        {selectedDiseaseState && (
          <DiseaseDetails disease={selectedDiseaseState} />
        )}
      </Animated.ScrollView>
    </View>
  );
}

const CARD_WIDTH = Math.min(280, SCREEN_WIDTH * 0.8);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColors.light.background,
  },
  navbarWrapper: {
    height: NAVBAR_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
  },
  diseasesListWrapper: {
    marginTop: NAVBAR_HEIGHT,
    backgroundColor: bgColors.light.background,
  },
  horizontalScrollContent: {
    paddingHorizontal: 15,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: bgColors.light.background,
  },
  navContainer: {
    height: NAVBAR_HEIGHT,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
  },
  contentScroll: {
    flex: 1,
  },
  listContainer: {
    backgroundColor: bgColors.light.background,
    position: 'relative',
    flex: 1,
    marginTop: NAVBAR_HEIGHT,
  },
  diseasesListContent: {
    paddingHorizontal: 15,
  },
  diseaseCard: {
    width: 280,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: bgColors.light.background,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 15,
  },
  dateContainer: {
    backgroundColor: '#e8f4ff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  dateText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardSummary: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  detailsContainer: {
    backgroundColor: bgColors.light.background,
    marginTop: 20,
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 15,
    marginBottom: 20,
  },
  detailsImage: {
    width: '100%',
    height: 250,
  },
  detailsContent: {
    padding: 20,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  detailsDate: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 15,
  },
  detailsText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
}); 