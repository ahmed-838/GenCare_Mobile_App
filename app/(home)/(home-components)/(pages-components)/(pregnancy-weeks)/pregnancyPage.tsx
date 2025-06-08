import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Animated, Dimensions, Alert, ActivityIndicator, I18nManager } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialIcons } from "@expo/vector-icons";
import { bgColors } from "@/constants/Colors";
import Navbar from '../../(navbar)/navbar';
import { saveWeek, deleteWeek, getSavedWeeks } from '@/app/(home)/(home-components)/(pages-components)/(profile-pages-components)/components/saved-items/api/savedWeeks';
import * as SecureStore from 'expo-secure-store';
import { useLanguage } from '@/contexts/LanguageContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const NAVBAR_HEIGHT = SCREEN_HEIGHT * 0.12;

const PregnancyPage = () => {
  const { news } = useLocalSearchParams();
  const weekData = JSON.parse(news as string);
  const scrollY = new Animated.Value(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const { language } = useLanguage(); // Use language from context
  const isArabic = language === 'ar';

  useEffect(() => {
    const getToken = async () => {
      try {
        setIsLoading(true);
        const storedToken = await SecureStore.getItemAsync('token');
        setToken(storedToken);
        
        if (storedToken) {
          try {
            const savedWeeks = await getSavedWeeks(storedToken);
            console.log('Checking if week is saved:', weekData.id);
            console.log('Saved weeks:', savedWeeks);
            
            const isAlreadySaved = savedWeeks.some((w: any) => 
              w.week === weekData.id.toString()
            );
            
            console.log('Is week saved:', isAlreadySaved);
            setIsSaved(isAlreadySaved);
          } catch (error) {
            console.error('Error checking if week is saved:', error);
          }
        }
      } catch (error) {
        console.error('Error getting token:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getToken();
  }, [weekData.id]);

  const handleSave = async () => {
    if (!token) {
      Alert.alert('Alert', isArabic ? 'يرجى تسجيل الدخول أولاً' : 'Please login first');
      return;
    }

    try {
      setIsSaving(true);
      if (!isSaved) {
        await saveWeek(token, weekData.id.toString());
        setIsSaved(true);
        Alert.alert(
          isArabic ? 'نجاح' : 'Success', 
          isArabic ? 'تم حفظ الأسبوع بنجاح' : 'Week saved successfully'
        );
      } else {
        await deleteWeek(token, weekData.id.toString());
        setIsSaved(false);
        Alert.alert(
          isArabic ? 'نجاح' : 'Success', 
          isArabic ? 'تمت إزالة الأسبوع من العناصر المحفوظة' : 'Week removed from saved items'
        );
      }
    } catch (error: any) {
      console.error('Error saving/deleting week:', error);
      Alert.alert(
        isArabic ? 'خطأ' : 'Error', 
        error.response?.data?.error || (isArabic ? 'خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.' : 'Error processing your request. Please try again.')
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.setValue(offsetY);
  };

  const navbarOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.navbarContainer, { opacity: navbarOpacity }]} />
      <Navbar 
        scrollY={scrollY}
        variant="simple"
        style={styles.navbar}
        showLanguageToggle={true}
      />

      <ScrollView
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Buttons Container */}
        <View style={[
          styles.buttonsContainer, 
          isArabic ? [styles.buttonsContainerRTL] : [styles.buttonsContainerEN]
        ]}>
          {/* Save Button */}
          {isLoading ? (
            <ActivityIndicator size="small" color="#623AA2" />
          ) : (
            <TouchableOpacity 
              style={[
                styles.saveButton, 
                isSaved && styles.savedButton,
                isArabic && styles.saveButtonRTL
              ]} 
              onPress={handleSave}
              disabled={isSaving}
            >
              <MaterialIcons 
                name={isSaved ? "bookmark" : "bookmark-outline"} 
                size={24} 
                color={isSaved ? "#fff" : "#623AA2"} 
              />
              <Text style={[
                styles.saveButtonText, 
                isSaved && styles.savedButtonText,
                isArabic && styles.textRTL
              ]}>
                {isSaving 
                  ? (isArabic ? "جاري الحفظ..." : "Saving...") 
                  : (isSaved 
                    ? (isArabic ? 'تم الحفظ' : 'Saved') 
                    : (isArabic ? 'حفظ الأسبوع' : 'Save Week')
                  )
                }
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={[styles.titleContainer, isArabic && styles.titleContainerRTL]}>
          <Text style={[styles.title, isArabic && styles.textRTL]}>
            {isArabic ? weekData.title_ar : weekData.title}
          </Text>
          <Text style={[styles.subtitle, isArabic && styles.textRTL]}>
            {isArabic ? weekData.author_ar : weekData.author}
          </Text>
        </View>

        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image
            source={weekData.image}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </View>

        {/* Content */}
        <View style={[styles.contentContainer, isArabic && styles.contentContainerRTL]}>
          {/* Highlights Section */}
          <Text style={[styles.sectionTitle, isArabic && styles.textRTL]}>
            {isArabic ? weekData.body1Title_ar : weekData.body1Title}
          </Text>

          {/* Body Sections with Icons */}
          <View style={[styles.bodySection, isArabic && styles.bodySectionRTL]}>
            <Image source={weekData.image2} style={[styles.icon, isArabic && styles.iconRTL]} resizeMode="contain" />
            <View style={styles.textContainer}>
              <Text style={[styles.bodyTitle, isArabic && styles.textRTL]}>
                {isArabic ? weekData.body2Title_ar : weekData.body2Title}
              </Text>
              <Text style={[styles.bodyText, isArabic && styles.textRTL]}>
                {isArabic ? weekData.body2_ar : weekData.body2}
              </Text>
            </View>
          </View>

          <View style={[styles.bodySection, isArabic && styles.bodySectionRTL]}>
            <Image source={weekData.image3} style={[styles.icon, isArabic && styles.iconRTL]} resizeMode="contain" />
            <View style={styles.textContainer}>
              <Text style={[styles.bodyTitle, isArabic && styles.textRTL]}>
                {isArabic ? weekData.body3Title_ar : weekData.body3Title}
              </Text>
              <Text style={[styles.bodyText, isArabic && styles.textRTL]}>
                {isArabic ? weekData.body3_ar : weekData.body3}
              </Text>
            </View>
          </View>

          {/* Additional Sections */}
          <View style={[styles.bodySection, isArabic && styles.bodySectionNoIconRTL]}>
            <View style={styles.textContainer}>
              <Text style={[styles.bodyTitle, isArabic && styles.textRTL]}>
                {isArabic ? weekData.body4Title1_ar : weekData.body4Title1}
              </Text>
              <Text style={[styles.bodyText, isArabic && styles.textRTL]}>
                {isArabic ? weekData.body4Body1_ar : weekData.body4Body1}
              </Text>
            </View>
          </View>

          <View style={[styles.bodySection, isArabic && styles.bodySectionNoIconRTL]}>
            <View style={styles.textContainer}>
              <Text style={[styles.bodyTitle, isArabic && styles.textRTL]}>
                {isArabic ? weekData.body4Title2_ar : weekData.body4Title2}
              </Text>
              <Text style={[styles.bodyText, isArabic && styles.textRTL]}>
                {isArabic ? weekData.body4Body2_ar : weekData.body4Body2}
              </Text>
            </View>
          </View>

          {weekData.body4Title3 && (
            <View style={[styles.bodySection, isArabic && styles.bodySectionNoIconRTL]}>
              <View style={styles.textContainer}>
                <Text style={[styles.bodyTitle, isArabic && styles.textRTL]}>
                  {isArabic ? weekData.body4Title3_ar : weekData.body4Title3}
                </Text>
                <Text style={[styles.bodyText, isArabic && styles.textRTL]}>
                  {isArabic ? weekData.body4Body3_ar : weekData.body4Body3}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColors.light.background,
  },
  navbarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: NAVBAR_HEIGHT,
    backgroundColor: 'white',
    zIndex: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    height: NAVBAR_HEIGHT,
  },
  scrollView: {
    flex: 1,
    marginTop: NAVBAR_HEIGHT,
  },
  titleContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  titleContainerRTL: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#623AA2',
    marginBottom: 8,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '500',
    textAlign: 'left',
  },
  textRTL: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  mainImage: {
    width: 280,
    height: 280,
    marginVertical: 20,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  contentContainerRTL: {
    alignItems: 'flex-end',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4B0082',
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'left',
  },
  bodySection: {
    flexDirection: 'row',
    marginBottom: 28,
    alignItems: 'flex-start',
    paddingRight: 8,
  },
  bodySectionRTL: {
    flexDirection: 'row-reverse',
    paddingRight: 0,
    paddingLeft: 8,
  },
  bodySectionNoIconRTL: {
    alignItems: 'flex-end',
  },
  icon: {
    width: 70,
    height: 70,
    marginRight: 16,
    alignSelf: 'center',
  },
  iconRTL: {
    marginRight: 0,
    marginLeft: 16,
  },
  textContainer: {
    flex: 1,
  },
  bodyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B0082',
    marginBottom: 8,
    textAlign: 'left',
  },
  bodyText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    textAlign: 'left',
  },
  buttonsContainer: {
    position: 'absolute',
    zIndex: 3,
    alignItems: 'flex-end',
  },
  buttonsContainerEN: {
    top: SCREEN_HEIGHT * 0.16,
    right: 16,
  },
  buttonsContainerRTL: {
    top: SCREEN_HEIGHT * 0.14,
    left: 16,
    alignItems: 'flex-start',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(98, 58, 162, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#623AA2',
    marginBottom: 10,
  },
  saveButtonRTL: {
    flexDirection: 'row-reverse',
  },
  savedButton: {
    backgroundColor: '#623AA2',
    borderColor: '#623AA2',
  },
  saveButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#623AA2',
  },
  savedButtonText: {
    color: '#fff',
  },
});

export default PregnancyPage;
