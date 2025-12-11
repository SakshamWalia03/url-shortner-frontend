import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import { FaBolt, FaLock, FaChartLine, FaClock } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useStoreContext } from "../contextApi/ContextApi";

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();
  const location = useLocation();

  const features = [
    {
      title: "Quick URL Shortening",
      desc: "Generate short and memorable URLs in seconds. BitLeap’s interface is fast, intuitive, and hassle-free.",
      icon: <FaBolt className="text-indigo-500 text-3xl mb-3" />,
    },
    {
      title: "Analytics Dashboard",
      desc: "Track clicks, referrals, and locations for every link. Optimize your sharing strategy for better engagement.",
      icon: <FaChartLine className="text-indigo-500 text-3xl mb-3" />,
    },
    {
      title: "Secure Links",
      desc: "All URLs are encrypted and protected. BitLeap ensures your links are safe from tampering or malicious use.",
      icon: <FaLock className="text-indigo-500 text-3xl mb-3" />,
    },
    {
      title: "Reliable & Fast",
      desc: "Enjoy lightning-fast redirects and consistently high uptime. BitLeap’s infrastructure guarantees smooth access.",
      icon: <FaClock className="text-indigo-500 text-3xl mb-3" />,
    },
  ];

  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.6 }}
        className="min-h-[calc(100vh-64px)] lg:px-14 sm:px-8 px-4 font-roboto"
      >
        {/* Hero Section */}
        <div className="lg:flex-row flex-col lg:py-10 pt-20 lg:gap-12 gap-10 flex justify-between items-center">
          {/* Text */}
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-bold text-slate-900 md:text-6xl sm:text-5xl text-4xl md:leading-[65px] sm:leading-[55px] leading-tight lg:w-[90%] md:w-[80%] w-full"
            >
              <span className="text-blue-500 italic">BitLeap</span> Makes URL
              Shortening Simple & Effortless
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-slate-700 text-base my-6 md:w-[90%] sm:w-[95%]"
            >
              Create short, memorable links in seconds with BitLeap. Share them
              easily across platforms and track their performance with our
              intuitive dashboard. Simplify your link management experience today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <button
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform text-white w-44 py-3 rounded-lg shadow-lg"
                onClick={() => navigate("/dashboard")}
              >
                Manage Links
              </button>
              <button
                className="border border-indigo-500 hover:bg-indigo-50 hover:scale-105 transition-all w-44 py-3 rounded-lg text-indigo-600 font-medium"
                onClick={() => navigate("/login")}
              >
                Create Short Link
              </button>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            className="flex-1 flex justify-center w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              className="sm:w-[500px] w-[400px] object-cover rounded-xl shadow-2xl"
              src="/images/landingPage.png"
              alt="BitLeap illustration"
            />
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          className="sm:pt-16 pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-slate-900 font-bold text-center lg:w-[60%] md:w-[70%] sm:w-[85%] mx-auto text-3xl sm:text-4xl">
            Trusted by individuals and teams worldwide
          </p>

          <div className="pt-8 pb-12 grid lg:gap-8 gap-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                title={feature.title}
                desc={feature.desc}
                icon={feature.icon}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LandingPage;