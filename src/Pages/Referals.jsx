import React, { useState } from 'react';
import { FiSearch, FiCalendar, FiMail, FiUser } from 'react-icons/fi';

function Referrals() {
  // Dummy referral data
  const dummyReferrals = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      registrationDate: '2023-10-15',
      profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      registrationDate: '2023-09-22',
      profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      registrationDate: '2023-08-05',
      profilePic: 'https://randomuser.me/api/portraits/men/67.jpg',
      status: 'Pending'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      registrationDate: '2023-11-30',
      profilePic: 'https://randomuser.me/api/portraits/women/28.jpg',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Robert Wilson',
      email: 'robert.w@example.com',
      registrationDate: '2023-07-18',
      profilePic: 'https://randomuser.me/api/portraits/men/75.jpg',
      status: 'Inactive'
    },
    {
      id: 6,
      name: 'Jessica Lee',
      email: 'jessica.l@example.com',
      registrationDate: '2023-12-10',
      profilePic: 'https://randomuser.me/api/portraits/women/63.jpg',
      status: 'Active'
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [referrals, setReferrals] = useState(dummyReferrals);

  // Filter referrals based on search term
  const filteredReferrals = referrals.filter(referral =>
    referral.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    referral.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    referral.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Referrals</h1>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search by name, email or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Referrals Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profile
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registration Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReferrals.length > 0 ? (
              filteredReferrals.map((referral) => (
                <tr key={referral.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={referral.profilePic} alt={referral.name} />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{referral.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 flex items-center">
                      <FiMail className="mr-1" /> {referral.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 flex items-center">
                      <FiCalendar className="mr-1" /> {referral.registrationDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${referral.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        referral.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {referral.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  No referrals found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Stats Summary */}
    
    </div>
  );
}

export default Referrals;