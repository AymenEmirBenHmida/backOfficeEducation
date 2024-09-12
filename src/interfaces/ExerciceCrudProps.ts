import { Dispatch } from "react";

export interface ExerciceCreationProps {
  selectedTypeId: string;
  handleSubmit: ({ formData }: { formData: any }) => void;
  selectedLessonId?: string;
  description?: string;
  errors?: any;
  loading?: boolean;
  numberOfOptions?: number;
}
export interface ExerciceUpdateProps {
  handleSubmit: (
    formData: any,
    selectedExerciceId: string,
    cleanFormData: (formData: any) => void
  ) => void;
  handleApproval?: (
    formData: any,
    selectedExerciceId: string,
    cleanFormData: (formData: any) => void
  ) => void;
  handleRefusal?: (comment: string, selectedExerciceId: string) => void;
  selectedExerciceId: string;
  exerciceData?: any;
  errors?: any;
  updateLoading?: boolean;
  refusalLoading?: boolean;
  setErrors: Dispatch<any>;
  isApproval?: boolean;
}
