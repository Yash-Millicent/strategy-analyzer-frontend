import { createContext, useContext, ReactNode, useState } from 'react';

interface MyContextProps {
  secondStep: boolean;
  setSecondStep: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

interface MyContextProviderProps {
  children: ReactNode;
}

export const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [secondStep, setSecondStep] = useState<boolean>(false);

  const value: MyContextProps = {
    secondStep,
    setSecondStep,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};
