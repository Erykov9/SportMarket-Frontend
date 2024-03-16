import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5F63DD',
    },
    secondary: {
      main: '#b0b5b3',
    },
    warning: {
      main: '#F5EE8F'
    },
    success: {
      main: '#57E462'
    },
    error: {
      main: '#B03434'
    }
  },
});

export default theme;