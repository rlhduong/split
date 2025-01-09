import { Box } from '@mui/material';
import { FC } from 'react';
import { FriendListProps } from '../../../utilities/interface';
import FriendCard from './FriendCard';

const FriendList: FC<FriendListProps> = ({ friends }) => {
  return (
    <Box sx={{ width: '100%' }}>
      {Object.keys(friends).map((name) => {
        return <FriendCard key={name} name={name} friend={friends[name]} />;
      })}
    </Box>
  );
};

export default FriendList;
