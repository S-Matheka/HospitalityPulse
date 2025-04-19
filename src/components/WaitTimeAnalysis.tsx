import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from 'recharts';
import { ClockIcon, UserGroupIcon, PhoneIcon } from '@heroicons/react/24/outline';

interface DepartmentMetrics {
  name: string;
  avgWait: number;
  peakWait: number;
  staffCount: number;
  callVolume: number;
  withinSLA: number;
  hourlyData: {
    hour: number;
    wait: number;
    volume: number;
  }[];
}

const departmentData: DepartmentMetrics[] = [
  {
    name: 'RoomService',
    avgWait: 130, // 2:10 in seconds
    peakWait: 150, // 2:30 in seconds
    staffCount: 4,
    callVolume: 45,
    withinSLA: 75,
    hourlyData: [
      { hour: 6, wait: 90, volume: 15 },
      { hour: 7, wait: 100, volume: 20 },
      { hour: 8, wait: 130, volume: 35 },
      { hour: 9, wait: 150, volume: 40 },
      { hour: 10, wait: 140, volume: 30 },
      { hour: 11, wait: 120, volume: 25 },
      { hour: 12, wait: 130, volume: 45 }
    ]
  },
  {
    name: 'Housekeeping',
    avgWait: 115, // 1:55 in seconds
    peakWait: 140,
    staffCount: 6,
    callVolume: 38,
    withinSLA: 82,
    hourlyData: [
      { hour: 6, wait: 80, volume: 10 },
      { hour: 7, wait: 95, volume: 15 },
      { hour: 8, wait: 115, volume: 30 },
      { hour: 9, wait: 140, volume: 35 },
      { hour: 10, wait: 120, volume: 25 },
      { hour: 11, wait: 100, volume: 20 },
      { hour: 12, wait: 110, volume: 30 }
    ]
  },
  {
    name: 'FrontDesk',
    avgWait: 80, // 1:20 in seconds
    peakWait: 100,
    staffCount: 5,
    callVolume: 52,
    withinSLA: 90,
    hourlyData: [
      { hour: 6, wait: 60, volume: 20 },
      { hour: 7, wait: 70, volume: 25 },
      { hour: 8, wait: 80, volume: 40 },
      { hour: 9, wait: 100, volume: 50 },
      { hour: 10, wait: 90, volume: 45 },
      { hour: 11, wait: 75, volume: 35 },
      { hour: 12, wait: 85, volume: 42 }
    ]
  },
  {
    name: 'Concierge',
    avgWait: 75, // 1:15 in seconds
    peakWait: 90,
    staffCount: 3,
    callVolume: 30,
    withinSLA: 95,
    hourlyData: [
      { hour: 6, wait: 50, volume: 8 },
      { hour: 7, wait: 60, volume: 12 },
      { hour: 8, wait: 75, volume: 25 },
      { hour: 9, wait: 90, volume: 28 },
      { hour: 10, wait: 85, volume: 22 },
      { hour: 11, wait: 70, volume: 18 },
      { hour: 12, wait: 80, volume: 20 }
    ]
  }
];

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const getWaitTimeColor = (wait: number): string => {
  if (wait > 120) return 'text-red-500 dark:text-red-400'; // > 2 min
  if (wait > 90) return 'text-yellow-500 dark:text-yellow-400'; // > 1.5 min
  return 'text-green-500 dark:text-green-400'; // < 1.5 min
};

const WaitTimeAnalysis: React.FC = () => {
  const [viewMode, setViewMode] = useState<'department' | 'hour'>('department');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <ClockIcon className="h-6 w-6 text-primary-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Wait Time Analysis
          </h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('department')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'department'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            By Department
          </button>
          <button
            onClick={() => setViewMode('hour')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'hour'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            By Hour
          </button>
        </div>
      </div>

      {/* Main Chart */}
      <div className="h-80 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === 'department' ? (
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                label={{ value: 'Wait Time (seconds)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                formatter={(value: number, name) => [
                  formatTime(value),
                  name === 'avgWait' ? 'Average Wait' : 'Peak Wait'
                ]}
              />
              <Legend />
              <Bar
                dataKey="avgWait"
                fill="#6366f1"
                name="Average Wait"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="peakWait"
                fill="#f59e0b"
                name="Peak Wait"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <ComposedChart data={departmentData[0].hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" label={{ value: 'Hour', position: 'insideBottom' }} />
              <YAxis yAxisId="left" label={{ value: 'Wait Time (seconds)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Call Volume', angle: 90, position: 'insideRight' }} />
              <Tooltip formatter={(value: number, name) => [
                name === 'wait' ? formatTime(value) : value,
                name === 'wait' ? 'Wait Time' : 'Call Volume'
              ]} />
              <Legend />
              <Bar dataKey="volume" fill="#6366f1" name="Call Volume" yAxisId="right" />
              <Line type="monotone" dataKey="wait" stroke="#f59e0b" name="Wait Time" yAxisId="left" />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {departmentData.map((dept) => (
          <div
            key={dept.name}
            className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {dept.name}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Average Wait:
                </span>
                <span className={`font-medium ${getWaitTimeColor(dept.avgWait)}`}>
                  {formatTime(dept.avgWait)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Peak Wait:
                </span>
                <span className={`font-medium ${getWaitTimeColor(dept.peakWait)}`}>
                  {formatTime(dept.peakWait)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Within SLA:
                </span>
                <span className="font-medium text-primary-600 dark:text-primary-400">
                  {dept.withinSLA}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <UserGroupIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Staff:</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {dept.staffCount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <PhoneIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Calls:</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {dept.callVolume}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-4">
        <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-400 mb-2">
          Recommendations
        </h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
          <li>Room Service wait times exceed target SLA. Consider adding staff during 8-10 AM peak.</li>
          <li>Housekeeping showing increased wait times. Review task allocation system.</li>
          <li>Front Desk maintaining good performance but approaching yellow threshold.</li>
          <li>Concierge team demonstrating best practices - document processes for other departments.</li>
        </ul>
      </div>
    </div>
  );
};

export default WaitTimeAnalysis; 