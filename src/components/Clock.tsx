import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';

const Clock: React.FC = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mr: 2 }}>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {formattedDate}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {formattedTime}
      </Typography>
    </Box>
  );
};

export default Clock; 