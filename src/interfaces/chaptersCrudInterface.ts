export interface ChapterCreationProps {
  handleSubmit?: () => void;
  getChapters: () => void;
  handleError?: (message: string) => void;
}

export interface ChapterUpdateProps {
  handleSubmit?: () => void;
  getChapters: () => void;
  handleError?: (message: string) => void;
  chapterId: string;
}
