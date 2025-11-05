import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-text text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Senior Saathi</h3>
            <p className="text-gray-300">
              Connecting seniors with volunteers for emotional and practical support.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white">About</a></li>
              <li><a href="/services" className="text-gray-300 hover:text-white">Services</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Emotional Support</li>
              <li className="text-gray-300">Practical Help</li>
              <li className="text-gray-300">Companionship</li>
              <li className="text-gray-300">Medical Assistance</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p>📧 info@seniorsaathi.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 123 Care Street, Compassion City</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Senior Saathi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
