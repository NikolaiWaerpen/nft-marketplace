import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import PriceInput from "components/PriceInput";
import { ACCOUNT_ADDRESS, MAX_QUANTITY, TESTNET } from "consts";
import { Form, Formik } from "formik";
import useSeaport from "hooks/useSeaport";
import { Network, OpenSeaPort } from "opensea-js";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import getEthereumPrice from "utils/get-ethereum-price";
// import createBuyOrder from "utils/opensea/create-buy-order";
import * as yup from "yup";

import { OpenSeaAsset, WyvernSchemaName } from "opensea-js/lib/types";

async function getAsset(tokenAddress: string, tokenId: string, seaport: any) {
  const asset: OpenSeaAsset = await seaport.api.getAsset({
    tokenAddress,
    tokenId,
  });

  console.log(asset);
  return asset;
}

async function createBuyOrder(
  seaport: OpenSeaPort,
  tokenAddress: string,
  tokenId: string,
  pricePerItem: string,
  offerExpiration?: number
) {
  const {
    tokenId: responseTokenId,
    tokenAddress: responseTokenAddress,
    name,
    schemaName,
  } = await getAsset(tokenAddress, tokenId, seaport);

  await seaport.createBuyOrder({
    asset: {
      tokenId: responseTokenId,
      tokenAddress: responseTokenAddress,
      name,
      // Only needed for the short-name auction, not ENS names
      // that have been sold once already:
      schemaName: WyvernSchemaName.ERC1155,
    },
    // Your wallet address (the bidder's address):
    accountAddress: ACCOUNT_ADDRESS,
    // Expiration
    expirationTime: offerExpiration,
    // Value of the offer, in wrapped ETH:
    startAmount: parseInt(pricePerItem),
  });

  console.log("offer created successfully");
}

const validationSchema = yup.object({
  pricePerItem: yup
    .string()
    .required("Price required")
    .test("len", `Must be less than ${MAX_QUANTITY} characters`, (value) => {
      if (!value) return true;
      return value.length <= MAX_QUANTITY;
    }),
  // offerExpiration: yup.string(),
});

const initialValues = {
  pricePerItem: "",
  offerExpiration: Math.round(Date.now() / 1000 + 60 * 60 * 24 * 7),
};

type OfferFormType = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  tokenAddress: string;
  tokenId: string;
};

export default function OfferForm({
  setModalOpen,
  tokenAddress,
  tokenId,
}: OfferFormType) {
  // @ts-ignore
  // const seaport = useSeaport();
  //@ts-ignore
  const seaport = new OpenSeaPort(ethereum, {
    networkName: TESTNET ? Network.Rinkeby : Network.Main,
    apiKey: process.env.OPENSEA_API_KEY,
  });

  const [ethPrice, setEthPrice] = useState(0);

  useEffect(() => {
    async function ethereumPrice() {
      const price = await getEthereumPrice();
      setEthPrice(price);
    }

    ethereumPrice();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async ({ pricePerItem, offerExpiration }, { resetForm }) => {
        await createBuyOrder(
          seaport,
          tokenAddress,
          tokenId,
          pricePerItem,
          offerExpiration
        );

        resetForm();
        await setModalOpen(false);
      }}
      initialStatus={{ priceInNok: "0.00" }}
      validationSchema={validationSchema}
    >
      {({
        values: { pricePerItem, offerExpiration },
        setFieldValue,
        status,
        setStatus,
        errors,
        isSubmitting,
      }) => {
        const buttonDisabled = errors || isSubmitting ? true : false;

        return (
          <Form>
            <div className="flex flex-col gap-4">
              <PriceInput
                label="Price"
                // required
                price={status.priceInNok} // TODO: FIX THIS
                error={errors.pricePerItem}
                placeholder="Amount"
                type="text"
                value={pricePerItem}
                onChange={(event) => {
                  setFieldValue("pricePerItem", event?.target.value);
                  // setPriceInNok(
                  //   (parseFloat(pricePerItem) * ethPrice).toString()
                  // );
                }}
              />
              {/* <div>
              <Label>Offer expiration</Label>
              <div className="flex">
                <Dropdown />
                <Input
                  error={errors.offerExpiration}
                  placeholder=""
                  type="text"
                  value={offerExpiration}
                  onChange={(event) =>
                    setFieldValue("offerExpiration", event?.target.value)
                  }
                />
              </div>
            </div> */}

              <Button
                type="submit"
                loading={isSubmitting}
                // disabled={buttonDisabled} TODO: Add this functionality
              >
                <div className="flex gap-2 place-items-center">
                  <FontAwesomeIcon icon={faCheck} />
                  Make offer
                </div>
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
