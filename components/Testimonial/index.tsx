export default function Testimonial() {
  return (
    <section className="py-12 bg-white overflow-hidden md:py-20 lg:py-24 mt-36">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* <img
            className="mx-auto h-8"
            src="https://tailwindui.com/img/logos/workcation-logo-indigo-600-mark-gray-800-and-indigo-600-text.svg"
            alt="Workcation"
          /> */}
          <blockquote className="mt-10">
            <div className="max-w-3xl mx-auto text-center text-2xl leading-9 font-medium text-gray-900">
              <p>
                &ldquo;Torden Torg er Norges feteste og eneste trading
                plattformen for å kjøpe og selge NFTs. De har vært en stor hjelp
                med å dele min digitale kunst med resten av landet!&rdquo;
              </p>
            </div>
            <footer className="mt-8">
              <div className="md:flex md:items-center md:justify-center">
                <div className="md:flex-shrink-0">
                  <img
                    className="mx-auto h-10 w-10 rounded-full"
                    src="https://www.kunstverket.no/Files/Billeder/Kunstnerportretter/2020melgaard.jpg"
                    alt=""
                  />
                </div>
                <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                  <div className="text-base font-medium text-gray-900">
                    Bjarne Melgaard
                  </div>

                  <svg
                    className="hidden md:block mx-1 h-5 w-5 text-indigo-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M11 0h3L9 20H6l5-20z" />
                  </svg>

                  <div className="text-base font-medium text-gray-500">
                    Kunstner
                  </div>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
