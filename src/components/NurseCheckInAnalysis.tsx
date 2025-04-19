import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface CheckInAnalysisProps {
  checkInData: Array<{ date: string; avgTime: number }>;
  staffCoverage: Array<{ shift: string; current: number; recommended: number }>;
}

const CheckInAnalysis: React.FC<CheckInAnalysisProps> = ({
  checkInData,
  staffCoverage
}) => {
  // Line chart data for check-in times
  const lineChartData = {
    labels: checkInData.map(d => d.date),
    datasets: [
      {
        label: 'Average Check-in Time (minutes)',
        data: checkInData.map(d => d.avgTime),
        borderColor: 'rgb(59, 130, 246)', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  // Line chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Minutes'
        }
      }
    }
  };

  // Bar chart data for staff coverage
  const barChartData = {
    labels: staffCoverage.map(s => s.shift),
    datasets: [
      {
        label: 'Current Front Desk Staff',
        data: staffCoverage.map(s => s.current),
        backgroundColor: 'rgb(59, 130, 246)', // blue-500
      },
      {
        label: 'Required Staff',
        data: staffCoverage.map(s => s.recommended),
        backgroundColor: 'rgb(239, 68, 68)', // red-500
      }
    ]
  };

  // Bar chart options
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Staff'
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
          Check-in Process Analysis
        </h3>
        <p className="text-red-700 dark:text-red-300">
          Average check-in times have increased by 15% this week at Downtown location. System delays reported during peak hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            Average Check-in Times (Last 30 Days)
          </h4>
          <div className="h-48">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            Front Desk Staff Coverage
          </h4>
          <div className="h-48">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
          Suggested Actions
        </h4>
        <p className="text-yellow-700 dark:text-yellow-300">
          1. Add 2 staff members during peak check-in hours (2-6 PM)
          <br />
          2. Implement express check-in for loyalty program members
        </p>
      </div>

      <button className="btn-primary">
        Update Staff Schedule
      </button>
    </div>
  );
};

export default CheckInAnalysis; 