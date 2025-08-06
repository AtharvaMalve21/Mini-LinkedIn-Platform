import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import { UserContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

import {
  PencilIcon,
  CalendarDaysIcon,
  EnvelopeIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    email: ''
  });

  const navigate = useNavigate();
  const URI = import.meta.env.VITE_BACKEND_URI;


  const fetchUserPosts = async () => {
    try {

      setLoading(true);
      const { data } = await axios.get(URI + "/api/users/posts", { withCredentials: true });

      if (data.success) {
        setUserPosts(data.data)
      }
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false)
    }
  }


  // Use a single useEffect to fetch posts when the user object is available
  useEffect(() => {
    fetchUserPosts();
  }, []);


  // Function to open the edit modal and pre-fill the form
  const handleEditClick = () => {
    if (user) {
      setEditForm({
        name: user.name || '',
        bio: user.bio || '',
        email: user.email || ''
      });
      setEditMode(true);
    }
  };

  const changeHandler = (ev) => {
    const { name, value } = ev.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data } = await axios.put(`${URI}/api/users/update-profile`, editForm, {
        withCredentials: true
      });
      if (data.success) {
        toast.success('Profile updated successfully!');
        setUser(data.data);
        setEditMode(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
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
    const names = name?.split(' ') || [];
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    } else if (names.length > 1) {
      return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
    }
    return 'U';
  };

  const formatJoinDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      return 'Recently';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-12 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Please log in</h2>
          <p className="text-gray-600">You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Profile Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-5xl">
                  {getInitials(user.name)}
                </span>
              </div>
            </div>
            {/* User Info */}
            <div className="flex-1 min-w-0 text-center md:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2 sm:mb-0">{user.name}</h1>
                <button
                  onClick={handleEditClick}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 hover:border-indigo-700 transition-all duration-200 self-center sm:self-start transform hover:scale-105 active:scale-95"
                >
                  <PencilIcon className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
              <p className="text-lg text-gray-600 mb-3">
                {user.bio || 'Community member passionate about technology'}
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <EnvelopeIcon className="w-4 h-4 text-indigo-500" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarDaysIcon className="w-4 h-4 text-indigo-500" />
                  <span>Joined {formatJoinDate(user.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile Info */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Profile Insights</h3>
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <p className="text-sm font-medium text-gray-600">Total Posts</p>
                  <p className="text-2xl font-bold text-indigo-600">{userPosts.length}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Member Since</p>
                  <p className="text-sm text-gray-900">{formatJoinDate(user.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Right Content - Posts */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">My Posts</h3>
                  <span className="text-sm text-gray-500">{userPosts.length} posts</span>
                </div>
              </div>
              {loading ? (
                <div className="p-6 space-y-6">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="animate-pulse space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : userPosts.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <ChatBubbleOvalLeftIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h4>
                  <p className="text-gray-500 mb-4">Share your thoughts with the community!</p>
                  <button onClick={() => navigate("/create-post")} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors transform hover:scale-105 active:scale-95">
                    <PlusIcon className="w-4 h-4" />
                    Create Post
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {userPosts.map((post) => (
                    <article key={post._id} className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <p className="text-sm text-gray-500">
                          {formatTimeAgo(post.createdAt)}
                        </p>
                        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                          <EllipsisHorizontalIcon className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      <p className="text-gray-800 leading-relaxed text-base">
                        {post.content}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Edit Profile Modal */}
      {editMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <h3 className="text-2xl font-bold text-gray-900">Edit Profile</h3>
              <button
                onClick={() => setEditMode(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-900 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={editForm.name}
                  name='name'
                  onChange={changeHandler}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={editForm.bio}
                  name='bio'
                  onChange={changeHandler}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none transition-colors"
                  rows="3"
                  placeholder="Tell us about yourself..."
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name='email'
                  value={editForm.email}
                  onChange={changeHandler}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors transform hover:scale-105 active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;