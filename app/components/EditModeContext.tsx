'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface EditModeContextType {
  editMode: boolean;
  toggleEditMode: () => void;
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
}

const EditModeContext = createContext<EditModeContextType>({
  editMode: false,
  toggleEditMode: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
});

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleEditMode = useCallback(() => {
    setEditMode((prev) => !prev);
  }, []);

  return (
    <EditModeContext.Provider value={{ editMode, toggleEditMode, isAdmin, setIsAdmin }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  return useContext(EditModeContext);
}
