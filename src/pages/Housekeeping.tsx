import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ClockIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

interface CleaningTask {
  id: string;
  roomNumber: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  priority: 'high' | 'medium' | 'low';
  type: 'turnover' | 'daily' | 'deep-clean';
  notes?: string;
  deadline: string;
}

interface FeedbackItem {
  id: string;
  platform: string;
  guestName: string;
  roomNumber: string;
  message: string;
  rating: number;
  timestamp: string;
  category: 'cleanliness' | 'service' | 'amenities';
}

const Housekeeping: React.FC = () => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState<'tasks' | 'feedback'>('tasks');
  const [filteredTasks, setFilteredTasks] = useState<CleaningTask[]>([]);

  const cleaningTasks: CleaningTask[] = [
    {
      id: '1',
      roomNumber: '301',
      status: 'pending',
      priority: 'high',
      type: 'deep-clean',
      notes: 'Guest reported bathroom cleanliness issues - needs thorough sanitization',
      deadline: '1:30 PM'
    },
    {
      id: '2',
      roomNumber: '405',
      status: 'in-progress',
      priority: 'high',
      type: 'turnover',
      notes: 'Previous guest left negative review about cleanliness',
      deadline: '2:00 PM'
    },
    {
      id: '3',
      roomNumber: '512',
      status: 'delayed',
      priority: 'high',
      type: 'deep-clean',
      notes: 'Multiple guest complaints about bathroom cleanliness',
      deadline: '12:00 PM'
    },
    {
      id: '4',
      roomNumber: '205',
      status: 'pending',
      priority: 'high',
      type: 'deep-clean',
      notes: 'Scheduled deep cleaning following guest feedback',
      deadline: '3:00 PM'
    }
  ];

  const feedbackItems: FeedbackItem[] = [
    {
      id: '1',
      platform: 'Booking.com',
      guestName: 'Sarah M.',
      roomNumber: '405',
      message: 'Bathroom wasn\'t properly cleaned. Found hair in the shower and stains on the towels.',
      rating: 2,
      timestamp: '2 hours ago',
      category: 'cleanliness'
    },
    {
      id: '2',
      platform: 'TripAdvisor',
      guestName: 'Michael R.',
      roomNumber: '512',
      message: 'The room itself was nice but the bathroom cleanliness was below standard. Noticed mold in shower corners.',
      rating: 3,
      timestamp: '4 hours ago',
      category: 'cleanliness'
    },
    {
      id: '3',
      platform: 'Hotels.com',
      guestName: 'Lisa K.',
      roomNumber: '205',
      message: 'Disappointed with bathroom maintenance. Grout needs cleaning and shower head had buildup.',
      rating: 2,
      timestamp: '1 day ago',
      category: 'cleanliness'
    }
  ];

  useEffect(() => {
    const state = location.state as { activeTab?: string } | null;
    
    if (state?.activeTab === 'tasks') {
      setSelectedTab('tasks');
      setFilteredTasks(cleaningTasks.filter(task => 
        task.status === 'pending' && task.priority === 'high'
      ));
    } else {
      setFilteredTasks(cleaningTasks);
    }
  }, [location.state]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low':
        return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'in-progress':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'delayed':
        return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Housekeeping Dashboard
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedTab('tasks');
              setFilteredTasks(cleaningTasks);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              selectedTab === 'tasks'
                ? 'bg-primary-500 text-white'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Cleaning Tasks
          </button>
          <button
            onClick={() => {
              setSelectedTab('feedback');
              setFilteredTasks(cleaningTasks);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              selectedTab === 'feedback'
                ? 'bg-primary-500 text-white'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Guest Feedback
          </button>
        </div>
      </div>

      {selectedTab === 'tasks' ? (
        <div className="grid gap-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Room {task.roomNumber}
                    </h3>
                    <span
                      className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {task.type.charAt(0).toUpperCase() + task.type.slice(1).replace('-', ' ')}
                  </p>
                  {task.notes && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Note: {task.notes}
                    </p>
                  )}
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>Due by: {task.deadline}</span>
              </div>
            </div>
          ))}
          {filteredTasks.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No pending high-priority tasks found.
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {feedbackItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-primary-500 mr-2" />
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.guestName}
                    </h3>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      Room {item.roomNumber}
                    </span>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      via {item.platform}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {item.message}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-yellow-500">
                    {item.rating}/5
                  </span>
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>{item.timestamp}</span>
                <span className="mx-2">•</span>
                <span className="capitalize">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Housekeeping; 