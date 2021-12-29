import { useEffect } from "react";
import lottie from "lottie-web";
import { replaceColor } from "lottie-colorify";
import loaderAnimation from "public/lottie/loader.json";
import FullscreenContainer from "components/FullscreenContainer";

type LoaderProps = {
  message?: string;
};

export default function Loader({ message }: LoaderProps) {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#animationContainer") as Element,
      animationData: replaceColor("#eeeeee", "#eeeeee", loaderAnimation),
    });
  }, []);
  return (
    <FullscreenContainer>
      <div id="animationContainer" className="w-56" />
      {message && <h5>{message}</h5>}
    </FullscreenContainer>
  );
}
