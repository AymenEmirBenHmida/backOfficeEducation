export interface AccessToken {
  aud?: string;
  exp?: number;
  iat?: number;
  iss?: string;
  sub?: string;
  email?: string;
  phone?: string;
  app_metadata?: {
    phone_confirm?: boolean;
    provider?: string;
    providers?: string[];
  };
  user_metadata?: {
    phone?: string;
    role?: string;
    teacherId?: string;
    adminId?: string;
  };
  role?: string;
  aal?: string;
  amr?: {
    method?: string;
    timestamp?: number;
  }[];
  session_id?: string;
  is_anonymous?: boolean;
}
