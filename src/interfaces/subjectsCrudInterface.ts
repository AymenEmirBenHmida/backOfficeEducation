export interface SubjectCreationProps {
  handleSubmit?: () => void;
  getSubjects: () => void;
  handleError?: (message: string, success: boolean) => void;
}

export interface SubjectUpdateProps {
  handleSubmit?: () => void;
  getSubjects: () => void;
  handleError?: (message: string, success: boolean) => void;
  subjectId: string;
}
