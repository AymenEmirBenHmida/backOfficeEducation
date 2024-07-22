export interface ExerciceCreationProps {
  selectedTypeId: string;
  handleSubmit: ({ formData }: { formData: any }) => void;
  selectedLessonId?: string;
  description?: string;
}
export interface ExerciceUpdateProps {
  handleSubmit?: () => void;
  handleError?: (message:string) => void;
  selectedExerciceId: string;
}
