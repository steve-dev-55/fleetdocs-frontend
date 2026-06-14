'use client';

import { Bell, User, LogOut, Menu } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { authApi } from '@/features/auth/services/auth.api';
import { useRouter } from 'next/navigation';

export function Topbar({ userDisplayName }: { userDisplayName: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await authApi.logout();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="h-16 border-b bg-white dark:bg-slate-900 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger - Hidden on desktop */}
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu size={20} />
        </Button>
        <h2 className="text-sm font-medium text-slate-500">Espace Entreprise</h2>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 pl-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 px-2 py-1">
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
              <User size={16} />
            </div>
            <span className="text-sm font-medium hidden sm:inline-block">{userDisplayName}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Mon Profil</DropdownMenuItem>
            <DropdownMenuItem>Paramètres</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
              <LogOut size={16} className="mr-2" />
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}