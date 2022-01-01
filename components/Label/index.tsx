import { ReactNode } from "react";

type LabelProps = {
  children: ReactNode;
};

export default function Label({ children }: LabelProps) {
  return (
    <label
      htmlFor="text"
      className="inline-block px-1 bg-white text-xs font-medium text-gray-900"
    >
      {children}
    </label>
  );
}
