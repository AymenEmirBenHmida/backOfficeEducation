export interface SnackAlertProps {
  open: boolean;
  handleErreur: () => void;
  severity: "error" | "warning" | "info" | "success";
  message: string;
}