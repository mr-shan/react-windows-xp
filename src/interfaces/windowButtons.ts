export interface IWindowButtons {
    close: boolean,
    minimize: boolean,
    maximize: boolean
}

export interface IWindowProps {
    height?: number,
    width?: number,
    buttons?: IWindowButtons
    resizable?: boolean,
    contextMenu?: object,
    menubar?: object
}