import React from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Animated, FlatList } from 'react-native';
import { bgColors } from '@/constants/Colors';
import Navbar from '../(navbar)/navbar';
import DiseaseCard from './(diseases-pages-components)/DiseaseCard';
import { diseases } from '@/data/diseases';
import { router } from 'expo-router';
import { useFonts } from 'expo-font';
import { useLanguage } from '@/contexts/LanguageContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function DiseasesSplashPage() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const [fontsLoaded] = useFonts({
    'FugazOne': require('@/assets/fonts/Fugaz_One/FugazOne-Regular.ttf'),
    'Actor': require('@/assets/fonts/Actor/Actor-Regular.ttf'),
    'ADLaMDisplay': require('@/assets/fonts/ADLaM_Display/ADLaMDisplay-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  const handleDiseaseSelect = (disease: typeof diseases[number]) => {
    router.push({
      pathname: "/(home)/(home-components)/(pages-components)/(diseases-pages-components)/diseases-page-components",
      params: { diseaseId: disease.id }
    });
  };

  const renderDiseaseCard = ({ item }: { item: typeof diseases[number] }) => (
    <DiseaseCard 
      disease={item} 
      onSelect={handleDiseaseSelect}
      isArabic={isArabic}
    />
  );

  const renderMotivationalText = () => (
    <View style={styles.textContainer}>
      <Text style={[styles.motivationalText, { fontFamily: 'FugazOne' }]}>
        {isArabic 
          ? "اختيار أن تكوني أمًا هو اختيار أن تصبحي واحدة من أعظم المعلمات في العالم."
          : "\"The Choice to be a mother is the choice to become one of the greatest teachers in the world.\""
        }
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* حاوية الناف بار مع تمرير showLanguageToggle=true */}
      <View style={styles.navContainer}>
        <Navbar 
          scrollY={new Animated.Value(0)}
          showLanguageToggle={true}
        />
      </View>

      {/* حاوية قائمة الأمراض */}
      <View style={styles.listContainer}>
        <FlatList
          data={diseases}
          renderItem={renderDiseaseCard}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          // جعل قائمة الأمراض تبدأ من اليمين في حالة اللغة العربية
          inverted={isArabic}
        />
      </View>

      {renderMotivationalText()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColors.light.background,
  },
  containerRTL: {
    // إزالة direction: 'rtl' لتجنب مشاكل التنسيق
  },
  navContainer: {
    height: Math.min(SCREEN_HEIGHT * 0.08, 60),
  },
  listContainer: {
    flex: 0.7,
    paddingVertical: Math.min(SCREEN_WIDTH * 0.2, 100),
  },
  listContent: {
    paddingHorizontal: Math.min(SCREEN_WIDTH * 0.05, 20),
  },
  textContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Math.min(SCREEN_WIDTH * 0.05, 20),
    paddingBottom: Math.min(SCREEN_HEIGHT * 0.02, 15),
  },
  motivationalText: {
    fontSize: Math.min(SCREEN_WIDTH * 0.06, SCREEN_HEIGHT * 0.03),
    color: '#A27CD2',
    textAlign: 'center',
    lineHeight: Math.min(SCREEN_WIDTH * 0.08, SCREEN_HEIGHT * 0.04),
    fontWeight: 'bold',
    marginTop: Math.min(SCREEN_WIDTH * 0.01, SCREEN_HEIGHT * 0.01),
  },
});


