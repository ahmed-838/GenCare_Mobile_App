// utils/notificationService.js
import { API_URL } from '@/config/config';
import { getToken } from './auth';
import axios from 'axios';

/**
 * Get all notifications for the logged-in user
 * @returns {Promise<Array>} Notifications array
 */
export const getNotifications = async () => {
  try {
    const token = await getToken();
    if (!token) throw new Error('Not authenticated');

    const response = await axios.get(`${API_URL}/api/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

/**
 * Get unread notification count
 * @returns {Promise<number>} Unread count
 */
export const getUnreadCount = async () => {
  try {
    const token = await getToken();
    if (!token) return 0;

    const response = await axios.get(`${API_URL}/api/notifications/unread`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data.unreadCount;
  } catch (error) {
    console.error('Error fetching unread count:', error);
    return 0;
  }
};

/**
 * Create a notification for the current user
 * @param {Object} notification - The notification object
 * @param {string} notification.title - The notification title
 * @param {string} notification.description - The notification description
 * @param {string} notification.icon - Optional icon name
 * @param {string} notification.type - Optional notification type
 * @returns {Promise<Object>} Created notification
 */
export const createSelfNotification = async ({ title, description, icon, type }) => {
  try {
    const token = await getToken();
    if (!token) throw new Error('Not authenticated');

    const response = await axios.post(
      `${API_URL}/api/notifications/self`,
      {
        title,
        description,
        icon,
        type
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error creating self notification:', error);
    throw error;
  }
};

/**
 * Mark a notification as read
 * @param {string} notificationId - The notification ID
 * @returns {Promise<Object>} Updated notification
 */
export const markAsRead = async (notificationId) => {
  try {
    const token = await getToken();
    if (!token) throw new Error('Not authenticated');

    const response = await axios.put(
      `${API_URL}/api/notifications/${notificationId}/read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

/**
 * Mark all notifications as read
 * @returns {Promise<Object>} Result
 */
export const markAllAsRead = async () => {
  try {
    const token = await getToken();
    if (!token) throw new Error('Not authenticated');

    const response = await axios.put(
      `${API_URL}/api/notifications/read-all`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

/**
 * Delete a notification
 * @param {string} notificationId - The notification ID
 * @returns {Promise<Object>} Result
 */
export const deleteNotification = async (notificationId) => {
  try {
    const token = await getToken();
    if (!token) throw new Error('Not authenticated');

    const response = await axios.delete(
      `${API_URL}/api/notifications/${notificationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};

/**
 * Delete all notifications
 * @returns {Promise<Object>} Result
 */
export const deleteAllNotifications = async () => {
  try {
    const token = await getToken();
    if (!token) throw new Error('Not authenticated');

    const response = await axios.delete(
      `${API_URL}/api/notifications`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error deleting all notifications:', error);
    throw error;
  }
}; 