import React, { useState } from 'react';
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import StaffIssueDetail from './StaffIssueDetail';

export interface StaffIssue {
  id: string | number;
  category: 'frontDesk' | 'housekeeping' | 'foodService' | 'maintenance' | 'spa';
  title: string;
  description: string;
  source: 'operations' | 'feedback' | 'system' | 'staff';
  severity: 'escalating' | 'high' | 'moderate' | 'resolved';
  timestamp?: string;
  date?: string;
  metrics?: {
    value: string;
    trend?: 'increase' | 'decrease';
  };
  action?: {
    text: string;
    link: string;
  };
  actions?: string[];
}

interface StaffIssuesMonitorProps {
  issues?: StaffIssue[];
}

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'escalating':
    case 'high':
      return <ExclamationTriangleIcon className="h-4 w-4" />;
    case 'moderate':
    case 'medium':
      return <ExclamationTriangleIcon className="h-4 w-4" />;
    case 'resolved':
    case 'low':
      return <CheckCircleIcon className="h-4 w-4" />;
    default:
      return null;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'escalating':
    case 'high':
      return 'text-red-500 dark:text-red-400';
    case 'moderate':
    case 'medium':
      return 'text-yellow-500 dark:text-yellow-400';
    case 'resolved':
    case 'low':
      return 'text-green-500 dark:text-green-400';
    default:
      return 'text-gray-500 dark:text-gray-400';
  }
};

// Default staff issues if none are provided
const defaultStaffIssues: StaffIssue[] = [
  {
    id: '1',
    category: 'housekeeping',
    title: 'Room Turnover Delays',
    description: '12 rooms pending cleanup, affecting check-in availability. Average delay: 45 minutes.',
    source: 'operations',
    severity: 'high',
    timestamp: 'Now',
    metrics: {
      value: '12 rooms',
      trend: 'increase'
    },
    action: {
      text: 'View housekeeping schedule',
      link: '/staffing/housekeeping'
    }
  },
  {
    id: '2',
    category: 'foodService',
    title: 'Breakfast Service Staff Shortage',
    description: 'Only 4 of 6 required staff present. Affecting service time and buffet replenishment.',
    source: 'operations',
    severity: 'escalating',
    timestamp: '15 minutes ago',
    metrics: {
      value: '67% staffed',
      trend: 'decrease'
    },
    action: {
      text: 'Adjust staff allocation',
      link: '/staffing/food-service'
    }
  },
  {
    id: '3',
    category: 'frontDesk',
    title: 'Check-in Queue Management',
    description: 'Average check-in time exceeding 10 minutes during peak hours (3-5 PM)',
    source: 'feedback',
    severity: 'moderate',
    timestamp: '1 hour ago',
    metrics: {
      value: '10+ min wait',
      trend: 'increase'
    },
    action: {
      text: 'Review peak hour staffing',
      link: '/operations/front-desk'
    }
  },
  {
    id: '4',
    category: 'maintenance',
    title: 'AC System Response Time',
    description: 'Maintenance team response time for AC issues averaging 45 minutes. 3 rooms affected.',
    source: 'system',
    severity: 'moderate',
    timestamp: '2 hours ago',
    metrics: {
      value: '45 min response',
      trend: 'increase'
    },
    action: {
      text: 'View maintenance log',
      link: '/maintenance/logs'
    }
  },
  {
    id: '5',
    category: 'spa',
    title: 'Spa Booking Conflicts',
    description: 'Double bookings reported for 2 treatment rooms. Weekend schedule affected.',
    source: 'staff',
    severity: 'moderate',
    timestamp: '3 hours ago',
    metrics: {
      value: '2 conflicts',
    },
    action: {
      text: 'Review booking system',
      link: '/spa/bookings'
    }
  }
];

const StaffIssuesMonitor: React.FC<StaffIssuesMonitorProps> = ({ issues = defaultStaffIssues }) => {
  const [selectedIssue, setSelectedIssue] = useState<StaffIssue | null>(null);

  const handleActionClick = (issue: StaffIssue, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedIssue(issue);
  };

  const renderIssueCard = (issue: StaffIssue) => {
    return (
      <div
        key={issue.id}
        className="flex items-start p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
      >
        <div
          className={`mr-3 p-2 rounded-lg ${getSeverityColor(issue.severity)} bg-opacity-10 dark:bg-opacity-20`}
        >
          {getSeverityIcon(issue.severity)}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {issue.title}
              </span>
              <span className={`text-sm ${getSeverityColor(issue.severity)}`}>
                {getSeverityIcon(issue.severity)}
              </span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {issue.timestamp || issue.date}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {issue.description}
          </p>
          
          {issue.metrics && (
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {issue.metrics.value}
                {issue.metrics.trend && (
                  <span className={`ml-1 ${
                    issue.metrics.trend === 'increase' 
                      ? 'text-red-500 dark:text-red-400' 
                      : 'text-green-500 dark:text-green-400'
                  }`}>
                    {issue.metrics.trend === 'increase' ? '↑' : '↓'}
                  </span>
                )}
              </span>
            </div>
          )}
          
          <div className="flex items-center">
            {issue.action ? (
              <button 
                onClick={(e) => handleActionClick(issue, e)}
                className="group inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                <span>{issue.action.text}</span>
                <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            ) : issue.actions && issue.actions.length > 0 ? (
              <button 
                onClick={(e) => handleActionClick(issue, e)}
                className="group inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                <span>View actions</span>
                <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Staff Issues Monitor
        </h2>
        <div className="space-y-4">
          {issues.map((issue) => renderIssueCard(issue))}
        </div>
      </div>

      {selectedIssue && (
        <StaffIssueDetail
          issue={selectedIssue}
          isOpen={true}
          onClose={() => setSelectedIssue(null)}
        />
      )}
    </>
  );
};

export default StaffIssuesMonitor; 