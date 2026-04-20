import React from 'react';
import { useAuthStore } from '../lib/store';
import { Moon, Sun, Bell, BellOff } from 'lucide-react';

export default function UserSettings() {
  const { user, updatePreferences } = useAuthStore();

  if (!user?.preferences) {
    return null;
  }

  const toggleTheme = () => {
    updatePreferences({
      theme: user.preferences.theme === 'light' ? 'dark' : 'light',
    });
  };

  const toggleEmailNotifications = () => {
    updatePreferences({
      emailNotifications: !user.preferences.emailNotifications,
    });
  };

  const togglePushNotifications = () => {
    updatePreferences({
      pushNotifications: !user.preferences.pushNotifications,
    });
  };

  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu">
        <button
          onClick={toggleTheme}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          {user.preferences.theme === 'light' ? (
            <>
              <Moon className="mr-2 h-4 w-4" />
              Dark Mode
            </>
          ) : (
            <>
              <Sun className="mr-2 h-4 w-4" />
              Light Mode
            </>
          )}
        </button>
        <button
          onClick={toggleEmailNotifications}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          {user.preferences.emailNotifications ? (
            <>
              <BellOff className="mr-2 h-4 w-4" />
              Disable Email Notifications
            </>
          ) : (
            <>
              <Bell className="mr-2 h-4 w-4" />
              Enable Email Notifications
            </>
          )}
        </button>
        <button
          onClick={togglePushNotifications}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          {user.preferences.pushNotifications ? (
            <>
              <BellOff className="mr-2 h-4 w-4" />
              Disable Push Notifications
            </>
          ) : (
            <>
              <Bell className="mr-2 h-4 w-4" />
              Enable Push Notifications
            </>
          )}
        </button>
      </div>
    </div>
  );
}