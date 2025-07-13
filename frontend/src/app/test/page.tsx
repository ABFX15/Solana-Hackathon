"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function TestPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-dark-[950] text-white gap-8">
      <h1 className="text-4xl font-bold gradient-text animate-gradient-text">
        Solana Wallet Test
      </h1>
      <WalletMultiButton />
      <button
        className="btn btn-primary mt-8"
        onClick={() => alert("It works!")}
      >
        Click me
      </button>
    </main>
  );
}
