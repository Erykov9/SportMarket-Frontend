import { footerIcons } from "./config";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {footerIcons.map(icon => <a href={icon.href} target="_blank" rel="noreferrer">{icon.icon}</a>)}
    </footer>
  )
}

export default Footer;