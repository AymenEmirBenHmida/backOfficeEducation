import { Admin } from "./Admin";
import { Commercial } from "./Commercial";
import { Teacher } from "./Teacher";

export interface AdminState {
  userInfo?: {
    password?: string;
    email?: string;
    phone?: string;
  };
  isLoading: boolean;
  error: string | null;
  data: any;
  totalPercentage: Record<string, number> | null;
  chapitreId: string; // Ajouter la propriété chapitreId
  totalHours: number | null; // Ajouter la propriété totalHours
  commercial: Commercial[];
  teacher: Teacher[];
  admin: Admin[];
  role: string | null;
  loading: boolean; // Ajoutez la propriété `loading` ici
  status: "idle" | "loading" | "succeeded" | "failed";
  totalUsers: number;
  user: UserData | null;
}
