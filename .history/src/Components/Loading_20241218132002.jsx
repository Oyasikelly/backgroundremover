// components/LoadingSpinner.js
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div style={styles.container}>
      <motion.div
        style={styles.spinner}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 2, // Duration of one full rotation
          ease: "linear",
        }}
      >
        <div style={styles.innerCircle}></div>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full screen height
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #ccc',
    borderTop: '5px solid #3498db',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: '20px',
    height: '20px',
    backgroundColor: '#3498db',
    borderRadius: '50%',
  },
};

export default Loading;
