import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { Box, Button, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Field, Form, Formik } from "formik";
import { NotificationProps } from "../../../components/Notification/Notification";
import { useState } from "react";
import Notification from "../../../components/Notification/Notification";
import AuthStore from "../../../mobx/AuthStore";

export interface LoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const initialValues: LoginForm = {
    username: "",
    password: "",
  };

  const initialNotificationValues = {
    type: null,
    message: null,
  };

  const [notificationInfo, setNotificationInfo] = useState<NotificationProps>(initialNotificationValues);

  const handleSubmit = async (values: LoginForm): Promise<void> => {
    setNotificationInfo(initialNotificationValues);
    const response = await AuthStore.login(values);
    if(response?.error) {
      return setNotificationInfo({
        type: "error",
        message: "Username or password are incorrect."
      });
    }

    setNotificationInfo({
      type: "success",
      message: "You have been logged in."
    })
    
    setTimeout(() => {
      navigate(-1);
    }, 1500)
  };

  return (
    <div className={styles.login}>
      <Button onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </Button>
      <div className={styles.wrapper}>
        <div className={styles.loginForm}>
        {notificationInfo.type && <Notification type={notificationInfo.type} message={notificationInfo.message} />}
          <h1>
            Welcome back to <span>SportMarket</span>
          </h1>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ handleChange }) => (
              <Form>
                <Box marginBottom={2}>
                  <Field
                    as={TextField}
                    name="username"
                    label="Username"
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
                <Box marginBottom={2}>
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
