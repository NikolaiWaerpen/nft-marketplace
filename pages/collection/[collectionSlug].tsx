import { Menu, Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import Button from "components/Button";
import CustomError from "components/CustomError";
import Loader from "components/Loader";
import Pagination from "components/Pagination";
import { OPENSEA_API_URL } from "consts";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { CollectionStatsType } from "types/CollectionStatsTypes";
import { CollectionType, SpecificCollectionType } from "types/CollectionTypes";
import authorizedFetch from "utils/authorized-fetch";
import removeQueryParams from "utils/remove-query-params";

const sortOptions = [
  // { name: "Most Popular", href: "#" },
  // { name: "Best Rating", href: "#" },
  { name: "Nyeste", sortString: "&order_direction=desc" },
  { name: "Eldste", sortString: "&order_direction=asc" },
  // { name: "Price: Low to High", sorting: "#" },
  // { name: "Price: High to Low", sorting: "#" },
];
// const filters = [
//   {
//     id: "category",
//     name: "Category",
//     options: [
//       { value: "tees", label: "Tees" },
//       { value: "crewnecks", label: "Crewnecks" },
//       { value: "hats", label: "Hats" },
//       { value: "bundles", label: "Bundles" },
//       { value: "carry", label: "Carry" },
//       { value: "objects", label: "Objects" },
//     ],
//   },
//   {
//     id: "brand",
//     name: "Brand",
//     options: [
//       { value: "clothing-company", label: "Clothing Company" },
//       { value: "fashion-inc", label: "Fashion Inc." },
//       { value: "shoes-n-more", label: "Shoes 'n More" },
//       { value: "supplies-n-stuff", label: "Supplies 'n Stuff" },
//     ],
//   },
//   {
//     id: "color",
//     name: "Color",
//     options: [
//       { value: "white", label: "White" },
//       { value: "black", label: "Black" },
//       { value: "grey", label: "Grey" },
//       { value: "blue", label: "Blue" },
//       { value: "olive", label: "Olive" },
//       { value: "tan", label: "Tan" },
//     ],
//   },
//   {
//     id: "sizes",
//     name: "Sizes",
//     options: [
//       { value: "xs", label: "XS" },
//       { value: "s", label: "S" },
//       { value: "m", label: "M" },
//       { value: "l", label: "L" },
//       { value: "xl", label: "XL" },
//       { value: "2xl", label: "2XL" },
//     ],
//   },
// ];

const ASSET_AMOUNT = 12;

type AssetsDataType = {
  assets: CollectionType[];
};

async function fetchAssets(
  collectionSlug: string,
  sorting: string,
  page: number
) {
  const offset = page ? `&offset=${(page - 1) * ASSET_AMOUNT}` : "";

  const response = await authorizedFetch(
    `${OPENSEA_API_URL}/assets?collection=${collectionSlug}&limit=${ASSET_AMOUNT}${sorting}${offset}`
  );

  const jsonResponse = await response.json();

  return jsonResponse as AssetsDataType;
}

type CollectionDataType = {
  collection: SpecificCollectionType;
};

async function fetchCollection(collectionSlug: string) {
  const response = await authorizedFetch(
    `${OPENSEA_API_URL}/collection/${collectionSlug}`
  );

  const jsonResponse = await response.json();

  return jsonResponse as CollectionDataType;
}

type CollectionStatsDataType = {
  stats: CollectionStatsType;
};

async function fetchCollectionStats(collectionSlug: string) {
  const response = await authorizedFetch(
    `${OPENSEA_API_URL}/collection/${collectionSlug}/stats`
  );

  const jsonResponse = await response.json();

  return jsonResponse as CollectionStatsDataType;
}

export default function CollectionSlug() {
  const {
    query: { collectionSlug },
    isReady,
  } = useRouter();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sorting, setSorting] = useState("");
  const [page, setPage] = useState(1);

  if (!isReady) return <Loader />;

  const {
    error: assetsError,
    data: assetsData,
    isLoading: assetsIsLoading,
  } = useQuery<AssetsDataType>(
    ["assets", collectionSlug, sorting, page],
    () => fetchAssets(collectionSlug as string, sorting, page),
    { keepPreviousData: true }
  );

  const {
    error: collectionError,
    data: collectionData,
    isLoading: collectionIsLoading,
  } = useQuery<CollectionDataType>(["collection", collectionSlug], () =>
    fetchCollection(removeQueryParams(collectionSlug as string))
  );

  const {
    error: collectionStatsError,
    data: collectionStatsData,
    isLoading: collectionStatsIsLoading,
  } = useQuery<CollectionStatsDataType>(
    ["collectionStats", collectionSlug],
    () => fetchCollectionStats(removeQueryParams(collectionSlug as string))
  );

  if (assetsError || collectionError || collectionStatsError)
    return <CustomError error={assetsError as Error} />;

  const loading =
    collectionIsLoading ||
    !collectionData ||
    collectionStatsIsLoading ||
    !collectionStatsData;

  if (loading) return <Loader />;

  const { collection } = collectionData;
  const { stats } = collectionStatsData;

  return (
    <div className="bg-white">
      <div>
        <div>
          <img
            className="h-32 w-full object-cover lg:h-48"
            src={collection.banner_image_url}
            alt=""
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 flex justify-center">
            <img
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              src={collection.image_url}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="pb-24 pt-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            {collection.name}
          </h1>
          <div className="mt-10 pb-12 bg-white sm:pb-16">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-4">
                  <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Antall
                    </dt>
                    <dd className="order-1 text-5xl font-semibold text-theme-600">
                      {stats.count ? stats.count : "---"}
                    </dd>
                  </div>
                  <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Eiere
                    </dt>
                    <dd className="order-1 text-5xl font-semibold text-theme-600">
                      {stats.num_owners ? stats.num_owners : "---"}
                    </dd>
                  </div>
                  <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Gjennomsnittspris
                    </dt>
                    <dd className="order-1 text-5xl font-semibold text-theme-600">
                      {stats.floor_price ? stats.floor_price : "---"}
                    </dd>
                  </div>
                  <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Omsatt volum
                    </dt>
                    <dd className="order-1 text-5xl font-semibold text-theme-600">
                      {stats.total_volume
                        ? Math.floor(stats.total_volume)
                        : "---"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-3xl mx-auto text-base text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap sm:overflow-visible sm:whitespace-normal">
            {collection.description}
          </p>
        </div>

        {/* Filters */}
        <section
          aria-labelledby="filter-heading"
          className="border-t border-gray-200 pt-6"
        >
          <h2 id="filter-heading" className="sr-only">
            Product filters
          </h2>

          <div className="flex items-center justify-between">
            <Menu as="div" className="relative z-10 inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sorter
                  <ChevronDownIcon
                    className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
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
                <Menu.Items className="origin-top-left absolute left-0 z-10 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map(({ sortString, name }, key) => (
                      <Menu.Item key={key}>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm font-medium text-gray-900 w-full text-left"
                            )}
                            onClick={() => {
                              setPage(0);
                              setSorting(sortString);
                            }}
                          >
                            {name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* <button
              type="button"
              className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              Filters
            </button>

            <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8">
              {filters.map((section, sectionIdx) => (
                <Popover
                  as="div"
                  key={section.name}
                  id="menu"
                  className="relative z-10 inline-block text-left"
                >
                  <div>
                    <Popover.Button className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      <span>{section.name}</span>
                      {sectionIdx === 0 ? (
                        <span className="ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums">
                          1
                        </span>
                      ) : null}
                      <ChevronDownIcon
                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Popover.Button>
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
                    <Popover.Panel className="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <form className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              type="checkbox"
                              className="h-4 w-4 border-gray-300 rounded text-theme-600 focus:ring-theme-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </form>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              ))}
            </Popover.Group> */}
          </div>
        </section>

        <section aria-labelledby="products-heading" className="mt-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {(!assetsData || assetsIsLoading) && <Loader />}
            {assetsData &&
              assetsData.assets &&
              assetsData.assets.map(
                (
                  {
                    name,
                    image_url,
                    animation_url,
                    token_id,
                    asset_contract,
                    collection,
                  },
                  key
                ) => (
                  <Link
                    key={key}
                    href={`/assets/${asset_contract.address}/${token_id}`}
                  >
                    <a className="group">
                      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                        <img
                          src={image_url}
                          // alt={product.imageAlt}
                          className="w-full h-full object-center object-cover group-hover:opacity-75"
                        />
                        {/* <video autoPlay={true} loop muted>
                      <source src={animation_url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video> */}
                      </div>
                      <div>
                        <div>
                          <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {collection.name}
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                )
              )}
          </div>
        </section>

        <div className="mt-8">
          {stats.count > ASSET_AMOUNT && (
            <Pagination
              totalLength={stats.count}
              pageSize={ASSET_AMOUNT}
              page={page}
              setPage={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
