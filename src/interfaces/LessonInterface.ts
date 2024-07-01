export interface CoursInterface {
  id: string;
  name: string;
  content: string;
  chapitreId: string;
  description: string;
  isLocked: boolean;
  images: [string];
  video: string | null;
}
