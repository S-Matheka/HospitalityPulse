import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TrendAlert {
  id: string;
  message: string;
  source: string;
  increase: number;
  action: string;
  timeframe: string;
  icon: string;
  actionLink: {
    path: string;
    tab?: string;
    section?: string;
  };
}

const TrendAlerts: React.FC = () => {
  const navigate = useNavigate();

  const trends: TrendAlert[] = [
    {
      id: '1',
      message: 'Increase in "slow check-in process" mentions on TripAdvisor',
      source: 'TripAdvisor',
      increase: 35,
      action: 'Review front desk staffing',
      timeframe: 'Last 24 hours',
      icon: 'M19.465 10.04a4.904 4.904 0 0 0-7.442.693 4.904 4.904 0 0 0-7.442-.693A4.912 4.912 0 0 0 4.74 16.85a31.862 31.862 0 0 0 7.283 4.908 31.862 31.862 0 0 0 7.283-4.908 4.912 4.912 0 0 0 .159-6.81z',
      actionLink: {
        path: '/front-office',
        tab: 'alerts'
      }
    },
    {
      id: '2',
      message: 'WiFi connectivity complaints spike on Booking.com reviews',
      source: 'Booking.com',
      increase: 45,
      action: 'Contact IT support',
      timeframe: 'Last 3 days',
      icon: 'M21.04 3H2.96A2.96 2.96 0 0 0 0 5.96v12.08A2.96 2.96 0 0 0 2.96 21h18.08A2.96 2.96 0 0 0 24 18.04V5.96A2.96 2.96 0 0 0 21.04 3zM12 17.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z',
      actionLink: {
        path: '/marketing',
        tab: 'reviews',
        section: 'wifi'
      }
    },
    {
      id: '3',
      message: 'Negative feedback about room cleanliness in guest surveys',
      source: 'Guest Feedback',
      increase: 30,
      action: 'Review housekeeping protocols',
      timeframe: 'Last 7 days',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      actionLink: {
        path: '/housekeeping',
        tab: 'tasks'
      }
    },
    {
      id: '4',
      message: 'Rising concerns about breakfast quality on Google Reviews',
      source: 'Google Reviews',
      increase: 28,
      action: 'Assess breakfast service',
      timeframe: 'Last 5 days',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
      actionLink: {
        path: '/marketing',
        tab: 'reviews',
        section: 'dining'
      }
    }
  ];

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'TripAdvisor':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'Booking.com':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'Google Reviews':
        return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'Guest Feedback':
        return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const handleActionClick = (actionLink: TrendAlert['actionLink']) => {
    // Navigate to the specified path
    navigate(actionLink.path, {
      state: {
        // Pass additional state for the receiving component to handle
        activeTab: actionLink.tab,
        section: actionLink.section
      }
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Trend Alerts
      </h2>
      <div className="space-y-4">
        {trends.map((trend) => (
          <div
            key={trend.id}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-lg ${getSourceColor(trend.source)}`}>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={trend.icon} />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${getSourceColor(trend.source)}`}>
                    {trend.source}
                  </span>
                  <span className="text-sm text-danger-500 font-medium">
                    ▲ {trend.increase}%
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{trend.message}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {trend.timeframe}
                  </span>
                  <button 
                    onClick={() => handleActionClick(trend.actionLink)}
                    className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center"
                  >
                    {trend.action}
                    <span className="ml-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendAlerts; 