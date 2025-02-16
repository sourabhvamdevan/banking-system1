import React from 'react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome to MyBank</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/accounts"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">View Accounts</h2>
          <p className="text-gray-600">Check your account balances and details</p>
        </Link>
        <Link
          to="/transfer"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Make a Transfer</h2>
          <p className="text-gray-600">Transfer money between accounts</p>
        </Link>
      </div>
    </div>
  );
}