import { Subject } from "./Subject";

export interface Chapter {
  id?: string;
  name: string;
  description?: string;
  matiereId: string;
  isLocked?: boolean;
  estTermine: boolean;
  matiere?: Subject;
}
