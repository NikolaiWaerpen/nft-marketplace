import FullscreenContainer from "components/FullscreenContainer";
import { MAIL_TO } from "consts";
import { replaceColor } from "lottie-colorify";
import lottie from "lottie-web";
import Link from "next/link";
import loaderAnimation from "public/lottie/404.json";
import { useEffect } from "react";

export default function Custom404() {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#notFoundAnimationContainer"),
      animationData: replaceColor("#eeeeee", "#eeeeee", loaderAnimation),
    });
  }, []);

  return (
    <div>
      <div className="pt-16 pb-12 flex flex-col bg-white">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            <div
              id="notFoundAnimationContainer"
              className="w-36 h-36 bg-theme-600"
            />
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold text-theme-600 uppercase tracking-wide">
                404 error
              </p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Page not found.
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Sorry, we couldn't find the page you're looking for.
              </p>
              <div className="mt-6">
                <Link href="/">
                  <a className="text-base font-medium text-theme-600 hover:text-theme-500">
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
              Contact us for support
            </a>
          </nav>
        </footer>
      </div>
    </div>
  );
}
