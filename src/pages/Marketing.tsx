import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ChartBarIcon,
  ChatBubbleLeftIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  HashtagIcon,
  StarIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'scheduled' | 'ended';
  channels: {
    name: string;
    metrics: {
      impressions: number;
      engagement: number;
      bookings: number;
      revenue: number;
    };
  }[];
  dateRange: string;
  totalCallVolume: number;
  callVolumeChange: number;
}

interface SocialPost {
  id: string;
  platform: string;
  author: string;
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  engagement: number;
  timestamp: string;
  isInfluencer: boolean;
  hashtags: string[];
}

interface Review {
  id: string;
  platform: 'TripAdvisor' | 'Google' | 'Booking.com';
  author: string;
  rating: number;
  content: string;
  date: string;
  response?: string;
  status: 'pending' | 'responded';
  location: string;
}

const Marketing: React.FC = () => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState<'campaigns' | 'social' | 'reviews'>('campaigns');
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string>('');
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);

  const campaigns: Campaign[] = [
    {
      id: '1',
      name: 'Summer Discount',
      status: 'active',
      channels: [
        {
          name: 'Email',
          metrics: {
            impressions: 30000,
            engagement: 1500,
            bookings: 90,
            revenue: 27000
          }
        },
        {
          name: 'Social',
          metrics: {
            impressions: 20000,
            engagement: 1000,
            bookings: 60,
            revenue: 18000
          }
        }
      ],
      dateRange: 'Jun 1 - Aug 31',
      totalCallVolume: 300,
      callVolumeChange: 50
    },
    {
      id: '2',
      name: 'Weekend Spa Package',
      status: 'active',
      channels: [
        {
          name: 'Instagram',
          metrics: {
            impressions: 25000,
            engagement: 1800,
            bookings: 75,
            revenue: 22500
          }
        }
      ],
      dateRange: 'Jul 1 - Jul 31',
      totalCallVolume: 150,
      callVolumeChange: 25
    }
  ];

  const socialPosts: SocialPost[] = [
    {
      id: '1',
      platform: 'Instagram',
      author: '@luxurytraveler',
      content: 'Amazing stay at Sunset Plaza! The spa services were exceptional 🌟',
      sentiment: 'positive',
      engagement: 1200,
      timestamp: '2 hours ago',
      isInfluencer: true,
      hashtags: ['PerfectStay', 'LuxuryHotel', 'SpaDay']
    },
    {
      id: '2',
      platform: 'TripAdvisor',
      author: '@foodcritic',
      content: 'Room service was slow, but the food quality was excellent',
      sentiment: 'neutral',
      engagement: 450,
      timestamp: '5 hours ago',
      isInfluencer: true,
      hashtags: ['HotelDining', 'RoomService']
    }
  ];

  const reviews: Review[] = [
    {
      id: '1',
      platform: 'Google',
      author: 'Emily R.',
      rating: 2,
      content: 'Breakfast service needs improvement. Limited options and cold food. The coffee was lukewarm and pastries weren\'t fresh.',
      date: '2 days ago',
      status: 'pending',
      location: 'Sunset Plaza Hotel - Downtown'
    },
    {
      id: '2',
      platform: 'Google',
      author: 'David M.',
      rating: 3,
      content: 'Beautiful hotel but disappointed with breakfast. Long wait times and items not being replenished quickly enough.',
      date: '4 days ago',
      status: 'pending',
      location: 'Sunset Plaza Hotel - Midtown'
    },
    {
      id: '3',
      platform: 'Booking.com',
      author: 'Mark W.',
      rating: 2,
      content: 'WiFi connection was terrible throughout my stay. Couldn\'t get any work done. Had to use my phone\'s hotspot instead.',
      date: '2 days ago',
      status: 'pending',
      location: 'Sunset Plaza Hotel - Downtown'
    },
    {
      id: '4',
      platform: 'Booking.com',
      author: 'Jennifer P.',
      rating: 3,
      content: 'Nice rooms but the internet connection was frustratingly slow. Had issues with video calls dropping constantly.',
      date: '3 days ago',
      status: 'pending',
      location: 'Sunset Plaza Hotel - Midtown'
    },
    {
      id: '5',
      platform: 'Google',
      author: 'Thomas L.',
      rating: 2,
      content: 'Breakfast buffet was understaffed. Had to wait 20 minutes for a table and most hot items were empty. Not what I expected for this price point.',
      date: '1 week ago',
      status: 'pending',
      location: 'Sunset Plaza Hotel - Northside'
    },
    {
      id: '6',
      platform: 'Booking.com',
      author: 'Rachel S.',
      rating: 2,
      content: 'The WiFi was practically unusable in the evenings. Multiple guests were complaining about the same issue at reception.',
      date: '1 day ago',
      status: 'pending',
      location: 'Sunset Plaza Hotel - Downtown'
    }
  ];

  // Handle incoming navigation state
  useEffect(() => {
    const state = location.state as { activeTab?: string; section?: string } | null;
    
    if (state?.activeTab === 'reviews') {
      setSelectedTab('reviews');
      
      // Filter reviews based on section
      if (state.section === 'wifi') {
        setFilteredReviews(reviews.filter(review => 
          review.content.toLowerCase().includes('wifi') || 
          review.content.toLowerCase().includes('internet') ||
          review.content.toLowerCase().includes('connection')
        ));
      } else if (state.section === 'dining') {
        setFilteredReviews(reviews.filter(review => 
          review.content.toLowerCase().includes('breakfast') || 
          review.content.toLowerCase().includes('food') ||
          review.content.toLowerCase().includes('dining') ||
          review.content.toLowerCase().includes('restaurant')
        ));
      }
    } else {
      setFilteredReviews(reviews);
    }
  }, [location.state]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'negative':
        return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short'
    }).format(num);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      compactDisplay: 'short'
    }).format(num);
  };

  const handleResponseSubmit = (reviewId: string) => {
    // In a real implementation, this would make an API call to the review platform
    console.log(`Submitting response for review ${reviewId}:`, responseText);
    setResponseText('');
    setSelectedReview(null);
  };

  const getResponseTemplate = (rating: number) => {
    if (rating >= 4) {
      return "Thank you for your wonderful review! We're delighted to hear about your positive experience at Sunset Plaza.";
    } else if (rating === 3) {
      return "Thank you for your feedback. We appreciate your honest review and will use it to improve our services.";
    } else {
      return "We apologize for not meeting your expectations. We would love to hear more about your experience to help us improve.";
    }
  };

  const renderReviewStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Marketing Dashboard
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedTab('campaigns');
              setFilteredReviews(reviews);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              selectedTab === 'campaigns'
                ? 'bg-primary-500 text-white'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Campaigns
          </button>
          <button
            onClick={() => {
              setSelectedTab('social');
              setFilteredReviews(reviews);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              selectedTab === 'social'
                ? 'bg-primary-500 text-white'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Social Media
          </button>
          <button
            onClick={() => {
              setSelectedTab('reviews');
              setFilteredReviews(reviews);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              selectedTab === 'reviews'
                ? 'bg-primary-500 text-white'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Reviews
          </button>
        </div>
      </div>

      {selectedTab === 'campaigns' ? (
        <div className="grid gap-6">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {campaign.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {campaign.channels.map(c => c.name).join(' + ')} • {campaign.dateRange}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    campaign.status === 'active'
                      ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                  }`}
                >
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </span>
              </div>

              {campaign.channels.map((channel, index) => (
                <div key={channel.name} className={`${index > 0 ? 'mt-4' : ''}`}>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {channel.name} Performance
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Impressions</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {formatNumber(channel.metrics.impressions)}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Engagement</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {formatNumber(channel.metrics.engagement)}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Bookings</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {channel.metrics.bookings}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(channel.metrics.revenue)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Overall Campaign Impact
                </h4>
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Call Volume</p>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mr-2">
                        {campaign.totalCallVolume}
                      </p>
                      <div className="flex items-center text-sm">
                        {campaign.callVolumeChange > 0 ? (
                          <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span
                          className={
                            campaign.callVolumeChange > 0
                              ? 'text-green-500'
                              : 'text-red-500'
                          }
                        >
                          {campaign.callVolumeChange}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(campaign.channels.reduce((sum, channel) => sum + channel.metrics.revenue, 0))}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Bookings</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {campaign.channels.reduce((sum, channel) => sum + channel.metrics.bookings, 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : selectedTab === 'social' ? (
        <div className="grid gap-4">
          {socialPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <ChatBubbleLeftIcon className="h-5 w-5 text-primary-500 mr-2" />
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {post.author}
                      </h3>
                      {post.isInfluencer && (
                        <StarIcon className="h-4 w-4 text-yellow-400 ml-1" />
                      )}
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        via {post.platform}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {post.content}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getSentimentColor(
                    post.sentiment
                  )}`}
                >
                  {post.sentiment.charAt(0).toUpperCase() + post.sentiment.slice(1)}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {post.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center text-xs text-primary-600 dark:text-primary-400"
                  >
                    <HashtagIcon className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <ChartBarIcon className="h-4 w-4 mr-1" />
                <span>{formatNumber(post.engagement)} engagements</span>
                <span className="mx-2">•</span>
                <span>{post.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      ) : selectedTab === 'reviews' ? (
        <div className="grid gap-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700">
                      {review.platform}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {review.author}
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    {renderReviewStars(review.rating)}
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{review.content}</p>
                  <p className="mt-1 text-sm text-gray-500">{review.location}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    review.status === 'responded'
                      ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}
                >
                  {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                </span>
              </div>

              {review.response && (
                <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Our Response:
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {review.response}
                  </p>
                </div>
              )}

              {selectedReview === review.id ? (
                <div className="mt-4">
                  <textarea
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={4}
                    placeholder="Type your response..."
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                  />
                  <div className="mt-2 flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setResponseText(getResponseTemplate(review.rating));
                      }}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      Use Template
                    </button>
                    <button
                      onClick={() => {
                        setSelectedReview(null);
                        setResponseText('');
                      }}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleResponseSubmit(review.id)}
                      className="px-3 py-1 text-sm bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center"
                    >
                      <PaperAirplaneIcon className="h-4 w-4 mr-1" />
                      Send Response
                    </button>
                  </div>
                </div>
              ) : (
                !review.response && (
                  <button
                    onClick={() => setSelectedReview(review.id)}
                    className="mt-4 px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center"
                  >
                    <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                    Respond to Review
                  </button>
                )
              )}
            </div>
          ))}
          {filteredReviews.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No matching reviews found.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Marketing; 