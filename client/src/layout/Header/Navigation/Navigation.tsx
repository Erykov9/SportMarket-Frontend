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

interface INavigationProps {
  isLogged: boolean;
}

const Navigation: React.FC<INavigationProps> = ({ isLogged }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
                  <IconButton color="inherit">
                    <AppRegistrationIcon />
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
