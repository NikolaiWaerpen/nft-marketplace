import CustomError from "components/CustomError";
import Loader from "components/Loader";
import { OPENSEA_API_URL } from "consts";
import Link from "next/link";
import { useQuery } from "react-query";
import { SpecificCollectionType } from "types/CollectionTypes";
import formatDate from "utils/format-date";

async function fetchCollections() {
  const collectionSlugs = [
    "rude-boys",
    "animalsim",
    "masarati-collection",
    "covid-19-friends",
  ];

  const promises = collectionSlugs.map((collectionSlug) => {
    return fetch(`${OPENSEA_API_URL}/collection/${collectionSlug}`);
  });

  const responses = await Promise.all([...promises]);

  let collections = [];
  for (const response of responses) {
    const { collection } = await response.json();
    collections.push(collection);
  }

  return collections as SpecificCollectionType[];
}

export default function ExploreCollections() {
  fetchCollections();
  const { error, data, isLoading } = useQuery<SpecificCollectionType[]>(
    "explore-collections",
    fetchCollections
  );

  if (error) return <CustomError error={error as Error} />;
  if (isLoading ?? !data) return <Loader />;

  return (
    <div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="py-24 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Kolleksjoner
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-base text-gray-500">
            Utforsk de nyeste største NFT kolleksjonene i Norge
          </p>
        </div>

        <section
          aria-labelledby="products-heading"
          className="border-t border-gray-200 pt-8"
        >
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            {data.map(
              (
                {
                  slug,
                  image_url,
                  large_image_url,
                  name,
                  description,
                  created_date,
                },
                key
              ) => (
                // <Link key={key} href={`/collection/${slug}`}>
                //   <a className="group">
                //     <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
                //       <img
                //         src={large_image_url}
                //         alt={image_url}
                //         className="w-full h-full object-center object-cover group-hover:opacity-75"
                //       />
                //     </div>
                //     <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                //       <h3>{name}</h3>
                //       <p>
                //         {formatDate({ date: created_date, format: "DD.MM.YY" })}
                //       </p>
                //     </div>
                //     <p className="mt-1 text-sm italic text-gray-500 truncate">
                //       {description}
                //     </p>
                //   </a>
                // </Link>
                // TODO: CURRENT "FIX" AGAINST COLLECTION VIEW BUG, but this needs to be nicer
                <a className="group" key={key} href={`/collection/${slug}`}>
                  <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
                    <img
                      src={large_image_url}
                      alt={image_url}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                    <h3>{name}</h3>
                    <p>
                      {formatDate({ date: created_date, format: "DD.MM.YY" })}
                    </p>
                  </div>
                  <p className="mt-1 text-sm italic text-gray-500 truncate">
                    {description}
                  </p>
                </a>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
