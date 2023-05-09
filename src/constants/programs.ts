import notepad from '@/assets/logos/notepad.png'

export const NOTEPAD = {
  id: null,
  name: "Notepad",
  icon: notepad,
  filePath: "",
  windowConfig: {
    height: 400,
    width: 600,
    buttons: {
      minimize: true,
      maximize: true,
      close: true,
    },
    resizable: true,
  }
};
