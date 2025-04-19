import React, { useState } from 'react';

interface OverviewCard {
  id: string;
  title: string;
  value: string | number;
  trend: number;
  tooltip: string;
  icon: string;
  color: string;
}

const OverviewCards: React.FC = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const cards: OverviewCard[] = [
    {
      id: 'wait-time',
      title: 'Average Response Time',
      value: '8m',
      trend: -2,
      tooltip: 'Average time to respond to guest requests. Updated every 5 minutes.',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'primary',
    },
    {
      id: 'compliance',
      title: 'Quality Alerts',
      value: 3,
      trend: -2,
      tooltip: 'Service quality and safety compliance issues detected in last 24 hours.',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      color: 'warning',
    },
    {
      id: 'satisfaction',
      title: 'Guest Satisfaction',
      value: '4.2★',
      trend: 0.2,
      tooltip: 'Average rating from last 100 guest reviews.',
      icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
      color: 'success',
    },
    {
      id: 'staffing',
      title: 'Staff Coverage',
      value: '92%',
      trend: 5,
      tooltip: 'Percentage of required staff currently on duty across all departments.',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      color: 'primary',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 relative"
          onMouseEnter={() => setActiveTooltip(card.id)}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`p-3 rounded-full bg-${card.color}-50 dark:bg-${card.color}-900/20`}>
                <svg
                  className={`w-6 h-6 text-${card.color}-500 dark:text-${card.color}-400`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{card.title}</h3>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{card.value}</p>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      card.trend > 0
                        ? 'text-success-500'
                        : card.trend < 0
                        ? 'text-danger-500'
                        : 'text-gray-500'
                    }`}
                  >
                    {card.trend > 0 ? '↑' : card.trend < 0 ? '↓' : '→'} {Math.abs(card.trend)}
                    {typeof card.value === 'string' && card.value.includes('%') ? '%' : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tooltip */}
          {activeTooltip === card.id && (
            <div className="absolute z-10 w-64 px-4 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-12 left-1/2 transform -translate-x-1/2">
              {card.tooltip}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OverviewCards; 