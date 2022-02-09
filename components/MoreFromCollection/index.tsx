import CustomError from "components/CustomError";
import Loader from "components/Loader";
import Link from "next/link";
import { useQuery } from "react-query";
import { AssetType } from "types/AssetTypes";
import authorizedFetch from "utils/authorized-fetch";

type MoreFromCollectionProps = {
  collectionSlug: string;
};

type DataType = {
  assets: AssetType[];
};

export default function MoreFromCollection({
  collectionSlug,
}: MoreFromCollectionProps) {
  const { error, data, isLoading } = useQuery<DataType>(
    "moreFromCollection",
    async () => {
      const response = await authorizedFetch(
        `https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=4&collection=${collectionSlug}`
      );
      return response.json();
    }
  );

  if (error) return <CustomError error={error as Error} />;
  if (isLoading ?? !data) return <Loader />;

  //@ts-ignore
  if (data.success === false)
    return <CustomError error={new Error("SUCCESS FALSE")} />;

  return (
    <div className="bg-white mt-16">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          More from this collection
        </h2>

        {/* <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div> */}

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.assets.map(
            ({
              token_id,
              name,
              image_url,
              image_preview_url,
              asset_contract: { address },
              collection,
            }) => {
              return (
                <div key={token_id} className="group relative">
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                      src={image_url}
                      alt={image_preview_url}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        {/* <Link // TODO: FIX THIS
                          // href={{
                          //   pathname: "/assets/[tokenAddress]/[tokenId]",
                          //   query: { tokenAddress: address, tokenId: token_id },
                          // }}
                        > */}
                        <a href={`/assets/${address}/${token_id}`}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {name}
                        </a>
                        {/* </Link> */}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {collection.name}
                      </p>
                    </div>
                    {/* <p className="text-sm font-medium text-gray-900">(price)</p> */}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
