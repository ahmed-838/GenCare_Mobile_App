import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { FlatList } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { BabyName } from '@/data/babyNames';
import Font from '@/constants/Fonts';

interface NamesListProps {
  names: BabyName[];
  selectedNames: BabyName[];
  savedNamesByLetter: Record<string, BabyName[]>;
  selectedLetter: string;
  hasChanges: boolean;
  onNameSelection: (name: BabyName) => void;
}

const NamesList: React.FC<NamesListProps> = ({
  names,
  selectedNames,
  savedNamesByLetter,
  selectedLetter,
  hasChanges,
  onNameSelection
}) => {
  const isNameSaved = (name: BabyName) => {
    return savedNamesByLetter[selectedLetter]?.some(
      saved => saved.name === name.name
    );
  };

  const renderNameItem = ({ item }: { item: BabyName }) => {
    const saved = isNameSaved(item);
    const isSelected = selectedNames.includes(item);
    
    return (
      <TouchableOpacity 
        onPress={() => onNameSelection(item)}
        style={[
          styles.nameItem,
          saved && styles.savedNameItem,
          isSelected && !saved && styles.selectedNameItem,
          hasChanges && isSelected && styles.updatingNameItem
        ]}
      >
        <View style={styles.nameContent}>
          <Ionicons 
            name={item.gender === 'M' ? 'male' : 'female'} 
            size={16} 
            color={item.gender === 'M' ? '#95cae4' : '#ffb9cc'} 
          />
          <Text style={[
            styles.nameText,
            { color: item.gender === 'M' ? '#95cae4' : '#ffb9cc' }
          ]}>
            {item.name}
          </Text>
        </View>
        {(saved || isSelected) && (
          <Ionicons 
            name="checkmark-circle" 
            size={20} 
            color={saved ? '#623AA2' : '#4CAF50'} 
            style={styles.checkmark}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.namesContainer}>
      <FlatList
        data={names}
        renderItem={renderNameItem}
        keyExtractor={item => item.name}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.namesGrid}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  namesContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  namesGrid: {
    paddingBottom: 20,
  },
  nameItem: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  savedNameItem: {
    backgroundColor: 'rgba(98, 58, 162, 0.1)',
    borderColor: '#623AA2',
    borderWidth: 1,
  },
  selectedNameItem: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  updatingNameItem: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  checkmark: {
    position: 'absolute',
    right: 10,
  },
});

export default NamesList; 