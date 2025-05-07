import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground, ViewStyle, TextStyle } from 'react-native';
import { FlatList } from 'react-native';
import { getLetterGif } from 'data/BabyGifs';
import { theme } from '@/constants/Colors1';
import Font from '@/constants/Fonts';
import { AlphabetSection } from '../types';

interface AlphabetListProps {
  data: AlphabetSection[];
  selectedLetter: string;
  onLetterChange: (letter: string) => void;
}

const AlphabetList: React.FC<AlphabetListProps> = ({
  data,
  selectedLetter,
  onLetterChange
}) => {
  const renderAlphabetItem = ({ item }: { item: AlphabetSection }) => {
    const isSelected = selectedLetter === item.letter;
    const imageSource = getLetterGif(item.letter);

    return (
      <TouchableOpacity
        onPress={() => onLetterChange(item.letter)}
        style={[styles.letterItem, isSelected && styles.selectedLetter]}
      >
        {!isSelected ? (
          <ImageBackground
            source={imageSource}
            style={styles.letterBackground}
            imageStyle={styles.letterBackgroundImage}
            resizeMode="cover"
            progressiveRenderingEnabled={true}
          />
        ) : (
          <View style={[styles.letterBackground, styles.defaultBackground]}>
            <View style={styles.letterTextContainer}>
              <Text style={[styles.letterText, styles.selectedLetterText]}>
                {item.letter}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={renderAlphabetItem}
      keyExtractor={item => item.letter}
      style={styles.alphabetList}
    />
  );
};

const styles = StyleSheet.create({
  alphabetList: {
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  letterItem: {
    width: 60,
    height: 60,
    margin: 5,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  selectedLetter: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  letterBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterBackgroundImage: {
    borderRadius: 30,
  },
  defaultBackground: {
    backgroundColor: theme.colors.primary,
  },
  letterTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: Font.raleway,
  },
  selectedLetterText: {
    color: '#fff',
  },
});

export default AlphabetList; 