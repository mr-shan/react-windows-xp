import styles from "./Taskbar.module.css";
import windows_logo from "./../../assets/images/windows_logo.png";

export default function Taskbar() {
  return <div className={styles.container}>
    <button className={styles.startButton}>
        <img src={windows_logo} className={styles.startButtonLogo}/>
        start
    </button>
    <div className={styles.leftOptions}>
        <span>17:00</span>
    </div>
  </div>;
}
