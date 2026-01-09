import { useState, createContext, useContext, ReactNode } from 'react';

interface WishlistContextType {
  wishlist: number[];
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const addToWishlist = (id: number) => {
    setWishlist((prev) => [...prev, id]);
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item !== id));
  };

  const isInWishlist = (id: number) => wishlist.includes(id);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
