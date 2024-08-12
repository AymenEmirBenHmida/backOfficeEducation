export interface TrimesterCreationProps {
  handleSubmit?: () => void;
  getTrimesters: () => void;
  handleError?: (message: string) => void;
}

export interface TrimesterUpdateProps {
  handleSubmit?: () => void;
  getTrimesters: () => void;
  handleError?: (message: string) => void;
  trimesterId: string;
}
