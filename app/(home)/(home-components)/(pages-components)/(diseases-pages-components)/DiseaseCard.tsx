import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { diseases } from '@/data/diseases';
import { bgColors } from '@/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const CARD_WIDTH = Math.min(300, SCREEN_WIDTH * 0.85);

export interface DiseaseCardProps {
  disease: typeof diseases[number];
  onSelect: (disease: typeof diseases[number]) => void;
  isArabic?: boolean;
}

export default function DiseaseCard({ disease, onSelect, isArabic = false }: DiseaseCardProps) {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => onSelect(disease)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image
          source={disease.image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={[styles.weekBadge, isArabic && styles.weekBadgeRTL]}>
          <Text style={[styles.weekText, isArabic && styles.weekTextRTL]}>
            {isArabic ? disease.date_ar : disease.date}
          </Text>
        </View>
        <Text 
          style={[styles.title, isArabic && styles.titleRTL]} 
          numberOfLines={1}
        >
          {isArabic ? disease.name_ar : disease.name}
        </Text>
        <Text 
          style={[styles.description, isArabic && styles.descriptionRTL]} 
          numberOfLines={4}
        >
          {isArabic ? disease.summary_ar : disease.summary}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: Math.min(SCREEN_WIDTH * 1, SCREEN_HEIGHT * 0.5),
    backgroundColor: bgColors.light.background,
    borderRadius: Math.min(SCREEN_WIDTH * 0.04, SCREEN_HEIGHT * 0.02),
    marginHorizontal: Math.min(SCREEN_WIDTH * 0.02, SCREEN_HEIGHT * 0.01),
    marginVertical: Math.min(SCREEN_WIDTH * 0.02, SCREEN_HEIGHT * 0.01),
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardRTL: {
    // إزالة خاصية direction لتجنب المشاكل
  },
  imageContainer: {
    flex: 0.6, // 60% من ارتفاع البطاقة
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 0.4,
    padding: Math.min(SCREEN_WIDTH * 0.04, SCREEN_HEIGHT * 0.02),
    justifyContent: 'flex-start',
  },
  weekBadge: {
    backgroundColor: '#A27CD2',
    borderRadius: Math.min(SCREEN_WIDTH * 0.02, SCREEN_HEIGHT * 0.01),
    height: Math.min(SCREEN_WIDTH * 0.08, SCREEN_HEIGHT * 0.04),
    width: Math.min(SCREEN_WIDTH * 0.25, SCREEN_HEIGHT * 0.12),
    position: 'absolute',
    right: 7,
    top: 2,
    justifyContent: 'center',
  },
  weekBadgeRTL: {
    right: 'auto',
    left: 7,
  },
  weekText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: Math.min(SCREEN_WIDTH * 0.03, SCREEN_HEIGHT * 0.015),
  },
  weekTextRTL: {
    textAlign: 'center', // إبقاء النص في المنتصف للوضوح
    fontFamily: 'Arial',
  },
  title: {
    fontSize: Math.min(SCREEN_WIDTH * 0.05, SCREEN_HEIGHT * 0.025),
    fontWeight: 'bold',
    color: '#333',
    marginTop: Math.min(SCREEN_WIDTH * 0.05, SCREEN_HEIGHT * 0.04),
    textAlign: 'left',
  },
  titleRTL: {
    textAlign: 'right',
    fontFamily: 'Arial',
  },
  description: {
    fontSize: Math.min(SCREEN_WIDTH * 0.035, SCREEN_HEIGHT * 0.018),
    color: '#666',
    lineHeight: Math.min(SCREEN_WIDTH * 0.045, SCREEN_HEIGHT * 0.022),
    marginTop: Math.min(SCREEN_WIDTH * 0.02, SCREEN_HEIGHT * 0.01),
    textAlign: 'left',
  },
  descriptionRTL: {
    textAlign: 'right',
    fontFamily: 'Arial',
    lineHeight: Math.min(SCREEN_WIDTH * 0.055, SCREEN_HEIGHT * 0.025), // زيادة المسافة بين السطور للنص العربي
  },
}); 