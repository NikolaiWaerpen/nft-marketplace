import CustomError from "components/CustomError";
import Loader from "components/Loader";
import Link from "next/link";
import { useQuery } from "react-query";
import { CollectionType } from "types/CollectionTypes";
import authorizedFetch from "utils/authorized-fetch";

type DataType = {
  assets: CollectionType[];
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const collectionSlug = "thelightbulbman";

export default function Promotion1() {
  const { error, data, isLoading } = useQuery<DataType>(
    "promotion",
    async () => {
      const response = await authorizedFetch(
        `https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=3&collection=${collectionSlug}`
      );
      return response.json();
    }
  );

  if (error) return <CustomError error={error as Error} />;
  if (isLoading ?? !data) return <div>Loading...</div>;

  const { assets } = data;

  const features = assets.map(
    ({
      name,
      description,
      image_url,
      image_preview_url,
      asset_contract: {
        description: collection_description,
        name: collection_name,
        address,
      },
      token_id,
    }) => {
      return {
        name,
        description,
        image_url,
        image_preview_url,
        collection_description,
        collection_name,
        address,
        token_id,
      };
    }
  );

  return (
    <section className="py-12 bg-white overflow-hidden md:py-20 lg:py-24 mt-36">
      <div className="max-w-2xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {features[0].collection_name}
          </h2>
          <p className="mt-4 text-gray-500">
            {features[0].collection_description}
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {features.map(
            (
              {
                name,
                description,
                image_url,
                image_preview_url,
                address,
                token_id,
              },
              featureIdx
            ) => (
              <div
                key={name}
                className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-center"
              >
                <div
                  className={classNames(
                    featureIdx % 2 === 0
                      ? "lg:col-start-1"
                      : "lg:col-start-8 xl:col-start-9",
                    "mt-6 lg:mt-0 lg:row-start-1 lg:col-span-5 xl:col-span-4"
                  )}
                >
                  <h3 className="text-lg font-medium text-gray-900">{name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{description}</p>
                </div>
                <div
                  className={classNames(
                    featureIdx % 2 === 0
                      ? "lg:col-start-6 xl:col-start-5"
                      : "lg:col-start-1",
                    "flex-auto lg:row-start-1 lg:col-span-7 xl:col-span-8"
                  )}
                >
                  <Link href={`assets/${address}/${token_id}`}>
                    <a>
                      <div className="aspect-w-3 aspect-h-2 rounded-lg bg-gray-100 overflow-hidden">
                        <img
                          src={image_url}
                          alt={image_preview_url}
                          className="object-cover"
                        />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
