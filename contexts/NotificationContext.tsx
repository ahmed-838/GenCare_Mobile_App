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
      console.log('[NotificationContext] Attempting to fetch notifications');
      return await NotificationService.getNotifications();
    } catch (error) {
      logError('Error in safelyFetchNotifications', error);
      return [];
    }
  };

  // Load auth state and notifications
  useEffect(() => {
    const loadInitialData = async () => {
      console.log('[NotificationContext] Loading initial data');
      try {
        const authStatus = await isAuthenticated();
        console.log('[NotificationContext] Auth status:', authStatus);
        setIsLoggedIn(authStatus);
        
        if (authStatus) {
          try {
            console.log('[NotificationContext] User is authenticated, fetching notifications');
            await fetchNotifications();
          } catch (error) {
            logError('Error fetching initial notifications', error);
            // Use mock data as fallback
            setNotifications(mockNotifications);
            setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
          }
        } else {
          console.log('[NotificationContext] User is not authenticated, using mock data');
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
        console.log('[NotificationContext] Initial data loading completed');
      }
    };
    
    loadInitialData();
  }, []);

  // Handle login - update to authenticated state
  const login = useCallback(async () => {
    console.log('[NotificationContext] Login called');
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
    console.log('[NotificationContext] Logout called');
    setIsLoggedIn(false);
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
  }, []);

  // Set up polling for notifications if user is logged in
  useEffect(() => {
    if (!isLoggedIn || !pollingActive || !isInitialized) {
      console.log('[NotificationContext] Polling not active:', { isLoggedIn, pollingActive, isInitialized });
      return;
    }

    console.log('[NotificationContext] Setting up notification polling');
    const fetchUnreadCount = async () => {
      try {
        // Only fetch the count, which is more efficient than fetching all notifications
        const count = await NotificationService.getUnreadCount();
        console.log('[NotificationContext] Unread count:', count, 'Current:', unreadCount);
        
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
    console.log('[NotificationContext] Polling interval set up');
    
    // Clean up on unmount
    return () => {
      console.log('[NotificationContext] Cleaning up polling interval');
      clearInterval(intervalId);
    };
  }, [isLoggedIn, pollingActive, unreadCount, isInitialized]);

  // Calculate unread count when notifications change
  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.isRead).length);
  }, [notifications]);

  // Fetch notifications from API
  const fetchNotifications = useCallback(async () => {
    console.log('[NotificationContext] fetchNotifications called, isLoggedIn:', isLoggedIn);
    if (!isLoggedIn) {
      console.log('[NotificationContext] Not logged in, using mock data');
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      console.log('[NotificationContext] Fetching notifications from API');
      const data = await safelyFetchNotifications();
      console.log('[NotificationContext] Notifications received:', data.length);
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
    console.log('[NotificationContext] Marking notification as read:', notificationId);
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
    console.log('[NotificationContext] Marking all notifications as read');
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
    console.log('[NotificationContext] Clearing all notifications');
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
    console.log('[NotificationContext] Setting up AppState listener');
    const handleAppStateChange = (nextAppState: string) => {
      console.log('[NotificationContext] App state changed to:', nextAppState);
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
      console.log('[NotificationContext] Cleaning up AppState listener');
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