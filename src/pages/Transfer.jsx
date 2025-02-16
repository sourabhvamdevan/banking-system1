import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

export function Transfer() {
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('idle');
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await axios.post(
        'http://localhost:5000/api/transactions',
        {
          amount: parseFloat(amount),
          accountNumber,
          description,
          transactionType: 'TRANSFER',
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStatus('success');
      setAmount('');
      setAccountNumber('');
      setDescription('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Transfer Money</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0.01"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Recipient Account Number
          </label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {status === 'loading' ? 'Processing...' : 'Transfer'}
        </button>
        {status === 'success' && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            Transfer successful!
          </div>
        )}
        {status === 'error' && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Transfer failed. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}