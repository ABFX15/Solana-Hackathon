"use client";

import { AnchorProvider, Program, web3, BN, IdlAccounts } from "@coral-xyz/anchor";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { SolanaHack } from "../../target/types/solana_hack";
import { IDL } from "./idl";

const programId = new PublicKey("59NDRZgvKZGNT8Rb3J6ShHTkJQzmnrpUZgPCxDu7M47e");
const network = "https://api.devnet.solana.com";
const connection = new Connection(network, "confirmed");

export type BandwidthSlot = IdlAccounts<SolanaHack>["bandwidthSlot"];

export interface BandwidthSlotData {
    publicKey: PublicKey;
    account: BandwidthSlot;
}

interface AnchorWallet {
    publicKey: PublicKey;
    signTransaction(transaction: web3.Transaction): Promise<web3.Transaction>;
    signAllTransactions(transactions: web3.Transaction[]): Promise<web3.Transaction[]>;
}

export class SolanaProgram {
    private program: Program<SolanaHack>;
    private provider: AnchorProvider;

    constructor(wallet: AnchorWallet) {
        try {
            console.log("🔧 Initializing Solana Program...");
            console.log("Wallet public key:", wallet.publicKey.toString());
            console.log("Network:", network);
            console.log("Program ID:", programId.toString());

            this.provider = new AnchorProvider(connection, wallet, {
                commitment: "confirmed",
            });

            console.log("✅ Provider created successfully");

            if (!IDL) {
                throw new Error("IDL is not defined");
            }

            console.log("🔍 IDL loaded:", typeof IDL);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.program = new Program<SolanaHack>(IDL as any, programId, this.provider);

            console.log("✅ Program created successfully!");
            console.log("Program methods:", Object.keys(this.program.methods));

        } catch (error) {
            console.error("❌ Error creating SolanaProgram:", error);
            console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
            throw new Error(`Failed to initialize Solana program: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async listBandwidth(
        speedMbps: number,
        startTime: Date,
        auctionEndTime: Date,
        minBid: number
    ): Promise<string> {
        console.log("📡 Listing bandwidth slot...");
        console.log("Speed:", speedMbps, "Mbps");
        console.log("Start time:", startTime);
        console.log("Auction end time:", auctionEndTime);
        console.log("Min bid:", minBid);

        const slot = web3.Keypair.generate();
        const startTimestamp = Math.floor(startTime.getTime() / 1000);
        const endTimestamp = Math.floor(auctionEndTime.getTime() / 1000);
        const minBidLamports = new BN(minBid * LAMPORTS_PER_SOL);

        console.log("Generated slot keypair:", slot.publicKey.toString());
        console.log("Start timestamp:", startTimestamp);
        console.log("End timestamp:", endTimestamp);
        console.log("Min bid lamports:", minBidLamports.toString());

        const signature = await this.program.methods
            .listBandwidth(
                speedMbps,
                new BN(startTimestamp),
                new BN(endTimestamp),
                minBidLamports
            )
            .accounts({
                bandwidthSlot: slot.publicKey,
                validator: this.provider.wallet.publicKey,
                systemProgram: web3.SystemProgram.programId,
            })
            .signers([slot])
            .rpc();

        console.log("✅ Bandwidth slot listed successfully!");
        console.log("Transaction signature:", signature);
        return signature;
    }

    async placeBid(slotPublicKey: PublicKey, bidAmount: number): Promise<string> {
        console.log("🎯 Placing bid...");
        console.log("Slot:", slotPublicKey.toString());
        console.log("Bid amount:", bidAmount);

        // Get the slot data to find the previous winner
        const slotData = await this.program.account.bandwidthSlot.fetch(slotPublicKey);
        console.log("Current slot data:", slotData);

        const bidLamports = new BN(bidAmount * LAMPORTS_PER_SOL);
        const prevWinner = slotData.winner;

        console.log("Bid lamports:", bidLamports.toString());
        console.log("Previous winner:", prevWinner?.toString() || "None");

        const signature = await this.program.methods
            .bid(bidLamports)
            .accounts({
                bandwidthSlot: slotPublicKey,
                bidder: this.provider.wallet.publicKey,
                prevWinner: prevWinner,
                systemProgram: web3.SystemProgram.programId,
            })
            .rpc();

        console.log("✅ Bid placed successfully!");
        console.log("Transaction signature:", signature);
        return signature;
    }

    async closeAuction(slotPublicKey: PublicKey): Promise<string> {
        console.log("🔒 Closing auction...");
        console.log("Slot:", slotPublicKey.toString());

        const signature = await this.program.methods
            .closeAuction()
            .accounts({
                bandwidthSlot: slotPublicKey,
                validator: this.provider.wallet.publicKey,
            })
            .rpc();

        console.log("✅ Auction closed successfully!");
        console.log("Transaction signature:", signature);
        return signature;
    }

    async claimFunds(slotPublicKey: PublicKey): Promise<string> {
        console.log("💰 Claiming funds...");
        console.log("Slot:", slotPublicKey.toString());

        const signature = await this.program.methods
            .claimFunds()
            .accounts({
                bandwidthSlot: slotPublicKey,
                validator: this.provider.wallet.publicKey,
                systemProgram: web3.SystemProgram.programId,
            })
            .rpc();

        console.log("✅ Funds claimed successfully!");
        console.log("Transaction signature:", signature);
        return signature;
    }

    async getAllSlots(): Promise<BandwidthSlotData[]> {
        console.log("📋 Fetching all slots...");

        const slots = await this.program.account.bandwidthSlot.all();
        console.log("Found", slots.length, "slots");

        return slots.map((slot) => ({
            publicKey: slot.publicKey,
            account: slot.account,
        }));
    }

    async getSlot(publicKey: PublicKey): Promise<BandwidthSlotData | null> {
        console.log("🔍 Fetching slot:", publicKey.toString());

        try {
            const account = await this.program.account.bandwidthSlot.fetch(publicKey);
            return {
                publicKey,
                account,
            };
        } catch (error) {
            console.error("Error fetching slot:", error);
            return null;
        }
    }

    addEventListener(eventName: string, callback: (event: unknown) => void): number {
        console.log("👂 Adding event listener for:", eventName);
        // For now, return a dummy listener ID
        return Math.random();
    }

    removeEventListener(listenerRef: number): void {
        console.log("🔇 Removing event listener:", listenerRef);
        // For now, do nothing
    }

    static formatTime(timestamp: number): string {
        return new Date(timestamp * 1000).toLocaleString();
    }

    static formatSOL(lamports: number): string {
        return (lamports / LAMPORTS_PER_SOL).toFixed(4);
    }

    static isAuctionActive(slot: BandwidthSlot): boolean {
        const now = Date.now() / 1000;
        return now >= slot.startTime && now <= slot.auctionEndTime && !slot.closed;
    }

    static canCloseAuction(slot: BandwidthSlot): boolean {
        const now = Date.now() / 1000;
        return now > slot.auctionEndTime && !slot.closed;
    }

    static canClaimFunds(slot: BandwidthSlot): boolean {
        return slot.closed && !slot.claimed;
    }
} 