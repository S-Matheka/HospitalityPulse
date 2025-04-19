import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  UserIcon,
  CalendarIcon,
  ArrowRightIcon,
  ClockIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

interface VIPAlert {
  id: string;
  guestName: string;
  platform: string;
  message: string;
  arrivalTime: string;
  status: 'pending' | 'actioned';
  suggestedAction: string;
}

interface CheckInAlert {
  id: string;
  type: 'check-in' | 'check-out' | 'reservation';
  guestName: string;
  roomNumber?: string;
  time: string;
  status: 'pending' | 'completed' | 'delayed';
  message: string;
}

const FrontOffice: React.FC = () => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState<'alerts' | 'vip'>('alerts');
  const [filteredAlerts, setFilteredAlerts] = useState<CheckInAlert[]>([]);

  const vipAlerts: VIPAlert[] = [
    {
      id: '1',
      guestName: '@TravelExpert',
      platform: 'Twitter',
      message: 'Looking forward to my stay at Sunset Plaza!',
      arrivalTime: '2:00 PM Today',
      status: 'pending',
      suggestedAction: 'Offer suite upgrade based on availability'
    },
    {
      id: '2',
      guestName: '@LuxuryTraveler',
      platform: 'Instagram',
      message: 'Can\'t wait to review the spa services',
      arrivalTime: '4:30 PM Today',
      status: 'actioned',
      suggestedAction: 'Prepare welcome package with spa schedule'
    }
  ];

  const checkInAlerts: CheckInAlert[] = [
    {
      id: '1',
      type: 'check-in',
      guestName: 'John Smith',
      time: '1:30 PM',
      status: 'pending',
      message: 'Check-in queue building up. Current wait time: 15 minutes'
    },
    {
      id: '2',
      type: 'check-in',
      guestName: 'Maria Garcia',
      time: '2:00 PM',
      status: 'pending',
      message: 'Early check-in requested. System processing slow'
    },
    {
      id: '3',
      type: 'check-in',
      guestName: 'Robert Chen',
      time: '1:45 PM',
      status: 'pending',
      message: 'VIP guest. Check-in process delayed'
    },
    {
      id: '4',
      type: 'check-out',
      guestName: 'Sarah Johnson',
      roomNumber: '405',
      time: '11:00 AM',
      status: 'delayed',
      message: 'Late check-out approved'
    },
    {
      id: '5',
      type: 'reservation',
      guestName: 'Michael Brown',
      time: '3:00 PM',
      status: 'completed',
      message: 'Special room setup required'
    }
  ];

  // Handle incoming navigation state
  useEffect(() => {
    const state = location.state as { activeTab?: string } | null;
    
    if (state?.activeTab === 'alerts') {
      setSelectedTab('alerts');
      // Filter alerts to show check-in related ones
      setFilteredAlerts(checkInAlerts.filter(alert => 
        alert.type === 'check-in' && alert.status === 'pending'
      ));
    } else {
      setFilteredAlerts(checkInAlerts);
    }
  }, [location.state]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'completed':
        return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'delayed':
        return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      case 'actioned':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Front Office Dashboard
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedTab('alerts');
              setFilteredAlerts(checkInAlerts);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              selectedTab === 'alerts'
                ? 'bg-primary-500 text-white'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Check-in Alerts
          </button>
          <button
            onClick={() => {
              setSelectedTab('vip');
              setFilteredAlerts(checkInAlerts);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              selectedTab === 'vip'
                ? 'bg-primary-500 text-white'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            VIP Alerts
          </button>
        </div>
      </div>

      {selectedTab === 'alerts' ? (
        <div className="grid gap-4">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  {alert.type === 'check-in' && (
                    <UserIcon className="h-5 w-5 text-green-500 mr-2" />
                  )}
                  {alert.type === 'check-out' && (
                    <ArrowRightIcon className="h-5 w-5 text-red-500 mr-2" />
                  )}
                  {alert.type === 'reservation' && (
                    <CalendarIcon className="h-5 w-5 text-blue-500 mr-2" />
                  )}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {alert.guestName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {alert.message}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    alert.status
                  )}`}
                >
                  {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                </span>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>{alert.time}</span>
                {alert.roomNumber && (
                  <>
                    <span className="mx-2">•</span>
                    <span>Room {alert.roomNumber}</span>
                  </>
                )}
              </div>
            </div>
          ))}
          {filteredAlerts.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No pending alerts found.
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {vipAlerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {alert.guestName}
                    </h3>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      via {alert.platform}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {alert.message}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    alert.status
                  )}`}
                >
                  {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                </span>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>Arriving: {alert.arrivalTime}</span>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <ExclamationCircleIcon className="h-4 w-4 text-primary-500 mr-1" />
                <span className="text-primary-600 dark:text-primary-400">
                  Suggested: {alert.suggestedAction}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FrontOffice; 