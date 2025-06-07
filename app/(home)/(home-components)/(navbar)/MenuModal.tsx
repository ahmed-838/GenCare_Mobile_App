import React from 'react';
import { View, TouchableOpacity, Text, Modal, TouchableWithoutFeedback, Animated, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MenuItem } from './types';

interface MenuModalProps {
  isVisible: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  authButtons: MenuItem[];
  animations: {
    menu: Animated.Value;
    scale: Animated.Value;
  };
  onMenuPress: (route?: string) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
  },
  menuItemsContainer: {
    position: 'absolute',
    left: SCREEN_WIDTH * 0.05,
    top: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 12,
    padding: 8,
    width: Math.min(SCREEN_WIDTH * 0.7, 280),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(98, 58, 162, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  menuDescription: {
    fontSize: 12,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 4,
  },
});

export default function MenuModal({
  isVisible,
  onClose,
  menuItems,
  authButtons,
  animations,
  onMenuPress
}: MenuModalProps) {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <Animated.View 
              style={[
                styles.menuItemsContainer,
                {
                  opacity: animations.menu,
                  transform: [{ scale: animations.scale }]
                }
              ]}
            >
              {menuItems.map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.menuItem}
                  onPress={() => onMenuPress(item.route)}
                >
                  <View style={styles.menuIconContainer}>
                    <Ionicons 
                      name={item.icon as any} 
                      size={24}
                      color="#623AA2"
                    />
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuDescription}>{item.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              
              <View style={styles.divider} />
              
              {authButtons.map((item, index) => (
                <TouchableOpacity 
                  key={`auth-${index}`}
                  style={styles.menuItem}
                  onPress={item.onPress}
                >
                  <View style={styles.menuIconContainer}>
                    <Ionicons 
                      name={item.icon as any} 
                      size={24}
                      color="#623AA2"
                    />
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuDescription}>{item.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
} 