import { CircularProgress } from "@mui/material";
import styles from "./LoadingComponent.module.scss";

const LoadingComponent = () => {
  return (
    <div className={styles.loadingComponent}><CircularProgress color="error"/></div>
  )
}

export default LoadingComponent