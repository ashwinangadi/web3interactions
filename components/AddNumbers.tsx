import { type BaseError, useReadContract } from "wagmi";
import { abi } from "./abi";

const wagmiContractConfig = {
  address: "0x518c9818a97E7E39E0c6C8457FaD27A8FfDAd33d",
  abi: abi,
} as const;

export default function AddNumbers({ a, b }: { a: number; b: number }) {
  const { data, error, isPending } = useReadContract({
    ...wagmiContractConfig,
    functionName: "addNumbers",
    args: [BigInt(a), BigInt(b)],
  });

  if (isPending) return <div>Loading...</div>;

  if (error)
    return (
      <div>Error: {(error).shortMessage || error.message}</div>
    );

  return <div>Sum: {data?.toString()}</div>;
}
