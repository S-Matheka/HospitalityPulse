import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../context/ThemeContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedDateRange, setSelectedDateRange] = useState('Yesterday');

  const handleDateRangeChange = (range: { start: Date; end: Date }) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const start = range.start.toLocaleDateString('en-US', options);
    const end = range.end.toLocaleDateString('en-US', options);
    setSelectedDateRange(start === end ? start : `${start} - ${end}`);
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isDarkMode ? 'dark' : ''}`}>
      <Header 
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        selectedDateRange={selectedDateRange}
        onDateRangeChange={handleDateRangeChange}
      />
      <div className="flex min-h-[calc(100vh-64px)]">
        <div className="fixed left-0 w-64 h-[calc(100vh-64px)] border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <Sidebar />
        </div>
        <div className="ml-64 flex-1">
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout; 