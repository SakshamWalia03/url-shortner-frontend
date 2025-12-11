import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-4 relative z-40 shadow-inner w-full">
      <div className="container mx-auto lg:px-14 flex flex-col lg:flex-row justify-between items-center gap-6 max-w-[1920px]">
        {/* Branding */}
        <div className="text-center lg:text-left">
          <img
            src="/images/image1.png"
            alt="BitLeap Logo"
            className="mx-auto lg:mx-0 w-28 md:w-32"
          />
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-5">
          {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, idx) => (
            <a
              key={idx}
              href="#"
              className="text-gray-700 hover:text-indigo-500 transition-colors transform hover:scale-110"
            >
              <Icon size={24} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="mt-4 lg:mt-0 text-sm text-gray-600 lg:text-left">
          &copy; {new Date().getFullYear()} BitLeap. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
