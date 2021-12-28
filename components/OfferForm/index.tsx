import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import Input from "components/Input";
import TextArea from "components/TextArea";
import { ACCOUNT_ADDRESS, MAX_QUANTITY } from "consts";
import { Form, Formik } from "formik";
import seaport from "lib/seaport-client";
import { OpenSeaAsset } from "opensea-js/lib/types";
import * as yup from "yup";

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

async function getAsset(tokenAddress: string, tokenId: string) {
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
  quantity?: string,
  pricePerItem?: string,
  offerExpiration?: string
) {
  const {
    tokenId: responseTokenId,
    tokenAddress: responseTokenAddress,
    name,
  } = await getAsset(tokenAddress, tokenId);

  const offer = await seaport.createBuyOrder({
    asset: {
      tokenId: responseTokenId,
      tokenAddress: responseTokenAddress,
      name,
      // Only needed for the short-name auction, not ENS names
      // that have been sold once already:
      // schemaName: "ENSShortNameAuction"
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
  quantity: "1",
  pricePerItem: "",
  offerExpiration: "",
};

type OfferFormType = { tokenAddress: string; tokenId: string };

export default function OfferForm({ tokenAddress, tokenId }: OfferFormType) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (
        { quantity, pricePerItem, offerExpiration },
        { resetForm }
      ) => {
        createBuyOrder(
          tokenAddress,
          tokenId,
          quantity,
          pricePerItem,
          offerExpiration
        );
      }}
      validationSchema={validationSchema}
    >
      {({
        values: { quantity, pricePerItem, offerExpiration },
        setFieldValue,
        errors,
        isSubmitting,
      }) => (
        <Form>
          <div className="flex flex-col gap-4">
            <Input
              label="Quantity"
              // required
              error={errors.quantity}
              placeholder="1000" //TODO: MAX QUOTA
              type="text"
              value={quantity}
              onChange={(event) =>
                setFieldValue("quantity", event?.target.value)
              }
            />
            <Input
              label="Price per item (WETH)"
              // required
              error={errors.pricePerItem}
              placeholder="Amount"
              type="text"
              value={pricePerItem}
              onChange={(event) =>
                setFieldValue("pricePerItem", event?.target.value)
              }
            />
            {/* <Input
              label="Price expiration"
              // required
              error={errors.offerExpiration}
              placeholder=""
              type="text"
              value={offerExpiration}
              onChange={(event) =>
                setFieldValue("offerExpiration", event?.target.value)
              }
            /> */}
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
