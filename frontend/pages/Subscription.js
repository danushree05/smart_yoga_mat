import React from "react";

function Subscription() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Exclusive Video Tutorials
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Subscribe to download exclusive content and tutorials. Free users can
          watch online, but you need a subscription to download.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Monthly Subscription */}
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Monthly Subscription
            </h3>
            <p className="text-4xl font-bold text-gray-900 mb-4">$9.99</p>
            <p className="text-gray-600 mb-6">per month</p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li>Unlimited online access</li>
              <li>Download up to 10 videos per month</li>
              <li>Exclusive tutorials</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              Subscribe Now
            </button>
          </div>

          {/* Yearly Subscription */}
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Yearly Subscription
            </h3>
            <p className="text-4xl font-bold text-gray-900 mb-4">$99.99</p>
            <p className="text-gray-600 mb-6">per year</p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li>Unlimited online access</li>
              <li>Download unlimited videos</li>
              <li>Exclusive tutorials</li>
              <li>Priority support</li>
            </ul>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
