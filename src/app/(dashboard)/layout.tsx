import { Sidebar } from '@/components/common/sidebar';
import { Topbar } from '@/components/common/topbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Dans la phase suivante, ces données viendront d'un appel useAuth / context
  const mockUser = {
    first_name: 'Jean',
    last_name: 'Dupont',
    role: 'Company Admin' as const,
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Desktop */}
      <Sidebar 
        role={mockUser.role} 
        className="hidden lg:flex w-64 shrink-0" 
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar userDisplayName={`${mockUser.first_name} ${mockUser.last_name}`} />
        
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}