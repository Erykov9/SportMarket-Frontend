import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.register}>
      <Button onClick={() => navigate(-1)}><ArrowBackIcon/></Button>
      <div className={styles.wrapper}>
        <div className={styles.login}>

        </div>
        <div className={styles.logo}>

        </div>
      </div>
    </div>
  )
}

export default Register