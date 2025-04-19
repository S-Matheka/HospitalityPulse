import React from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BuildingOfficeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

interface Location {
  id: string;
  name: string;
  city: string;
  state: string;
  riskLevel: 'Low Risk' | 'Medium Risk' | 'High Risk';
  ratingTrend: 'up' | 'down';
  trendDays: number;
  ratings: {
    tripadvisor: number;
    google: number;
    bookingcom: number;
    expedia: number;
    hotelscom: number;
  };
  metrics: {
    totalCalls: number;
    answerRate: number;
    abandonRate: number;
    avgWaitTime: string;
  };
}

// Platform weights for calculating overall rating
const PLATFORM_WEIGHTS = {
  tripadvisor: 0.25,  // 25% weight
  google: 0.25,       // 25% weight
  bookingcom: 0.20,   // 20% weight
  expedia: 0.15,      // 15% weight
  hotelscom: 0.15     // 15% weight
};

// Calculate weighted average rating
const calculateOverallRating = (ratings: Location['ratings']): number => {
  const weightedSum = (
    ratings.tripadvisor * PLATFORM_WEIGHTS.tripadvisor +
    ratings.google * PLATFORM_WEIGHTS.google +
    ratings.bookingcom * PLATFORM_WEIGHTS.bookingcom +
    ratings.expedia * PLATFORM_WEIGHTS.expedia +
    ratings.hotelscom * PLATFORM_WEIGHTS.hotelscom
  );
  
  return Number(weightedSum.toFixed(1));
};

// Function to determine risk level based on metrics and ratings
const determineRiskLevel = (location: Omit<Location, 'riskLevel'>): Location['riskLevel'] => {
  const overallRating = calculateOverallRating(location.ratings);
  const answerRate = location.metrics.answerRate;
  
  if (overallRating >= 4.3 && answerRate >= 90) return 'Low Risk';
  if (overallRating <= 3.8 || answerRate <= 85) return 'High Risk';
  return 'Medium Risk';
};

const locations: Omit<Location, 'riskLevel'>[] = [
  {
    id: '1',
    name: 'Sunset Plaza Hotel - Midtown',
    city: 'Atlanta',
    state: 'GA',
    ratingTrend: 'up',
    trendDays: 30,
    ratings: {
      tripadvisor: 4.5,
      google: 4.5,
      bookingcom: 4.3,
      expedia: 4.2,
      hotelscom: 4.3
    },
    metrics: {
      totalCalls: 245,
      answerRate: 92,
      abandonRate: 8,
      avgWaitTime: '12 min'
    }
  },
  {
    id: '2',
    name: 'Sunset Plaza Hotel - Downtown',
    city: 'Atlanta',
    state: 'GA',
    ratingTrend: 'down',
    trendDays: 30,
    ratings: {
      tripadvisor: 3.8,
      google: 3.9,
      bookingcom: 3.7,
      expedia: 3.6,
      hotelscom: 3.7
    },
    metrics: {
      totalCalls: 189,
      answerRate: 85,
      abandonRate: 15,
      avgWaitTime: '18 min'
    }
  },
  {
    id: '3',
    name: 'Sunset Plaza Hotel - Northside',
    city: 'Atlanta',
    state: 'GA',
    ratingTrend: 'up',
    trendDays: 30,
    ratings: {
      tripadvisor: 4.7,
      google: 4.7,
      bookingcom: 4.6,
      expedia: 4.5,
      hotelscom: 4.6
    },
    metrics: {
      totalCalls: 312,
      answerRate: 95,
      abandonRate: 5,
      avgWaitTime: '15 min'
    }
  },
  {
    id: '4',
    name: 'Sunset Plaza Hotel - Southside',
    city: 'Atlanta',
    state: 'GA',
    ratingTrend: 'down',
    trendDays: 30,
    ratings: {
      tripadvisor: 4.1,
      google: 4.0,
      bookingcom: 3.9,
      expedia: 3.8,
      hotelscom: 3.9
    },
    metrics: {
      totalCalls: 276,
      answerRate: 88,
      abandonRate: 12,
      avgWaitTime: '20 min'
    }
  }
];

// Process locations to add risk level and calculated overall rating
const processedLocations: Location[] = locations.map(location => ({
  ...location,
  riskLevel: determineRiskLevel(location)
}));

const LocationsOverview: React.FC = () => {
  const getRiskLevelClass = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low Risk':
        return 'bg-success-50 text-success-700 dark:bg-success-900/20 dark:text-success-400';
      case 'Medium Risk':
        return 'bg-warning-50 text-warning-700 dark:bg-warning-900/20 dark:text-warning-400';
      case 'High Risk':
        return 'bg-danger-50 text-danger-700 dark:bg-danger-900/20 dark:text-danger-400';
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Locations Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {processedLocations.map((location) => (
          <div key={location.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <BuildingOfficeIcon className="h-6 w-6 text-gray-400" />
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      {location.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {location.city}, {location.state}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskLevelClass(location.riskLevel)}`}>
                  {location.riskLevel}
                </span>
              </div>

              <div className="mt-6">
                <div className="flex items-baseline">
                  <StarIcon className="h-6 w-6 text-yellow-400 mr-1" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {calculateOverallRating(location.ratings)}
                  </span>
                  <span className="ml-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    {location.ratingTrend === 'up' ? (
                      <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    in {location.trendDays} days
                  </span>
                </div>

                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>TripAdvisor: {location.ratings.tripadvisor}</span>
                  <span>Google: {location.ratings.google}</span>
                  <span>Booking: {location.ratings.bookingcom}</span>
                </div>
                <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>Expedia: {location.ratings.expedia}</span>
                  <span>Hotels.com: {location.ratings.hotelscom}</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                  Call Metrics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Total Calls</div>
                      <div className="font-medium text-gray-900 dark:text-white">{location.metrics.totalCalls}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 rounded-full h-5 w-5 flex items-center justify-center bg-green-100 dark:bg-green-900/20">
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">✓</span>
                    </div>
                    <div className="ml-2">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Answer Rate</div>
                      <div className="font-medium text-gray-900 dark:text-white">{location.metrics.answerRate}%</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 rounded-full h-5 w-5 flex items-center justify-center bg-red-100 dark:bg-red-900/20">
                      <span className="text-xs font-medium text-red-600 dark:text-red-400">!</span>
                    </div>
                    <div className="ml-2">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Abandon Rate</div>
                      <div className="font-medium text-gray-900 dark:text-white">{location.metrics.abandonRate}%</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Avg Wait Time</div>
                      <div className="font-medium text-gray-900 dark:text-white">{location.metrics.avgWaitTime}</div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to={`/location/${location.id}`}
                className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsOverview; 