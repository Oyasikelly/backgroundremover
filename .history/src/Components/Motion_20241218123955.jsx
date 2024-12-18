
// pages/index.js
import { motion } from 'framer-motion';

const Motion = () => {
  return (
    <div>
      <h1>Welcome to My Next.js Project with Framer Motion</h1>
      
      {/* Basic animation example */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <p>This is a simple fade-in animation.</p>
      </motion.div>

      {/* Animate when hovering */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Hover and Click Me!
      </motion.button>
    </div>
  );
};

export default Motion;
