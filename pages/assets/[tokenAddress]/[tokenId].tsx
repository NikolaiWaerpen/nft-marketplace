import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faAlignLeft,
  faInfo,
  faList,
  faMoneyBillWave,
  faQuoteLeft,
  faSearchDollar,
  faTag,
  faTags,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Disclosure } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import Button from "components/Button";
import CustomError from "components/CustomError";
import Loader from "components/Loader";
import Modal from "components/Modal";
import MoreFromCollection from "components/MoreFromCollection";
import OfferForm from "components/OfferForm";
import { OPENSEA_API_URL } from "consts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery as reactQuery } from "react-query";
import { AssetType } from "types/AssetTypes";
import classNames from "classnames";
import formatDate from "utils/format-date";
import { NETWORK } from "consts";
import { useMoralis } from "react-moralis";
import useMe from "hooks/useMe";
import { OpenSeaAsset, WyvernSchemaName } from "opensea-js/lib/types";
import seaport from "lib/seaport-client";

const network = NETWORK;

export default function TokenId() {
  const { query, isReady } = useRouter();
  const { me } = useMe();
  // const {
  //   Moralis,
  //   user,
  //   logout,
  //   authenticate,
  //   enableWeb3,
  //   isInitialized,
  //   isAuthenticated,
  //   isWeb3Enabled,
  // } = useMoralis();
  const [osAsset, setOSAsset] = useState<null | OpenSeaAsset>(null);

  if (!isReady) return <Loader />;

  const { tokenAddress, tokenId } = query;

  if (typeof tokenAddress !== "string" || typeof tokenId !== "string")
    return null;

  const { error, data, isLoading } = reactQuery<AssetType>(
    "asset",
    async () => {
      const response = await fetch(
        `${OPENSEA_API_URL}/asset/${tokenAddress}/${tokenId}`
      );
      return response.json();
    }
  );

  const [modalOpen, setModalOpen] = useState(false);

  if (error) return <CustomError error={error as Error} />;
  if (isLoading ?? !data) return <Loader />;

  // @ts-ignore
  if (data.success === false)
    return <CustomError error={new Error("Asset not found")} />;
  const {
    image_url,
    name,
    description,
    orders,
    collection,
    asset_contract,
    permalink,
  } = data;

  const details = [
    {
      name: "Listings",
      icon: faTags,
      items: [],
      // items: orders
      //   ? []
      //   : orders
      //       .filter(({ side }) => side === 1)
      //       .map(({ base_price, quantity, expiration_time, maker }) => {
      //         // console.log({
      //         //   base_price, // TODO: Convert to ethereum
      //         //   quantity, // TODO: ADD NOK conversion
      //         //   expiration_time, // TODO: format this
      //         //   username,
      //         // });

      //         return `${
      //           parseInt(base_price) / 1000000000000000000
      //         }, ${quantity}, ${expiration_time}, ${
      //           maker.user ? maker.user.username : "user missing"
      //         }`;
      //       }),
    },
    {
      name: "Offers",
      icon: faList,
      items: [],
      // TODO: ADD THIS BACK IN
      // items: orders
      //   ? []
      //   : orders
      //       .filter(({ side }) => side === 0)
      //       .map(
      //         ({
      //           base_price,
      //           quantity,
      //           expiration_time,
      //           maker: {
      //             user: { username },
      //           },
      //         }) => {
      //           return `${
      //             parseInt(base_price) / 1000000000000000000
      //           }, ${quantity}, ${expiration_time}, ${username}`;
      //         }
      //       ),
    },
  ];

  // async function moralisGetAsset() {
  //   const response = await Moralis.Plugins.opensea.getAsset({
  //     network,
  //     tokenAddress,
  //     tokenId,
  //   });
  //   console.log(response);
  // }

  // async function moralisCreateBuyOrder() {
  //   await Moralis.Plugins.opensea.createBuyOrder({
  //     network,
  //     tokenAddress,
  //     tokenId,
  //     tokenType: "ERC721",
  //     amount: 0.0,
  //     userAddress: me,
  //     paymentTokenAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
  //   });

  //   console.log("Create Buy Order Successful");
  // }

  const getAsset = async () => {
    const asset: OpenSeaAsset = await seaport.api.getAsset({
      tokenAddress, // string
      tokenId, // string | number | null
    });

    console.log("fetched asset:", asset.name);

    return asset;
  };
  // TODO: NEED TO SIGN TRANSACTION

  const createBuyOrder = async () => {
    if (!osAsset) return;

    const { tokenAddress: assetTA, tokenId: assetTI, schemaName } = osAsset;

    console.log(assetTA, assetTI, me, schemaName, name);

    const offer = await seaport.createBuyOrder({
      asset: {
        tokenAddress: "0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656",
        tokenId:
          "10623754799685044308911577221633789898895097313261267875088889949838145",
        schemaName: WyvernSchemaName.ERC1155,
      },
      accountAddress: me, // my public token address
      startAmount: 0.01,
    });

    console.log("Create Buy Order Successful", offer);
  };

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
                <div className="border-t divide-y divide-gray-200 mt-12">
                  <div className="mt-6">
                    <span className="text-indigo-600 text-sm font-medium">
                      <FontAwesomeIcon icon={faAlignLeft} className="mr-2" />
                      Description
                    </span>
                    <p className="mt-6 prose prose-sm">{description}</p>
                  </div>
                </div>

                {/* About collection */}
                <div>
                  <div className="border-t divide-y divide-gray-200">
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
                                <FontAwesomeIcon
                                  icon={faQuoteLeft}
                                  className="mr-2"
                                />
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
                  </div>

                  {/* Details */}
                  <div className="border-t divide-y divide-gray-200">
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
                                <FontAwesomeIcon
                                  icon={faInfo}
                                  className="mr-2"
                                />
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
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <div className="flex justify-between">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  {name}
                </h1>

                <a href={permalink} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faSearchDollar} />
                </a>
              </div>

              {/* <div className="mt-12 flex gap-4">
                <Button
                  onClick={async () => {
                    const asset = await getAsset();
                    setOSAsset(asset);
                  }}
                  icon={faWallet}
                >
                  Get asset
                </Button>
                <Button onClick={() => createBuyOrder()} icon={faWallet}>
                  Buy now
                </Button>
                <Button onClick={() => setModalOpen(true)} icon={faTag}>
                  Make offer
                </Button>
                <Button onClick={() => {}} icon={faMoneyBillWave}>
                  Create sell order
                </Button>
              </div> */}

              <section aria-labelledby="details-heading" className="mt-12">
                <div className="border-t divide-y divide-gray-200">
                  {details.map(({ name, icon, items }) => (
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
                                <FontAwesomeIcon icon={icon} className="mr-2" />
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
                            {items.length ? (
                              <ul role="list">
                                {items.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            ) : (
                              <div>
                                <FontAwesomeIcon
                                  icon={faTimesCircle}
                                  className="mr-1"
                                />
                                No {name.toLowerCase()}
                              </div>
                            )}
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

      <MoreFromCollection collectionSlug={collection.slug} />

      <Modal
        open={modalOpen}
        setOpen={setModalOpen}
        content={
          <OfferForm
            setModalOpen={setModalOpen}
            tokenAddress={tokenAddress as string}
            tokenId={tokenId as string}
          />
        }
      />
    </div>
  );
}
