import React, { useState, useMemo, useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ImageBackground, Animated, Dimensions, ViewStyle, TextStyle } from "react-native";
import Font from "../../../../../constants/Fonts";
import { alphabetData } from "data/babyNames";
import { theme } from "../../../../../constants/Colors1";
import { bgColors } from "@/constants/Colors";
import Navbar from '../../(navbar)/navbar';
import AlphabetList from './components/AlphabetList';
import NamesList from './components/NamesList';
import SaveButton from './components/SaveButton';
import { useBabyNames } from './hooks/useBabyNames';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const NAVBAR_HEIGHT = SCREEN_HEIGHT * 0.12;

// استخدام مكونات منفصلة لتجنب إعادة العرض الكاملة للصفحة
const PageHeader = React.memo(({ titleText }: { titleText: string }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.titleText}>{titleText}</Text>
  </View>
));

const WaveBG = React.memo(() => (
  <ImageBackground
    source={require('../../../../../assets/images/babyNames/svg.png')}
    style={styles.waveContainer}
    resizeMode="cover"
  />
));

const BabyNames = () => {
  const {
    selectedLetter,
    selectedNames,
    savedNamesByLetter,
    isUpdating,
    hasChanges,
    handleNameSelection,
    handleLetterChange,
    saveChanges
  } = useBabyNames();

  const scrollY = new Animated.Value(0);

  // تحسين أداء البحث عن الأسماء باستخدام useMemo
  const names = useMemo(() => {
    return alphabetData.find(section => section.letter === selectedLetter)?.names || [];
  }, [selectedLetter]);

  // تحسين العرض باستخدام useCallback لتجنب إعادة الإنشاء
  const headerComponent = useCallback(() => (
    <>
      <View style={styles.saveButtonContainer}>
        <SaveButton
          hasChanges={hasChanges}
          isUpdating={isUpdating}
          onSave={saveChanges}
        />
      </View>

      <WaveBG />
      
      <PageHeader titleText="Baby Names" />

      <View style={styles.content}>
        <AlphabetList
          data={alphabetData}
          selectedLetter={selectedLetter}
          onLetterChange={handleLetterChange}
        />

        <NamesList
          names={names}
          selectedNames={selectedNames}
          savedNamesByLetter={savedNamesByLetter}
          selectedLetter={selectedLetter}
          hasChanges={hasChanges}
          onNameSelection={handleNameSelection}
        />
      </View>
    </>
  ), [selectedLetter, selectedNames, savedNamesByLetter, hasChanges, isUpdating, handleLetterChange, handleNameSelection, saveChanges, names]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.navbarContainer, { 
        opacity: scrollY.interpolate({
          inputRange: [0, 50],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      }]}  />
      
      <Navbar 
        scrollY={scrollY}
        variant="simple"
        style={styles.navbar}
      />

      <Animated.FlatList
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        ListHeaderComponent={headerComponent}
        data={[]}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        removeClippedSubviews={true}
        windowSize={3}
      />
    </SafeAreaView>
  );
};

export default React.memo(BabyNames);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: bgColors.light.background,
  } as ViewStyle,
  waveContainer: {
    position: 'absolute',
    width: '100%',
    height: 210,
    top: 0,
    zIndex: -1,
  },
  titleContainer: {
    width: '100%',
    paddingVertical:15,
    marginVertical:50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: Font["raleway"],
    fontSize: 40,
    fontWeight: '800',
    color: theme.colors.secondary,
  } as TextStyle,
  content: {
    flex: 1,
    zIndex: 1,
    paddingBottom: 20,
  },
  alphabetList: {
    maxHeight: 100,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  letterItem: {
    width: 90,
    height: 80,
    margin: 5,
    borderRadius: 30,
    overflow: 'hidden',
  } as ViewStyle,
  letterBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  letterBackgroundImage: {
    borderRadius: 10,
  },
  letterTextContainer: {
    borderRadius: 15,
    padding: 8,
  } as ViewStyle,
  letterText: {
    fontFamily: Font["raleway"],
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  } as TextStyle,
  selectedLetter: {
    borderWidth: 2,
    borderColor: '#4A90E2',
  } as ViewStyle,
  selectedLetterText: {
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderRadius: 15,
    padding: 8,
    color: theme.colors.secondary,
  },
  namesContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    marginHorizontal: 10,
    padding: 10,
  } as ViewStyle,
  namesGrid: {
    padding: 5,
    paddingBottom: 20,
  },
  nameItem: {
    flex: 1,
    margin: 5,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nameTxt: {
    fontFamily: Font["raleway"],
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  genderIcon: {
    width: 24,
    height: 24,
  },
  defaultBackground: {
    backgroundColor: theme.colors.secondary,
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
  saveButtonContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.025,
    right: 16,
    zIndex: 3,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  } as ViewStyle,
});

