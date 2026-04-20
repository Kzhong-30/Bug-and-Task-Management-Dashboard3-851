import React from 'react';
import { useNotificationStore } from '../lib/store';
import { Check, Trash2, Info, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationPanel() {
  const { notifications, markAsRead, deleteNotification, markAllAsRead } = useNotificationStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="p-4 text-center text-gray-500">No notifications</div>
      </div>
    );
  }

  return (
    <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="p-2">
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
          <button
            onClick={markAllAsRead}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Mark all as read
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start p-4 ${
                notification.read ? 'bg-white' : 'bg-blue-50'
              }`}
            >
              <div className="flex-shrink-0">{getIcon(notification.type)}</div>
              <div className="ml-3 w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                <p className="mt-1 text-xs text-gray-400">
                  {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="mr-2 rounded-full p-1 text-gray-400 hover:text-gray-500"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="rounded-full p-1 text-gray-400 hover:text-gray-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}