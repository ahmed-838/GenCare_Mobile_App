import { Animated, ViewStyle } from 'react-native';

export interface NavbarProps {
  scrollY: Animated.Value;
  variant?: 'default' | 'simple';
  showNotifications?: boolean;
  showProfile?: boolean;
  showLanguageToggle?: boolean;
  customLogo?: any;
  onNotificationPress?: () => void;
  style?: ViewStyle;
}

export interface MenuItem {
  icon: string;
  title: string;
  description: string;
  route?: string;
  adminOnly?: boolean;
  onPress?: () => void;
}

export interface Notification {
  id: number | string;
  icon: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

export type ScrollHandler = (event: any) => void;

// تصدير كل الأنواع في كائن واحد
const types = {
  // NavbarProps,
  // MenuItem,
  // Notification,
  // ScrollHandler,
};

export default types; 
