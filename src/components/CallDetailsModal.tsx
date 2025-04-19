import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  XMarkIcon, 
  SpeakerWaveIcon, 
  DocumentTextIcon,
  CheckCircleIcon,
  PhoneIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { getTranscriptByAgent } from './CallTranscripts';
import { Dialog } from '@headlessui/react';

export interface CallTranscriptLine {
  timestamp: string;
  speaker: 'Agent' | 'Guest';
  text: string;
}

interface CallDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  call: {
    customerId: string;
    customerName: string;
    phoneNumber: string;
    duration: string;
    summary: string;
    recordingUrl?: string;
    transcriptUrl?: string;
    shouldAnonymize?: boolean;
    isCrmVerified?: boolean;
    reasonForReview?: string;
    reasonSeverity?: 'negative' | 'warning' | 'positive';
    transcript?: CallTranscriptLine[];
    agent?: string;
  };
}

// Separate TranscriptDialog component using Portal
const TranscriptDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  transcript: CallTranscriptLine[];
}> = ({ isOpen, onClose, transcript }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0" style={{ zIndex: 100 }}>
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div 
          className="relative w-full max-w-2xl bg-gray-900 rounded-lg shadow-xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Call Transcript</h2>
            <button
              onClick={e => {
                e.stopPropagation();
                onClose();
              }}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="p-6">
            <div className="overflow-y-auto max-h-[600px] space-y-4">
              {transcript.map((line, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg ${
                    line.speaker === 'Agent' 
                      ? 'bg-navy-800/80' 
                      : 'bg-brown-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`text-sm font-medium ${
                      line.speaker === 'Agent' 
                        ? 'text-blue-300' 
                        : 'text-amber-300'
                    }`}>
                      {line.speaker}
                    </span>
                    <span className="text-sm text-gray-400">
                      {line.timestamp}
                    </span>
                  </div>
                  <p className="text-white text-base leading-relaxed">
                    {line.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const CallDetailsModal: React.FC<CallDetailsModalProps> = ({
  isOpen,
  onClose,
  call
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const [showTranscript, setShowTranscript] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const customerDisplay = call.shouldAnonymize 
    ? `Guest ID ${call.customerId}`
    : call.customerName;

  const getSeverityColor = (severity?: 'negative' | 'warning' | 'positive') => {
    switch (severity) {
      case 'negative':
        return 'text-red-500 dark:text-red-400';
      case 'warning':
        return 'text-yellow-500 dark:text-yellow-400';
      case 'positive':
        return 'text-green-500 dark:text-green-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

  const handleViewTranscript = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTranscript(true);
  };

  const handleCloseTranscript = () => {
    setShowTranscript(false);
  };

  const handleViewHistory = () => {
    console.log('View conversation history clicked');
  };

  const transcript = call.transcript || (call.agent ? getTranscriptByAgent(call.agent) : []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white">
                    Call Details
                  </Dialog.Title>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {call.customerId 
                      ? `Guest ID ${call.customerId}`
                      : 'Guest ID not available'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Customer Info and Phone in Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Customer</h3>
                    <div className="flex items-center space-x-2">
                      <p className="text-lg font-medium text-gray-900 dark:text-white">{customerDisplay}</p>
                      {call.isCrmVerified && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          CRM Verified
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone</h3>
                    <div className="flex items-center space-x-2">
                      <p className="text-lg font-medium text-gray-900 dark:text-white">{call.phoneNumber}</p>
                      <button className="p-2 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <PhoneIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reason for Review */}
                {call.reasonForReview && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Reason for Review</h3>
                    <p className={`text-lg font-medium ${getSeverityColor(call.reasonSeverity)}`}>
                      {call.reasonForReview}
                    </p>
                  </div>
                )}

                {/* Summary */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Summary</h3>
                  <p className="text-gray-900 dark:text-white">{call.summary}</p>
                </div>

                {/* Call Recording */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Call Recording</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center space-x-6">
                      {/* Play Button */}
                      <button 
                        className="w-14 h-14 rounded-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 flex items-center justify-center transition-colors shadow-lg"
                        onClick={handlePlayPause}
                      >
                        {isPlaying ? (
                          <div className="w-5 h-5 flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded-sm" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 flex items-center justify-center">
                            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                          </div>
                        )}
                      </button>

                      {/* Progress Bar Container */}
                      <div className="flex-1 space-y-2">
                        {/* Progress Bar */}
                        <div className="relative w-full">
                          <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary-600 dark:bg-primary-500 rounded-full transition-all duration-300 ease-in-out"
                              style={{ width: `${(currentTime / 180) * 100}%` }}
                            />
                          </div>
                          {/* Hover effect dot */}
                          <div 
                            className="absolute top-1/2 -translate-y-1/2"
                            style={{ left: `${(currentTime / 180) * 100}%` }}
                          >
                            <div className="w-3 h-3 bg-primary-600 dark:bg-primary-500 rounded-full shadow-md -ml-1.5" />
                          </div>
                        </div>

                        {/* Timestamps */}
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span>{formatTime(currentTime)}</span>
                          <span>{call.duration}</span>
                        </div>
                      </div>

                      {/* Volume Control */}
                      <div className="flex items-center space-x-3 min-w-[120px]">
                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                          <SpeakerWaveIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </button>
                        <div className="relative flex-1">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-primary-600 dark:accent-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button 
                    onClick={handleViewTranscript}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900"
                  >
                    <DocumentTextIcon className="h-5 w-5 mr-2" />
                    View Transcript
                  </button>
                  <button 
                    onClick={handleViewHistory}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900"
                  >
                    <ClockIcon className="h-5 w-5 mr-2" />
                    Customer Conversation History
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Separate Transcript Dialog */}
      {showTranscript && (
        <TranscriptDialog
          isOpen={showTranscript}
          onClose={handleCloseTranscript}
          transcript={transcript}
        />
      )}
    </>
  );
};

export default CallDetailsModal; 