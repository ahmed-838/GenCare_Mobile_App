import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
    {
        icon: 'home',
        title: 'Home',
        description: 'Return to home page',
        route: '/(home)/home',
    }
];

export const NAVBAR_HEIGHT = 60;

const mockNotifications = [
  {
    id: 1,
    icon: 'medical',
    title: 'New Test Results',
    description: 'Your recent test results are now available. Click to view the details.',
    time: '2m ago',
    isRead: false
  },
  {
    id: 2,
    icon: 'calendar',
    title: 'Appointment Reminder',
    description: 'You have an upcoming appointment tomorrow at 10:00 AM.',
    time: '1h ago',
    isRead: false
  },
  {
    id: 3,
    icon: 'document-text',
    title: 'New Article Available',
    description: 'Check out our latest article about prenatal care tips.',
    time: '3h ago',
    isRead: true
  },
];

export default {
  MENU_ITEMS,
  mockNotifications
}; 