export interface LessonUpdateProps {
  handleSubmit?: () => void;
  getLessons: () => void;
  handleError?: (message: string) => void;
  selectedLessonId: string;
  lessonData?: any;
}
