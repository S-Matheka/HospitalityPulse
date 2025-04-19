import React, { useState } from 'react';
import { 
  PhoneIcon, 
  PhoneArrowUpRightIcon,
  PhoneXMarkIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import CallMetricsDrilldown from './CallMetricsDrilldown';

type MetricId = 'total-calls' | 'answered-calls' | 'abandoned-calls' | 'wait-time';

interface Metrics {
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
    };
  };
}

const CallMetricsOverview: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricId | null>(null);
  
  const metrics: Metrics = {
    totalCalls: 245,
    answeredCalls: 230,
    abandonedCalls: 15,
    averageWaitTime: '1m 45s',
    peakWaitTime: '4m 30s',
    date: '2024-03-20',
    departmentBreakdown: {
      'Front Desk': {
        total: 120,
        answered: 115,
        abandoned: 5,
        avgWait: '1m 30s'
      },
      'Housekeeping': {
        total: 75,
        answered: 70,
        abandoned: 5,
        avgWait: '2m 00s'
      },
      'Concierge': {
        total: 50,
        answered: 45,
        abandoned: 5,
        avgWait: '1m 15s'
      }
    }
  };

  const answerRate = ((metrics.answeredCalls / metrics.totalCalls) * 100).toFixed(1);
  const abandonRate = ((metrics.abandonedCalls / metrics.totalCalls) * 100).toFixed(1);

  const handleViewClick = (metricId: MetricId) => {
    setSelectedMetric(metricId);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Calls */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-6 hover:bg-gray-800/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PhoneIcon className="h-6 w-6 text-blue-400" />
              <h3 className="text-gray-400 font-medium">Total Calls</h3>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-semibold text-white">{metrics.totalCalls}</p>
            <p className="text-sm text-gray-400 mt-1">{metrics.date}</p>
          </div>
          <button
            onClick={() => handleViewClick('total-calls')}
            className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            View
          </button>
        </div>

        {/* Answered Calls */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-6 hover:bg-gray-800/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PhoneArrowUpRightIcon className="h-6 w-6 text-green-400" />
              <h3 className="text-gray-400 font-medium">Total Answered</h3>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-semibold text-white">{metrics.answeredCalls}</p>
            <p className="text-sm text-gray-400 mt-1">{answerRate}% Answer Rate</p>
          </div>
          <button
            onClick={() => handleViewClick('answered-calls')}
            className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            View
          </button>
        </div>

        {/* Abandoned Calls */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-6 hover:bg-gray-800/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PhoneXMarkIcon className="h-6 w-6 text-red-400" />
              <h3 className="text-gray-400 font-medium">Total Abandoned</h3>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-semibold text-white">{metrics.abandonedCalls}</p>
            <p className="text-sm text-gray-400 mt-1">{abandonRate}% Abandon Rate</p>
          </div>
          <button
            onClick={() => handleViewClick('abandoned-calls')}
            className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            View
          </button>
        </div>

        {/* Average Wait Time */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-6 hover:bg-gray-800/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-6 w-6 text-yellow-400" />
              <h3 className="text-gray-400 font-medium">Average Wait Time</h3>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-semibold text-white">{metrics.averageWaitTime}</p>
            <p className="text-sm text-gray-400 mt-1">Peak: {metrics.peakWaitTime}</p>
          </div>
          <button
            onClick={() => handleViewClick('wait-time')}
            className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            View
          </button>
        </div>
      </div>

      {/* Drilldown Modal */}
      {selectedMetric && (
        <CallMetricsDrilldown
          isOpen={true}
          metricId={selectedMetric}
          metrics={metrics}
          onClose={() => setSelectedMetric(null)}
        />
      )}
    </>
  );
};

export default CallMetricsOverview; 