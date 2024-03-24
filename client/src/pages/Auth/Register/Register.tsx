import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { themeStyles } from "../../../utils/themeStyles";
import DataService from "../../../services/DataService";
import { useEffect, useState } from "react";
import { NotificationProps } from "../../../components/Notification/Notification";
import Notification from "../../../components/Notification/Notification";
import AuthStore from "../../../mobx/AuthStore";

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  isTermsAccepted?: boolean;
}

const Register = () => {
  const navigate = useNavigate();
  const { isUserLogged } = AuthStore;

  useEffect(() => {
    if(isUserLogged) {
      navigate("/");
    }
  }, [isUserLogged]);

  const initialValues: RegisterForm = {
    username: "",
    email: "",
    password: "",
    isTermsAccepted: false,
  };
  const initialNotificationValues = {
    type: null,
    message: null,
  }
  const [notificationInfo, setNotificationInfo] = useState<NotificationProps>(initialNotificationValues);

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, "Username must be at least 4 characters")
      .max(18, "Username cannot be longer than 18 characters")
      .required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[\^$*.[\]{}()?\-"!@#%&/,><':;|_~`]/,
        "Password must contain a special character"
      )
      .matches(/\d/, "Password must contain at least one digit")
      .required("Password is required"),
    isTermsAccepted: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions.")
      .required("You must accept the terms and conditions."),
  });

  const register = async (body: RegisterForm): Promise<void> => {
    setNotificationInfo(initialNotificationValues);
    const { isTermsAccepted, ...rest } = body;
    const response = await DataService.register('register', rest);

    if(response.error) {
      return setNotificationInfo({
        type: 'error',
        message: 'Register failed.'
      });
    }

    setNotificationInfo({
      type: 'success',
      message: 'Register successful. Please log in.'
    });

    setTimeout(() => {
      navigate("/");
    }, 3000);
  }

  return (
    <div className={styles.register}>
      <Button onClick={() => navigate("/")}>
        <ArrowBackIcon />
      </Button>
      <div className={styles.wrapper}>
        <div className={styles.registerForm}>
          {notificationInfo.type && <Notification type={notificationInfo.type} message={notificationInfo.message} />}
          <h1>
            Welcome to <span>SportMarket</span>!
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              register(values);
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              setFieldValue,
              values,
              touched,
              errors,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Stack gap={3}>
                  <Field
                    as={TextField}
                    name="username"
                    label="Username*"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                  <Field
                    as={TextField}
                    type="email"
                    name="email"
                    label="Email@example.com*"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <Field
                    as={TextField}
                    type="password"
                    name="password"
                    label="Password*"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <Box marginBottom={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="termsAccepted"
                          checked={values.isTermsAccepted}
                          onChange={(event, checked) =>
                            setFieldValue("isTermsAccepted", checked)
                          }
                          color="primary"
                        />
                      }
                      label="I accept the terms and conditions"
                    />
                    {touched.isTermsAccepted && errors.isTermsAccepted && (
                      <div style={{ color: themeStyles.error }}>
                        <span>{errors.isTermsAccepted}</span>
                      </div>
                    )}
                  </Box>
                  <Button type="submit" variant="contained" color="secondary">
                    Register
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
