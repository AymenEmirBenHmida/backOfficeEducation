export interface ExerciceCreationProps {
  selectedTypeId: string;
  handleSubmit: ({ formData }: { formData: any }) => void;
  selectedLessonId?: string;
  description?: string;
  errors?: any;
  loading?: boolean;
}
export interface ExerciceUpdateProps {
  handleSubmit: (
    formData: any,
    selectedExerciceId: string,
    cleanFormData: (formData: any) => void
  ) => void;
  selectedExerciceId: string;
  exerciceData?: any;
  errors?: any;
  updateLoading?: boolean;
}
