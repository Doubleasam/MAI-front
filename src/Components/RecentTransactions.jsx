import React from 'react';
import { FiArrowDownCircle, FiArrowUpCircle, FiGift } from 'react-icons/fi';

const RecentTransactions = () => {
  const transactions = [
    { id: 1, type: 'withdrawal', description: 'Withdrawal', amount: 20, date: '2 mins ago' },
    { id: 2, type: 'referral', description: 'Referral Bonus', amount: 20, date: '1 hour ago' },
    { id: 3, type: 'referral', description: 'Referral Bonus', amount: 20, date: '3 days ago' },
    { id: 4, type: 'withdrawal', description: 'Withdrawal', amount: 20, date: '1 week ago' },
  ];

  const getTransactionIcon = (type) => {
    switch(type) {
      case 'withdrawal':
        return <FiArrowUpCircle className="text-red-500" />;
      case 'referral':
        return <FiGift className="text-green-500" />;
      default:
        return <FiArrowDownCircle className="text-blue-500" />;
    }
  };

  return (
    <div className="w-[250px] h-max"> {/* Exact dimensions */}
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
      </div>
      
      <div className="divide-y divide-gray-100">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-gray-100">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{transaction.description}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <p className={`font-semibold ${
                transaction.type === 'withdrawal' ? 'text-red-500' : 'text-green-500'
              }`}>
                {transaction.type === 'withdrawal' ? '-' : '+'}${transaction.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-100 text-center">
        <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default RecentTransactions;