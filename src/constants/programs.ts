import notepad from '@/assets/logos/notepad.png'
import { WINDOW_STATES } from './windowStates';

export const NOTEPAD = {
  id: null,
  name: "Notepad",
  icon: notepad,
  filePath: "",
  windowConfig: {
    height: '400px',
    width: '600px',
    buttons: {
      minimize: true,
      maximize: true,
      close: true,
    },
    resizable: true,
    position: {
      left: '100px',
      top: '100px'
    },
    minHeight: '200px',
    minWidth: '300px'
  },
  zIndex: 10,
  windowState: WINDOW_STATES.CLOSED
};
