import React from 'react';
import DashBoard from '../Pages/DashBoard';
import RecentGroup from '../Components/RecentGroup';
import RecentTransactions from '../Components/RecentTransactions';
import GroupListPage from '../Pages/GroupListPage';
import useAuthStore from '../Store/Auth'; // Assuming you're using Zustand to store user info

const DashboardLayout = () => {
    // Get the user role from the store (assumes user info is stored in Zustand)
    const { user } = useAuthStore();

    return (
        <div className="w-full flex flex-col bg-gray-50 px-5">
            <div className="flex gap-2 h-full">
                <DashBoard />
                <RecentTransactions />
            </div>
            {/* Conditional rendering based on user role */}
            {user?.role === 'affiliate' ? (
                <RecentGroup />
            ) : (
                <GroupListPage />
            )}
        </div>
    );
};

export default DashboardLayout;
