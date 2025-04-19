import React, { useState } from 'react';
import { ChartBarIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface ComparisonResult {
  overview: {
    title: string;
    details: string;
  };
  metrics: {
    title: string;
    details: string;
  };
  complaints: {
    title: string;
    details: string;
  };
  revenue: {
    title: string;
    details: string;
  };
}

const mockComparisonResults: ComparisonResult = {
  overview: {
    title: "Performance Overview",
    details: "Sunset Plaza Hotel - Downtown shows 12% higher guest satisfaction but 8% lower occupancy rate compared to Northside location."
  },
  metrics: {
    title: "Key Metrics",
    details: "Average daily rate: Downtown ($245) vs Northside ($225). Guest satisfaction: Downtown (4.6/5) vs Northside (4.1/5). Occupancy: Downtown (82%) vs Northside (90%)."
  },
  complaints: {
    title: "Service Analysis",
    details: "Top issues at Downtown: WiFi connectivity (45% of complaints), breakfast service (30%). Northside: room cleanliness (35%), check-in delays (25%)."
  },
  revenue: {
    title: "Revenue Performance",
    details: "Downtown RevPAR $200.90 (+15% YoY), with strong performance in premium rooms. Northside RevPAR $202.50 (+5% YoY), driven by higher occupancy."
  }
};

const PulseQueries: React.FC = () => {
  const [selectedHotelA, setSelectedHotelA] = useState('');
  const [selectedHotelB, setSelectedHotelB] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);

  const handleCompare = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setComparisonResult(mockComparisonResults);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Hotel Performance Comparison
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Select Hotels to Compare
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hotel A
              </label>
              <select
                value={selectedHotelA}
                onChange={(e) => setSelectedHotelA(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a hotel</option>
                <option value="downtown">Sunset Plaza Hotel - Downtown</option>
                <option value="midtown">Sunset Plaza Hotel - Midtown</option>
                <option value="northside">Sunset Plaza Hotel - Northside</option>
                <option value="southside">Sunset Plaza Hotel - Southside</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hotel B
              </label>
              <select
                value={selectedHotelB}
                onChange={(e) => setSelectedHotelB(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a hotel</option>
                <option value="downtown">Sunset Plaza Hotel - Downtown</option>
                <option value="midtown">Sunset Plaza Hotel - Midtown</option>
                <option value="northside">Sunset Plaza Hotel - Northside</option>
                <option value="southside">Sunset Plaza Hotel - Southside</option>
              </select>
            </div>

            <button
              onClick={handleCompare}
              disabled={!selectedHotelA || !selectedHotelB || isLoading}
              className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <ChartBarIcon className="h-5 w-5 mr-2" />
                  Compare Performance
                </>
              )}
            </button>
          </div>
        </div>

        {comparisonResult && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Comparison Results
            </h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900">
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-300">1</span>
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {comparisonResult.overview.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {comparisonResult.overview.details}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900">
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-300">2</span>
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {comparisonResult.metrics.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {comparisonResult.metrics.details}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900">
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-300">3</span>
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {comparisonResult.complaints.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {comparisonResult.complaints.details}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900">
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-300">4</span>
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {comparisonResult.revenue.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {comparisonResult.revenue.details}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PulseQueries; 