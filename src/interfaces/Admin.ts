import { Commercial } from "./Commercial";
import { Teacher } from "./Teacher";

export interface Admin {
  id: string;
  token: string;
  firstName: string;
  lastName: string;
  address: string;
  email: String;
  role: String;
  password: String;
}

