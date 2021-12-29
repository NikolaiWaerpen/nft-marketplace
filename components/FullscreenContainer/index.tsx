import { ReactNode } from "react";

type FullscreenContainerProps = {
  children: ReactNode;
};

export default function FullscreenContainer({
  children,
}: FullscreenContainerProps) {
  return <div className="h-screen grid place-items-center">{children}</div>;
}
