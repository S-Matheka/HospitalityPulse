import React from 'react';
import {
  ExclamationTriangleIcon,
  ClockIcon,
  ShieldExclamationIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline';

interface ComplianceAlert {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  timeAgo: string;
  icon: React.ComponentType<any>;
}

const ComplianceAlerts: React.FC = () => {
  const alerts: ComplianceAlert[] = [
    {
      id: '1',
      title: 'Fire Safety Inspection Due',
      description: 'Annual fire safety inspection deadline approaching for North Tower',
      severity: 'high',
      timeAgo: '2 days ago',
      icon: ExclamationTriangleIcon
    },
    {
      id: '2',
      title: 'Food Safety Certification',
      description: '3 kitchen staff members have expiring certifications',
      severity: 'medium',
      timeAgo: '45 minutes ago',
      icon: ClockIcon
    },
    {
      id: '3',
      title: 'Security Protocol Review',
      description: 'Quarterly security procedures audit pending',
      severity: 'medium',
      timeAgo: '1 hour ago',
      icon: ShieldExclamationIcon
    },
    {
      id: '4',
      title: 'Health & Safety Training',
      description: 'Required staff training completion rate below 85%',
      severity: 'high',
      timeAgo: '2 hours ago',
      icon: DocumentCheckIcon
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-800 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'medium':
        return 'text-yellow-800 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low':
        return 'text-green-800 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'text-gray-800 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Compliance Alerts
      </h2>

      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div
              key={alert.id}
              className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {alert.title}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {alert.timeAgo}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {alert.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComplianceAlerts; 