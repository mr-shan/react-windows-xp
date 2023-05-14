import { useDispatch } from "react-redux";
import { closeTask } from "@/store/slices/taskManager";
import Window from "@/widgets/window/Window";
import styles from "./InternetExplorer.module.css";
import { useEffect } from "react";

export default function Notepad(props) {
  const dispatch = useDispatch();

  function closeProgram() {
    dispatch(closeTask(props.config.id))
  }

  useEffect(() => {
  }, [props])

  return (
    <Window programInfo={props.config} onClose={closeProgram}>
      <iframe className="doc" src="https://docs.google.com/gview?url=https://subtreebucket.s3.amazonaws.com/docsFile_1559124133664_dummy.pdf&embedded=true"></iframe>

    </Window>
  );
}
