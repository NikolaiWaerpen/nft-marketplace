import CustomError from "components/CustomError";
import Loader from "components/Loader";
import { OPENSEA_API_URL } from "consts";
import Link from "next/link";
import { useQuery } from "react-query";
import { AssetType } from "types/AssetTypes";
import authorizedFetch from "utils/authorized-fetch";

export default function Promotion2() {
  const { error, data, isLoading } = useQuery<AssetType>(
    "promotion2",
    async () => {
      const response = await authorizedFetch(
        `${OPENSEA_API_URL}/asset/0x495f947276749ce646f68ac8c248420045cb7b5e/89541808570939488520329153075107956152362103338204033312558879407166833295361`
      );
      return response.json();
    }
  );

  if (error) return <CustomError error={error as Error} />;
  if (isLoading ?? !data) return <Loader />;

  // @ts-ignore
  if (data.success === false)
    return <CustomError error={new Error("Asset not found")} />;

  const { image_url, name, description, asset_contract, token_id } = data;

  return (
    <section className="py-12 bg-white overflow-hidden md:py-20 lg:py-24 mt-36">
      <div className="max-w-7xl mx-auto bg-theme-600 lg:bg-transparent lg:px-8">
        <div className="lg:grid lg:grid-cols-12">
          <div className="relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-4 lg:py-16 lg:bg-transparent">
            <div
              className="absolute inset-x-0 h-1/2 bg-gray-50 lg:hidden"
              aria-hidden="true"
            />
            <div className="max-w-md mx-auto px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0">
              <div className="aspect-w-10 aspect-h-6 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1">
                <img
                  className="object-cover object-center rounded-3xl shadow-2xl"
                  src={image_url}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="relative bg-theme-600 lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:rounded-3xl lg:grid lg:grid-cols-10 lg:items-center">
            <div
              className="hidden absolute inset-0 overflow-hidden rounded-3xl lg:block"
              aria-hidden="true"
            >
              <svg
                className="absolute bottom-full left-full transform translate-y-1/3 -translate-x-2/3 xl:bottom-auto xl:top-0 xl:translate-y-0"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-theme-500"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                />
              </svg>
              <svg
                className="absolute top-full transform -translate-y-1/3 -translate-x-1/3 xl:-translate-y-1/2"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-theme-500"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                />
              </svg>
            </div>
            <div className="relative max-w-md mx-auto py-12 px-4 space-y-6 sm:max-w-3xl sm:py-16 sm:px-6 lg:max-w-none lg:p-0 lg:col-start-4 lg:col-span-6">
              <h2
                className="text-3xl font-extrabold text-white"
                id="join-heading"
              >
                {name}
              </h2>
              <p className="text-lg text-white">{description}</p>
              <Link href={`/assets/${asset_contract.address}/${token_id}`}>
                <a className="block w-full py-3 px-5 text-center bg-white border border-transparent rounded-md shadow-md text-base font-medium text-theme-700 hover:bg-gray-50 sm:inline-block sm:w-auto">
                  Se NFT
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
