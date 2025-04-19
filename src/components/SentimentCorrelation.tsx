import React, { useState } from 'react';

interface SentimentData {
  phrase: string;
  reviewPercentage: number;
  socialPercentage: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  frequency: number;
}

const SentimentCorrelation: React.FC = () => {
  const [activePhrase, setActivePhrase] = useState<string | null>(null);

  const sentimentData: SentimentData[] = [
    {
      phrase: 'slow wifi',
      reviewPercentage: 45,
      socialPercentage: 40,
      sentiment: 'negative',
      frequency: 142,
    },
    {
      phrase: 'friendly staff',
      reviewPercentage: 55,
      socialPercentage: 48,
      sentiment: 'positive',
      frequency: 156,
    },
    {
      phrase: 'poor breakfast',
      reviewPercentage: 30,
      socialPercentage: 35,
      sentiment: 'negative',
      frequency: 89,
    },
    {
      phrase: 'comfortable beds',
      reviewPercentage: 42,
      socialPercentage: 38,
      sentiment: 'positive',
      frequency: 112,
    },
    {
      phrase: 'check-in delays',
      reviewPercentage: 25,
      socialPercentage: 28,
      sentiment: 'negative',
      frequency: 76,
    },
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-success-500 bg-success-50 dark:bg-success-900/20';
      case 'negative':
        return 'text-danger-500 bg-danger-50 dark:bg-danger-900/20';
      case 'neutral':
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getCorrelationStrength = (review: number, social: number) => {
    const difference = Math.abs(review - social);
    if (difference <= 5) return 'Very Strong';
    if (difference <= 10) return 'Strong';
    if (difference <= 15) return 'Moderate';
    return 'Weak';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Guest Feedback Analysis
      </h2>

      <div className="space-y-6">
        {/* Word Cloud */}
        <div className="flex flex-wrap gap-2">
          {sentimentData.map((item) => (
            <button
              key={item.phrase}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                getSentimentColor(item.sentiment)
              } ${
                activePhrase === item.phrase
                  ? 'ring-2 ring-primary-500'
                  : ''
              } hover:opacity-90 transition-opacity`}
              style={{
                fontSize: `${Math.max(0.875 + (item.frequency / 100) * 0.5, 1)}rem`,
              }}
              onClick={() => setActivePhrase(item.phrase === activePhrase ? null : item.phrase)}
            >
              {item.phrase}
            </button>
          ))}
        </div>

        {/* Correlation Details */}
        {activePhrase && (
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            {sentimentData
              .filter((item) => item.phrase === activePhrase)
              .map((item) => (
                <div key={item.phrase} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Feedback Analysis: "{item.phrase}"
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getSentimentColor(item.sentiment)
                      }`}
                    >
                      {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Review Platform Mentions
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.reviewPercentage}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div
                          className="h-2 bg-primary-500 rounded-full"
                          style={{ width: `${item.reviewPercentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Social Media Mentions
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.socialPercentage}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div
                          className="h-2 bg-primary-500 rounded-full"
                          style={{ width: `${item.socialPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Cross-Platform Correlation
                      </span>
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {getCorrelationStrength(item.reviewPercentage, item.socialPercentage)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      This phrase appears in {item.reviewPercentage}% of review platforms and {item.socialPercentage}% of
                      social media posts, indicating a {getCorrelationStrength(
                        item.reviewPercentage,
                        item.socialPercentage
                      ).toLowerCase()} correlation between guest reviews and social media sentiment.
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}

        {!activePhrase && (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            Click on any phrase to see detailed feedback analysis
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentCorrelation; 