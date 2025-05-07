import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Notification } from '@/app/(home)/(home-components)/(navbar)/types';
import * as NotificationService from '@/utils/notificationService';
import { isAuthenticated } from '@/utils/auth';
import constants from '@/app/(home)/(home-components)/(navbar)/constants';
import { AppState } from 'react-native';

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

  // Load auth state and notifications
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const authStatus = await isAuthenticated();
        setIsLoggedIn(authStatus);
        
        if (authStatus) {
          await fetchNotifications();
        } else {
          // Use mock data for non-logged in users
          setNotifications(mockNotifications);
          setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error initializing notification context:', error);
        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
        setIsLoading(false);
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
      console.error('Error fetching notifications after login:', error);
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
    if (!isLoggedIn || !pollingActive) return;

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
        console.error('Error polling unread count:', error);
      }
    };

    // Initial fetch
    fetchUnreadCount();
    
    // Set up polling interval
    const intervalId = setInterval(fetchUnreadCount, POLLING_INTERVAL);
    
    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, [isLoggedIn, pollingActive, unreadCount]);

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
      const data = await NotificationService.getNotifications();
      setNotifications(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Fall back to existing notifications on error
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  // Mark a notification as read
  const markAsRead = useCallback(async (notificationId: string | number) => {
    if (isLoggedIn) {
      try {
        await NotificationService.markAsRead(String(notificationId));
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    }
    
    // Update local state regardless of API success
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
  }, [isLoggedIn]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (isLoggedIn) {
      try {
        await NotificationService.markAllAsRead();
      } catch (error) {
        console.error('Error marking all notifications as read:', error);
      }
    }
    
    // Update local state regardless of API success
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  }, [isLoggedIn]);

  // Clear all notifications
  const clearAll = useCallback(async () => {
    if (isLoggedIn) {
      try {
        await NotificationService.deleteAllNotifications();
      } catch (error) {
        console.error('Error clearing all notifications:', error);
      }
    }
    
    // Update local state regardless of API success
    setNotifications([]);
    setUnreadCount(0);
  }, [isLoggedIn]);

  // Enable/disable polling when app goes to background/foreground
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active') {
        setPollingActive(true);
        fetchNotifications(); // Refresh when app comes back to foreground
      } else {
        setPollingActive(false);
      }
    };

    // Add AppState listener
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    return () => {
      // Clean up listener
      subscription.remove();
    };
  }, [fetchNotifications]);

  return (
    <NotificationContext.Provider
      value={{
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
      }}
    >
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