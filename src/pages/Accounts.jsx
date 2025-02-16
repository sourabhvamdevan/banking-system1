import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

export function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const { data } = await axios.get('http://localhost:5000/api/accounts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
      setLoading(false);
    }

    fetchAccounts();
  }, [token]);

  if (loading) {
    return <div>Loading accounts...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Accounts</h1>
      <div className="grid gap-6">
        {accounts.map((account) => (
          <div
            key={account._id}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {account.accountType}
                </h2>
                <p className="text-gray-600">
                  Account Number: {account.accountNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  {account.balance.toLocaleString('en-US', {
                    style: 'currency',
                    currency: account.currency,
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}