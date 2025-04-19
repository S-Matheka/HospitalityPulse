import React from 'react';

interface BenchmarkMetric {
  name: string;
  yourRating: number;
  regionalAvg: number;
  bottomTen: number;
  topTen: number;
  unit: string;
  isGood: (value: number) => boolean;
}

const CompetitiveBenchmark: React.FC = () => {
  const metrics: BenchmarkMetric[] = [
    {
      name: 'Guest Satisfaction',
      yourRating: 4.2,
      regionalAvg: 4.3,
      bottomTen: 3.7,
      topTen: 4.8,
      unit: '★',
      isGood: (value) => value >= 4.0,
    },
    {
      name: 'Check-in Time',
      yourRating: 8,
      regionalAvg: 5,
      bottomTen: 15,
      topTen: 3,
      unit: 'min',
      isGood: (value) => value <= 5,
    },
    {
      name: 'Service Response Rate',
      yourRating: 92,
      regionalAvg: 85,
      bottomTen: 75,
      topTen: 95,
      unit: '%',
      isGood: (value) => value >= 90,
    },
    {
      name: 'Room Turnover',
      yourRating: 88,
      regionalAvg: 84,
      bottomTen: 75,
      topTen: 95,
      unit: '%',
      isGood: (value) => value >= 85,
    },
  ];

  const getPerformanceColor = (metric: BenchmarkMetric) => {
    if (metric.yourRating >= metric.topTen) return 'text-success-500';
    if (metric.yourRating >= metric.regionalAvg) return 'text-primary-500';
    if (metric.yourRating <= metric.bottomTen) return 'text-danger-500';
    return 'text-warning-500';
  };

  const getPerformanceLabel = (metric: BenchmarkMetric) => {
    if (metric.yourRating >= metric.topTen) return 'Top 10%';
    if (metric.yourRating >= metric.regionalAvg) return 'Above Average';
    if (metric.yourRating <= metric.bottomTen) return 'Bottom 10%';
    return 'Below Average';
  };

  const getPerformanceBadgeColor = (metric: BenchmarkMetric) => {
    if (metric.yourRating >= metric.topTen)
      return 'bg-success-50 text-success-700 dark:bg-success-900/20 dark:text-success-300';
    if (metric.yourRating >= metric.regionalAvg)
      return 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300';
    if (metric.yourRating <= metric.bottomTen)
      return 'bg-danger-50 text-danger-700 dark:bg-danger-900/20 dark:text-danger-300';
    return 'bg-warning-50 text-warning-700 dark:bg-warning-900/20 dark:text-warning-300';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Competitive Benchmark
      </h2>

      <div className="space-y-6">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {metric.name}
              </h3>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPerformanceBadgeColor(
                  metric
                )}`}
              >
                {getPerformanceLabel(metric)}
              </span>
            </div>

            <div className="relative pt-2">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-gray-600 dark:text-gray-400">
                    Your Rating
                  </span>
                  <span
                    className={`ml-2 text-sm font-bold ${getPerformanceColor(metric)}`}
                  >
                    {metric.yourRating}
                    {metric.unit}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-gray-600 dark:text-gray-400">
                    Regional Avg
                  </span>
                  <span className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                    {metric.regionalAvg}
                    {metric.unit}
                  </span>
                </div>
              </div>

              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                <div
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                    metric.isGood(metric.yourRating)
                      ? 'bg-success-500'
                      : 'bg-warning-500'
                  }`}
                  style={{
                    width: `${
                      ((metric.yourRating - metric.bottomTen) /
                        (metric.topTen - metric.bottomTen)) *
                      100
                    }%`,
                  }}
                />
              </div>

              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Bottom 10%: {metric.bottomTen}
                  {metric.unit}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Top 10%: {metric.topTen}
                  {metric.unit}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitiveBenchmark; 