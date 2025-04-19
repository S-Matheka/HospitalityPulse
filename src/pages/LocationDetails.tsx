import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  PhoneIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { StaffIssue } from '../components/StaffIssuesMonitor';
import StaffIssuesMonitor from '../components/StaffIssuesMonitor';

interface LocationDetail {
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

// Mock data for locations
const locations: LocationDetail[] = [
  {
    id: '1',
    name: 'Sunset Plaza Hotel - Midtown',
    city: 'Atlanta',
    state: 'GA',
    riskLevel: 'Low Risk',
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
    riskLevel: 'High Risk',
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
    riskLevel: 'Low Risk',
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
    riskLevel: 'Medium Risk',
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

// Hotel-specific staff issues
const locationStaffIssues: Record<string, StaffIssue[]> = {
  'Sunset Plaza Hotel - Midtown': [
    {
      id: '1',
      category: 'frontDesk',
      title: 'Check-in Delays',
      description: 'Guests reporting extended wait times at check-in',
      source: 'feedback',
      severity: 'high',
      date: '2023-06-15',
      metrics: {
        value: '15 minutes',
        trend: 'increase'
      },
      actions: ['Review staffing levels', 'Implement express check-in system']
    },
    {
      id: '2',
      category: 'housekeeping',
      title: 'Room Turnover Delays',
      description: 'Delays in preparing rooms for new guests',
      source: 'operations',
      severity: 'moderate',
      date: '2023-06-14',
      metrics: {
        value: '45 minutes',
        trend: 'decrease'
      },
      actions: ['Optimize cleaning schedule', 'Add support staff']
    }
  ],
  'Sunset Plaza Hotel - Downtown': [
    {
      id: '3',
      category: 'maintenance',
      title: 'AC System Issues',
      description: 'Multiple rooms reporting AC problems',
      source: 'system',
      severity: 'high',
      date: '2023-06-15',
      metrics: {
        value: '8 rooms',
        trend: 'increase'
      },
      actions: ['Schedule emergency maintenance', 'Order replacement parts']
    },
    {
      id: '4',
      category: 'foodService',
      title: 'Room Service Delays',
      description: 'Extended wait times for room service orders',
      source: 'feedback',
      severity: 'moderate',
      date: '2023-06-13',
      metrics: {
        value: '45 minutes',
        trend: 'increase'
      },
      actions: ['Review kitchen workflow', 'Add delivery staff']
    }
  ],
  'Sunset Plaza Hotel - Northside': [
    {
      id: '5',
      category: 'spa',
      title: 'Spa Booking System Issues',
      description: 'New booking system causing delays in spa appointment scheduling',
      source: 'system',
      severity: 'moderate',
      date: '2023-06-15',
      metrics: {
        value: '15 minutes',
        trend: 'decrease'
      },
      actions: ['Staff training on new system', 'System optimization']
    },
    {
      id: '6',
      category: 'housekeeping',
      title: 'Premium Room Turnover',
      description: 'Delays in premium suite preparation affecting VIP check-ins',
      source: 'operations',
      severity: 'moderate',
      date: '2023-06-14',
      metrics: {
        value: '35 minutes',
        trend: 'decrease'
      },
      actions: ['Review premium room protocols', 'Additional training for staff']
    }
  ],
  'Sunset Plaza Hotel - Southside': [
    {
      id: '7',
      category: 'foodService',
      title: 'Kitchen Staff Shortage',
      description: 'Understaffing in kitchen affecting room service delivery times',
      source: 'operations',
      severity: 'high',
      date: '2023-06-15',
      metrics: {
        value: '45 minutes',
        trend: 'increase'
      },
      actions: ['Expedite hiring process', 'Temporary staff allocation']
    },
    {
      id: '8',
      category: 'maintenance',
      title: 'Pool Maintenance Required',
      description: 'Regular maintenance schedule disrupted due to equipment issues',
      source: 'system',
      severity: 'moderate',
      date: '2023-06-14',
      metrics: {
        value: '2 days',
        trend: 'increase'
      },
      actions: ['Schedule emergency maintenance', 'Guest communication plan']
    },
    {
      id: '9',
      category: 'frontDesk',
      title: 'Check-out Process Delays',
      description: 'New payment system causing delays during peak check-out times',
      source: 'feedback',
      severity: 'moderate',
      date: '2023-06-13',
      metrics: {
        value: '12 minutes',
        trend: 'decrease'
      },
      actions: ['Staff training on new system', 'Process optimization']
    }
  ]
};

const LocationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [location, setLocation] = useState<LocationDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch location data
    const fetchLocationData = () => {
      setLoading(true);
      setTimeout(() => {
        const locationData = locations.find(loc => loc.id === id);
        setLocation(locationData || null);
        setLoading(false);
      }, 500);
    };

    fetchLocationData();
  }, [id]);

