import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

type Props = {
  estimatedSeconds: number;
};

export const Countdown = ({ estimatedSeconds }: Props) => {
  const [countdown, setCountdown] = useState(estimatedSeconds);

  const countdownDate = new Date(countdown * 1000);
  const [_hours, minutes, seconds] = countdownDate.toLocaleTimeString().split(' ')[0].split(':');

  useEffect(() => {
    const interval = setInterval(() => setCountdown((prev) => Math.max(prev - 1, 0)), 1000);

    return () => clearInterval(interval);
  }, [estimatedSeconds]);

  return (
    <Typography variant="h4" fontWeight="normal" color="text.secondary" noWrap flexShrink={0}>
      ({minutes}:{seconds})
    </Typography>
  );
};
