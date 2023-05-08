import styles from "./startButton.module.css";
import windows_logo from './../../../assets/images/windows_logo.png';

export default function StartButton(props: any) {
  return (
    <button className={styles.startButton} onClick={props.onClick}>
      <img src={windows_logo} className={styles.startButtonLogo} />
      start
    </button>
  );
}