  const getRiskLevelClass = (level: string) => {
    switch (level) {
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

  const getAnswerRateColor = (rate: number) => {
    if (rate >= 90) return 'text-green-500 dark:text-green-400';
    if (rate >= 80) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };

  const getWaitTimeColor = (time: string) => {
    const minutes = parseInt(time);
    if (minutes <= 10) return 'text-green-500 dark:text-green-400';
    if (minutes <= 15) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };

  // Calculate weighted average rating
  const calculateOverallRating = (ratings: LocationDetail['ratings']) => {
    const weights = {
      tripadvisor: 0.25,
      google: 0.25,
      bookingcom: 0.20,
      expedia: 0.15,
      hotelscom: 0.15
    };

    const weightedSum = Object.entries(ratings).reduce(
      (sum, [platform, rating]) => sum + rating * weights[platform as keyof typeof weights],
      0
    );

    return Number(weightedSum.toFixed(1));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Location Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The requested location could not be found.</p>
        <button
          onClick={() => navigate('/locations')}
          className="btn-primary"
        >
          Back to Locations
        </button>
      </div>
    );
  }

  const staffIssues = locationStaffIssues[location.name] || [];
  const overallRating = calculateOverallRating(location.ratings);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/locations')}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{location.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">{location.city}, {location.state}</p>
          </div>
        </div>
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getRiskLevelClass(location.riskLevel)}`}>
          {location.riskLevel}
        </span>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Reputation Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
          <div className="flex items-center mb-4">
            <StarIcon className="h-6 w-6 text-yellow-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Guest Ratings</h3>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {overallRating}
            </span>
            <div className="flex items-center text-sm">
              {location.ratingTrend === 'up' ? (
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={location.ratingTrend === 'up' ? 'text-green-500' : 'text-red-500'}>
                in {location.trendDays} days
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm mt-4">
            <div>
              <span className="text-gray-500 dark:text-gray-400">TripAdvisor:</span>
              <span className="ml-1 font-medium text-gray-900 dark:text-white">{location.ratings.tripadvisor}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Google:</span>
              <span className="ml-1 font-medium text-gray-900 dark:text-white">{location.ratings.google}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Booking.com:</span>
              <span className="ml-1 font-medium text-gray-900 dark:text-white">{location.ratings.bookingcom}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Expedia:</span>
              <span className="ml-1 font-medium text-gray-900 dark:text-white">{location.ratings.expedia}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Hotels.com:</span>
              <span className="ml-1 font-medium text-gray-900 dark:text-white">{location.ratings.hotelscom}</span>
            </div>
          </div>
        </div>

        {/* Call Volume Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
          <div className="flex items-center mb-4">
            <PhoneIcon className="h-6 w-6 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Call Volume</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {location.metrics.totalCalls}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total guest inquiries
          </div>
        </div>

        {/* Answer Rate Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
          <div className="flex items-center mb-4">
            <BuildingOfficeIcon className="h-6 w-6 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Response Rate</h3>
          </div>
          <div className={`text-3xl font-bold mb-2 ${getAnswerRateColor(location.metrics.answerRate)}`}>
            {location.metrics.answerRate}%
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {location.metrics.abandonRate}% missed calls
          </div>
        </div>

        {/* Wait Time Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
          <div className="flex items-center mb-4">
            <ClockIcon className="h-6 w-6 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Wait Time</h3>
          </div>
          <div className={`text-3xl font-bold mb-2 ${getWaitTimeColor(location.metrics.avgWaitTime)}`}>
            {location.metrics.avgWaitTime}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Average response time
          </div>
        </div>
      </div>

      {/* Staff Issues Monitor */}
      <StaffIssuesMonitor issues={staffIssues} />
    </div>
  );
};

export default LocationDetails; 