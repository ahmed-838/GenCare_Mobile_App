import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Notification } from '@/app/(home)/(home-components)/(navbar)/types';
import * as NotificationService from '@/utils/notificationService';
import { isAuthenticated } from '@/utils/auth';
import constants from '@/app/(home)/(home-components)/(navbar)/constants';
import { AppState, Platform } from 'react-native';

// إضافة وظيفة تسجيل أخطاء مفصلة
const logError = (message: string, error: any) => {
  console.error(`[NotificationContext] ${message}:`, error);
  
  // تسجيل تفاصيل إضافية للأخطاء
  if (error.response) {
    // خطأ استجابة من الخادم
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);
  } else if (error.request) {
    // تم إرسال الطلب لكن لم يتم استلام استجابة
    console.error('Request sent but no response received');
    console.error('Request details:', error.request);
  } else {
    // حدث خطأ أثناء إعداد الطلب
    console.error('Error details:', error.message);
  }
  
  // تسجيل معلومات النظام
  console.error('Platform:', Platform.OS, Platform.Version);
};

const { mockNotifications } = constants;

// How often to check for new notifications (in milliseconds)
const POLLING_INTERVAL = 30000; // 30 seconds

type NotificationContextType = {
  notifications: Notification[];
  isLoading: boolean;
  unreadCount: number;
  fetchNotifications: () => Promise<void>;
  markAsRead: (notificationId: string | number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  clearAll: () => Promise<void>;
  isLoggedIn: boolean;
  logout: () => void;
  login: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pollingActive, setPollingActive] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // محاولة التعامل مع الأخطاء بشكل آمن
  const safelyFetchNotifications = async () => {
    try {
      return await NotificationService.getNotifications();
    } catch (error) {
      logError('Error in safelyFetchNotifications', error);
      return [];
    }
  };

  // Load auth state and notifications
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const authStatus = await isAuthenticated();
        setIsLoggedIn(authStatus);
        
        if (authStatus) {
          try {
            await fetchNotifications();
          } catch (error) {
            logError('Error fetching initial notifications', error);
            // Use mock data as fallback
            setNotifications(mockNotifications);
            setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
          }
        } else {
          // Use mock data for non-logged in users
          setNotifications(mockNotifications);
          setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
        }
      } catch (error) {
        logError('Error initializing notification context', error);
        // Use mock data as fallback
        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };
    
    loadInitialData();
  }, []);

  // Handle login - update to authenticated state
  const login = useCallback(async () => {
    setIsLoggedIn(true);
    try {
      setIsLoading(true);
      await fetchNotifications();
    } catch (error) {
      logError('Error fetching notifications after login', error);
      // Use mock data as fallback
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle logout - reset to non-authenticated state
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
  }, []);

  // Set up polling for notifications if user is logged in
  useEffect(() => {
    if (!isLoggedIn || !pollingActive || !isInitialized) {
    }

    const fetchUnreadCount = async () => {
      try {
        // Only fetch the count, which is more efficient than fetching all notifications
        const count = await NotificationService.getUnreadCount();
        
        // If the count changed, refresh the full notifications list
        if (count !== unreadCount) {
          setUnreadCount(count);
          await fetchNotifications();
        }
      } catch (error) {
        logError('Error polling unread count', error);
      }
    };

    // Initial fetch
    fetchUnreadCount();
    
    // Set up polling interval
    const intervalId = setInterval(fetchUnreadCount, POLLING_INTERVAL);
    
    // Clean up on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [isLoggedIn, pollingActive, unreadCount, isInitialized]);

  // Calculate unread count when notifications change
  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.isRead).length);
  }, [notifications]);

  // Fetch notifications from API
  const fetchNotifications = useCallback(async () => {
    if (!isLoggedIn) {
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      const data = await safelyFetchNotifications();
      setNotifications(data);
    } catch (error) {
      logError('Error fetching notifications', error);
      // Don't change existing notifications on error
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  // Mark a notification as read
  const markAsRead = useCallback(async (notificationId: string | number) => {
    // Update local state first for better UX
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
    
    if (isLoggedIn) {
      try {
        await NotificationService.markAsRead(String(notificationId));
      } catch (error) {
        logError(`Error marking notification ${notificationId} as read`, error);
        // No need to revert state, as it's not critical if the API call fails
      }
    }
  }, [isLoggedIn]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    // Update local state first for better UX
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
    
    if (isLoggedIn) {
      try {
        await NotificationService.markAllAsRead();
      } catch (error) {
        logError('Error marking all notifications as read', error);
        // No need to revert state, as it's not critical if the API call fails
      }
    }
  }, [isLoggedIn]);

  // Clear all notifications
  const clearAll = useCallback(async () => {
    // Update local state first for better UX
    setNotifications([]);
    setUnreadCount(0);
    
    if (isLoggedIn) {
      try {
        await NotificationService.deleteAllNotifications();
      } catch (error) {
        logError('Error clearing all notifications', error);
        // No need to revert state, as it's not critical if the API call fails
      }
    }
  }, [isLoggedIn]);

  // Enable/disable polling when app goes to background/foreground
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active') {
        setPollingActive(true);
        if (isInitialized) {
          fetchNotifications().catch(error => {
            logError('Error refreshing notifications on app resume', error);
          });
        }
      } else {
        setPollingActive(false);
      }
    };

    // Add AppState listener
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    return () => {
      subscription.remove();
    };
  }, [fetchNotifications, isInitialized]);

  const value = {
    notifications,
    isLoading,
    unreadCount,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    clearAll,
    isLoggedIn,
    logout,
    login,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext; 