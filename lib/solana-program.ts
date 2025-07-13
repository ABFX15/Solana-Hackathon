import { AnchorProvider, Program, web3, BN, IdlAccounts } from "@coral-xyz/anchor";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { SolanaHack } from "../../target/types/solana_hack";
import idl from "../../target/idl/solana_hack.json";

const programId = new PublicKey("59NDRZgvKZGNT8Rb3J6ShHTkJQzmnrpUZgPCxDu7M47e");
const network = "http://127.0.0.1:8899"; // Local network
const connection = new Connection(network, "confirmed");

export type BandwidthSlot = IdlAccounts<SolanaHack>["bandwidthSlot"];

export interface BandwidthSlotData {
    publicKey: PublicKey;
    account: BandwidthSlot;
}

interface WalletInterface {
    publicKey: PublicKey | null;
    signTransaction?: (tx: web3.Transaction) => Promise<web3.Transaction>;
    signAllTransactions?: (txs: web3.Transaction[]) => Promise<web3.Transaction[]>;
}

export class SolanaProgram {
    private program: Program<SolanaHack>;
    private provider: AnchorProvider;

    constructor(wallet: WalletInterface) {
        this.provider = new AnchorProvider(connection, wallet, {
            commitment: "confirmed",
        });
        this.program = new Program<SolanaHack>(idl as SolanaHack, programId, this.provider);
    }

// ... existing code ... 