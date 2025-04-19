import React, { useState } from 'react';
import { PhoneIcon, ClockIcon } from '@heroicons/react/24/outline';
import CallDetailsModal from './CallDetailsModal';

interface CallReview {
  id: string;
  guestId: string;
  guestName: string;
  time: string;
  agent: string;
  tag: string;
  outcome: string;
  priority: 'high' | 'medium' | 'low';
  summary: string;
  phoneNumber: string;
  duration: string;
}

const mockCallReviews: CallReview[] = [
  {
    id: '1',
    guestId: 'G-1234',
    guestName: 'James Wilson',
    time: '09:15 AM',
    agent: 'Sarah K.',
    tag: 'VIP Guest Follow-up',
    outcome: 'No callback scheduled',
    priority: 'high',
    summary: 'VIP guest requested specific room arrangements for upcoming anniversary stay. Needs immediate follow-up to confirm suite decoration and champagne service.',
    phoneNumber: '+1 (555) 123-4567',
    duration: '4:15'
  },
  {
    id: '2',
    guestId: 'G-5678',
    guestName: 'Emily Parker',
    time: '10:30 AM',
    agent: 'Mike R.',
    tag: 'Room Service Complaint',
    outcome: 'Guest called back',
    priority: 'medium',
    summary: 'Guest reported 45-minute delay in breakfast delivery and incorrect order. Requested compensation for delayed start to business meeting.',
    phoneNumber: '+1 (555) 234-5678',
    duration: '3:20'
  },
  {
    id: '3',
    guestId: 'G-9012',
    guestName: 'Sarah Thompson',
    time: '02:45 PM',
    agent: 'Lisa M.',
    tag: 'Spa Booking Issue',
    outcome: 'Voicemail left',
    priority: 'medium',
    summary: 'Unable to book couples massage through spa system. Guest requested callback to arrange special package for wedding anniversary weekend.',
    phoneNumber: '+1 (555) 345-6789',
    duration: '2:45'
  },
  {
    id: '4',
    guestId: 'G-3456',
    guestName: 'Michael Chen',
    time: '11:20 AM',
    agent: 'John D.',
    tag: 'WiFi Connectivity',
    outcome: 'Pending resolution',
    priority: 'high',
    summary: 'Business guest unable to connect to conference call due to persistent WiFi issues in executive suite. Immediate technical support required.',
    phoneNumber: '+1 (555) 456-7890',
    duration: '5:10'
  },
  {
    id: '5',
    guestId: 'G-7890',
    guestName: 'Laura Martinez',
    time: '03:30 PM',
    agent: 'Emma S.',
    tag: 'Special Event Request',
    outcome: 'Requires manager review',
    priority: 'low',
    summary: 'Corporate client inquiring about booking entire conference floor for upcoming tech summit. Needs custom catering and AV setup options.',
    phoneNumber: '+1 (555) 567-8901',
    duration: '3:45'
  }
];

const CallReviewSection: React.FC = () => {
  const [selectedCall, setSelectedCall] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleViewCall = (callId: string) => {
    setSelectedCall(callId);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <PhoneIcon className="h-6 w-6 text-primary-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Call Review Protocol
          </h2>
        </div>
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400">
          {mockCallReviews.length} calls need review
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Guest ID</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Agent</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
              <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {mockCallReviews.map((call) => (
              <tr key={call.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {call.guestId}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {call.time}
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {call.agent}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {call.tag}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {call.outcome}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(call.priority)}`}>
                    {call.priority.charAt(0).toUpperCase() + call.priority.slice(1)}
                  </span>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-right">
                  <button
                    onClick={() => handleViewCall(call.id)}
                    className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCall && (
        <CallDetailsModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCall(null);
          }}
          call={{
            customerId: mockCallReviews.find(c => c.id === selectedCall)?.guestId || '',
            customerName: mockCallReviews.find(c => c.id === selectedCall)?.guestName || '',
            phoneNumber: mockCallReviews.find(c => c.id === selectedCall)?.phoneNumber || '',
            duration: mockCallReviews.find(c => c.id === selectedCall)?.duration || '',
            summary: mockCallReviews.find(c => c.id === selectedCall)?.summary || '',
            agent: mockCallReviews.find(c => c.id === selectedCall)?.agent || '',
            reasonForReview: mockCallReviews.find(c => c.id === selectedCall)?.tag || '',
            reasonSeverity: mockCallReviews.find(c => c.id === selectedCall)?.priority === 'high' ? 'negative' : 'warning',
            isCrmVerified: true
          }}
        />
      )}
    </div>
  );
};

export default CallReviewSection; 