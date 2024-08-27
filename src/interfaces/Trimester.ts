import { Level } from "./level";

export interface Trimester {
  id?: string;
  isLocked?: boolean;
  name: string;
  slug: string;
  niveauId: string;
  niveau?: Level;
}
