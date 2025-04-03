import React, { useState } from 'react';
import { 
  FiBell, 
  FiCheckCircle, 
  FiClock, 
  FiDollarSign, 
  FiUsers, 
  FiDownload, 
  FiFilter,
  FiTrash2,
  FiMenu
} from 'react-icons/fi';

const NotificationPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'payment-reminder',
      title: 'Payment Due Tomorrow',
      message: 'Your contribution of $50 is due tomorrow for the Family Savings Group',
      time: '10:30 AM',
      date: 'Today',
      read: false,
      amount: 50,
      group: 'Family Savings'
    },
    {
      id: 2,
      type: 'payment-confirmation',
      title: 'Payment Received',
      message: 'Your payment of $50 has been received for the Family Savings Group',
      time: 'Yesterday, 2:45 PM',
      date: 'Yesterday',
      read: false,
      amount: 50,
      group: 'Family Savings'
    },
    {
      id: 3,
      type: 'group-update',
      title: 'New Group Member',
      message: 'Alex Morgan has joined the Vacation Fund group',
      time: 'Mar 15, 11:20 AM',
      date: 'Mar 15',
      read: true,
      group: 'Vacation Fund'
    },
    {
      id: 4,
      type: 'app-update',
      title: 'New App Version Available',
      message: 'Version 2.3.0 is available with new features and bug fixes',
      time: 'Mar 14, 9:15 AM',
      date: 'Mar 14',
      read: true,
      version: '2.3.0'
    },
    {
      id: 5,
      type: 'payment-confirmation',
      title: 'Payment Processed',
      message: 'Your withdrawal of $200 has been processed from the Family Savings Group',
      time: 'Mar 12, 4:30 PM',
      date: 'Mar 12',
      read: true,
      amount: 200,
      group: 'Family Savings'
    },
    {
      id: 6,
      type: 'group-update',
      title: 'Goal Reached!',
      message: 'Congratulations! Your Family Savings group has reached its $5,000 goal',
      time: 'Mar 10, 3:15 PM',
      date: 'Mar 10',
      read: true,
      group: 'Family Savings'
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(notification => notification.type === activeTab);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'payment-reminder':
        return <FiClock className="text-yellow-500" size={20} />;
      case 'payment-confirmation':
        return <FiDollarSign className="text-green-500" size={20} />;
      case 'group-update':
        return <FiUsers className="text-blue-500" size={20} />;
      case 'app-update':
        return <FiDownload className="text-purple-500" size={20} />;
      default:
        return <FiBell className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FiBell className="mr-2" /> Notifications
          {unreadCount > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </h1>
        <div className="flex space-x-2">
          <button 
            onClick={markAllAsRead}
            className="text-sm text-blue-500 hover:text-blue-700 flex items-center"
          >
            Mark all as read
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <FiFilter size={18} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4 overflow-x-auto">
        <button
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'all' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium flex items-center ${activeTab === 'payment-reminder' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('payment-reminder')}
        >
          <FiClock className="mr-1" size={14} /> Reminders
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium flex items-center ${activeTab === 'payment-confirmation' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('payment-confirmation')}
        >
          <FiDollarSign className="mr-1" size={14} /> Payments
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium flex items-center ${activeTab === 'group-update' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('group-update')}
        >
          <FiUsers className="mr-1" size={14} /> Groups
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium flex items-center ${activeTab === 'app-update' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('app-update')}
        >
          <FiDownload className="mr-1" size={14} /> App Updates
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 rounded-lg shadow-sm border ${notification.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'}`}
            >
              <div className="flex justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className={`font-medium ${notification.read ? 'text-gray-800' : 'text-gray-900 font-semibold'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    {notification.amount && (
                      <div className="mt-2">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${notification.type === 'payment-reminder' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          ${notification.amount}
                        </span>
                        {notification.group && (
                          <span className="inline-block ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {notification.group}
                          </span>
                        )}
                      </div>
                    )}
                    {notification.version && (
                      <span className="inline-block mt-2 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        v{notification.version}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {!notification.read && (
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs text-blue-500 hover:text-blue-700"
                    >
                      Mark read
                    </button>
                  )}
                  <button 
                    onClick={() => deleteNotification(notification.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <FiBell className="mx-auto text-gray-300" size={48} />
            <p className="mt-2 text-gray-500">No notifications found</p>
            <p className="text-sm text-gray-400">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;