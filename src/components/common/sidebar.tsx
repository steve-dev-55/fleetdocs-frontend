'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAVIGATION_ITEMS } from '@/config/navigation';
import { Role } from '@/types/auth';
import { FileText } from 'lucide-react';

interface SidebarProps {
  role: Role;
  className?: string;
}

export function Sidebar({ role, className }: SidebarProps) {
  const pathname = usePathname();

  const filteredItems = NAVIGATION_ITEMS.filter((item) => 
    item.roles.includes(role)
  );

  return (
    <aside className={cn("flex flex-col bg-white border-r dark:bg-slate-900 dark:border-slate-800", className)}>
      <div className="p-6">
        <div className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400">
          <div className="bg-blue-600 text-white p-1 rounded">
            <FileText size={20} />
          </div>
          <span>FleetDocs</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" 
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              )}
            >
              <Icon size={18} />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}