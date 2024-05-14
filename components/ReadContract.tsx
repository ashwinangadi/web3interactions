import { type BaseError, useReadContract } from "wagmi";
import { abi } from "./abi";

const wagmiContractConfig = {
  address: "0xc4FC0d2061Ac55655F331383247adCE435F37aC4",
  abi: abi,
} as const;

export default function ReadContract() {
  const {
    data: balance,
    error,
    isPending,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getPrivateString",
  });

  if (isPending) return <div>Loading...</div>;

  if (error)
    return (
      <div>Error: {(error).shortMessage || error.message}</div>
    );

  return <div>Balance: {balance?.toString()}</div>;
}
