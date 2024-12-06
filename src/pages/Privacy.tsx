import React from 'react';

export function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 prose prose-blue">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including when you create an account,
            connect marketing platforms, or contact us for support.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services,
            to process your requests, and to send you technical notices and updates.
          </p>

          <h2>3. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your data
            against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>4. Third-Party Services</h2>
          <p>
            Our service integrates with various third-party marketing platforms. Please review
            their respective privacy policies for information about their data practices.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
            privacy@adalyze.se
          </p>
        </div>
      </div>
    </div>
  );
}