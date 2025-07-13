"use client";
import { useWallet } from "@solana/wallet-adapter-react";

export function useWalletPublicKey(): string | null {
    const { publicKey } = useWallet();
    return publicKey ? publicKey.toBase58() : null;
}
