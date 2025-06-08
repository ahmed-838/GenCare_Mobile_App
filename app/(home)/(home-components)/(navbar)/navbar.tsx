import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Animated, Text, Dimensions, Platform, StatusBar, Modal, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { bgColors } from '@/constants/Colors';
import MenuModal from './MenuModal';
import NotificationsModal from '../(Notifications)/NotificationsModal';
import { DIMENSIONS } from './styles';
import { NavbarProps, ScrollHandler, Notification, MenuItem } from './types';
import constants, { MENU_ITEMS } from './constants';
import { isAuthenticated } from '@/utils/auth';
import * as SecureStore from 'expo-secure-store';
import * as NotificationService from '@/utils/notificationService';
import { useNotifications } from '@/contexts/NotificationContext';
import { useLanguage } from '@/contexts/LanguageContext';

const { mockNotifications } = constants;

export default function Navbar({ 
  scrollY, 
  variant = 'default',
  showNotifications = true,
  showProfile = true,
  showLanguageToggle = false, // Hidden by default
  customLogo,
  onNotificationPress 
}: NavbarProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const { language, toggleLanguage } = useLanguage();
  
  // Use notification context for real-time updates
  const { 
    notifications, 
    isLoading, 
    unreadCount, 
    fetchNotifications, 
    markAsRead, 
    markAllAsRead, 
    clearAll, 
    isLoggedIn,
    logout
  } = useNotifications();
  
  const animations = useRef({
    rotate: new Animated.Value(0),
    scale: new Animated.Value(1),
    menu: new Animated.Value(0)
  }).current;

  // Fetch notifications when component mounts
  useEffect(() => {
    fetchNotifications();
  }, []);
  
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      // Update notification context
      logout();
      setIsMenuOpen(false);
      router.replace('/(home)/home');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const authButtons = isLoggedIn 
    ? [{ 
        icon: 'log-out-outline', 
        title: 'Sign Out',
        description: 'Exit your account',
        onPress: handleLogout
      }]
    : [
        { 
          icon: 'log-in-outline',
          title: 'Sign In',
          description: 'Access your account',
          onPress: () => router.push('/(auth)/login')
        }
      ];

  const handleClearNotifications = useCallback(async () => {
    clearAll();
  }, [clearAll]);

  const handleMarkAllAsRead = useCallback(async () => {
    markAllAsRead();
  }, [markAllAsRead]);

  const handleNotificationPress = useCallback(async (notification: Notification) => {
    await markAsRead(notification.id);
    setIsNotificationsOpen(false);
  }, [markAsRead]);

  const handleMenuPress = useCallback((route?: string) => {
    if (route) {
      router.push(route as any);
    }
    setIsMenuOpen(false);
  }, [router]);

  // تحسين أنيميشن القائمة
  const toggleMenu = useCallback(() => {
    const toValue = isMenuOpen ? 0 : 1;
    
    Animated.parallel([
      Animated.spring(animations.rotate, {
        toValue,
        useNativeDriver: true,
        tension: 40,
        friction: 7
      }),
      Animated.spring(animations.scale, {
        toValue: isMenuOpen ? 1 : 1.1,
        useNativeDriver: true,
        tension: 40,
        friction: 7
      }),
      Animated.timing(animations.menu, {
        toValue,
        duration: 300,
        useNativeDriver: true
      })
    ]).start();

    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen, animations]);

  // حساب التحويلات للأنيميشن
  const navbarTranslateY = Animated.diffClamp(scrollY, 0, DIMENSIONS.NAVBAR_HEIGHT).interpolate({
    inputRange: [0, DIMENSIONS.NAVBAR_HEIGHT],
    outputRange: [0, -(DIMENSIONS.NAVBAR_HEIGHT + DIMENSIONS.STATUSBAR_HEIGHT + 20)],
  });

  const menuRotate = animations.rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  // تصفية عناصر القائمة حسب صلاحيات المستخدم
  const filteredMenuItems = MENU_ITEMS.filter(item => {
    if (item.adminOnly) {
      return isAdmin;
    }
    return true;
  });

  return (
    <Animated.View style={[styles.mainContainer, { transform: [{ translateY: navbarTranslateY }] }]}>
      <View style={styles.navbar}>
        <View style={styles.container}>
          {/* القائمة - تظهر فقط في النمط الافتراضي */}
          {variant === 'default' && (
            <View style={styles.leftContainer}>
              <TouchableOpacity onPress={toggleMenu} style={styles.iconButton}>
                <Animated.View style={{ transform: [{ rotate: menuRotate }] }}>
                  <Ionicons 
                    name={isMenuOpen ? "close" : "menu"} 
                    size={28}
                    color="#623AA2"
                  />
                </Animated.View>
              </TouchableOpacity>
            </View>
          )}

          {/* الشعار - قابل للضغط الآن */}
          <TouchableOpacity 
            style={[
              styles.logoContainer,
              variant === 'simple' && styles.logoContainerSimple
            ]}
            onPress={() => router.push('/home')}
            activeOpacity={0.7}
          >
            <Image 
              source={customLogo || require('@/assets/Logo/Mob-Logo-removebg-preview.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* حاوية الأزرار اليمنى */}
          <View style={styles.rightContainer}>
            {/* زر تغيير اللغة */}
            {showLanguageToggle && (
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={toggleLanguage}
              >
                <View style={styles.notificationContainer}>
                  <Ionicons 
                    name="globe-outline" 
                    size={28}
                    color="#623AA2"
                  />
                  <View style={styles.langBadge}>
                    <Text style={styles.langBadgeText}>
                      {language === 'en' ? 'AR' : 'EN'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}

            {showNotifications && (
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => setIsNotificationsOpen(true)}
              >
                <View style={styles.notificationContainer}>
                  <Ionicons 
                    name="notifications-outline" 
                    size={28}
                    color="#623AA2"
                  />
                  {unreadCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{unreadCount}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            )}

            {showProfile && (
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => router.push('/(home)/(home-components)/(pages-components)/(profile-pages-components)')}
              >
                <Ionicons 
                  name="person-circle-outline" 
                  size={28}
                  color="#623AA2"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* القائمة المنسدلة */}
      <MenuModal 
        isVisible={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuItems={filteredMenuItems}
        authButtons={authButtons}
        animations={{
          menu: animations.menu,
          scale: animations.scale
        }}
        onMenuPress={handleMenuPress}
      />

      {/* مودال الإشعارات */}
      <NotificationsModal 
        isVisible={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: DIMENSIONS.NAVBAR_HEIGHT + DIMENSIONS.STATUSBAR_HEIGHT,
  },
  navbar: {
    height: DIMENSIONS.NAVBAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DIMENSIONS.SCREEN_WIDTH * 0.04, // 4% من عرض الشاشة
    marginTop: DIMENSIONS.STATUSBAR_HEIGHT,
    borderRadius: Math.min(DIMENSIONS.SCREEN_WIDTH * 0.02, 10), // حد أقصى 10
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: DIMENSIONS.SCREEN_WIDTH * 0.02, // 2% من عرض الشاشة
  },
  leftContainer: {
    position: 'relative',
    width: DIMENSIONS.SCREEN_WIDTH * 0.1, // 10% من عرض الشاشة
    minWidth: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
  },
  menuItemsContainer: {
    position: 'absolute',
    left: DIMENSIONS.SCREEN_WIDTH * 0.05,
    top: DIMENSIONS.NAVBAR_HEIGHT + DIMENSIONS.STATUSBAR_HEIGHT + 10,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 12,
    padding: DIMENSIONS.SCREEN_WIDTH * 0.02, // استجابة للشاشة
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    width: Math.min(DIMENSIONS.SCREEN_WIDTH * 0.7, 280), // تقليل العرض
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: DIMENSIONS.SCREEN_WIDTH * 0.02, // استجابة للشاشة
    borderRadius: 8,
    marginVertical: 2, // تقليل المسافات
  },
  menuIconContainer: {
    width: Math.min(DIMENSIONS.SCREEN_WIDTH * 0.08, 32), // استجابة للشاشة
    height: Math.min(DIMENSIONS.SCREEN_WIDTH * 0.08, 32),
    borderRadius: Math.min(DIMENSIONS.SCREEN_WIDTH * 0.04, 16),
    backgroundColor: 'rgba(98, 58, 162, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: Math.min(DIMENSIONS.SCREEN_WIDTH * 0.035, 14), // استجابة للشاشة
    fontWeight: '600',
    color: '#333',
    marginBottom: 1,
  },
  menuDescription: {
    fontSize: Math.min(DIMENSIONS.SCREEN_WIDTH * 0.03, 11), // استجابة للشاشة
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 4, // تقليل المسافات
    marginHorizontal: 2,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(98, 58, 162, 0.1)',
  },
  notificationContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: bgColors.light.background,
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#623AA2',
  },
  badgeText: {
    color: '#623AA2',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 16,
    justifyContent: 'center',
  },
  logoContainerSimple: {
    position: 'relative',
    left: 0,
    right: 0,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    transform: [{ scale: 1 }],
  },
  logoImage: {
    width: Math.min(DIMENSIONS.SCREEN_WIDTH * 0.2, 80),
    height: Math.min(DIMENSIONS.SCREEN_WIDTH * 0.2, 80),
  },
  langBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: bgColors.light.background,
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#623AA2',
  },
  langBadgeText: {
    color: '#623AA2',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 16,
    justifyContent: 'center',
  },
});
