import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

interface LocationScore {
  name: string;
  type: 'chain' | 'independent' | 'competitor';
  overallRating: number;
  googleRating: number;
  tripAdvisorRating: number;
  bookingRating: number;
}

const PulseComparison: React.FC = () => {
  const locations: LocationScore[] = [
    {
      name: 'Grand Plaza Hotel',
      type: 'chain',
      overallRating: 4.5,
      googleRating: 4.6,
      tripAdvisorRating: 4.4,
      bookingRating: 4.5
    },
    {
      name: 'Riverside Inn',
      type: 'chain',
      overallRating: 4.4,
      googleRating: 4.5,
      tripAdvisorRating: 4.3,
      bookingRating: 4.4
    },
    {
      name: 'The Metropolitan',
      type: 'competitor',
      overallRating: 4.6,
      googleRating: 4.7,
      tripAdvisorRating: 4.5,
      bookingRating: 4.6
    },
    {
      name: 'Boutique Central',
      type: 'independent',
      overallRating: 4.7,
      googleRating: 4.8,
      tripAdvisorRating: 4.6,
      bookingRating: 4.7
    },
    {
      name: 'Harbor View Hotel',
      type: 'competitor',
      overallRating: 4.3,
      googleRating: 4.4,
      tripAdvisorRating: 4.2,
      bookingRating: 4.3
    }
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'chain':
        return 'Chain Property';
      case 'independent':
        return 'Independent';
      case 'competitor':
        return 'Competitor';
      default:
        return '';
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'chain':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
      case 'independent':
        return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      case 'competitor':
        return 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300';
      default:
        return '';
    }
  };

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center space-x-1.5">
        <span className="text-base font-semibold text-gray-900 dark:text-white">
          {rating.toFixed(1)}
        </span>
        <div className="flex">
          <StarIcon className="h-4 w-4 text-yellow-400" />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Comparison Properties
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {locations.map((location) => (
          <div
            key={location.name}
            className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3"
          >
            <div className="flex flex-col">
              <div className="mb-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {location.name}
                </h3>
                <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded mt-1 ${getTypeStyles(location.type)}`}>
                  {getTypeLabel(location.type)}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Overall
                  </div>
                  {renderRating(location.overallRating)}
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                  <div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Google
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {location.googleRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      TripAdv
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {location.tripAdvisorRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Book
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {location.bookingRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PulseComparison; 