export type Role = 'Operator' | 'Fleet Manager' | 'Operations Manager' | 'Company Admin' | 'Super Admin';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  company_id: string;
  role_id: string;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}