import { useContext } from "react";
import { MeContext } from "../providers/MeProvider";

export default function useMe() {
  return useContext(MeContext);
}
