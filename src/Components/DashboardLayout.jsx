import React from 'react';
import DashBoard from '../Pages/DashBoard';
import RecentGroup from '../Components/RecentGroup';
import RecentTransactions from '../Components/RecentTransactions';

const DashboardLayout = () => {
    return (
        <div className="w-full flex flex-col bg-gray-50 px-5">
            <div className="flex gap-2 h-full">
                <DashBoard />
                <RecentTransactions />
            </div>
            <RecentGroup />
        </div>
    );
};

export default DashboardLayout;