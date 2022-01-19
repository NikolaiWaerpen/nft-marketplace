export default function range(to: number) {
  // @ts-ignore
  const array = [...Array(to + 1).keys()];
  array.shift();
  return array;
}
