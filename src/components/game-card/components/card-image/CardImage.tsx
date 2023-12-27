import { CardMedia } from '@mui/material';
import { Image } from '@mui/icons-material';
import { Game } from '@/types';

type Props = {
  image: Game['image'];
};

export const CardImage = ({ image }: Props) => {
  const styles = { display: 'block', objectFit: 'contain', height: 250, mb: 3 };

  return image ? (
    <CardMedia component="img" image={image} alt="" sx={styles} />
  ) : (
    <Image sx={{ ...styles, width: '100%' }} color="secondary" />
  );
};
