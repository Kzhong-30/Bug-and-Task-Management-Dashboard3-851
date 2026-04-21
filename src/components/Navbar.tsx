import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bug, Bell, Settings, User, LogOut } from 'lucide-react';
import { useAuthStore, useNotificationStore } from '../lib/store';
import NotificationPanel from './NotificationPanel';
import UserSettings from './UserSettings';

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { user, logout } = useAuthStore();
  const notifications = useNotificationStore((state) => state.notifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Bug className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">BugTracker</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowSettings(false);
                }}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 relative"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifications && <NotificationPanel />}
            </div>
            
            <div className="relative">
              <button
                onClick={() => {
                  setShowSettings(!showSettings);
                  setShowNotifications(false);
                }}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
              >
                <Settings className="h-5 w-5" />
              </button>
              {showSettings && <UserSettings />}
            </div>

            <div className="flex items-center">
              <button className="flex items-center space-x-2 p-2 rounded-full text-gray-500 hover:bg-gray-100">
                <User className="h-5 w-5" />
                <span className="text-sm font-medium">{user?.name}</span>
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}