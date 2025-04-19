import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  PhoneIcon,
  ClockIcon,
  BuildingOfficeIcon,
  BellAlertIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

// Mock data for a specific hotel
const hotelData = {
  id: 1,
  name: 'Grand Hotel Downtown',
  location: 'Atlanta, GA',
  metrics: {
    calls: {
      total: 245,
      answered: 225,
      abandoned: 20,
      avgWaitTime: '1:45',
      byDepartment: {
        frontDesk: { total: 120, answered: 112, avgWait: '1:20' },
        housekeeping: { total: 45, answered: 42, avgWait: '1:55' },
        roomService: { total: 80, answered: 71, avgWait: '2:10' },
      }
    },
    reputation: {
      overall: 4.3,
      google: 4.5,
      tripadvisor: 4.2,
      facebook: 4.4,
      recent: {
        positive: 18,
        negative: 3
      }
    },
    staffIssues: [
      {
        department: 'Room Service',
        issue: 'Delayed delivery times',
        impact: 'Medium',
        trend: 'up',
        count: 12
      },
      {
        department: 'Housekeeping',
        issue: 'Missed room cleaning',
        impact: 'High',
        trend: 'down',
        count: 5
      },
      {
        department: 'Front Desk',
        issue: 'Long check-in queues',
        impact: 'Low',
        trend: 'up',
        count: 8
      }
    ],
    guestFeedback: {
      highlights: [
        {
          type: 'positive',
          text: 'Exceptional concierge service',
          source: 'TripAdvisor',
          date: '2024-04-15'
        },
        {
          type: 'negative',
          text: 'Slow room service response',
          source: 'Google',
          date: '2024-04-14'
        }
      ],
      vipAlerts: [
        {
          guest: 'Platinum Member',
          issue: 'AC not working properly',
          status: 'pending',
          priority: 'high'
        }
      ]
    }
  }
};

const HotelDetails: React.FC = () => {
  useParams<{ id: string }>();
  const [selectedTab, setSelectedTab] = useState('overview');

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BuildingOfficeIcon className="h-8 w-8 text-gray-400 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {hotelData.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">{hotelData.location}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Overall Rating</p>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white mr-1">
                  {hotelData.metrics.reputation.overall}
                </span>
                <StarIcon className="h-5 w-5 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'calls', 'reputation', 'staff'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${selectedTab === tab
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Call Center Performance
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Calls
                  </span>
                </div>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {hotelData.metrics.calls.total}
                </span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Avg Wait
                  </span>
                </div>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {hotelData.metrics.calls.avgWaitTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Issues */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Active Staff Issues
          </h2>
          <div className="space-y-4">
            {hotelData.metrics.staffIssues.map((issue, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {issue.department}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {issue.issue}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(issue.impact)}`}>
                  {issue.impact}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Guest Feedback */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Guest Feedback
          </h2>
          <div className="space-y-4">
            {hotelData.metrics.guestFeedback.highlights.map((feedback, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  feedback.type === 'positive'
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : 'bg-red-50 dark:bg-red-900/20'
                }`}
              >
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {feedback.text}
                </p>
                <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>{feedback.source}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(feedback.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VIP Alerts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            VIP Alerts
          </h2>
          <div className="space-y-4">
            {hotelData.metrics.guestFeedback.vipAlerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
              >
                <BellAlertIcon className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {alert.guest}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {alert.issue}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      alert.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' : ''
                    }`}>
                      {alert.priority.toUpperCase()}
                    </span>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      Status: {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails; 