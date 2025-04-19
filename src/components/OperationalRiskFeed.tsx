import React from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

interface TrendInsight {
  phrase: string;
  mentionCount: number;
  percentageChange: number;
  timeframe: string;
}

const OperationalRiskFeed: React.FC = () => {
  const trends: TrendInsight[] = [
    {
      phrase: 'Long hold times',
      mentionCount: 45,
      percentageChange: 28,
      timeframe: 'Last 30 days'
    },
    {
      phrase: 'Check-in delays',
      mentionCount: 32,
      percentageChange: 15,
      timeframe: 'Last 30 days'
    },
    {
      phrase: 'Slow room service',
      mentionCount: 28,
      percentageChange: -12,
      timeframe: 'Last 30 days'
    },
    {
      phrase: 'Housekeeping backlog',
      mentionCount: 25,
      percentageChange: 20,
      timeframe: 'Last 30 days'
    },
    {
      phrase: 'Billing issues',
      mentionCount: 22,
      percentageChange: -8,
      timeframe: 'Last 30 days'
    },
    {
      phrase: 'Wi-Fi complaints',
      mentionCount: 19,
      percentageChange: -5,
      timeframe: 'Last 30 days'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Trending Conversation Topics
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {trends.map((trend, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
          >
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-900 dark:text-white font-medium text-lg">
                  {trend.phrase}
                </h3>
                {trend.percentageChange > 0 ? (
                  <ArrowTrendingUpIcon className="h-5 w-5 text-red-500" />
                ) : (
                  <ArrowTrendingDownIcon className="h-5 w-5 text-green-500" />
                )}
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {trend.mentionCount}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">mentions</span>
              </div>
              <div className="mt-2">
                <span className={`text-sm ${trend.percentageChange > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                  {trend.percentageChange > 0 ? '+' : ''}{trend.percentageChange}% 
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                  vs previous 30 days
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperationalRiskFeed; 