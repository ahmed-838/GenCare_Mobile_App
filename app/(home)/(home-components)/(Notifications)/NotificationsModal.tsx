import React from 'react';
import { View, TouchableOpacity, Text, Modal, TouchableWithoutFeedback, Animated, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Notification } from '../(navbar)/types';
import { router } from 'expo-router';
import { useNotifications } from '@/contexts/NotificationContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Promotional notifications for non-logged in users
const promotionalNotifications: Notification[] = [
  {
    id: 'promo1',
    title: 'Welcome to GenCare!',
    description: 'Create an account to track your pregnancy journey and access personalized health insights.',
    time: 'Just now',
    isRead: false,
    icon: 'heart-circle-outline',
  },
  {
    id: 'promo2',
    title: 'Unlock Premium Features',
    description: 'Join us to access weekly updates, AI analysis, and health monitoring tools.',
    time: '2 min ago',
    isRead: false,
    icon: 'star-outline',
  },
  {
    id: 'promo3',
    title: 'Your Pregnancy Journey Awaits',
    description: 'Sign up to save your pregnancy information and track your baby\'s development.',
    time: '5 min ago',
    isRead: false,
    icon: 'calendar-outline',
  },
  {
    id: 'promo4',
    title: 'Free Health Assessment',
    description: 'Create an account now to receive a personalized health assessment and recommendations.',
    time: '10 min ago',
    isRead: false,
    icon: 'medkit-outline',
  },
];

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
  },
  menuItemsContainer: {
    position: 'absolute',
    right: SCREEN_WIDTH * 0.05,
    top: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    width: Math.min(SCREEN_WIDTH * 0.85, 340),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  notificationsContainer: {
    maxHeight: '80%',
  },
  notificationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  notificationsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  clearButton: {
    color: '#623AA2',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContainer: {
    maxHeight: 400,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  unreadNotification: {
    backgroundColor: 'rgba(98, 58, 162, 0.05)',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(98, 58, 162, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  notificationTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 6,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#623AA2',
    position: 'absolute',
    top: 16,
    right: 16,
  },
  emptyNotifications: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    marginBottom: 12,
    opacity: 0.5,
  },
  emptyText: {
    color: '#666',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 20,
  },
  emptySubText: {
    color: '#999',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
  signInButton: {
    backgroundColor: '#623AA2',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  guestText: {
    backgroundColor: 'rgba(98, 58, 162, 0.1)',
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  guestTextContent: {
    color: '#623AA2',
    fontSize: 12,
    textAlign: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface NotificationsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function NotificationsModal({
  isVisible,
  onClose,
}: NotificationsModalProps) {
  // Use the notification context
  const {
    notifications,
    isLoading,
    isLoggedIn,
    markAsRead,
    markAllAsRead,
    clearAll,
    unreadCount,
  } = useNotifications();
  
  // Determine which notifications to show based on login status
  const notificationsToShow = isLoggedIn ? notifications : promotionalNotifications;
  
  // Check if there are any unread notifications
  const hasUnreadNotifications = unreadCount > 0;
  
  const handleSignInPress = () => {
    onClose(); // Close the modal
    router.push('/(auth)/login'); // Navigate to login page
  };
  
  const handlePromoNotificationPress = (notification: Notification) => {
    onClose(); // Close the modal
    router.push('/(auth)/signup'); // Navigate to signup page
  };
  
  const handleNotificationPress = (notification: Notification) => {
    if (isLoggedIn) {
      markAsRead(notification.id);
    }
    onClose();
  };

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
            <Animated.View style={[styles.menuItemsContainer, styles.notificationsContainer]}>
              <View style={styles.notificationsHeader}>
                <Text style={styles.notificationsTitle}>Notifications</Text>
                <View style={styles.headerButtons}>
                  {isLoggedIn && hasUnreadNotifications && (
                    <TouchableOpacity onPress={markAllAsRead} style={styles.headerButton}>
                      <Text style={styles.clearButton}>Mark all read</Text>
                    </TouchableOpacity>
                  )}
                  {isLoggedIn && notifications.length > 0 && (
                    <TouchableOpacity onPress={clearAll} style={styles.headerButton}>
                      <Text style={styles.clearButton}>Clear all</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              
              {!isLoggedIn && (
                <View style={styles.guestText}>
                  <Text style={styles.guestTextContent}>
                    Create an account to receive personalized notifications about your pregnancy journey
                  </Text>
                </View>
              )}
              
              <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {isLoading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#623AA2" />
                  </View>
                ) : notificationsToShow.length > 0 ? (
                  notificationsToShow.map((notification) => (
                    <TouchableOpacity 
                      key={notification.id}
                      style={[
                        styles.menuItem,
                        !notification.isRead && styles.unreadNotification
                      ]}
                      onPress={() => isLoggedIn 
                        ? handleNotificationPress(notification) 
                        : handlePromoNotificationPress(notification)
                      }
                    >
                      <View style={styles.menuIconContainer}>
                        <Ionicons 
                          name={notification.icon as any}
                          size={20}
                          color="#623AA2"
                        />
                      </View>
                      <View style={styles.menuTextContainer}>
                        <Text style={styles.menuTitle}>{notification.title}</Text>
                        <Text style={styles.menuDescription}>{notification.description}</Text>
                        <Text style={styles.notificationTime}>{notification.time}</Text>
                      </View>
                      {!notification.isRead && <View style={styles.unreadDot} />}
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={styles.emptyNotifications}>
                    <Ionicons 
                      name="notifications-off-outline"
                      size={40}
                      color="#999"
                      style={styles.emptyIcon}
                    />
                    <Text style={styles.emptyText}>No notifications yet</Text>
                    <Text style={styles.emptySubText}>We'll notify you when something arrives</Text>
                  </View>
                )}
              </ScrollView>
              
              {!isLoggedIn && (
                <View style={{ padding: 16 }}>
                  <TouchableOpacity style={styles.signInButton} onPress={handleSignInPress}>
                    <Text style={styles.signInButtonText}>Sign in or Create Account</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
} 