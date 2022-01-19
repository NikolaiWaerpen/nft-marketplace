import React, {
  createContext,
  Dispatch,
  useState,
  ReactNode,
  SetStateAction,
} from "react";

type MeType = string;

type MeContextType = {
  me: MeType;
  setMe: Dispatch<SetStateAction<MeType>>;
};

export const MeContext = createContext({} as MeContextType);

export default function MeProvider({ children }: { children: ReactNode }) {
  const [me, setMe] = useState<MeType>("");

  return (
    <MeContext.Provider value={{ me, setMe }}>{children}</MeContext.Provider>
  );
}
