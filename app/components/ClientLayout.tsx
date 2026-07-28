'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import { EditModeProvider, useEditMode } from './EditModeContext';
import { LogOut, Pencil, PencilOff, Menu, X } from 'lucide-react';

interface ClientLayoutProps {
  children: React.ReactNode;
}

function ClientLayoutInner({ children }: ClientLayoutProps) {
  const router = useRouter();
  const [clientAccess, setClientAccess] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Hidden on mobile, overlay when open */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 lg:z-0
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar clientAccess={clientAccess} />
        {/* Close button for mobile */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-slate-600 hover:text-slate-900"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Hamburger Menu Button (Mobile Only) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
            >
              <Menu className="w-5 h-5" />
            </button>

            <h2 className="text-base lg:text-lg font-semibold text-slate-900">
              Lead Generation Dashboard
            </h2>
          </div>

          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Edit Mode Toggle (admin only) */}
            {isAdmin && (
              <button
                onClick={toggleEditMode}
                className={`flex items-center space-x-1 lg:space-x-2 px-2 lg:px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  editMode
                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {editMode ? (
                  <>
                    <PencilOff className="w-4 h-4" />
                    <span className="hidden lg:inline">Exit Edit Mode</span>
                  </>
                ) : (
                  <>
                    <Pencil className="w-4 h-4" />
                    <span className="hidden lg:inline">Edit</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden lg:inline text-sm font-medium">Logout</span>
            </button>
          </div>
        </header>

        {/* Edit mode indicator bar */}
        {editMode && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 lg:px-8 py-2 flex items-center space-x-2">
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
