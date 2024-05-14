import * as React from "react";
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { abi } from "./abi";

export function WriteContract() {
  const { data: hash, writeContract, error, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const PrivateString = formData.get("PrivateString") as string;
    writeContract({
      address: "0xc4FC0d2061Ac55655F331383247adCE435F37aC4",
      abi,
      functionName: "publicUpdatePrivateString",
      args: [PrivateString],
    });
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 w-1/5">
      <input
        className="px-2 h-8 bg-gray-500 rounded-md"
        name="PrivateString"
        placeholder="Private String"
        required
      />
      <button
        disabled={isPending}
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isPending ? "Confirming..." : "Write"}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </form>
  );
}
