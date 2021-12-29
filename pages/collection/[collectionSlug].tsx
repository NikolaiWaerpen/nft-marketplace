import CustomError from "components/CustomError";
import Loader from "components/Loader";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { CollectionType } from "types/CollectionTypes";

type DataType = {
  assets: CollectionType[];
};

export default function CollectionSlug() {
  const { query, isReady } = useRouter();

  if (!isReady) return <Loader />;

  const { collectionSlug } = query;
  const { error, data, isLoading } = useQuery<DataType>(
    "collection",
    async () => {
      const response = await fetch(
        `https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=50&collection=${collectionSlug}`
      );
      return response.json();
    }
  );

  if (error) return <CustomError error={error as Error} />;
  if (isLoading ?? !data) return <Loader />;

  const { assets } = data;

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {assets.map(
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
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {},
  };
}
