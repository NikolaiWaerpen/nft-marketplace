export default function authorizedFetch(url: string) {
  return fetch(url, {
    headers: {
      "X-API-KEY": "e7c75f6bcbca43d8b72d2ae91ace633b",
    },
  });
}
