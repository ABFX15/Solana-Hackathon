"use client";

import React, { useState } from "react";
import { BandwidthSlotData, SolanaProgram } from "../lib/solana-program";

interface BidModalProps {
  open: boolean;
  onClose: () => void;
  onBid: (amount: number) => Promise<void>;
  slotData: BandwidthSlotData | null;
  isLoading?: boolean;
}

const BidModal: React.FC<BidModalProps> = ({
  open,
  onClose,
  onBid,
  slotData,
  isLoading = false,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");

  React.useEffect(() => {
    if (slotData) {
      const minBid = Number(slotData.account.minBid);
      const currentBid = slotData.account.winningBid
        ? Number(slotData.account.winningBid)
        : minBid;
      const suggestedBid = Math.max(minBid, currentBid + 0.001 * 1e9); // Add 0.001 SOL in lamports
      setAmount(SolanaProgram.formatSOL(suggestedBid));
    }
  }, [slotData]);

  const handleBid = async () => {
    if (!slotData) return;

    const bidAmount = parseFloat(amount);
    if (isNaN(bidAmount) || bidAmount <= 0) {
      setError("Please enter a valid bid amount");
      return;
    }

    const minBidSOL = Number(slotData.account.minBid) / 1e9;
    const currentBidSOL = slotData.account.winningBid
      ? Number(slotData.account.winningBid) / 1e9
      : 0;
    const requiredBid = Math.max(minBidSOL, currentBidSOL);

    if (bidAmount <= requiredBid) {
      setError(
        `Bid must be higher than ${SolanaProgram.formatSOL(
          requiredBid * 1e9
        )} SOL`
      );
      return;
    }

    try {
      setError("");
      await onBid(bidAmount);
      onClose();
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to place bid");
    }
  };

  if (!open || !slotData) return null;

  const { account } = slotData;
  const minBidSOL = Number(account.minBid) / 1e9;
  const currentBidSOL = account.winningBid
    ? Number(account.winningBid) / 1e9
    : 0;
  const isActive = SolanaProgram.isAuctionActive(account);

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl space-card relative overflow-hidden">
        {/* Cosmic background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 rounded-xl"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center animate-pulse-glow">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold cosmic-text">
                Launch Bid Mission
              </h3>
              <p className="text-sm text-purple-300">
                📡 {account.speedMbps.toString()} Mbps • 🛰️ Satellite #
                {slotData.publicKey.toString().slice(0, 8)}
              </p>
            </div>
          </div>

          {/* Mission Status Alert */}
          {!isActive && (
            <div className="space-alert mb-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                <div>
                  <div className="font-bold">Mission Status Alert</div>
                  <div className="text-sm">
                    This space mission is not currently active
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mission Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="mission-log">
              <div className="text-xs text-purple-300 mb-1 flex items-center gap-1">
                <span>💎</span>
                <span>Min Bid</span>
              </div>
              <div className="text-lg font-bold text-green-400">
                {SolanaProgram.formatSOL(Number(account.minBid))} SOL
              </div>
            </div>
            <div className="mission-log">
              <div className="text-xs text-purple-300 mb-1 flex items-center gap-1">
                <span>🎯</span>
                <span>Current Bid</span>
              </div>
              <div className="text-lg font-bold text-yellow-400">
                {currentBidSOL > 0
                  ? SolanaProgram.formatSOL(Number(account.winningBid))
                  : "None"}{" "}
                SOL
              </div>
            </div>
          </div>

          {/* Bid Input */}
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-cyan-300 font-semibold flex items-center gap-2">
                <span>🚀</span>
                <span>Your Bid Amount (SOL)</span>
              </span>
            </label>
            <input
              type="number"
              step="0.001"
              min={Math.max(minBidSOL, currentBidSOL) + 0.001}
              className="input input-bordered w-full bg-black/50 border-purple-500/30 text-white text-lg font-mono focus:border-cyan-400"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter bid amount"
              disabled={isLoading || !isActive}
            />
            {error && (
              <label className="label">
                <span className="label-text-alt text-red-400 flex items-center gap-1">
                  <span>⚠️</span>
                  <span>{error}</span>
                </span>
              </label>
            )}
          </div>

          {/* Mission Brief */}
          <div className="space-card mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📋</span>
              <span className="font-bold text-cyan-300">Mission Brief</span>
            </div>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>
                • If you are outbid, your SOL will be automatically refunded
              </li>
              <li>• Winning bids are held in secure smart contract escrow</li>
              <li>
                • Mission success grants you access to the bandwidth capacity
              </li>
              <li>• All transactions are processed on the Solana blockchain</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="modal-action">
            <button
              className="btn-space-secondary px-8 py-3 rounded-full font-semibold"
              onClick={onClose}
              disabled={isLoading}
            >
              <span className="flex items-center gap-2">
                <span>❌</span>
                <span>Abort Mission</span>
              </span>
            </button>
            <button
              className="btn-space-primary px-8 py-3 rounded-full font-semibold"
              onClick={handleBid}
              disabled={isLoading || !isActive || !amount}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>🎯</span>
                  <span>Launch Bid</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidModal;
