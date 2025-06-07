import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground, ViewStyle, TextStyle, Animated } from 'react-native';
import { FlatList } from 'react-native';
import { theme } from '@/constants/Colors1';
import Font from '@/constants/Fonts';
import { AlphabetSection } from '../types';
import { LinearGradient } from 'expo-linear-gradient';

interface AlphabetListProps {
  data: AlphabetSection[];
  selectedLetter: string;
  onLetterChange: (letter: string) => void;
}

const getLetterColors = (letter: string): string[] => {
  const colors: Record<string, string[]> = {
    A: ['#FFA500', '#FF8C00'],  // برتقالي
    B: ['#4169E1', '#1E90FF'],  // أزرق
    C: ['#32CD32', '#3CB371'],  // أخضر
    D: ['#FF6347', '#FF4500'],  // أحمر
    E: ['#9370DB', '#8A2BE2'],  // بنفسجي
    F: ['#FFD700', '#FFA07A'],  // ذهبي
    G: ['#20B2AA', '#48D1CC'],  // تركواز
    H: ['#FF69B4', '#FF1493'],  // وردي
    I: ['#1E90FF', '#00BFFF'],  // أزرق سماوي
    J: ['#32CD32', '#00FA9A'],  // أخضر فاتح
    K: ['#FF8C00', '#FF4500'],  // برتقالي محمر
    L: ['#9932CC', '#8B008B'],  // أرجواني
    M: ['#008000', '#006400'],  // أخضر غامق
    N: ['#00CED1', '#40E0D0'],  // فيروزي
    O: ['#FF69B4', '#DB7093'],  // وردي زاهي
    P: ['#00008B', '#0000CD'],  // أزرق غامق
    Q: ['#BDB76B', '#DAA520'],  // خاكي
    R: ['#DC143C', '#B22222'],  // أحمر داكن
    S: ['#4169E1', '#00BFFF'],  // أزرق ملكي
    T: ['#008080', '#20B2AA'],  // أزرق مخضر
    U: ['#9400D3', '#8B008B'],  // بنفسجي غامق
    V: ['#FF4500', '#FF6347'],  // أحمر برتقالي
    W: ['#00FF7F', '#3CB371'],  // أخضر ربيعي
    X: ['#191970', '#000080'],  // كحلي
    Y: ['#FFD700', '#FFFF00'],  // أصفر
    Z: ['#800000', '#A52A2A'],  // بني محمر
  };

  return colors[letter] || ['#7B68EE', '#6A5ACD']; 
};

const LetterItem = React.memo(({ 
  letter, 
  isSelected, 
  onPress 
}: { 
  letter: string; 
  isSelected: boolean; 
  onPress: () => void;
}) => {
  const gradientColors = getLetterColors(letter);

  const renderContent = () => {
    if (isSelected) {
      return (
        <View style={[styles.letterBackground, styles.selectedBackground]}>
          <Text style={[styles.letterText, styles.selectedLetterText]}>
            {letter}
          </Text>
        </View>
      );
    } else {
      return (
        <LinearGradient
          colors={gradientColors as any}
          style={styles.letterBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.letterTextContainer}>
            <Text style={[styles.letterText, { color: 'white' }]}>
              {letter}
            </Text>
          </View>
        </LinearGradient>
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.letterItem, isSelected && styles.selectedLetter]}
      activeOpacity={0.7}
    >
      {renderContent()}
    </TouchableOpacity>
  );
});

const AlphabetList: React.FC<AlphabetListProps> = ({
  data,
  selectedLetter,
  onLetterChange
}) => {
  const flatListRef = useRef<FlatList>(null);
  
  const selectedIndex = data.findIndex(item => item.letter === selectedLetter);

  const renderAlphabetItem = ({ item }: { item: AlphabetSection }) => {
    const isSelected = selectedLetter === item.letter;
    
    return (
      <LetterItem
        letter={item.letter}
        isSelected={isSelected}
        onPress={() => onLetterChange(item.letter)}
      />
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={renderAlphabetItem}
      keyExtractor={item => item.letter}
      style={styles.alphabetList}
      initialNumToRender={8}  
      maxToRenderPerBatch={5} 
      windowSize={7} 
      getItemLayout={(data, index) => (
        {length: 70, offset: 70 * index, index} 
      )}
      
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
      }}
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
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
    backgroundColor: '#f0f0f0',
  },
  selectedBackground: {
    backgroundColor: theme.colors.primary,
  },
  letterTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  letterText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: Font.raleway,
  },
  selectedLetterText: {
    color: '#fff',
  },
});

export default React.memo(AlphabetList); 