import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BuildingOfficeIcon,
  PhoneIcon,
  StarIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ChevronRightIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  BellAlertIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

// Mock data for hotels
const hotels = [
  {
    id: 1,
    name: 'Grand Hotel Downtown',
    location: 'Atlanta, GA',
    callMetrics: {
      totalCalls: 245,
      answerRate: 92,
      abandonRate: 8,
      avgWaitTime: 12,
    },
    reputation: {
      overall: 4.3,
      google: 4.5,
      tripadvisor: 4.2,
      facebook: 4.4,
      recentTrend: 'up',
    },
    riskLevel: 'low',
    alerts: 2,
  },
  {
    id: 2,
    name: 'Luxury Resort Midtown',
    location: 'Atlanta, GA',
    callMetrics: {
      totalCalls: 189,
      answerRate: 85,
      abandonRate: 15,
      avgWaitTime: 18,
    },
    reputation: {
      overall: 3.8,
      google: 4.0,
      tripadvisor: 3.7,
      facebook: 3.9,
      recentTrend: 'down',
    },
    riskLevel: 'high',
    alerts: 5,
  },
  {
    id: 3,
    name: 'Business Hotel Airport',
    location: 'Atlanta, GA',
    callMetrics: {
      totalCalls: 312,
      answerRate: 95,
      abandonRate: 5,
      avgWaitTime: 10,
    },
    reputation: {
      overall: 4.5,
      google: 4.7,
      tripadvisor: 4.4,
      facebook: 4.6,
      recentTrend: 'up',
    },
    riskLevel: 'low',
    alerts: 1,
  },
];

const HotelsOverview: React.FC = () => {
  const navigate = useNavigate();

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getAnswerRateColor = (rate: number) => {
    if (rate >= 90) return 'text-green-500 dark:text-green-400';
    if (rate >= 80) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hotels Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div 
            key={hotel.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="p-5">
              {/* Hotel Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <BuildingOfficeIcon className="h-6 w-6 text-gray-400 mr-2" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {hotel.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {hotel.location}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskLevelColor(hotel.riskLevel)}`}>
                  {hotel.riskLevel.charAt(0).toUpperCase() + hotel.riskLevel.slice(1)} Risk
                </span>
              </div>

              {/* Guest Satisfaction Score */}
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {hotel.reputation.overall.toFixed(1)}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className={hotel.reputation.recentTrend === 'up' ? 'text-green-500' : 'text-red-500'}>
                      30-day trend
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Google:</span>
                    <span className="ml-1 font-medium text-gray-900 dark:text-white">{hotel.reputation.google}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">TripAdv:</span>
                    <span className="ml-1 font-medium text-gray-900 dark:text-white">{hotel.reputation.tripadvisor}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">FB:</span>
                    <span className="ml-1 font-medium text-gray-900 dark:text-white">{hotel.reputation.facebook}</span>
                  </div>
                </div>
              </div>

              {/* Call Metrics */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Call Metrics</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Total Calls</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{hotel.callMetrics.totalCalls}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Answer Rate</p>
                      <p className={`text-sm font-medium ${getAnswerRateColor(hotel.callMetrics.answerRate)}`}>
                        {hotel.callMetrics.answerRate}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* View Details Button */}
              <button 
                onClick={() => navigate(`/hotel/${hotel.id}`)}
                className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                View Details
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelsOverview; 