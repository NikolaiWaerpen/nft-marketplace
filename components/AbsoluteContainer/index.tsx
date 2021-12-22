import { ReactNode } from "react";

type AbsoluteContainerProps = {
  children: ReactNode;
};

export default function AbsoluteContainer({
  children,
}: AbsoluteContainerProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
      }}
    >
      {children}
    </div>
  );
}
