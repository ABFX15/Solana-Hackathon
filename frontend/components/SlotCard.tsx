import React from "react";
import { PublicKey } from "@solana/web3.js";
import { BandwidthSlotData, SolanaProgram } from "../lib/solana-program";

export interface SlotCardProps {
  slotData: BandwidthSlotData;
  publicKey: PublicKey | null;
  onBid: (slotData: BandwidthSlotData) => void;
  onClose?: (slotData: BandwidthSlotData) => void;
  onClaim?: (slotData: BandwidthSlotData) => void;
  isLoading?: boolean;
}

const SlotCard: React.FC<SlotCardProps> = ({
  slotData,
  publicKey,
  onBid,
  onClose,
  onClaim,
  isLoading = false,
}) => {
  const { account } = slotData;
  const isValidator = publicKey && account.validator.equals(publicKey);
  const isWinner =
    publicKey && account.winner && account.winner.equals(publicKey);
  const isActive = SolanaProgram.isAuctionActive(account);
  const canClose = SolanaProgram.canCloseAuction(account);
  const canClaim = SolanaProgram.canClaimFunds(account);

  const getStatusBadge = () => {
    if (account.claimed) {
      return (
        <span className="badge bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 animate-pulse-glow">
          ✅ Claimed
        </span>
      );
    }
    if (account.closed) {
      return (
        <span className="badge bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
          🔒 Closed
        </span>
      );
    }
    if (isActive) {
      return (
        <span className="badge bg-gradient-to-r from-green-400 to-cyan-500 text-white border-0 animate-pulse-glow">
          ⚡ Active
        </span>
      );
    }
    return (
      <span className="badge bg-gradient-to-r from-red-400 to-pink-500 text-white border-0">
        🔴 Ended
      </span>
    );
  };

  const formatAddress = (address: PublicKey) => {
    return address.toString().slice(0, 8) + "...";
  };

  return (
    <div className="space-card hover-lift relative overflow-hidden">
      {/* Cosmic background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 rounded-xl"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center animate-pulse-glow">
                <span className="text-2xl">📡</span>
              </div>
              {isActive && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold cosmic-text">
                {account.speedMbps.toString()} Mbps
              </h3>
              <p className="text-sm text-purple-300 font-mono">
                🛰️ Satellite #{slotData.publicKey.toString().slice(0, 8)}
              </p>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        {/* Mission Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="mission-log">
            <div className="text-xs text-purple-300 mb-1 flex items-center gap-1">
              <span>👨‍🚀</span>
              <span>Commander</span>
            </div>
            <div className="text-sm font-mono text-cyan-300">
              {formatAddress(account.validator)}
            </div>
          </div>
          <div className="mission-log">
            <div className="text-xs text-purple-300 mb-1 flex items-center gap-1">
              <span>💎</span>
              <span>Min Bid</span>
            </div>
            <div className="text-sm font-bold text-green-400">
              {SolanaProgram.formatSOL(Number(account.minBid))} SOL
            </div>
          </div>
          <div className="mission-log">
            <div className="text-xs text-purple-300 mb-1 flex items-center gap-1">
              <span>🎯</span>
              <span>Current Bid</span>
            </div>
            <div className="text-sm font-bold text-yellow-400">
              {account.winningBid
                ? SolanaProgram.formatSOL(Number(account.winningBid))
                : "0"}{" "}
              SOL
            </div>
          </div>
          <div className="mission-log">
            <div className="text-xs text-purple-300 mb-1 flex items-center gap-1">
              <span>🏆</span>
              <span>Winner</span>
            </div>
            <div className="text-sm font-mono text-pink-400">
              {account.winner ? formatAddress(account.winner) : "None"}
            </div>
          </div>
        </div>

        {/* Mission Timeline */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="mission-log">
            <div className="text-xs text-purple-300 mb-1 flex items-center gap-1">
              <span>🚀</span>
              <span>Launch Time</span>
            </div>
            <div className="text-sm text-cyan-300">
              {SolanaProgram.formatTime(Number(account.startTime))}
            </div>
          </div>
          <div className="mission-log">
            <div className="text-xs text-purple-300 mb-1 flex items-center gap-1">
              <span>🏁</span>
              <span>Mission End</span>
            </div>
            <div className="text-sm text-cyan-300">
              {SolanaProgram.formatTime(Number(account.auctionEndTime))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {/* Bid Button */}
          {isActive && !isValidator && publicKey && (
            <button
              className="btn-space-primary flex-1 py-3 rounded-full font-semibold"
              onClick={() => onBid(slotData)}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>🎯</span>
                  <span>Place Bid</span>
                </span>
              )}
            </button>
          )}

          {/* Close Auction Button (Validator Only) */}
          {isValidator && canClose && onClose && (
            <button
              className="btn-space-secondary flex-1 py-3 rounded-full font-semibold"
              onClick={() => onClose(slotData)}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>🔒</span>
                  <span>Close Mission</span>
                </span>
              )}
            </button>
          )}

          {/* Claim Funds Button (Validator Only) */}
          {isValidator && canClaim && onClaim && (
            <button
              className="btn-space-primary flex-1 py-3 rounded-full font-semibold animate-pulse-glow"
              onClick={() => onClaim(slotData)}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>💎</span>
                  <span>Claim Rewards</span>
                </span>
              )}
            </button>
          )}

          {/* Status Messages */}
          {isValidator && !canClose && !canClaim && account.closed && (
            <div className="flex-1 text-center py-3 px-4 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 border border-gray-500">
              <span className="text-sm text-gray-300">
                {account.claimed ? "💎 Rewards Claimed" : "🔒 Mission Closed"}
              </span>
            </div>
          )}

          {!isActive && !isValidator && !isWinner && (
            <div className="flex-1 text-center py-3 px-4 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 border border-gray-500">
              <span className="text-sm text-gray-300">🏁 Mission Ended</span>
            </div>
          )}

          {isWinner && (
            <div className="flex-1 text-center py-3 px-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse-glow">
              <span className="text-sm text-white font-semibold">
                🏆 Mission Successful!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlotCard;
