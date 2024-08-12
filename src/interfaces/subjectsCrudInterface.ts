export interface SubjectCreationProps {
  handleSubmit?: () => void;
  getSubjects: () => void;
  handleError?: (message: string) => void;
}

export interface SubjectUpdateProps {
  handleSubmit?: () => void;
  getSubjects: () => void;
  handleError?: (message: string) => void;
  subjectId: string;
}
