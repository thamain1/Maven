import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FavoritesContextType {
  favoriteIds: string[];
  toggleFavorite: (locationId: string) => void;
  isFavorite: (locationId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['1', '2']);

  const toggleFavorite = (locationId: string) => {
    setFavoriteIds(prev =>
      prev.includes(locationId)
        ? prev.filter(id => id !== locationId)
        : [...prev, locationId]
    );
  };

  const isFavorite = (locationId: string) => {
    return favoriteIds.includes(locationId);
  };

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
