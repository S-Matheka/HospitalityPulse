import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  XMarkIcon,
  PhoneIcon,
  PhoneArrowUpRightIcon,
  PhoneXMarkIcon,
  ClockIcon,
  ChartBarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

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

interface DrilldownProps {
  isOpen: boolean;
  onClose: () => void;
  metricId: MetricId;
  metrics: Metrics;
}

// Mock data for the charts
const hourlyData = [
  { hour: '6AM', calls: 25, topic: 'Early Check-out' },
  { hour: '7AM', calls: 45, topic: 'Breakfast Service' },
  { hour: '8AM', calls: 85, topic: 'Housekeeping Requests' },
  { hour: '9AM', calls: 95, topic: 'Late Check-out Requests' },
  { hour: '10AM', calls: 120, topic: 'Room Service' },
  { hour: '11AM', calls: 110, topic: 'Concierge Services' },
  { hour: '12PM', calls: 105, topic: 'Restaurant Reservations' },
  { hour: '1PM', calls: 95, topic: 'Room Service' },
  { hour: '2PM', calls: 115, topic: 'Early Check-in' },
  { hour: '3PM', calls: 145, topic: 'Check-in Peak' },
  { hour: '4PM', calls: 125, topic: 'Check-in/Local Info' },
  { hour: '5PM', calls: 100, topic: 'Dinner Reservations' },
  { hour: '6PM', calls: 85, topic: 'Evening Services' },
  { hour: '7PM', calls: 75, topic: 'Room Service' },
  { hour: '8PM', calls: 65, topic: 'Entertainment Info' },
  { hour: '9PM', calls: 45, topic: 'Late Services' }
];

const peakTimeData = {
  checkIn: {
    peak: '3:00 PM - 5:00 PM',
    avgVolume: 135,
    staffLevel: 'High'
  },
  roomService: {
    peak: '6:00 PM - 8:00 PM',
    avgVolume: 85,
    staffLevel: 'Medium'
  },
  housekeeping: {
    peak: '8:00 AM - 10:00 AM',
    avgVolume: 90,
    staffLevel: 'High'
  },
  concierge: {
    peak: '9:00 AM - 11:00 AM',
    avgVolume: 65,
    staffLevel: 'Medium'
  }
};

// Add these interfaces at the top of the file
interface DepartmentData {
  name: string;
  total: number;
  answered: number;
  abandoned: number;
  avgWait: string;
  answerRate: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  metricType?: MetricId;
  hourlyView?: boolean;
  metrics: Metrics;
}

type PeakTimeKey = 'checkIn' | 'roomService' | 'housekeeping' | 'concierge';

// Transform department data for charts
const transformDepartmentData = (metrics: DrilldownProps['metrics']): DepartmentData[] => {
  if (!metrics?.departmentBreakdown) {
    return [];
  }
  return Object.entries(metrics.departmentBreakdown).map(([dept, data]) => ({
    name: dept.charAt(0).toUpperCase() + dept.slice(1),
    total: data.total,
    answered: data.answered,
    abandoned: data.abandoned,
    avgWait: data.avgWait,
    answerRate: ((data.answered / data.total) * 100).toFixed(1)
  }));
};

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label, metricType, hourlyView = false, metrics }) => {
  if (!active || !payload || !payload.length) return null;

  if (hourlyView) {
    const hourData = hourlyData.find(h => h.hour === label);
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="font-medium text-gray-900 dark:text-white mb-1">{label}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Calls: <span className="font-semibold">{hourData?.calls}</span>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Main Topic: <span className="font-semibold">{hourData?.topic}</span>
        </p>
      </div>
    );
  }

  const getValue = () => {
    const value = payload[0].value;
    if (metricType === 'wait-time') {
      return value + ' min';
    }
    return value.toLocaleString();
  };

  const getDepartmentDetails = (metrics: Metrics) => {
    if (!label) return null;
    const departmentData = transformDepartmentData(metrics);
    const dept = departmentData.find(d => d.name === label);
    if (!dept) return null;

    switch (metricType) {
      case 'total-calls':
        return `${dept.answered} answered, ${dept.abandoned} abandoned`;
      case 'answered-calls':
        return `${((dept.answered / dept.total) * 100).toFixed(1)}% answer rate`;
      case 'abandoned-calls':
        return `${((dept.abandoned / dept.total) * 100).toFixed(1)}% abandon rate`;
      case 'wait-time':
        const key = label.toLowerCase().replace(/\s+/g, '') as PeakTimeKey;
        return `Peak time: ${peakTimeData[key]?.peak || 'N/A'}`;
      default:
        return '';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <p className="font-medium text-gray-900 dark:text-white mb-1">{label}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {payload[0].name}: <span className="font-semibold">{getValue()}</span>
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {getDepartmentDetails(metrics)}
      </p>
    </div>
  );
};

