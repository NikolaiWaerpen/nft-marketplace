import { DappContext } from "providers/DappProvider";
import { useContext } from "react";

export default function useDapp() {
  const context = useContext(DappContext);
  if (context === undefined)
    throw new Error("useMoralisDapp must be used within a MoralisDappProvider");

  return context;
}
