import { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

interface NavigationContextType {
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
  closeMobileNav: () => void;
}

export const NavigationContext = createContext<NavigationContextType>({
  isMobileNavOpen: false,
  setIsMobileNavOpen: () => {},
  closeMobileNav: () => {},
});

const NavigationProvider = ({ children }: Props) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const closeMobileNav = () => setIsMobileNavOpen(false);
  return (
    <NavigationContext
      value={{
        isMobileNavOpen,
        setIsMobileNavOpen,
        closeMobileNav,
      }}
    >
      {children}
    </NavigationContext>
  );
};
export default NavigationProvider;

export function useNavigation() {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
