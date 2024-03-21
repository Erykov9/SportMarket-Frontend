import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Tooltip,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useNavigate } from "react-router-dom";

interface INavigationProps {
  isLogged: boolean;
}

const Navigation: React.FC<INavigationProps> = ({ isLogged }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, position: 'relative' }}>
      <AppBar position="fixed" color="secondary">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
              Sport Market
            </Typography>
            {isLogged ? (
              <Avatar>E</Avatar>
            ) : (
              <>
                <Tooltip title="Login">
                  <IconButton color="inherit">
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
