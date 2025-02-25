"use client";
import AddNumbers from "@/components/AddNumbers";
import { WriteContract } from "@/components/WriteContract";
import ReadContract from "@/components/ReadContract";
import { ChainIcon, ConnectKitButton, useChains } from "connectkit";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const chains = useChains();
  // const viemIntercation = async () => {
  //   const blockNumber = await client.getBlockNumber();
  //   return blockNumber;
  // };
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Connect Wallet
      </button> */}
      <ConnectKitButton />
      <p>Connected Wallet: {address}</p>

      <p>This dApp is supported on the following chains:</p>
      {chains.map((chain) => (
        <div key={chain.id} className="flex items-center gap-2">
          <ChainIcon id={chain.id} />
          <span>{chain.name}</span>
        </div>
      ))}

      {/* <SendTransaction /> */}
      <ReadContract />
      <AddNumbers a={3} b={2} />
      <WriteContract />
    </main>
  );
}
