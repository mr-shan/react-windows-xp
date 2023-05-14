import { useSelector, useDispatch } from 'react-redux';
import { createNewTask } from '@/store/slices/taskManager';

import StartButton from '@/components/Buttons/startButton/startButton';
import TaskbarAction from '@/components/taskbarAction/TaskbarAction';
import OpenWindowsInTaskbar from '@/components/openWindowsInTaskbar/OpenWindowsInTaskbar';

import notepad from '@/assets/logos/notepad.png';
import ie from '@/assets/logos/ie.png';

import styles from './Taskbar.module.css';

export default function Taskbar() {
  const dispatch = useDispatch();

  function openNotepad() {
    dispatch(
      createNewTask({
        name: 'NOTEPAD',
      })
    );
  }
  function openIe() {
    dispatch(
      createNewTask({
        name: 'INTERNET_EXPLORER',
      })
    );
  }

  const Icon = (
    <button onClick={openNotepad} className={styles.taskbarProgramLauncher}>
      <img src={notepad} />
    </button>
  );

  const Icon2 = (
    <button onClick={openIe} className={styles.taskbarProgramLauncher}>
      <img src={ie} />
    </button>
  );

  return (
    <div className={styles.container}>
      <StartButton />
      <div className={styles.quickLinks}>
        {Icon}
        {Icon2}
      </div>
      <OpenWindowsInTaskbar />
      <TaskbarAction />
    </div>
  );
}
