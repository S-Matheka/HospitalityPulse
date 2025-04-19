import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  SunIcon,
  MoonIcon,
  BellIcon,
  CalendarIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import CustomDropdown from './CustomDropdown';
import PulseDrawer from './PulseDrawer';
import NotificationsPanel from './NotificationsPanel';
import Logo from './Logo';
import DateRangeSelector from './DateRangeSelector';

interface HeaderProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  selectedDateRange: string;
  onDateRangeChange: (range: { start: Date; end: Date }) => void;
}

interface Option {
  id: string;
  value: string;
  label: string;
}

const Header: React.FC<HeaderProps> = ({
  selectedLocation,
  onLocationChange,
  selectedDateRange,
  onDateRangeChange,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [showPulseDrawer, setShowPulseDrawer] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [showDateSelector, setShowDateSelector] = useState(false);

  const locations: Option[] = [
    { id: 'all', value: 'All Locations', label: 'All Locations' },
    { id: 'midtown', value: 'Sunset Plaza Hotel - Midtown', label: 'Sunset Plaza Hotel - Midtown' },
    { id: 'downtown', value: 'Sunset Plaza Hotel - Downtown', label: 'Sunset Plaza Hotel - Downtown' },
    { id: 'northside', value: 'Sunset Plaza Hotel - Northside', label: 'Sunset Plaza Hotel - Northside' },
    { id: 'southside', value: 'Sunset Plaza Hotel - Southside', label: 'Sunset Plaza Hotel - Southside' }
  ];

  useEffect(() => {
    // Set default location to All Locations if none selected
    if (!selectedLocation) {
      onLocationChange('All Locations');
    }
  }, [selectedLocation, onLocationChange]);

  const formatDateRange = (range: { start: Date; end: Date }) => {
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    return `${formatDate(range.start)} - ${formatDate(range.end)}`;
  };

  const handleDateSelect = (range: { start: Date; end: Date }) => {
    onDateRangeChange(range);
    setShowDateSelector(false);
  };

  const displayDateRange = selectedDateRange && typeof selectedDateRange === 'object' 
    ? formatDateRange(selectedDateRange) 
    : 'Yesterday';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex h-16 w-full items-center border-b border-gray-200 bg-white/80 backdrop-blur-sm px-4 dark:border-gray-700 dark:bg-gray-800/80">
        {/* Logo */}
        <div className="flex-shrink-0 w-64 -ml-4">
          <Logo />
        </div>

        {/* Location and Date Range */}
        <div className="flex items-center space-x-2">
          <div className="relative flex items-center">
            <CustomDropdown
              options={locations}
              value={selectedLocation}
              onChange={onLocationChange}
              minWidth="220px"
              showLocationIcons
              className="px-3"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowDateSelector(!showDateSelector)}
              className="flex items-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <CalendarIcon className="h-5 w-5 text-gray-400" />
              <span>{displayDateRange}</span>
              <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" />
            </button>

            <DateRangeSelector
              isOpen={showDateSelector}
              onClose={() => setShowDateSelector(false)}
              onSelect={handleDateSelect}
              defaultView="yesterday"
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-4 ml-auto">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-900" />
            </button>
            
            <NotificationsPanel
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
            />
          </div>
          <button
            onClick={() => setShowPulseDrawer(true)}
            className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <span className="relative">
              <span className="absolute inset-0 rounded-full bg-primary-400 animate-ping opacity-75"></span>
              <span className="relative">✨</span>
            </span>
            Ask Pulse
          </button>
        </div>
      </header>

      {/* Add a spacer div after the header to prevent content from jumping under it */}
      <div className="h-16 w-full" />

      <PulseDrawer
        isOpen={showPulseDrawer}
        onClose={() => setShowPulseDrawer(false)}
      />
    </>
  );
};

export default Header; 