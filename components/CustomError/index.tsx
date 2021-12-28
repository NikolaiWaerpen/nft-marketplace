import { useEffect } from "react";
import lottie from "lottie-web";
import { replaceColor } from "lottie-colorify";
import loaderAnimation from "public/lottie/error.json";
import Link from "next/link";
import { MAIL_TO } from "consts";
import AbsoluteContainer from "components/AbsoluteContainer";

type CustomErrorProps = {
  error?: Error;
};

export default function CustomError({ error }: CustomErrorProps) {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#animationContainer") as Element,
      animationData: replaceColor("#eeeeee", "#eeeeee", loaderAnimation),
    });
  }, []);

  return (
    <AbsoluteContainer>
      <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            <div id="animationContainer" className="w-36" />
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                Oh snap!
              </p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                An error occurred.
              </h1>
              {error && <div>{JSON.stringify(error.message, null, 2)}</div>}
              <div className="mt-6">
                <Link href="">
                  <a className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                    <span aria-hidden="true"> &larr;</span> Go back home
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center space-x-4">
            <a
              href={MAIL_TO}
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Contact me for support
            </a>
          </nav>
        </footer>
      </div>
    </AbsoluteContainer>
  );
}