// Update getMetricSpecificData function
const getMetricSpecificData = (metricId: MetricId, metrics: Metrics) => {
  const departmentData = transformDepartmentData(metrics);

  switch (metricId) {
    case 'total-calls':
      return {
        value: metrics.totalCalls,
        label: 'Total Calls',
        trend: `${Object.keys(metrics.departmentBreakdown).length} departments`,
        chartData: departmentData.map(dept => ({
          name: dept.name,
          value: dept.total
        }))
      };
    case 'answered-calls':
      return {
        value: metrics.answeredCalls,
        label: 'Answered Calls',
        trend: `${((metrics.answeredCalls / metrics.totalCalls) * 100).toFixed(1)}% answer rate`,
        chartData: departmentData.map(dept => ({
          name: dept.name,
          value: dept.answered
        }))
      };
    case 'abandoned-calls':
      return {
        value: metrics.abandonedCalls,
        label: 'Abandoned Calls',
        trend: `${((metrics.abandonedCalls / metrics.totalCalls) * 100).toFixed(1)}% abandon rate`,
        chartData: departmentData.map(dept => ({
          name: dept.name,
          value: dept.abandoned
        }))
      };
    case 'wait-time':
      return {
        value: metrics.averageWaitTime,
        label: 'Average Wait Time',
        trend: `Peak: ${metrics.peakWaitTime}`,
        chartData: departmentData.map(dept => ({
          name: dept.name,
          value: parseFloat(dept.avgWait.split('m')[0])
        }))
      };
    default:
      return {
        value: 0,
        label: '',
        trend: '',
        chartData: []
      };
  }
};

interface Recommendation {
  title: string;
  description: string;
  icon: JSX.Element;
}

// Update getRecommendations function
const getRecommendations = (metricId: MetricId, metrics: Metrics): Recommendation[] => {
  switch (metricId) {
    case 'total-calls':
      return [
        {
          title: 'Peak Volume Management',
          description: `Total calls: ${metrics.totalCalls}. Consider reviewing staffing levels during peak hours.`,
          icon: <UserGroupIcon className="h-5 w-5 text-blue-400" />
        },
        {
          title: 'Resource Distribution',
          description: 'Review department distribution to optimize resource allocation.',
          icon: <BuildingOfficeIcon className="h-5 w-5 text-blue-400" />
        },
        {
          title: 'Call Pattern Analysis',
          description: 'Review hourly distribution to optimize staff scheduling.',
          icon: <ChartBarIcon className="h-5 w-5 text-blue-400" />
        }
      ];
    case 'answered-calls':
      return [
        {
          title: 'Performance Analysis',
          description: `Answer rate: ${((metrics.answeredCalls / metrics.totalCalls) * 100).toFixed(1)}%. Review staff performance.`,
          icon: <ArrowTrendingUpIcon className="h-5 w-5 text-green-400" />
        },
        {
          title: 'Training Opportunities',
          description: 'Consider implementing cross-department training sessions.',
          icon: <UserGroupIcon className="h-5 w-5 text-green-400" />
        },
        {
          title: 'Best Practices',
          description: 'Share successful handling techniques across departments.',
          icon: <ChartBarIcon className="h-5 w-5 text-green-400" />
        }
      ];
    case 'abandoned-calls':
      return [
        {
          title: 'Critical Area Focus',
          description: `${metrics.abandonedCalls} abandoned calls. Priority review needed.`,
          icon: <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
        },
        {
          title: 'Queue Management',
          description: 'Review call routing and peak time handling.',
          icon: <PhoneIcon className="h-5 w-5 text-red-400" />
        },
        {
          title: 'Staff Allocation',
          description: 'Consider flexible staffing for high-volume periods.',
          icon: <UserGroupIcon className="h-5 w-5 text-red-400" />
        }
      ];
    case 'wait-time':
      return [
        {
          title: 'Peak Time Management',
          description: `Peak wait time: ${metrics.peakWaitTime}. Review staffing during busy periods.`,
          icon: <ClockIcon className="h-5 w-5 text-yellow-400" />
        },
        {
          title: 'Service Level Optimization',
          description: 'Consider implementing callback options during high-wait periods.',
          icon: <PhoneArrowUpRightIcon className="h-5 w-5 text-yellow-400" />
        },
        {
          title: 'Process Improvement',
          description: 'Review call handling procedures for efficiency gains.',
          icon: <ChartBarIcon className="h-5 w-5 text-yellow-400" />
        }
      ];
  }
  return [];
};

