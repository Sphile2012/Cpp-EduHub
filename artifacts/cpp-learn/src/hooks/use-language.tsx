/**
 * uPhumeh - Language Selection Hook
 * 
 * This hook manages the user's selected programming language preference,
 * persisting it to localStorage and providing context to the app.
 */

import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from 'react';
import type { LanguageId } from '@/config/languages';
import { DEFAULT_LANGUAGE, getLanguageConfig, LANGUAGES } from '@/config/languages';

const STORAGE_KEY = 'uphumeh_selected_language';

interface LanguageContextType {
  selectedLanguage: LanguageId | null;
  hasSelectedLanguage: boolean;
  setSelectedLanguage: (language: LanguageId) => void;
  clearLanguageSelection: () => void;
  languageConfig: ReturnType<typeof getLanguageConfig> | null;
}

const LanguageContext = createContext<LanguageContextType>({
  selectedLanguage: null,
  hasSelectedLanguage: false,
  setSelectedLanguage: () => {},
  clearLanguageSelection: () => {},
  languageConfig: null,
});

export function useLanguageProvider() {
  const [selectedLanguage, setSelectedLanguageState] = useState<LanguageId | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved in LANGUAGES) {
      setSelectedLanguageState(saved as LanguageId);
    }
    setIsLoaded(true);
  }, []);

  const setSelectedLanguage = useCallback((language: LanguageId) => {
    setSelectedLanguageState(language);
    localStorage.setItem(STORAGE_KEY, language);
  }, []);

  const clearLanguageSelection = useCallback(() => {
    setSelectedLanguageState(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    selectedLanguage,
    hasSelectedLanguage: selectedLanguage !== null,
    setSelectedLanguage,
    clearLanguageSelection,
    languageConfig: selectedLanguage ? getLanguageConfig(selectedLanguage) : null,
    isLoaded,
  };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const {
    selectedLanguage,
    hasSelectedLanguage,
    setSelectedLanguage,
    clearLanguageSelection,
    languageConfig,
    isLoaded,
  } = useLanguageProvider();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-lg text-muted-foreground">Loading uPhumeh...</div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        hasSelectedLanguage,
        setSelectedLanguage,
        clearLanguageSelection,
        languageConfig,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  // Return context with aliases for convenience
  return {
    ...context,
    currentLanguage: context.selectedLanguage,
    setLanguage: context.setSelectedLanguage,
  };
}

// Hook to get language-specific content
export function useLanguageContent<T>(contentByLanguage: Record<LanguageId, T>): T {
  const { selectedLanguage } = useLanguage();
  
  if (!selectedLanguage) {
    return contentByLanguage[DEFAULT_LANGUAGE];
  }
  
  return contentByLanguage[selectedLanguage];
}

// Hook to check if a language is selected
export function useRequireLanguage() {
  const { hasSelectedLanguage, selectedLanguage } = useLanguage();
  return {
    requiresSelection: !hasSelectedLanguage,
    currentLanguage: selectedLanguage,
  };
}