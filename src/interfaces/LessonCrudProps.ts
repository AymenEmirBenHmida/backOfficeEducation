export interface LessonUpdateProps {
  handleSubmit?: () => void;
  getLessons: () => void;
  handleError?: (message: string, success: boolean) => void;
  selectedLessonId: string;
  lessonData?: any;
}
