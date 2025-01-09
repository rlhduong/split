import { Typography, Card, CardContent, CardActionArea } from '@mui/material';
import { FC } from 'react';
import { useState } from 'react';
import { FriendCardProps } from '../../../utilities/interface';

const FriendCard: FC<FriendCardProps> = ({ friend, name }) => {
  const [hover, setHover] = useState(false);

  return (
    <Card
      sx={{
        width: '100%',
        backgroundColor: 'transparent',
        color: 'white',
        boxShadow: 'none',
        border: 'none',
      }}
    >
      <CardActionArea
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'row',
            padding: '3% 5% 3% 5%',
            border: 'none',
            justifyContent: 'space-between',
          }}
        >
          <Typography>{name}</Typography>
          {hover && <Typography color="#2e96ff">{friend.total}</Typography>}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default FriendCard;
