import React from 'react';

export function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 prose prose-blue">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using AdAlyze's services, you agree to be bound by these Terms of Service
            and all applicable laws and regulations.
          </p>

          <h2>2. Service Description</h2>
          <p>
            AdAlyze provides marketing analytics and insights through a web-based platform that
            integrates with various marketing services and platforms.
          </p>

          <h2>3. User Obligations</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials
            and for all activities that occur under your account.
          </p>

          <h2>4. Data Usage</h2>
          <p>
            By using our services, you grant us permission to collect and analyze data from your
            connected marketing platforms in accordance with our Privacy Policy.
          </p>

          <h2>5. Termination</h2>
          <p>
            We reserve the right to terminate or suspend access to our services immediately,
            without prior notice, for any violation of these Terms.
          </p>
        </div>
      </div>
    </div>
  );
}