import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneIcon,
  UserGroupIcon,
  CalendarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  BuildingOfficeIcon,
  BellAlertIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import CallReviewSection from '../components/CallReviewSection';
import CallDetailsModal from '../components/CallDetailsModal';
import CallMetricsDrilldown from '../components/CallMetricsDrilldown';
import StaffIssuesMonitor from '../components/StaffIssuesMonitor';
import StaffIssueDetail from '../components/StaffIssueDetail';
import ReputationOverview from '../components/ReputationOverview';
import PulseComparison from '../components/PulseComparison';
import OperationalRiskFeed from '../components/OperationalRiskFeed';
import ComplianceAlerts from '../components/ComplianceAlerts';
import EscalatingRiskPatterns from '../components/EscalatingRiskPatterns';
import TrendAlerts from '../components/TrendAlerts';
import { StatCard } from '../types/metrics';

type MetricId = 'total-calls' | 'answered-calls' | 'abandoned-calls' | 'wait-time';

interface CallTranscriptLine {
  timestamp: string;
  speaker: "Agent" | "Guest";
  text: string;
}

interface CallMetrics {
  totalCalls: number;
  answeredCalls: number;
  abandonedCalls: number;
  averageWaitTime: string;
  peakWaitTime: string;
  date: string;
  departmentBreakdown: {
    [key: string]: {
      total: number;
      answered: number;
      abandoned: number;
      avgWait: string;
      commonTopics?: string[];
    };
  };
}

interface CallData {
  customerId: string;
  customerName: string;
  phoneNumber: string;
  duration: string;
  summary: string;
  recordingUrl?: string;
  transcriptUrl?: string;
  shouldAnonymize?: boolean;
  transcript?: CallTranscriptLine[];
  sentiment?: {
    overall: number;
    breakdown: {
      positive: number;
      neutral: number;
      negative: number;
    };
  };
  topics?: string[];
  agent?: string;
  reasonForReview?: string;
  reasonSeverity?: 'warning' | 'negative' | 'positive';
  isCrmVerified?: boolean;
}

// Mock data for the dashboard
const kpiData = {
  totalCalls: 1247,
  answeredCalls: 1158,
  abandonedCalls: 89,
  averageWaitTime: '1:45',
  peakWaitTime: '2:30',
  date: 'Today',
  departmentBreakdown: {
    frontDesk: { 
      total: 523, 
      answered: 498, 
      abandoned: 25, 
      avgWait: '1:20',
      commonTopics: ['Check-in assistance', 'Room availability', 'Billing inquiries']
    },
    housekeeping: { 
      total: 312, 
      answered: 295, 
      abandoned: 17, 
      avgWait: '1:55',
      commonTopics: ['Room cleaning', 'Extra amenities', 'Maintenance issues']
    },
    roomService: { 
      total: 245, 
      answered: 228, 
      abandoned: 17, 
      avgWait: '2:10',
      commonTopics: ['Food orders', 'Special dietary requests', 'Delivery timing']
    },
    concierge: { 
      total: 89, 
      answered: 85, 
      abandoned: 4, 
      avgWait: '1:15',
      commonTopics: ['Local recommendations', 'Transportation', 'Event bookings']
    }
  }
};

const revenueImpact = [
  {
    issue: 'Valentine\'s Day Campaign',
    mentions: '50%',
    impact: '+$15,000',
    description: 'Revenue increase, but 20% complained about crowding',
    trend: 'mixed',
    affectedAreas: ['Restaurant', 'Lobby', 'Special Events']
  },
  {
    issue: 'Weekend Spa Package',
    mentions: '35%',
    impact: '+$8,500',
    description: 'Boost in bookings, 15% mentioned scheduling delays',
    trend: 'increasing',
    affectedAreas: ['Spa', 'Wellness Center']
  },
  {
    issue: 'Slow Wi-Fi',
    mentions: '10%',
    impact: '-$5,000',
    description: 'Lost upsells due to connectivity complaints',
    trend: 'increasing',
    affectedAreas: ['Guest rooms', 'Conference center']
  },
  {
    issue: 'Room Service Delays',
    mentions: '15%',
    impact: '-$3,200',
    description: 'Reduced orders and compensation',
    trend: 'stable',
    affectedAreas: ['Kitchen', 'Delivery']
  }
];

