export default function removeQueryParams(url: string) {
  const extraParamIndex = url.indexOf("&");

  if (extraParamIndex === -1) return url;
  return url.substring(0, url.indexOf("&"));
}
