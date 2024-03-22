import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Tooltip,
  Button,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import AuthStore from "../../../mobx/AuthStore";

interface INavigationProps {
  isLogged: boolean;
}

const Navigation: React.FC<INavigationProps> = ({ isLogged }) => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await AuthStore.logout();
  };

  return (
    <Box sx={{ flexGrow: 1, position: 'relative' }}>
      <AppBar position="fixed" color="secondary">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
              Sport Market
            </Typography>
            {isLogged ? (
              <>
              <Avatar>E</Avatar>
              <Button color="warning" onClick={logoutHandler}><LogoutIcon/></Button>
              </>
            ) : (
              <>
                <Tooltip title="Login">
                  <IconButton color="inherit" onClick={() => navigate('/login')}>
                    <LoginIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Register">
                  <IconButton color="inherit" onClick={() => navigate('/register')}>
                    <AppRegistrationIcon/>
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navigation;
