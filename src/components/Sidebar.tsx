import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {
  HomeIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PresentationChartLineIcon,
  ClipboardDocumentListIcon,
  MegaphoneIcon
} from '@heroicons/react/24/outline';

interface SidebarItemProps {
  icon: React.ComponentType<any>;
  label: string;
  to: string;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, to, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
      ${isActive 
        ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400' 
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
  >
    <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
    <span>{label}</span>
  </Link>
);

const Sidebar: React.FC = () => {
  const { user, logout } = useUser();
  const location = useLocation();

  if (!user) return null;

  const getDisplayName = () => {
    return user.name || user.email.split('@')[0];
  };

  const getAvatarText = () => {
    return user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase();
  };

  const mainNavigation = [
    { label: 'Dashboard', icon: HomeIcon, to: '/' },
    { label: 'Locations', icon: BuildingOfficeIcon, to: '/locations' },
    { 
      label: 'Front Office', 
      icon: BellIcon, 
      to: '/front-office',
      description: 'Check-in, reservations, and VIP alerts'
    },
    { 
      label: 'Housekeeping', 
      icon: UserGroupIcon, 
      to: '/housekeeping',
      description: 'Room service and cleanliness monitoring'
    },
    { 
      label: 'Marketing', 
      icon: MegaphoneIcon, 
      to: '/marketing',
      description: 'Campaign performance and social media'
    },
    { label: 'Reports', icon: ClipboardDocumentListIcon, to: '/reports' },
    { label: 'Pulse Queries', icon: PresentationChartLineIcon, to: '/pulse' },
    { label: 'Settings', icon: Cog6ToothIcon, to: '/settings' }
  ];

  const secondaryNavigation = [
    { label: 'Help Center', icon: ChevronDownIcon, to: '/help' },
    { label: 'Resources', icon: ChevronUpIcon, to: '/resources' },
    { label: 'Sign Out', icon: ArrowLeftOnRectangleIcon, to: '/logout' }
  ];

  const handleSignOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="w-64 h-[calc(100vh-64px)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <nav className="space-y-1">
          {mainNavigation.map((item) => (
            <div key={item.to} className="space-y-1">
              <SidebarItem
                icon={item.icon}
                label={item.label}
                to={item.to}
                isActive={location.pathname === item.to || 
                          (item.to === '/' && location.pathname === '/') ||
                          (item.to === '/locations' && location.pathname.startsWith('/location/'))}
              />
              {item.description && location.pathname === item.to && (
                <p className="text-xs text-gray-500 dark:text-gray-400 ml-8 mb-2">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </nav>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-6 pt-4">
          <nav className="space-y-1">
            {secondaryNavigation.map((item) => (
              <SidebarItem
                key={item.to}
                icon={item.icon}
                label={item.label}
                to={item.to}
                onClick={item.label === 'Sign Out' ? handleSignOut : undefined}
                isActive={location.pathname === item.to}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* User Profile */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center">
          <div className="relative h-8 w-8 rounded bg-blue-100 dark:bg-blue-900 flex items-center justify-center overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500"></div>
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300 ml-1">
              {getAvatarText()}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {getDisplayName()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user?.email || 'guest@healthcarepulse.com'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 