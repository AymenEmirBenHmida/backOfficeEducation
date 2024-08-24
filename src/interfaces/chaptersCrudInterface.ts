export interface ChapterCreationProps {
  handleSubmit?: () => void;
  getChapters: () => void;
  handleError?: (message: string, success: boolean) => void;
}

export interface ChapterUpdateProps {
  handleSubmit?: () => void;
  getChapters: () => void;
  handleError?: (message: string, success: boolean) => void;
  chapterId: string;
}
