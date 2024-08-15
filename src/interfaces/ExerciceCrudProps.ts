export interface ExerciceCreationProps {
  selectedTypeId: string;
  handleSubmit: ({ formData }: { formData: any }) => void;
  selectedLessonId?: string;
  description?: string;
  errors?: any;
  loading?:boolean;
}
export interface ExerciceUpdateProps {
  handleSubmit?: () => void;
  getExercices: () => void;
  handleError?: (message: string) => void;
  selectedExerciceId: string;
  exerciceData?: any;
}
