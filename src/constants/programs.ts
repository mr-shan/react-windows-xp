import notepad from '@/assets/logos/notepad.png'
import error from "@/assets/logos/error.png"
import ie from "@/assets/logos/ie.png"
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

export const ERROR = {
  id: null,
  name: "Error Occurred!",
  icon: error,
  filePath: "",
  windowConfig: {
    height: '',
    width: '400px',
    buttons: {
      minimize: false,
      maximize: false,
      close: false,
    },
    resizable: false,
    position: {
      left: '100px',
      top: '100px'
    },
    minHeight: '',
    minWidth: ''
  },
  zIndex: 10,
  windowState: WINDOW_STATES.CLOSED
};

export const INTERNET_EXPLORER = {
  id: null,
  name: "Internet Explorer",
  icon: ie,
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
