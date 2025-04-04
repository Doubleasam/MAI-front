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
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronUp
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState(false);

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
        return <div className="p-2 rounded-full bg-yellow-100 text-yellow-600"><FiClock size={18} /></div>;
      case 'payment-confirmation':
        return <div className="p-2 rounded-full bg-green-100 text-green-600"><FiDollarSign size={18} /></div>;
      case 'group-update':
        return <div className="p-2 rounded-full bg-blue-100 text-blue-600"><FiUsers size={18} /></div>;
      case 'app-update':
        return <div className="p-2 rounded-full bg-purple-100 text-purple-600"><FiDownload size={18} /></div>;
      default:
        return <div className="p-2 rounded-full bg-gray-100 text-gray-600"><FiBell size={18} /></div>;
    }
  };

  const getNotificationColor = (type) => {
    switch(type) {
      case 'payment-reminder': return 'yellow';
      case 'payment-confirmation': return 'green';
      case 'group-update': return 'blue';
      case 'app-update': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <FiBell className="mr-3 hidden md:block" size={24} /> 
            <span className="relative">
              Notifications
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-5 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={markAllAsRead}
            className="hidden md:flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FiCheckCircle className="mr-1" size={16} />
            Mark all as read
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setExpandedFilters(!expandedFilters)}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FiFilter size={18} className="mr-1" />
              <span className="hidden md:inline">Filter</span>
              {expandedFilters ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
            </button>
            
            {expandedFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm ${activeTab === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => {
                    setActiveTab('all');
                    setExpandedFilters(false);
                  }}
                >
                  All Notifications
                </button>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm ${activeTab === 'payment-reminder' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => {
                    setActiveTab('payment-reminder');
                    setExpandedFilters(false);
                  }}
                >
                  Payment Reminders
                </button>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm ${activeTab === 'payment-confirmation' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => {
                    setActiveTab('payment-confirmation');
                    setExpandedFilters(false);
                  }}
                >
                  Payment Confirmations
                </button>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm ${activeTab === 'group-update' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => {
                    setActiveTab('group-update');
                    setExpandedFilters(false);
                  }}
                >
                  Group Updates
                </button>
                <button 
                  className={`block w-full text-left px-4 py-2 text-sm ${activeTab === 'app-update' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => {
                    setActiveTab('app-update');
                    setExpandedFilters(false);
                  }}
                >
                  App Updates
                </button>
              </div>
            )}
          </div>
          
          <button 
            className="md:hidden text-gray-600 hover:text-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mb-6 bg-white rounded-lg shadow p-4">
          <button 
            onClick={markAllAsRead}
            className="w-full flex items-center justify-center py-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FiCheckCircle className="mr-2" size={16} />
            Mark all as read
          </button>
          
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              className={`px-3 py-2 text-sm font-medium rounded ${activeTab === 'all' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => {
                setActiveTab('all');
                setMobileMenuOpen(false);
              }}
            >
              All
            </button>
            <button
              className={`px-3 py-2 text-sm font-medium rounded flex items-center justify-center ${activeTab === 'payment-reminder' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => {
                setActiveTab('payment-reminder');
                setMobileMenuOpen(false);
              }}
            >
              <FiClock className="mr-1" size={14} /> Reminders
            </button>
            <button
              className={`px-3 py-2 text-sm font-medium rounded flex items-center justify-center ${activeTab === 'payment-confirmation' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => {
                setActiveTab('payment-confirmation');
                setMobileMenuOpen(false);
              }}
            >
              <FiDollarSign className="mr-1" size={14} /> Payments
            </button>
            <button
              className={`px-3 py-2 text-sm font-medium rounded flex items-center justify-center ${activeTab === 'group-update' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => {
                setActiveTab('group-update');
                setMobileMenuOpen(false);
              }}
            >
              <FiUsers className="mr-1" size={14} /> Groups
            </button>
            <button
              className={`px-3 py-2 text-sm font-medium rounded flex items-center justify-center ${activeTab === 'app-update' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => {
                setActiveTab('app-update');
                setMobileMenuOpen(false);
              }}
            >
              <FiDownload className="mr-1" size={14} /> Updates
            </button>
          </div>
        </div>
      )}

      {/* Desktop Tabs */}
      <div className="hidden md:flex border-b border-gray-200 mb-6 overflow-x-auto">
        <button
          className={`px-4 py-3 text-sm font-medium flex items-center ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('all')}
        >
          All Notifications
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium flex items-center ${activeTab === 'payment-reminder' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('payment-reminder')}
        >
          <FiClock className="mr-2" size={16} /> Reminders
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium flex items-center ${activeTab === 'payment-confirmation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('payment-confirmation')}
        >
          <FiDollarSign className="mr-2" size={16} /> Payments
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium flex items-center ${activeTab === 'group-update' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('group-update')}
        >
          <FiUsers className="mr-2" size={16} /> Groups
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium flex items-center ${activeTab === 'app-update' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('app-update')}
        >
          <FiDownload className="mr-2" size={16} /> App Updates
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 rounded-xl shadow-xs transition-all ${notification.read ? 'bg-white' : `bg-${getNotificationColor(notification.type)}-50`} border-l-4 ${notification.read ? 'border-transparent' : `border-${getNotificationColor(notification.type)}-500`}`}
            >
              <div className="flex justify-between">
                <div className="flex items-start space-x-4 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className={`text-base font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                        {notification.title}
                      </h3>
                    </div>
                    <p className={`text-sm mt-1 ${notification.read ? 'text-gray-600' : 'text-gray-700'}`}>
                      {notification.message}
                    </p>
                    
                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {notification.amount && (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${notification.type === 'payment-reminder' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          ${notification.amount.toLocaleString()}
                        </span>
                      )}
                      {notification.group && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {notification.group}
                        </span>
                      )}
                      {notification.version && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          v{notification.version}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Right-aligned time and delete button */}
                <div className="flex flex-col items-end justify-between pl-4">
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {notification.time}
                  </span>
                  <button 
                    onClick={() => deleteNotification(notification.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
              
              {!notification.read && (
                <div className="mt-3 flex justify-end">
                  <button 
                    onClick={() => markAsRead(notification.id)}
                    className="text-xs text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                  >
                    <FiCheckCircle className="mr-1" size={14} />
                    Mark as read
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-xs">
            <FiBell className="mx-auto text-gray-300" size={48} />
            <h3 className="mt-3 text-lg font-medium text-gray-700">No notifications found</h3>
            <p className="mt-1 text-gray-500">You're all caught up!</p>
            <button 
              onClick={() => setActiveTab('all')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View all notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;