const CallMetricsDrilldown: React.FC<DrilldownProps> = ({
  isOpen,
  onClose,
  metricId,
  metrics
}) => {
  const [viewMode, setViewMode] = useState<'department' | 'hourly'>('department');
  const departmentData = transformDepartmentData(metrics);
  const metricData = getMetricSpecificData(metricId, metrics);

  // Sample wait time data
  const waitTimeData = [
    { time: '9 AM', average: 2.5, peak: 4.2 },
    { time: '10 AM', average: 3.1, peak: 5.0 },
    { time: '11 AM', average: 4.2, peak: 6.5 },
    { time: '12 PM', average: 5.0, peak: 7.8 },
    { time: '1 PM', average: 4.8, peak: 7.2 },
    { time: '2 PM', average: 3.9, peak: 6.0 },
    { time: '3 PM', average: 3.2, peak: 5.5 },
    { time: '4 PM', average: 2.8, peak: 4.8 }
  ];

  const getMetricTitle = () => {
    switch (metricId) {
      case 'total-calls':
        return 'Total Calls Analysis';
      case 'answered-calls':
        return 'Answered Calls Analysis';
      case 'abandoned-calls':
        return 'Abandoned Calls Analysis';
      case 'wait-time':
        return 'Wait Time Analysis';
      default:
        return 'Call Metrics Analysis';
    }
  };

  const getMetricIcon = () => {
    switch (metricId) {
      case 'total-calls':
        return <PhoneIcon className="h-6 w-6 text-blue-400" />;
      case 'answered-calls':
        return <PhoneArrowUpRightIcon className="h-6 w-6 text-green-400" />;
      case 'abandoned-calls':
        return <PhoneXMarkIcon className="h-6 w-6 text-red-400" />;
      case 'wait-time':
        return <ClockIcon className="h-6 w-6 text-yellow-400" />;
      default:
        return <ChartBarIcon className="h-6 w-6 text-blue-400" />;
    }
  };

  // Get chart data based on view mode
  const getChartData = () => {
    if (viewMode === 'hourly') {
      return hourlyData.map(hour => ({
        name: hour.hour,
        value: hour.calls,
        topic: hour.topic
      }));
    }
    return metricData.chartData;
  };

  // Update type guard function
  const isWaitTimeMetric = (metricId: MetricId | undefined): metricId is 'wait-time' => {
    return metricId === 'wait-time';
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform rounded-lg bg-white dark:bg-gray-800 text-left align-middle shadow-xl transition-all flex flex-col max-h-[90vh]">
                {/* Static Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    {getMetricIcon()}
                    <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white">
                      {getMetricTitle()}
                    </Dialog.Title>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Static Chart Section */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {isWaitTimeMetric(metricId) ? 'Wait Time Trends' : 
                          viewMode === 'department' ? 'Department Breakdown' : 'Hourly Distribution'}
                      </h3>
                      {!isWaitTimeMetric(metricId) && (
                        <div className="flex rounded-lg overflow-hidden">
                          <button
                            onClick={() => setViewMode('department')}
                            className={`px-3 py-1 text-sm font-medium ${
                              viewMode === 'department'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            By Department
                          </button>
                          <button
                            onClick={() => setViewMode('hourly')}
                            className={`px-3 py-1 text-sm font-medium ${
                              viewMode === 'hourly'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            By Hour
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        {isWaitTimeMetric(metricId) ? (
                          <LineChart data={waitTimeData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis
                              dataKey="time"
                              tick={{ fill: '#9CA3AF' }}
                              axisLine={{ stroke: '#4B5563' }}
                            />
                            <YAxis
                              tick={{ fill: '#9CA3AF' }}
                              axisLine={{ stroke: '#4B5563' }}
                              tickFormatter={(value) => `${value}m`}
                            />
                            <Tooltip
                              content={({ active, payload, label }) => {
                                if (!active || !payload || !payload.length) return null;
                                return (
                                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                                    <p className="font-medium text-gray-900 dark:text-white mb-1">{label}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                      Average: <span className="font-semibold">{payload[0].value}m</span>
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                      Peak: <span className="font-semibold">{payload[1].value}m</span>
                                    </p>
                                  </div>
                                );
                              }}
                            />
                            <Line
                              type="monotone"
                              dataKey="average"
                              stroke="#EAB308"
                              strokeWidth={2}
                              dot={{ fill: '#EAB308', r: 4 }}
                              name="Average Wait Time"
                            />
                            <Line
                              type="monotone"
                              dataKey="peak"
                              stroke="#FB923C"
                              strokeWidth={2}
                              dot={{ fill: '#FB923C', r: 4 }}
                              name="Peak Wait Time"
                            />
                          </LineChart>
                        ) : (
                          viewMode === 'department' ? (
                            <BarChart data={getChartData()}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                              <XAxis
                                dataKey="name"
                                tick={{ fill: '#9CA3AF' }}
                                axisLine={{ stroke: '#4B5563' }}
                              />
                              <YAxis
                                tick={{ fill: '#9CA3AF' }}
                                axisLine={{ stroke: '#4B5563' }}
                              />
                              <Tooltip
                                content={<CustomTooltip metricType={metricId} metrics={metrics} />}
                              />
                              <Bar
                                dataKey="value"
                                fill={
                                  metricId === 'total-calls'
                                    ? '#3B82F6'
                                    : metricId === 'answered-calls'
                                    ? '#10B981'
                                    : '#EF4444'
                                }
                              />
                            </BarChart>
                          ) : (
                            <LineChart data={getChartData()}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                              <XAxis
                                dataKey="name"
                                tick={{ fill: '#9CA3AF' }}
                                axisLine={{ stroke: '#4B5563' }}
                              />
                              <YAxis
                                tick={{ fill: '#9CA3AF' }}
                                axisLine={{ stroke: '#4B5563' }}
                              />
                              <Tooltip
                                content={<CustomTooltip hourlyView={true} metricType={metricId} metrics={metrics} />}
                              />
                              <Line
                                type="monotone"
                                dataKey="value"
                                stroke={
                                  metricId === 'total-calls'
                                    ? '#3B82F6'
                                    : metricId === 'answered-calls'
                                    ? '#10B981'
                                    : '#EF4444'
                                }
                                strokeWidth={2}
                                dot={{ fill: '#3B82F6', r: 4 }}
                                activeDot={{ r: 6 }}
                              />
                            </LineChart>
                          )
                        )}
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Key Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {metricData.label}
                        </h3>
                      </div>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {metricData.value}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {metricData.trend}
                      </p>
                    </div>
                  </div>

                  {/* Recommendations Section */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                      Recommendations
                    </h3>
                    <div className="space-y-4">
                      {getRecommendations(metricId, metrics).map((recommendation, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            {recommendation.icon}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              {recommendation.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {recommendation.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Analysis */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                      {isWaitTimeMetric(metricId) ? 'Detailed Wait Time Analysis' : 'Detailed Department Metrics'}
                    </h3>
                    {isWaitTimeMetric(metricId) ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                              Peak Hours
                            </h4>
                            <ul className="space-y-2">
                              {waitTimeData
                                .sort((a, b) => b.peak - a.peak)
                                .slice(0, 3)
                                .map((hour, index) => (
                                  <li key={index} className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">{hour.time}</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{hour.peak}m</span>
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                              Department Analysis
                            </h4>
                            <ul className="space-y-2">
                              {departmentData
                                .sort((a, b) => parseFloat(b.avgWait) - parseFloat(a.avgWait))
                                .slice(0, 3)
                                .map((dept, index) => (
                                  <li key={index} className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">{dept.name}</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{dept.avgWait}</span>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {departmentData.map((dept, index) => (
                          <div key={index} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{dept.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {isWaitTimeMetric(metricId) 
                                  ? `Average wait: ${dept.avgWait}`
                                  : `${dept.answered} answered, ${dept.abandoned} abandoned`}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900 dark:text-white">
                                {isWaitTimeMetric(metricId) 
                                  ? dept.avgWait
                                  : dept.total}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {isWaitTimeMetric(metricId) 
                                  ? 'Average'
                                  : 'Total calls'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CallMetricsDrilldown; 