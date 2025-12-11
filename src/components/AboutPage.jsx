import React from "react";
import { FaLink, FaShareAlt, FaEdit, FaChartLine } from "react-icons/fa";
import Card from "./Card";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaLink className="text-blue-500 text-4xl mr-5" />,
    title: "Simple URL Shortening",
    desc: "Create short, memorable URLs with ease. No complexity — just one click and done.",
  },
  {
    icon: <FaShareAlt className="text-green-500 text-4xl mr-5" />,
    title: "Powerful Analytics",
    desc: "Track clicks, locations, devices, and more through your interactive dashboard.",
  },
  {
    icon: <FaEdit className="text-purple-500 text-4xl mr-5" />,
    title: "Enhanced Security",
    desc: "Your links are protected with encryption and secure routing.",
  },
  {
    icon: <FaChartLine className="text-red-500 text-4xl mr-5" />,
    title: "Fast & Reliable",
    desc: "Experience high-speed redirects & uptime stability powered by modern infrastructure.",
  },
];

const AboutPage = () => {
  return (
    <div className="lg:px-20 sm:px-10 px-5 min-h-[calc(85vh)] pt-6 font-roboto flex justify-center items-center">
      <div className="bg-white w-full sm:py-14 py-10">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="sm:text-5xl text-3xl font-mont font-bold text-slate-800 italic text-center mb-6 drop-shadow-sm flex md:gap-5 justify-center items-center"
        >
          About{" "}
          <img
            src="/images/image1.png"
            alt="BitLeap Logo"
            className="mx-3 lg:mx-0 w-28 md:w-34"
          />
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed text-center mx-auto max-w-3xl mb-12 font-roboto"
        >
          BitLeap helps you shorten, manage, and track URLs effortlessly. 
          With powerful analytics, fast redirects, and strong security, 
          BitLeap ensures your links are smart, secure, and ready for seamless sharing—
          anytime, anywhere.
        </motion.p>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {features.map((f, index) => (
            <Card key={index} icon={f.icon} title={f.title} desc={f.desc} />
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default AboutPage;