import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import {
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const URI = import.meta.env.VITE_BACKEND_URI;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URI}/api/posts`, {
        withCredentials: true
      });

      if (response.data.success) {
        setPosts(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch posts');
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'Recently';
    }
  };

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  };

  const PostSkeleton = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-20"></div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {[...Array(5)].map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-xl border border-gray-200 p-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <ChatBubbleOvalLeftIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-500">Be the first to share something with the community!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post._id}
            className="bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            {/* Post Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  {/* User Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                    <span className="text-white font-semibold text-base">
                      {getInitials(post.author?.name)}
                    </span>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-gray-900 truncate">
                      {post.author?.name || 'Unknown User'}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {post.author?.bio || 'Community Member'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatTimeAgo(post.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Menu Button */}
                <button className="p-2 -mt-1 hover:bg-gray-100 rounded-full transition-colors duration-200 text-gray-500 hover:text-gray-700">
                  <EllipsisHorizontalIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-6 pb-6">
              <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Home;