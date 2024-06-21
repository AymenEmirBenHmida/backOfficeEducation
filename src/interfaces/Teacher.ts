export interface Teacher {
  id: string;
  token: string;
  email: String;
  role: String;
  matieres: string;
  password: String;
  firstName: string;
  lastName: string;
  address: string;
  status: string;
  niveau: string;
  numberTotal: number;
  data: {
    id: string;
    token: string;
    email: String;
    role: String;
    matieres: string;
    password: String;
    firstName: string;
    lastName: string;
    address: string;
    status: string;
    niveau: string;
    numberTotal: number;
  };
}
