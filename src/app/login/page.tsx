'use client';

import { Suspense } from 'react';
import { LoginForm } from '@/features/auth/components/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
