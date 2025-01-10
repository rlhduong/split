export const pageStyle = {
  minHeight: '100vh',
  display: 'flex',
  bgcolor: '#050d14',
  flexDirection: 'column',
};

export const formStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#dce4eb',
  p: 4,
  borderRadius: '1rem',
  boxShadow: 24,
};

export const TripOverView = {
  main: {
    ...pageStyle,
    padding: {
      xs: '10% 13%',
      sm: '3% 10% 0 10%',
      md: '3% 16% 0 16%',
      lg: '3% 20% 0 20%',
    },
    boxSizing: 'border-box',
    color: '#E4EEF6',
  },
  top: {
    display: 'flex',
    alignItems: 'baseline',
  },
  bot: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row',
    },
    justifyContent: {
      xs: 'flex-start',
      sm: 'space-between',
    },
    flexGrow: 1,
    height: '100%',
  },
  btn: {
    ml: 'auto',
  },
};

export const TripMain = {
  width: '100%',
  borderRadius: '10px',
  border: '2px solid rgb(24, 53, 83)',
  padding: '2% 3%',
  boxSizing: 'border-box',
};

export const cardStyle = {
  width: '100%',
  backgroundColor: 'transparent',
  color: 'white',
  boxShadow: 'none',
  border: 'none',
  boxSizing: 'border-box',
};
