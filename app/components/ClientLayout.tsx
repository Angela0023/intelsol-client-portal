'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import { EditModeProvider, useEditMode } from './EditModeContext';
import { LogOut, Pencil, PencilOff } from 'lucide-react';

interface ClientLayoutProps {
  children: React.ReactNode;
}

function ClientLayoutInner({ children }: ClientLayoutProps) {
  const router = useRouter();
  const [clientAccess, setClientAccess] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { editMode, toggleEditMode, isAdmin, setIsAdmin } = useEditMode();

  useEffect(() => {
    const access = sessionStorage.getItem('clientAccess');
    if (!access) {
      router.push('/');
      return;
    }

    try {
      const parsedAccess = JSON.parse(access);
      setClientAccess(parsedAccess);
      setIsAdmin(parsedAccess.includes('admin'));
      setLoading(false);
    } catch {
      router.push('/');
    }
  }, [router, setIsAdmin]);

  const handleLogout = () => {
    sessionStorage.removeItem('clientAccess');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#1a2647] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar clientAccess={clientAccess} />

      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Lead Generation Dashboard
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            {/* Edit Mode Toggle (admin only) */}
            {isAdmin && (
              <button
                onClick={toggleEditMode}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  editMode
                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {editMode ? (
                  <>
                    <PencilOff className="w-4 h-4" />
                    <span>Exit Edit Mode</span>
                  </>
                ) : (
                  <>
                    <Pencil className="w-4 h-4" />
                    <span>Edit</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </header>

        {/* Edit mode indicator bar */}
        {editMode && (
          <div className="bg-amber-50 border-b border-amber-200 px-8 py-2 flex items-center space-x-2">
            <Pencil className="w-3.5 h-3.5 text-amber-600" />
            <p className="text-xs font-medium text-amber-700">
              Edit mode is active. Changes will be saved to localStorage.
            </p>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 bg-slate-50 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <EditModeProvider>
      <ClientLayoutInner>{children}</ClientLayoutInner>
    </EditModeProvider>
  );
}
