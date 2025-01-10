import { Typography, Card, CardContent, CardActionArea } from '@mui/material';
import { FC } from 'react';
import { useState } from 'react';
import { FriendCardProps } from '../../../utilities/interface';
import { cardStyle } from '../../../const/style';

const FriendCard: FC<FriendCardProps> = ({ friend, name }) => {
  const [hover, setHover] = useState(false);

  return (
    <Card
      sx={cardStyle}
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
          {hover && <Typography color="#2e96ff">{friend.spent.toFixed(2)}</Typography>}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default FriendCard;
