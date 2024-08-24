export interface TrimesterCreationProps {
  handleSubmit?: () => void;
  getTrimesters: () => void;
  handleError?: (message: string, success: boolean) => void;
}

export interface TrimesterUpdateProps {
  handleSubmit?: () => void;
  getTrimesters: () => void;
  handleError?: (message: string, success: boolean) => void;
  trimesterId: string;
}
