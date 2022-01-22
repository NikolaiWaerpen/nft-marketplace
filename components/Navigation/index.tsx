import { faArtstation } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import Button from "components/Button";
import { NAVIGATION } from "consts";
import useMe from "hooks/useMe";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

type NavigationProps = {
  query: NextParsedUrlQuery;
};

export default function Navigation({ query }: NavigationProps) {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter(),
    { route } = router;
  const { me, setMe } = useMe();

  return (
    <Disclosure as="nav" className="bg-white shadow fixed left-0 right-0 z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex px-2 lg:px-0">
                <div className="flex-shrink-0 flex items-center">
                  {/* <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                    alt="Workflow"
                  /> */}

                  <a href="/" className="hover:cursor-pointer">
                    <div>
                      <h1 className="font-semibold text-indigo-600 text-2xl">
                        <FontAwesomeIcon icon={faArtstation} className="mr-2" />
                        Torden Torg
                      </h1>
                    </div>
                  </a>
                </div>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  {NAVIGATION.main.map(({ name, href }) => {
                    const currentlyActive = route === href;
                    return (
                      <Link key={name} href={href}>
                        <a
                          className={classNames(
                            currentlyActive
                              ? "border-indigo-500 text-gray-900"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                            "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                          )}
                        >
                          {name}
                        </a>
                      </Link>
                    );
                  })}
                </div>
              </div>
              {/* TODO: PUT SEARCH BACK */}
              {/* <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="max-w-lg w-full lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        router.push(`/${searchInput}`);
                      }}
                    >
                      <input
                        id="search"
                        value={searchInput}
                        onChange={({ target: { value } }) =>
                          setSearchInput(value)
                        }
                        name="search"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                    </form>
                  </div>
                </div>
              </div> */}
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                {/* USER LARGE SCREEN */}
                {/* TODO: ADD THIS BACK */}
                {/* <Menu as="div" className="ml-4 relative flex-shrink-0">
                  <div>
                    {me ? (
                      <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <span className="w-12 truncate">{me}</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTc5OTk2ODUyMTMxNzM0ODcy/gettyimages-1229892983-square.jpg"
                          alt=""
                        />
                      </Menu.Button>
                    ) : (
                      // TODO: MAKE THIS LIKE OPENSEA, current solution is temporary due to refresh bug
                      <Button
                        onClick={async () => {
                          // @ts-ignore
                          const publicAddresses = await ethereum.request({
                            method: "eth_requestAccounts",
                          });
                          const publicAddress = publicAddresses[0] as string;

                          await setMe(publicAddress);
                        }}
                      >
                        Connect to metamask
                      </Button>
                      // <Link href="login">
                      //   <a className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      //     <img
                      //       className="h-8 w-8 rounded-full"
                      //       src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTc5OTk2ODUyMTMxNzM0ODcy/gettyimages-1229892983-square.jpg"
                      //       alt=""
                      //     />
                      //   </a>
                      // </Link>
                    )}
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu> */}
              </div>
            </div>
          </div>

          {/* SMALL SCREEN USER PART */}
          <Disclosure.Panel className="lg:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}

              {NAVIGATION.main.map(({ name, href }) => {
                const currentlyActive = route === href;
                return (
                  <Link key={name} href={href}>
                    <a>
                      <Disclosure.Button
                        as="div"
                        className={classNames(
                          currentlyActive
                            ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                            : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                          "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                        )}
                      >
                        {name}
                      </Disclosure.Button>
                    </a>
                  </Link>
                );
              })}
            </div>
            {/* <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTc5OTk2ODUyMTMxNzM0ODcy/gettyimages-1229892983-square.jpg"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    Elon Musk
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    teslastock@toohigh.tbh
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Settings
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div> */}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
