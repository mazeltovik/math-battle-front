import { createContext, useState, ReactNode } from 'react';

type Children = {
  children: ReactNode;
};

type SidebarContextType = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = createContext<SidebarContextType>({
  active: false,
  setActive: () => {},
});

export const SidebarProvider = ({ children }: Children) => {
  const [active, setActive] = useState(false);
  return (
    <SidebarContext.Provider
      value={{
        active,
        setActive,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
