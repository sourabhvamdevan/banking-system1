import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Account {
  id: string;
  account_type: string;
  account_number: string;
  balance: number;
  currency: string;
}

export function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAccounts() {
      const { data, error } = await supabase
        .from('accounts')
        .select('*');

      if (!error && data) {
        setAccounts(data);
      }
      setLoading(false);
    }

    fetchAccounts();
  }, []);

  if (loading) {
    return <div>Loading accounts...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Accounts</h1>
      <div className="grid gap-6">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {account.account_type}
                </h2>
                <p className="text-gray-600">
                  Account Number: {account.account_number}
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