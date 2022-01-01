type ResponseType = {
  NOK: number;
};

export default async function getEthereumPrice() {
  const response = await fetch(
    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=NOK",
    {
      method: "GET",
    }
  );

  const resolvedResponse: ResponseType = await response.json();

  return resolvedResponse.NOK;
}
