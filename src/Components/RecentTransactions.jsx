import React, { useEffect } from 'react';
import { FiArrowDownCircle, FiArrowUpCircle, FiGift } from 'react-icons/fi';
import useWalletStore from '../Store/useWalletStore';

const RecentTransactions = () => {
  const { transactions, getMyTransactions } = useWalletStore();

  useEffect(() => {
    getMyTransactions();
  }, []);

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'withdrawal':
        return <FiArrowUpCircle className="text-red-500" />;
      case 'referral':
        return <FiGift className="text-green-500" />;
      default:
        return <FiArrowDownCircle className="text-blue-500" />;
    }
  };

  return (
    <div className="w-[250px] h-max">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
      </div>

      <div className="divide-y divide-gray-100">
        {transactions?.length > 0 ? (
          transactions.slice(0, 5).map((transaction) => (
            <div key={transaction._id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{transaction.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p
                  className={`font-semibold ${
                    transaction.type === 'withdrawal' ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {transaction.type === 'withdrawal' ? '-' : '+'}${transaction.amount}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-gray-500 text-sm">No transactions yet.</div>
        )}
      </div>
      {transactions?.length > 5 && (
        <div className="p-4 border-t border-gray-100 text-center">
        <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
          View All Transactions
        </button>
      </div>
      )
    }
    </div>
  );
};

export default RecentTransactions;
