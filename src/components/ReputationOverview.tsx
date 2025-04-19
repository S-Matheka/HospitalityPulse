import React, { useState } from 'react';
import CustomDropdown from './CustomDropdown';
import { StarIcon, ArrowUpIcon, ArrowDownIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

interface Platform {
  name: 'Google' | 'TripAdvisor' | 'Booking.com' | 'Expedia' | 'Hotels.com';
  rating: number;
  totalReviews: number;
  recentPositive: number;
  recentNegative: number;
  icon: string;
  color: string;
  change?: number;
}

interface TrendingPhrase {
  text: string;
  count: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

const ReputationOverview: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const platforms: Platform[] = [
    {
      name: 'TripAdvisor',
      rating: 4.5,
      totalReviews: 856,
      recentPositive: 12,
      recentNegative: 2,
      change: 0.2,
      icon: 'M19.465 10.04a4.904 4.904 0 0 0-7.442.693a4.904 4.904 0 0 0-7.442-.693A4.912 4.912 0 0 0 4.74 16.85a31.862 31.862 0 0 0 7.283 4.908a31.862 31.862 0 0 0 7.283-4.908a4.912 4.912 0 0 0 .159-6.81z',
      color: 'text-green-500',
    },
    {
      name: 'Google',
      rating: 4.4,
      totalReviews: 723,
      recentPositive: 9,
      recentNegative: 1,
      change: 0.3,
      icon: 'M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z',
      color: 'text-blue-500',
    },
    {
      name: 'Booking.com',
      rating: 4.3,
      totalReviews: 645,
      recentPositive: 8,
      recentNegative: 2,
      icon: 'M21.04 3H2.96A2.96 2.96 0 0 0 0 5.96v12.08A2.96 2.96 0 0 0 2.96 21h18.08A2.96 2.96 0 0 0 24 18.04V5.96A2.96 2.96 0 0 0 21.04 3zM12 17.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z',
      color: 'text-blue-600',
    },
    {
      name: 'Expedia',
      rating: 4.2,
      totalReviews: 512,
      recentPositive: 7,
      recentNegative: 2,
      icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      color: 'text-yellow-500',
    },
    {
      name: 'Hotels.com',
      rating: 4.3,
      totalReviews: 489,
      recentPositive: 6,
      recentNegative: 1,
      icon: 'M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z',
      color: 'text-red-500',
    },
  ];

  const trendingPhrases: TrendingPhrase[] = [
    { text: '#ExcellentService', count: 58, sentiment: 'positive' },
    { text: '#CleanRooms', count: 45, sentiment: 'positive' },
    { text: '#GreatLocation', count: 42, sentiment: 'positive' },
    { text: '#SlowCheckIn', count: 28, sentiment: 'negative' },
    { text: '#AmazingBreakfast', count: 35, sentiment: 'positive' },
    { text: '#WiFiIssues', count: 22, sentiment: 'negative' },
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-success-500 bg-success-50 dark:bg-success-900/20';
      case 'negative':
        return 'text-danger-500 bg-danger-50 dark:bg-danger-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getOverallStats = () => {
    const totalReviews = platforms.reduce((sum, p) => sum + p.totalReviews, 0);
    const weightedRating =
      platforms.reduce((sum, p) => sum + p.rating * p.totalReviews, 0) / totalReviews;
    return {
      rating: weightedRating.toFixed(1),
      totalReviews,
      recentPositive: platforms.reduce((sum, p) => sum + p.recentPositive, 0),
      recentNegative: platforms.reduce((sum, p) => sum + p.recentNegative, 0),
    };
  };

  const stats =
    selectedPlatform === 'all'
      ? getOverallStats()
      : platforms.find((p) => p.name === selectedPlatform) || getOverallStats();

  const platformOptions = [
    { id: 'all', value: 'all', label: 'All Platforms' },
    ...platforms.map(platform => ({
      id: platform.name,
      value: platform.name,
      label: platform.name
    }))
  ];

  const renderRatingBar = (rating: number) => {
    return (
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
        <div 
          className="bg-primary-500 h-1.5 rounded-full transition-all duration-300" 
          style={{ width: `${(rating / 5) * 100}%` }}
        />
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Reputation Overview
          </h2>
          <InformationCircleIcon className="h-6 w-6 text-gray-400 cursor-help" title="Overall reputation across all platforms" />
        </div>
        <CustomDropdown
          options={platformOptions}
          value={selectedPlatform}
          onChange={setSelectedPlatform}
          minWidth="150px"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Overall Rating
            </span>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-900 dark:text-white mr-1">
                  {stats.rating}
                </span>
                <StarIcon className="w-6 h-6 text-yellow-400" />
              </div>
              {selectedPlatform === 'all' && (
                <div className={`flex items-center px-2 py-1 rounded-full text-sm ${
                  platforms.reduce((acc, curr) => acc + (curr.change || 0), 0) > 0 
                    ? 'text-green-500 bg-green-50 dark:bg-green-900/20' 
                    : 'text-red-500 bg-red-50 dark:bg-red-900/20'
                }`}>
                  {platforms.reduce((acc, curr) => acc + (curr.change || 0), 0) > 0 ? (
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                  )}
                  <span>vs last month</span>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Total Reviews</span>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalReviews}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Recent</span>
              <div className="flex flex-col space-y-1">
                <span className="text-lg font-semibold text-success-500">
                  +{stats.recentPositive} 
                  <span className="text-sm font-normal ml-1">(4+ Stars)</span>
                </span>
                <span className="text-lg font-semibold text-danger-500">
                  -{stats.recentNegative} 
                  <span className="text-sm font-normal ml-1">(3 or Fewer)</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            Platform Breakdown
          </h3>
          <div className="space-y-4">
            {platforms.map((platform) => (
              <div key={platform.name} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <svg
                      className={`w-4 h-4 ${platform.color} mr-2`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={platform.icon} />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {platform.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {platform.rating}★
                    </span>
                    {platform.change && (
                      <span className={`flex items-center text-xs ${
                        platform.change >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {platform.change >= 0 ? (
                          <ArrowUpIcon className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownIcon className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(platform.change)}
                      </span>
                    )}
                  </div>
                </div>
                {renderRatingBar(platform.rating)}
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                  {platform.totalReviews} reviews
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
          Trending Phrases
        </h3>
        <div className="flex flex-wrap gap-2">
          {trendingPhrases.map((phrase) => (
            <span
              key={phrase.text}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(
                phrase.sentiment
              )}`}
            >
              {phrase.text}
              <span className="ml-2 text-xs opacity-75">({phrase.count})</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReputationOverview; 