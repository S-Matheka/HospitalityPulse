import React, { useState } from 'react';
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import StaffIssueDetail from './StaffIssueDetail';

export interface StaffIssue {
  id: string;
  category: 'frontDesk' | 'housekeeping' | 'foodService' | 'maintenance' | 'spa';
  title: string;
  description: string;
  source: 'operations' | 'feedback' | 'system' | 'staff';
  severity: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved';
  date: string;
  time: string;
  agent: string;
  department: string;
  impact: string;
  trend: 'improving' | 'stable' | 'worsening';
  recommendations: Array<{
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'implemented';
  }>;
  actions?: string[];
}

interface StaffIssuesMonitorProps {
  issues?: StaffIssue[];
}

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'high':
      return <ExclamationTriangleIcon className="h-4 w-4" />;
    case 'medium':
      return <ExclamationTriangleIcon className="h-4 w-4" />;
    case 'low':
      return <CheckCircleIcon className="h-4 w-4" />;
    default:
      return null;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'text-red-500 dark:text-red-400';
    case 'medium':
      return 'text-yellow-500 dark:text-yellow-400';
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
    category: 'frontDesk',
    title: 'Check-in Process Delays',
    description: 'Multiple guests experiencing longer than usual check-in times during peak hours.',
    source: 'feedback',
    severity: 'high',
    status: 'open',
    date: '2024-03-20',
    time: '14:30',
    agent: 'Sarah Johnson',
    department: 'Front Desk',
    impact: 'Affecting guest satisfaction scores and creating lobby congestion',
    trend: 'worsening',
    recommendations: [
      {
        id: 'rec1',
        title: 'Implement Express Check-in',
        description: 'Deploy mobile check-in solution for loyalty members',
        priority: 'high',
        status: 'pending'
      }
    ],
    actions: ['Review staffing levels', 'Analyze peak check-in times']
  },
  {
    id: '2',
    category: 'housekeeping',
    title: 'Room Turnover Efficiency',
    description: 'Room preparation times exceeding standard metrics by 20%',
    source: 'operations',
    severity: 'medium',
    status: 'in-progress',
    date: '2024-03-19',
    time: '11:15',
    agent: 'Michael Chen',
    department: 'Housekeeping',
    impact: 'Delayed check-ins and increased operational costs',
    trend: 'stable',
    recommendations: [
      {
        id: 'rec2',
        title: 'Optimize Cleaning Routes',
        description: 'Implement new room assignment algorithm',
        priority: 'medium',
        status: 'pending'
      }
    ],
    actions: ['Conduct time-motion study', 'Review cleaning protocols']
  },
  {
    id: '3',
    category: 'foodService',
    title: 'Kitchen Equipment Maintenance',
    description: 'Regular maintenance checks being missed for key kitchen equipment',
    source: 'system',
    severity: 'low',
    status: 'resolved',
    date: '2024-03-18',
    time: '09:45',
    agent: 'David Martinez',
    department: 'Food Service',
    impact: 'Potential for equipment failure and service disruption',
    trend: 'improving',
    recommendations: [
      {
        id: 'rec3',
        title: 'Digital Maintenance Tracking',
        description: 'Implement automated maintenance scheduling system',
        priority: 'low',
        status: 'implemented'
      }
    ],
    actions: ['Create maintenance schedule', 'Train staff on equipment checks']
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
              {issue.date}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {issue.description}
          </p>
          
          {issue.impact && (
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {issue.impact}
              </span>
            </div>
          )}
          
          <div className="flex items-center">
            {issue.actions && issue.actions.length > 0 ? (
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