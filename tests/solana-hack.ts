// If you see type errors for describe/it, run: npm install --save-dev @types/mocha
// If you see errors for anchor, run: npm install @coral-xyz/anchor
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaHack } from "../target/types/solana_hack";
import { assert } from "chai";
import "mocha";

// Helper to get unix timestamp
const now = () => Math.floor(Date.now() / 1000);

describe("solana-hack", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.solanaHack as Program<SolanaHack>;
  const provider = anchor.getProvider();

  let validator = anchor.web3.Keypair.generate();
  let bidder1 = anchor.web3.Keypair.generate();
  let bidder2 = anchor.web3.Keypair.generate();
  let bandwidthSlot = anchor.web3.Keypair.generate();

  // Airdrop SOL to validator and bidders
  before(async () => {
    for (const kp of [validator, bidder1, bidder2]) {
      const sig = await provider.connection.requestAirdrop(kp.publicKey, anchor.web3.LAMPORTS_PER_SOL * 10);
      await provider.connection.confirmTransaction(sig);
    }
  });

  it("runs the full auction lifecycle", async () => {
    // 1. List a bandwidth slot
    const speed_mbps = 100;
    const start_time = now() + 60; // starts in 1 min
    const auction_end_time = now() + 600; // ends in 10 min
    const min_bid = new anchor.BN(anchor.web3.LAMPORTS_PER_SOL / 10);

    // Derive escrow PDA
    const [escrowPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("escrow"), bandwidthSlot.publicKey.toBuffer()],
      program.programId
    );

    await program.methods
      .listBandwidth(new anchor.BN(speed_mbps), new anchor.BN(start_time), new anchor.BN(auction_end_time), min_bid)
      .accounts({
        bandwidthSlot: bandwidthSlot.publicKey,
      })
      .signers([validator, bandwidthSlot])
      .rpc();

    // 2. First bid (bidder1)
    const bid1 = min_bid.add(new anchor.BN(1_000_000));
    await program.methods
      .bid(bid1)
      .accounts({
        bandwidthSlot: bandwidthSlot.publicKey,
        bidder: bidder1.publicKey,
        prevWinner: null,
      })
      .signers([bidder1])
      .rpc();

    // 3. Second bid (bidder2, outbids bidder1)
    const bid2 = min_bid.add(new anchor.BN(2_000_000));
    await program.methods
      .bid(bid2)
      .accounts({
        bandwidthSlot: bandwidthSlot.publicKey,
        bidder: bidder2.publicKey,
        prevWinner: bidder1.publicKey,
      })
      .remainingAccounts([
        { pubkey: bidder1.publicKey, isWritable: true, isSigner: false },
      ])
      .signers([bidder2])
      .rpc();

    // 5. Close auction (validator)
    await program.methods
      .closeAuction()
      .accounts({
        bandwidthSlot: bandwidthSlot.publicKey,
      })
      .signers([validator])
      .rpc();

    // 6. Claim funds (validator)
    await program.methods
      .claimFunds()
      .accounts({
        bandwidthSlot: bandwidthSlot.publicKey,
      })
      .signers([validator])
      .rpc();

    // 7. Check state
    const slotAccount = await program.account.bandwidthSlot.fetch(bandwidthSlot.publicKey);
    assert.isTrue(slotAccount.closed);
    assert.isTrue(slotAccount.claimed);
    assert.ok(slotAccount.winner.equals(bidder2.publicKey));
    assert.strictEqual(slotAccount.winningBid.toNumber(), bid2.toNumber());
  });
});
