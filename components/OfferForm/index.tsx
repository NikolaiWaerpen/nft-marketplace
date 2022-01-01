import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import Dropdown from "components/Dropdown";
import Input from "components/Input";
import Label from "components/Label";
import TextArea from "components/TextArea";
import { ACCOUNT_ADDRESS, MAX_QUANTITY } from "consts";
import { Form, Formik } from "formik";
import seaport from "lib/seaport-client";
import { OpenSeaPort, Network } from "opensea-js";
import { OpenSeaAsset, WyvernSchemaName } from "opensea-js/lib/types";
import * as yup from "yup";

// const { ethereum } = window;
// const seaport = new OpenSeaPort(ethereum, {
//   networkName: Network.Rinkeby,
//   // apiBaseUrl: API_BASE_RINKEBY,
// });

const validationSchema = yup.object({
  quantity: yup
    .string()
    .required("Quantity required")
    .test("len", `Must be less than ${MAX_QUANTITY} characters`, (value) => {
      if (!value) return true;
      return value.length <= MAX_QUANTITY;
    }),
  pricePerItem: yup.string(),
  offerExpiration: yup.string(),
});

async function getAsset(tokenAddress: string, tokenId: string, seaport: any) {
  const asset: OpenSeaAsset = await seaport.api.getAsset({
    tokenAddress,
    tokenId,
  });

  console.log(asset);
  return asset;
}

async function createBuyOrder(
  tokenAddress: string,
  tokenId: string,
  pricePerItem: string,
  seaport: any,
  quantity?: string,
  offerExpiration?: string
) {
  const {
    tokenId: responseTokenId,
    tokenAddress: responseTokenAddress,
    name,
    schemaName,
  } = await getAsset(tokenAddress, tokenId, seaport);

  console.log(pricePerItem);
  const offer = await seaport.createBuyOrder({
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
    // Value of the offer, in wrapped ETH:
    startAmount: parseInt(pricePerItem),
  });

  console.log(offer);
  console.log("offer created successfully");
}

const initialValues = {
  pricePerItem: "",
  offerExpiration: "",
};

type OfferFormType = { tokenAddress: string; tokenId: string };

export default function OfferForm({ tokenAddress, tokenId }: OfferFormType) {
  // @ts-ignore
  const seaport = new OpenSeaPort(ethereum, {
    networkName: Network.Main,
    apiKey: "e7c75f6bcbca43d8b72d2ae91ace633b",
    // apiBaseUrl: API_BASE_RINKEBY,
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async ({ pricePerItem, offerExpiration }, { resetForm }) => {
        createBuyOrder(tokenAddress, tokenId, pricePerItem, seaport);
      }}
      validationSchema={validationSchema}
    >
      {({
        values: { pricePerItem, offerExpiration },
        setFieldValue,
        errors,
        isSubmitting,
      }) => (
        <Form>
          <div className="flex flex-col gap-4">
            <Input
              label="Price"
              // required
              price
              error={errors.pricePerItem}
              placeholder="Amount"
              type="text"
              value={pricePerItem}
              onChange={(event) =>
                setFieldValue("pricePerItem", event?.target.value)
              }
            />
            <div>
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
            </div>

            <Button type="submit" loading={isSubmitting}>
              <div className="flex gap-2 place-items-center">
                <FontAwesomeIcon icon={faCheck} />
                Make offer
              </div>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
