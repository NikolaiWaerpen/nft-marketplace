import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NAVIGATION } from "consts";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {NAVIGATION.main.map(({ name, href }) => (
            <div key={name} className="px-5 py-2">
              <a
                href={href}
                className="text-base text-gray-500 hover:text-gray-900"
              >
                {name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          {NAVIGATION.social.map(({ href, icon, name }) => (
            <a
              key={name}
              href={href}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{name}</span>
              <FontAwesomeIcon icon={icon} />
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2022 Torden Torg AS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
