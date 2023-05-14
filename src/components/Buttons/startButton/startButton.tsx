import styles from "./startButton.module.css";
import start_button from "@/assets/logos/start_button.png";

export default function StartButton(props: any) {
  return (
    <button className={styles.startButton} onClick={props.onClick}>
      <img src={start_button} className={styles.startButtonLogo} />
    </button>
  );
}
