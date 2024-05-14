import * as React from "react";
import { parseEther } from "viem";
import {
  type BaseError,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";

export function SendTransaction() {
  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get("address") as `0x${string}`;
    const value = formData.get("value") as string;
    sendTransaction({ to, value: parseEther(value) });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 w-1/5">
      <input
        className="px-2 h-8 bg-gray-500 rounded-md"
        name="address"
        placeholder="0xA0Cf…251e"
        required
      />
      <input
        className="px-2 h-8 bg-gray-500 rounded-md"
        name="value"
        placeholder="0.05"
        required
      />
      <button
        disabled={isPending}
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isPending ? "Confirming..." : "Send"}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div className="text-green-500">Waiting for confirmation...</div>}
      {isConfirmed && <div className="text-green-500">Transaction confirmed.</div>}
      {error && (
        <div className="text-red-500">Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </form>
  );
}
