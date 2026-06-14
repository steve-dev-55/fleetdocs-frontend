import { 
  LayoutDashboard, 
  Car, 
  FileText, 
  Bell, 
  Users, 
  Settings, 
  ShieldAlert, 
  Building2, 
  Cpu,
  UploadCloud
} from 'lucide-react';
import { Role } from '@/types/auth';

export interface NavItem {
  title: string;
  href: string;
  icon: any;
  roles: Role[];
}

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    title: 'Tableau de bord',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['Operator', 'Fleet Manager', 'Operations Manager', 'Company Admin', 'Super Admin'],
  },
  {
    title: 'Ma Flotte',
    href: '/fleet/vehicles',
    icon: Car,
    roles: ['Operator', 'Fleet Manager', 'Operations Manager', 'Company Admin'],
  },
  {
    title: 'Documents',
    href: '/documents',
    icon: FileText,
    roles: ['Fleet Manager', 'Operations Manager', 'Company Admin'],
  },
  {
    title: 'Upload & OCR',
    href: '/documents/upload-center',
    icon: UploadCloud,
    roles: ['Operator', 'Fleet Manager', 'Company Admin'],
  },
  {
    title: 'Alertes',
    href: '/alerts',
    icon: Bell,
    roles: ['Operator', 'Fleet Manager', 'Operations Manager', 'Company Admin'],
  },
  {
    title: 'Utilisateurs',
    href: '/settings/users',
    icon: Users,
    roles: ['Company Admin'],
  },
  {
    title: 'Configuration',
    href: '/settings/document-types',
    icon: Settings,
    roles: ['Company Admin'],
  },
  // Menu SuperAdmin
  {
    title: 'Entreprises',
    href: '/admin/companies',
    icon: Building2,
    roles: ['Super Admin'],
  },
  {
    title: 'Config IA',
    href: '/admin/llm-config',
    icon: Cpu,
    roles: ['Super Admin'],
  },
];