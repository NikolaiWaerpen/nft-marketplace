import Link from "next/link";

export default function Hero() {
  return (
    <main className="lg:mt-20 lg:relative">
      <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
        <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block xl:inline">Utforsk det nyeste innenfor</span>{" "}
            <span className="block text-theme-600 xl:inline">
              Norsk digital kunst
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow-lg">
              <Link href="/explore-collections">
                <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-theme-600 hover:bg-theme-700 md:py-4 md:text-lg md:px-10">
                  Utforsk
                </a>
              </Link>
            </div>
            {/* <div className="mt-3 rounded-md shadow-lg sm:mt-0 sm:ml-3">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-theme-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Create
              </a>
  </div> */}
          </div>
        </div>
      </div>
      <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
        <img
          className="absolute inset-0 w-full h-full object-cover lg:rounded-lg"
          src="https://lh3.googleusercontent.com/0Y7YFEJPTKWw5UNDvq7Vd2MyBokj5KrebAdlFG6A8MHnBKwj0LIGYWqy8lZ5N35sXd_Rv-W7NyjggcvkqyVR_PfaI-XKhg2_qIN6fA"
          alt=""
        />
      </div>
    </main>
  );
}
