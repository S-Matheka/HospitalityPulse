import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import {
  XMarkIcon,
  CheckCircleIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface IssueData {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved';
  category: string;
  date: string;
  time: string;
  agent: string;
  department: string;
  impact: string;
  trend: 'improving' | 'stable' | 'worsening';
  metrics: {
    value: number;
    change: number;
    trend: 'up' | 'down' | 'stable';
  };
  actionItems: Array<{
    id: string;
    title: string;
    status: 'pending' | 'completed';
    assignee: string;
    dueDate: string;
  }>;
  recommendations: Array<{
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'implemented';
  }>;
}

interface StaffIssue {
  id: string;
  status: 'open' | 'in-progress' | 'resolved';
  time: string;
  agent: string;
  department: string;
  category: 'frontDesk' | 'housekeeping' | 'foodService' | 'maintenance' | 'spa';
  title: string;
  description: string;
  source: 'operations' | 'feedback' | 'system' | 'staff';
  severity: 'low' | 'medium' | 'high';
  date: string;
  impact: string;
  trend: 'improving' | 'stable' | 'worsening';
  recommendations: Array<{
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'implemented';
  }>;
}

interface StaffIssueDetailProps {
  isOpen: boolean;
  onClose: () => void;
  issue: StaffIssue;
}

const StaffIssueDetail: React.FC<StaffIssueDetailProps> = ({ isOpen, onClose, issue }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'actions'>('overview');

  const baseData: IssueData = {
    ...issue,
    metrics: {
      value: 45,
      change: 12,
      trend: 'up'
    },
    actionItems: [
      {
        id: '1',
        title: 'Review staff scheduling during peak hours',
        status: 'completed',
        assignee: 'Sarah Johnson',
        dueDate: '2024-04-20'
      },
      {
        id: '2',
        title: 'Implement new training program',
        status: 'pending',
        assignee: 'Michael Chen',
        dueDate: '2024-04-25'
      },
      {
        id: '3',
        title: 'Update standard operating procedures',
        status: 'pending',
        assignee: 'Emily Rodriguez',
        dueDate: '2024-04-30'
      }
    ],
    recommendations: issue.recommendations
  };

  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusColor = (status: 'open' | 'in-progress' | 'resolved') => {
    switch (status) {
      case 'open':
        return 'text-red-500';
      case 'in-progress':
        return 'text-yellow-500';
      case 'resolved':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getTrendColor = (trend: 'improving' | 'stable' | 'worsening') => {
    switch (trend) {
      case 'improving':
        return 'text-green-500';
      case 'stable':
        return 'text-yellow-500';
      case 'worsening':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        <div className="relative bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full mx-4 p-6 shadow-xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white">
                {baseData.title}
              </Dialog.Title>
              <p className="text-gray-500 dark:text-gray-400 mt-1">{baseData.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'overview'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'metrics'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Metrics
            </button>
            <button
              onClick={() => setActiveTab('actions')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'actions'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Actions
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</h3>
                  <p className={`mt-1 ${getStatusColor(baseData.status)}`}>
                    {baseData.status}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Severity</h3>
                  <p className={`mt-1 ${getSeverityColor(baseData.severity)}`}>
                    {baseData.severity}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</h3>
                  <p className="mt-1 text-gray-900 dark:text-white">{baseData.category}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Trend</h3>
                  <p className={`mt-1 ${getTrendColor(baseData.trend)}`}>
                    {baseData.trend}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Impact</h3>
                <p className="text-gray-900 dark:text-white">{baseData.impact}</p>
              </div>

              {baseData.recommendations && baseData.recommendations.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Recommendations</h3>
                  <ul className="space-y-2">
                    {baseData.recommendations.map((rec) => (
                      <li key={rec.id} className="flex items-start">
                        <CheckCircleIcon className={`h-5 w-5 mr-2 ${
                          rec.status === 'implemented' ? 'text-green-500' : 'text-gray-400 dark:text-gray-500'
                        }`} />
                        <div>
                          <p className="text-gray-900 dark:text-white">{rec.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{rec.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Occurrence Rate</h3>
                    <ChartBarIcon className="h-5 w-5 text-blue-500" />
                  </div>
                  <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                    {baseData.metrics.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">incidents this month</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Trend</h3>
                    {baseData.metrics.trend === 'up' ? (
                      <ArrowTrendingUpIcon className="h-5 w-5 text-red-500" />
                    ) : (
                      <ArrowTrendingDownIcon className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <p className={`mt-1 text-2xl font-semibold ${
                    baseData.metrics.trend === 'up' ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {baseData.metrics.change}%
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">vs. last month</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Resolution</h3>
                    <ClockIcon className="h-5 w-5 text-yellow-500" />
                  </div>
                  <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                    2.5h
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">per incident</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Impact Analysis</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Staff Efficiency</span>
                    <div className="w-64 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400">-35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Guest Satisfaction</span>
                    <div className="w-64 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400">-25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Operational Cost</span>
                    <div className="w-64 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400">+45%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Action Items</h3>
                <div className="space-y-4">
                  {baseData.actionItems.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3">
                      <CheckCircleIcon className={`h-5 w-5 mt-0.5 ${
                        item.status === 'completed' 
                          ? 'text-green-500' 
                          : 'text-gray-400 dark:text-gray-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-gray-900 dark:text-white font-medium">{item.title}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            item.status === 'completed'
                              ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                              : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>Assigned to: {item.assignee}</span>
                          <span>•</span>
                          <span>Due: {item.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Next Steps</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Schedule follow-up meeting with department heads
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Review and update affected SOPs
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Conduct staff training on new procedures
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default StaffIssueDetail; 