import React, { useEffect } from 'react';
import { FiUsers, FiCalendar } from 'react-icons/fi';
import Money from "../assets/money.jpeg";
import useReferralStore from '../Store/useReferralStore';
import useGroupStore from '../Store/group';

const RecentGroup = ({ isAffiliate = true }) => {
  const { referrals, fetchMyReferrals } = useReferralStore();
  const { recentGroup, fetchRecentGroup } = useGroupStore();

  useEffect(() => {
    if (isAffiliate) {
      fetchMyReferrals();
    } else {
      fetchRecentGroup();
    }
  }, [isAffiliate, fetchMyReferrals, fetchRecentGroup]);

  if (isAffiliate) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Recent Referrals</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Profile</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Registration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {referrals?.map((referral, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <img
                      src={referral.profilePicture || "https://via.placeholder.com/40"}
                      alt={referral.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-3 px-4">{referral.name}</td>
                  <td className="py-3 px-4">{referral.email}</td>
                  <td className="py-3 px-4">{new Date(referral.registrationDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const progress = recentGroup?.progress || 70;
  const members = recentGroup?.members || 12;
  const daysLeft = recentGroup?.daysLeft || 15;

  return (
    <div className="w-[240px]">
      <div className="h-40 w-full">
        <img
          src={Money}
          alt="Savings Group"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-3">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{recentGroup?.name || 'Family and Friends Savings'}</h3>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-600">Progress</span>
            <span className="text-sm font-medium text-blue-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FiUsers className="w-4 h-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-600">{members} members</span>
          </div>
          <div className="flex items-center">
            <FiCalendar className="w-4 h-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-600">{daysLeft} days left</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentGroup;