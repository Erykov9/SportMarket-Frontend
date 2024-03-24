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
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useNavigate } from "react-router-dom";
import AuthStore from "../../../mobx/AuthStore";
import { useState } from "react";
import { observer } from "mobx-react";

interface INavigationProps {
  isLogged: boolean;
}

const Navigation: React.FC<INavigationProps> = observer(({ isLogged }) => {
  const navigate = useNavigate();
  const { username } = AuthStore;
  const avatarUsername = `${username?.split("")[0]}${
    username?.split("")[username.split("").length - 1]
  }`;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = () => {
    handleClose();
    navigate("/profile");
  };

  const logoutHandler = async () => {
    await AuthStore.logout();
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1, position: "relative" }}>
      <AppBar position="fixed" color="secondary">
        <Container>
          <Toolbar>
            <Typography
              variant="h4"
              component="div"
              sx={{
                flexGrow: 1,
                cursor: "pointer",
                fontWeight: "300",
                fontStyle: "oblique",
              }}
              onClick={() => navigate("/")}
            >
              Sport Market
            </Typography>
            {isLogged ? (
              <>
                <Tooltip title="Profile">
                  <Button
                    onClick={handleClick}
                    id="profile-btn"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar>{avatarUsername}</Avatar>
                  </Button>
                </Tooltip>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  variant="selectedMenu"
                >
                  <MenuItem onClick={handleNavigate} color="primary">Profile</MenuItem>
                  <MenuItem disabled>Settings</MenuItem>
                  <Divider/>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Tooltip title="Login">
                  <IconButton
                    color="inherit"
                    onClick={() => navigate("/login")}
                  >
                    <LoginIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Register">
                  <IconButton
                    color="inherit"
                    onClick={() => navigate("/register")}
                  >
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
});

export default Navigation;
