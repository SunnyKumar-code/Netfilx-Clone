import React from 'react';
import { FaGithub, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-500 pt-12 pb-8 px-4 sm:px-8 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Social Media Links */}
        <div className="flex justify-center space-x-8 mb-8">
          <a
            href="https://github.com/SunnyKumar-code"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-red-600 transition-colors"
            aria-label="GitHub Profile"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/sunny-kumar-coder/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-red-600 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedinIn size={24} />
          </a>
          <a
            href="https://www.youtube.com/@coding.nation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-red-600 transition-colors"
            aria-label="YouTube Channel"
          >
            <FaYoutube size={24} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm mb-2">
            © {new Date().getFullYear()} Netflix Clone
          </p>
          <p className="text-xs opacity-70">
            This is a Netflix clone created for educational purposes only. All movie data is from OMDb API.
          </p>
          <p className="text-xs opacity-70 mt-2">
            Developed by <a href="https://github.com/SunnyKumar-code" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Sunny Kumar</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
