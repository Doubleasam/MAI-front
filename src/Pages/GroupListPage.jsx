import React from 'react';
import { FiEye, FiMoreVertical } from 'react-icons/fi';

const GroupListTable = () => {
  // Sample group data
  const groups = [
    {
      id: 1,
      name: 'Family Savings',
      image: 'https://randomuser.me/api/portraits/med/women/65.jpg',
      members: '8/10',
      timeLeft: '3 days',
      progress: 75,
      amount: '$5,000'
    },
    {
      id: 2,
      name: 'Vacation Fund',
      image: 'https://randomuser.me/api/portraits/med/men/32.jpg',
      members: '5/8',
      timeLeft: '1 week',
      progress: 60,
      amount: '$3,200'
    },
    {
      id: 3,
      name: 'Emergency Fund',
      image: 'https://randomuser.me/api/portraits/med/women/44.jpg',
      members: '12/15',
      timeLeft: '2 days',
      progress: 90,
      amount: '$9,000'
    },
    {
      id: 4,
      name: 'New Car Fund',
      image: 'https://randomuser.me/api/portraits/med/men/75.jpg',
      members: '3/6',
      timeLeft: '2 weeks',
      progress: 30,
      amount: '$1,800'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Savings Groups</h1>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Group Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Members
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Left
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {groups.map((group) => (
                <tr key={group.id} className="hover:bg-gray-50 transition">
                  {/* Group Name with Image */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={group.image} alt={group.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{group.name}</div>
                        <div className="text-sm text-gray-500">{group.amount}</div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Members */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{group.members}</div>
                  </td>
                  
                  {/* Time Left */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {group.timeLeft}
                    </span>
                  </td>
                  
                  {/* Progress */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-32 mr-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${group.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{group.progress}%</span>
                    </div>
                  </td>
                  
                  {/* Action */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                      <FiEye className="inline mr-1" /> View
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FiMoreVertical />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination would go here */}
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> groups
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupListTable;