import { Box } from '@mui/material';
import { pageStyle } from '../../const/style';
import { useParams, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


const Trip = () => {
	const { tripId } = useParams();




  return (
    <Box sx={{...pageStyle, padding: '0 20%', boxSizing: 'border-box'}}>
        <Box></Box>
    </Box>
  );
};

export default Trip;
