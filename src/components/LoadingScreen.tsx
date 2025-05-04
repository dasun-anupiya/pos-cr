import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          component="img"
          src="/img/app-icon.png"
          alt="business Logo"
          sx={{
            width: 200,
            height: 'auto',
            mb: 3,
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            color: 'primary.main',
          }}
        >
          YOUR BUSINESS POS System
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <CircularProgress size={40} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ position: 'absolute', bottom: 40 }}
      >
        <Box
          component="img"
          src="/img/logo-icon-color.png"
          alt="CRYPSYS Logo"
          sx={{
            width: 40,
            height: 'auto',
            mb: 1,
            alignItems: 'center',
            marginLeft: '50px',
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
          }}
        >
          Powered by CRYPSYS
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            display: 'block',
          }}
        >
          © CRYPSYS 2024
        </Typography>
      </motion.div>
    </Box>
  );
};

export default LoadingScreen; 