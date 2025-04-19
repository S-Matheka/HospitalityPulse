import React, { useState } from 'react';
import {
  BellIcon,
  XMarkIcon,
  UserGroupIcon,
  ClockIcon,
  ChartBarIcon,
  StarIcon,
  WifiIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

interface Notification {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  icon: React.ComponentType<any>;
  timestamp: string;
  type: 'staffing' | 'service' | 'maintenance' | 'reputation' | 'social';
  source?: string;
  isRead: boolean;
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'WiFi Complaints Spike',
      description: 'Multiple guests reporting WiFi connectivity issues in rooms 401-405. Potential revenue impact of -$5,000 identified.',
      priority: 'High',
      icon: WifiIcon,
      timestamp: 'Just now',
      type: 'maintenance',
      isRead: false
    },
    {
      id: '2',
      title: 'Trending Review Topic',
      description: 'Recent TripAdvisor reviews highlight breakfast service delays. 15% increase in negative mentions.',
      priority: 'High',
      icon: StarIcon,
      timestamp: '15m ago',
      type: 'social',
      source: 'TripAdvisor',
      isRead: false
    },
    {
      id: '3',
      title: 'Peak Wait Time Alert',
      description: 'Front desk wait time reached peak of 2:30 minutes. Additional staff needed.',
      priority: 'Medium',
      icon: ClockIcon,
      timestamp: '30m ago',
      type: 'service',
      isRead: false
    },
    {
      id: '4',
      title: 'Positive Campaign Impact',
      description: "Valentine's Day Campaign generating positive social buzz. Revenue impact: +$15,000",
      priority: 'Medium',
      icon: ChartBarIcon,
      timestamp: '1h ago',
      type: 'social',
      source: 'Multiple Platforms',
      isRead: false
    },
    {
      id: '5',
      title: 'Housekeeping Efficiency',
      description: 'Room turnover rate improved by 12% in the last hour. Meeting daily targets.',
      priority: 'Low',
      icon: UserGroupIcon,
      timestamp: '2h ago',
      type: 'staffing',
      isRead: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
  };

  const handleDismissNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BellIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
          {unreadCount > 0 && (
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <span className="sr-only">Mark all as read</span>
            <CheckIcon className="h-5 w-5" />
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
              !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <notification.icon className={`h-6 w-6 ${
                  notification.priority === 'High' 
                    ? 'text-red-500 dark:text-red-400'
                    : notification.priority === 'Medium'
                    ? 'text-yellow-500 dark:text-yellow-400'
                    : 'text-green-500 dark:text-green-400'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {notification.title}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {notification.timestamp}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {notification.description}
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  {notification.priority === 'High' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                      High Priority
                    </span>
                  )}
                  {notification.priority === 'Medium' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                      Medium Priority
                    </span>
                  )}
                  {notification.priority === 'Low' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                      Low Priority
                    </span>
                  )}
                  {notification.source && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                      {notification.source}
                    </span>
                  )}
                </div>
              </div>
              <button 
                onClick={() => handleDismissNotification(notification.id)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          className="w-full text-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
        >
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationsPanel; 