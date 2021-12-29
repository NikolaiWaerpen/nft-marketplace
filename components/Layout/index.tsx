import Footer from "components/Footer";
import Loader from "components/Loader";
import Navigation from "components/Navigation";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { query, isReady } = useRouter();

  if (!isReady) return <Loader />;

  return (
    <div>
      <div className="w-full">
        <Navigation query={query} />
      </div>
      <div className="pt-16">{children}</div>
      <Footer />
    </div>
  );
}
