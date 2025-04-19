import React from 'react';
import { 
  ClockIcon, 
  UserGroupIcon, 
  ExclamationTriangleIcon,
  BuildingOfficeIcon,
  BellIcon
} from '@heroicons/react/24/outline';

interface RiskPattern {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  metric: string;
  severity: 'low' | 'medium' | 'high';
  location: string;
}

const patterns: RiskPattern[] = [
  {
    id: '1',
    icon: ClockIcon,
    title: 'Check-in Wait Times',
    metric: '15+ minutes during peak hours',
    severity: 'high',
    location: 'Main Lobby'
  },
  {
    id: '2',
    icon: UserGroupIcon,
    title: 'Housekeeping Coverage',
    metric: '30% staff shortage today',
    severity: 'high',
    location: 'All Floors'
  },
  {
    id: '3',
    icon: BellIcon,
    title: 'Room Service Delays',
    metric: 'Avg. 45min response time',
    severity: 'medium',
    location: 'Room Service'
  },
  {
    id: '4',
    icon: BuildingOfficeIcon,
    title: 'Occupancy Risk',
    metric: '85% of rooms blocked, 60% confirmed',
    severity: 'high',
    location: 'All Rooms'
  },
  {
    id: '5',
    icon: ExclamationTriangleIcon,
    title: 'Maintenance Requests',
    metric: '8 pending urgent repairs',
    severity: 'medium',
    location: 'Multiple Rooms'
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'bg-red-900/20 text-red-300';
    case 'medium':
      return 'bg-yellow-900/20 text-yellow-300';
    case 'low':
      return 'bg-green-900/20 text-green-300';
    default:
      return 'bg-gray-700 text-gray-300';
  }
};

const EscalatingRiskPatterns: React.FC = () => {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">
          Escalating Risk Patterns
        </h2>
        <span className="text-sm text-gray-400">
          Last updated: {new Date().toLocaleTimeString()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patterns.map((pattern) => (
          <div
            key={pattern.id}
            className="bg-gray-800 rounded-lg p-4 flex flex-col hover:bg-gray-750 transition-colors duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${getSeverityColor(pattern.severity)}`}>
                <pattern.icon className="h-5 w-5" />
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(pattern.severity)} capitalize`}>
                {pattern.severity}
              </span>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">
                {pattern.title}
              </h3>
              <p className="text-xl font-bold text-white mb-2">
                {pattern.metric}
              </p>
              <p className="text-sm text-gray-400">
                {pattern.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EscalatingRiskPatterns;