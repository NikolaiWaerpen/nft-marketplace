import Hero from "components/Hero";
import Promotion from "components/Promotion";
import Team from "components/Team";
import Testimonial from "components/Testimonial";

export default function Home() {
  return (
    <>
      <Hero />
      <Testimonial />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <section
          aria-labelledby="featured-heading"
          className="relative mt-16 rounded-lg overflow-hidden lg:h-96"
        >
          <div className="absolute inset-0">
            <img
              src="https://tailwindui.com/img/ecommerce-images/category-page-01-featured-collection.jpg"
              alt=""
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div aria-hidden="true" className="relative w-full h-96 lg:hidden" />
          <div aria-hidden="true" className="relative w-full h-32 lg:hidden" />
          <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 p-6 rounded-bl-lg rounded-br-lg backdrop-filter backdrop-blur sm:flex sm:items-center sm:justify-between lg:inset-y-0 lg:inset-x-auto lg:w-96 lg:rounded-tl-lg lg:rounded-br-none lg:flex-col lg:items-start">
            <div>
              <h2
                id="featured-heading"
                className="text-xl font-bold text-white"
              >
                Workspace Collection
              </h2>
              <p className="mt-1 text-sm text-gray-300">
                Upgrade your desk with objects that keep you organized and
                clear-minded.
              </p>
            </div>
            <a
              href="#"
              className="mt-6 flex-shrink-0 flex bg-white bg-opacity-0 py-3 px-4 border border-white border-opacity-25 rounded-md items-center justify-center text-base font-medium text-white hover:bg-opacity-10 sm:mt-0 sm:ml-8 lg:ml-0 lg:w-full"
            >
              View the collection
            </a>
          </div>
        </section>
      </div>

      <Promotion />
    </>
  );
}
