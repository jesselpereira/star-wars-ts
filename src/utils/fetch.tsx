/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function (...args: any) {
  const res = await fetch(args);
  return await res.json();
}
