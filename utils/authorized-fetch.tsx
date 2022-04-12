export default function authorizedFetch(url: string) {
  const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY;

  if (!OPENSEA_API_KEY) throw new Error("missing opensea API key");

  return fetch(url, {
    headers: {
      "X-API-KEY": OPENSEA_API_KEY,
    },
  });
}
