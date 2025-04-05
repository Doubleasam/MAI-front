import React from "react";

const NotificationSettings = ({ darkMode }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-center">Notification Settings</h2>
      <div className="max-w-lg mx-auto space-y-8">
        <div className={`p-8 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="font-semibold mb-6 text-lg">Push Notifications</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>App Announcements</span>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Important updates about the app</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Payment Alerts</span>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Instant notifications for payments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Group Notifications</span>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Updates from your groups</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>

        <div className={`p-8 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="font-semibold mb-6 text-lg">Notification Preferences</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Sound Alerts</span>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Play sound for notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Vibration</span>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Vibrate for important notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;