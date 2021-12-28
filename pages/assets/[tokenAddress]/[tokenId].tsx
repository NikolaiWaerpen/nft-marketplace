import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Disclosure } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import Button from "components/Button";
import CustomError from "components/CustomError";
import Loader from "components/Loader";
import Modal from "components/Modal";
import OfferForm from "components/OfferForm";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery as reactQuery } from "react-query";
import { AssetType } from "types/AssetTypes";
import classNames from "utils/class-names";
import formatDate from "utils/format-date";

export default function TokenId() {
  const { query, isReady } = useRouter();
  if (!isReady) return <Loader />;

  const { tokenAddress, tokenId } = query;

  const { error, data, isLoading } = reactQuery<AssetType>(
    "asset",
    async () => {
      const response = await fetch(
        `https://api.opensea.io/api/v1/asset/${tokenAddress}/${tokenId}`
      );
      return response.json();
    }
  );

  const [modalOpen, setModalOpen] = useState(false);

  if (error) return <CustomError error={error as Error} />;
  if (isLoading ?? !data) return <Loader />;
  //@ts-ignore
  if (data.success && data.success === false)
    return <CustomError error={new Error("SUCCESS FALSE")} />;

  const {
    image_url,
    name,
    description,
    orders,
    sell_orders,
    collection,
    asset_contract,
  } = data;

  console.log(data);

  const details = [
    {
      name: "Listings",
      items: orders
        .filter(({ side }) => side === 1)
        .map(
          ({
            base_price,
            quantity,
            expiration_time,
            maker: {
              user: { username },
            },
          }) => {
            // console.log({
            //   base_price, // TODO: Convert to ethereum
            //   quantity, // TODO: ADD NOK conversion
            //   expiration_time, // TODO: format this
            //   username,
            // });

            return `${
              parseInt(base_price) / 1000000000000000000
            }, ${quantity}, ${expiration_time}, ${username}`;
          }
        ),
    },
    {
      name: "Offers",
      items: orders
        .filter(({ side }) => side === 0)
        .map(
          ({
            base_price,
            quantity,
            expiration_time,
            maker: {
              user: { username },
            },
          }) => {
            return `${
              parseInt(base_price) / 1000000000000000000
            }, ${quantity}, ${expiration_time}, ${username}`;
          }
        ),
    },
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto sm:pt-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image gallery */}
            {/* Image selector */}
            <div>
              <span className="sr-only">{image_url}</span>
              <span className="inset-0 rounded-md overflow-hidden">
                <img
                  src={image_url}
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </span>
              <div className="flex flex-col gap-8">
                {/* Description */}
                <div>
                  <span className="text-gray-900 text-sm font-medium">
                    Description
                  </span>
                  <p className="mt-6 prose prose-sm">{description}</p>
                </div>

                {/* About collection */}
                <div>
                  <Disclosure as="div">
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                            <span
                              className={classNames(
                                open ? "text-indigo-600" : "text-gray-900",
                                "text-sm font-medium"
                              )}
                            >
                              About {collection.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon
                                  className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmIcon
                                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel
                          as="div"
                          className="pb-6 prose prose-sm"
                        >
                          <p className="prose prose-sm">
                            {collection.description}
                          </p>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  {/* Details */}
                  <div>
                    <Disclosure as="div">
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                              <span
                                className={classNames(
                                  open ? "text-indigo-600" : "text-gray-900",
                                  "text-sm font-medium"
                                )}
                              >
                                Details
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="pb-6 prose prose-sm"
                          >
                            <div>
                              <div className="flex justify-between">
                                <span>Contract address</span>
                                <div className="w-12">
                                  <p className="truncate m-0 p-0">
                                    {tokenAddress}
                                  </p>
                                </div>
                              </div>
                              <div className="flex justify-between">
                                <span>Token ID</span>
                                <span>{tokenId}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Token Standard</span>
                                <span>{asset_contract.schema_name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Created</span>
                                <span>
                                  {formatDate({
                                    date: asset_contract.created_date,
                                    format: "DD.MM.YY HH:mm",
                                  })}
                                </span>
                              </div>
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {name}
              </h1>

              <div className="mt-3">
                <Button onClick={() => setModalOpen(true)}>
                  <FontAwesomeIcon icon={faTag} />
                  Make offer
                </Button>
              </div>

              <section aria-labelledby="details-heading" className="mt-12">
                <div className="border-t divide-y divide-gray-200">
                  {details.map(({ name, items }) => (
                    <Disclosure as="div" key={name}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                              <span
                                className={classNames(
                                  open ? "text-indigo-600" : "text-gray-900",
                                  "text-sm font-medium"
                                )}
                              >
                                {name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="pb-6 prose prose-sm"
                          >
                            <ul role="list">
                              {items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={modalOpen}
        setOpen={setModalOpen}
        content={
          <OfferForm
            tokenAddress={tokenAddress as string}
            tokenId={tokenId as string}
          />
        }
      />
    </div>
  );
}

// export async function getStaticPaths() {
//   const tokenAddress = "0x5351105753bdbc3baa908a0c04f1468535749c3d",
//     tokenId = "10136";

//   const { orders, count } = await seaport.api.getOrders({
//     asset_contract_address: tokenAddress as string,
//     token_id: tokenId as string,
//     side: OrderSide.Buy,
//   });
//   console.log("BUY", orders, count);

//   return {
//     props: {},
//   };
// }
