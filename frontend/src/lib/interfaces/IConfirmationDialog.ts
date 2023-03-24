export interface IConfirmationDialogOptions {
  title: string,
  message: string,
  confirmButtonText: string,
  cancelButtonText: string,
}

export interface IConfirmationDialog {
  show: (options: IConfirmationDialogOptions) => Promise<boolean>
}
