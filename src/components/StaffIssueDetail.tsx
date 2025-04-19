import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import {
  UserCircleIcon,
  CalendarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  ChartBarSquareIcon,
  UserGroupIcon,
  BellAlertIcon,
  ShieldCheckIcon,
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
    id: issue.id,
    title: issue.title,
    description: issue.description,
    severity: issue.severity,
    status: issue.status,
    category: issue.category,
    date: issue.date,
    time: issue.time,
    agent: issue.agent,
    department: issue.department,
    impact: issue.impact,
    trend: issue.trend,
    metrics: {
      value: 0,
      change: 0,
      trend: 'stable'
    },
    actionItems: [],
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
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg max-w-4xl w-full mx-4 p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <Dialog.Title className="text-2xl font-bold text-gray-900">
                {baseData.title}
              </Dialog.Title>
              <p className="text-gray-500 mt-1">{baseData.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <XCircleIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'overview'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'metrics'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Metrics
            </button>
            <button
              onClick={() => setActiveTab('actions')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'actions'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Actions
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className={`mt-1 ${getStatusColor(baseData.status)}`}>
                    {baseData.status}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Severity</h3>
                  <p className={`mt-1 ${getSeverityColor(baseData.severity)}`}>
                    {baseData.severity}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Category</h3>
                  <p className="mt-1 text-gray-900">{baseData.category}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Trend</h3>
                  <p className={`mt-1 ${getTrendColor(baseData.trend)}`}>
                    {baseData.trend}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Impact</h3>
                <p className="text-gray-900">{baseData.impact}</p>
              </div>

              {baseData.recommendations && baseData.recommendations.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Recommendations</h3>
                  <ul className="space-y-2">
                    {baseData.recommendations.map((rec) => (
                      <li key={rec.id} className="flex items-start">
                        <CheckCircleIcon className={`h-5 w-5 mr-2 ${
                          rec.status === 'implemented' ? 'text-green-500' : 'text-gray-400'
                        }`} />
                        <div>
                          <p className="text-gray-900">{rec.title}</p>
                          <p className="text-sm text-gray-500">{rec.description}</p>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Current Value</h3>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">
                    {baseData.metrics.value}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Change</h3>
                  <p className={`mt-1 text-2xl font-semibold ${
                    baseData.metrics.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {baseData.metrics.change}%
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="space-y-6">
              {baseData.actionItems && baseData.actionItems.length > 0 ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Action Items</h3>
                  <ul className="space-y-4">
                    {baseData.actionItems.map((item) => (
                      <li key={item.id} className="flex items-start">
                        <CheckCircleIcon className={`h-5 w-5 mr-2 ${
                          item.status === 'completed' ? 'text-green-500' : 'text-gray-400'
                        }`} />
                        <div>
                          <p className="text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-500">
                            Assigned to: {item.assignee} • Due: {item.dueDate}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No action items available</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default StaffIssueDetail; 