const Dashboard: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricId | null>(null);

  const calculatePercentage = (value: number, total: number): string => {
    if (total === 0) return '0.0';
    return ((value / total) * 100).toFixed(1);
  };

  const handleMetricClick = (metric: MetricId) => {
    setSelectedMetric(metric);
  };

  const handleCloseModal = () => {
    setSelectedMetric(null);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Greeting Header */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {`Good Morning, John. Welcome back.`}
        </h1>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Calls Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PhoneIcon className="h-6 w-6 text-blue-500" />
              <h3 className="text-gray-500 dark:text-gray-400 font-medium">Total Calls</h3>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-semibold text-gray-900 dark:text-white">{kpiData?.totalCalls}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{kpiData?.date}</p>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => handleMetricClick('total-calls')}
              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium"
            >
              View Details
            </button>
          </div>
        </div>

        {/* Answered Calls Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PhoneIcon className="h-6 w-6 text-green-500" />
              <h3 className="text-gray-500 dark:text-gray-400 font-medium">Total Answered</h3>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-semibold text-gray-900 dark:text-white">{kpiData?.answeredCalls}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {calculatePercentage(kpiData?.answeredCalls, kpiData?.totalCalls)}% Answer Rate
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => handleMetricClick('answered-calls')}
              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium"
            >
              View Details
            </button>
          </div>
        </div>

        {/* Abandoned Calls Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PhoneIcon className="h-6 w-6 text-red-500" />
              <h3 className="text-gray-500 dark:text-gray-400 font-medium">Total Abandoned</h3>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-semibold text-gray-900 dark:text-white">{kpiData?.abandonedCalls}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {calculatePercentage(kpiData?.abandonedCalls, kpiData?.totalCalls)}% Abandon Rate
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => handleMetricClick('abandoned-calls')}
              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium"
            >
              View Details
            </button>
          </div>
        </div>

        {/* Wait Time Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-6 w-6 text-yellow-500" />
              <h3 className="text-gray-500 dark:text-gray-400 font-medium">Average Wait Time</h3>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-semibold text-gray-900 dark:text-white">{kpiData?.averageWaitTime}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Peak: {kpiData?.peakWaitTime}</p>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => handleMetricClick('wait-time')}
              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Guest Sentiment and Revenue Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Guest Sentiment */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Guest Sentiment
          </h2>
          <div className="space-y-4">
            {revenueImpact.map((item, index) => (
              <div key={index} className="flex items-start justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{item.issue}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                  <div className="mt-1 flex items-center gap-2 text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Mentions: {item.mentions}</span>
                    <span className={item.impact.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                      {item.impact}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Impact */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Revenue Impact & Campaign ROI
          </h2>
          <div className="space-y-4">
            {revenueImpact.map((item, index) => (
              <div key={index} className="flex items-start justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{item.issue}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                  <div className="mt-1 flex items-center gap-2 text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Mentions: {item.mentions}</span>
                    <span className={item.impact.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                      {item.impact}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call Review Section */}
      <div className="w-full">
        <CallReviewSection />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Operational Risk Feed
            </h2>
            <OperationalRiskFeed />
          </div>
          <div>
            <StaffIssuesMonitor />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Pulse Comparison
            </h2>
            <PulseComparison />
          </div>
          <div>
            <ReputationOverview />
          </div>
          <div>
            <ComplianceAlerts />
          </div>
          <div>
            <EscalatingRiskPatterns />
          </div>
        </div>
      </div>

      {/* Metrics Drilldown Modal */}
      {selectedMetric && (
        <CallMetricsDrilldown
          isOpen={true}
          metricId={selectedMetric}
          metrics={kpiData}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Dashboard; 