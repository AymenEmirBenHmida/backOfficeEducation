import { Trimester } from "./Trimester";

export interface Subject {
  id?: string;
  name: string;
  description?: string;
  trimestreId: string;
  isLocked?: boolean;
  trimestre?: Trimester;
}
