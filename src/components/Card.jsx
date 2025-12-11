import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Card = ({ title, desc, icon }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 15px 25px rgba(0,0,0,0.15), 0 0 0 2px rgba(99,102,241,0.7)"
      }}
      className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-lg p-6 flex flex-col gap-5 cursor-pointer border border-indigo-200"
    >
      <div className="flex items-center gap-4">
        {icon && <div className="text-indigo-500 text-3xl">{icon}</div>}
        <h1 className="text-slate-900 text-xl font-bold">{title}</h1>
      </div>
      <p className="text-slate-700 text-sm whitespace-normal leading-relaxed">{desc}</p>
    </motion.div>
  );
};

export default Card;