import React from "react";
import { PublicKey } from "@solana/web3.js";
import { BandwidthSlotData, SolanaProgram } from "../lib/solana-program";

interface DashboardProps {
  publicKey: PublicKey | null;
  slots: BandwidthSlotData[];
  isLoading?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({
  publicKey,
  slots,
  isLoading = false,
}) => {
  if (!publicKey) {
    return (
      <div className="alert alert-info mb-4 space-card">
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>
          🚀 Connect your wallet to access your space station dashboard.
        </span>
      </div>
    );
  }

  const myListed = slots.filter((slot) =>
    slot.account.validator.equals(publicKey)
  );
  const myWinning = slots.filter(
    (slot) => slot.account.winner && slot.account.winner.equals(publicKey)
  );
  const myBids = slots.filter(
    (slot) =>
      slot.account.winner &&
      slot.account.winner.equals(publicKey) &&
      !slot.account.closed
  );

  const totalEarnings =
    myListed.reduce((sum, slot) => {
      if (slot.account.claimed && slot.account.winningBid) {
        return sum + Number(slot.account.winningBid);
      }
      return sum;
    }, 0) / 1e9; // Convert from lamports to SOL

  const pendingEarnings =
    myListed.reduce((sum, slot) => {
      if (
        slot.account.closed &&
        !slot.account.claimed &&
        slot.account.winningBid
      ) {
        return sum + Number(slot.account.winningBid);
      }
      return sum;
    }, 0) / 1e9;

  const totalSpent =
    myWinning.reduce((sum, slot) => {
      if (slot.account.winningBid) {
        return sum + Number(slot.account.winningBid);
      }
      return sum;
    }, 0) / 1e9;

  const totalBandwidthProvided = myListed.reduce((sum, slot) => {
    return sum + Number(slot.account.speedMbps);
  }, 0);

  const totalBandwidthWon = myWinning.reduce((sum, slot) => {
    return sum + Number(slot.account.speedMbps);
  }, 0);

  const pendingClaims = myListed.filter((slot) =>
    SolanaProgram.canClaimFunds(slot.account)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="space-loader">
          <div className="orbit">
            <div className="planet"></div>
          </div>
          <span className="loading loading-spinner loading-lg text-purple-400"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center animate-pulse-glow">
            <svg
              width="32"
              height="32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="text-white"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            🚀 Space Station Dashboard
          </h1>
          <p className="text-sm text-gray-400 font-mono">
            Commander: {publicKey.toString().slice(0, 8)}...
            {publicKey.toString().slice(-8)}
          </p>
        </div>
      </div>

      {/* Space Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-card hover-lift">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
              <span className="text-lg">💎</span>
            </div>
            <span className="text-sm text-green-300">Total Earnings</span>
          </div>
          <div className="text-2xl font-bold text-green-400">
            {totalEarnings.toFixed(4)} SOL
          </div>
          <div className="text-xs text-gray-400">🌟 Stellar Performance</div>
        </div>

        <div className="space-card hover-lift">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <span className="text-lg">⏳</span>
            </div>
            <span className="text-sm text-yellow-300">Pending Claims</span>
          </div>
          <div className="text-2xl font-bold text-yellow-400">
            {pendingEarnings.toFixed(4)} SOL
          </div>
          <div className="text-xs text-gray-400">🛸 Ready for Extraction</div>
        </div>

        <div className="space-card hover-lift">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-lg">💫</span>
            </div>
            <span className="text-sm text-blue-300">Total Invested</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">
            {totalSpent.toFixed(4)} SOL
          </div>
          <div className="text-xs text-gray-400">🌌 Cosmic Ventures</div>
        </div>

        <div className="space-card hover-lift">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
              <span className="text-lg">🎯</span>
            </div>
            <span className="text-sm text-purple-300">Active Missions</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">
            {myBids.length}
          </div>
          <div className="text-xs text-gray-400">🚀 In Progress</div>
        </div>
      </div>

      {/* Bandwidth Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-card hover-lift">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-2xl">📡</span>
            </div>
            <span className="text-sm text-cyan-300">Signal Transmission</span>
          </div>
          <div className="text-3xl font-bold text-cyan-400">
            {totalBandwidthProvided} Mbps
          </div>
          <div className="text-xs text-gray-400">
            🛰️ {myListed.length} communication arrays active
          </div>
        </div>

        <div className="space-card hover-lift">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
              <span className="text-2xl">🌐</span>
            </div>
            <span className="text-sm text-indigo-300">Data Acquired</span>
          </div>
          <div className="text-3xl font-bold text-indigo-400">
            {totalBandwidthWon} Mbps
          </div>
          <div className="text-xs text-gray-400">
            🛸 {myWinning.length} successful data harvests
          </div>
        </div>
      </div>

      {/* Mission Control Alerts */}
      {pendingClaims.length > 0 && (
        <div className="alert space-alert animate-pulse-glow">
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <h4 className="font-bold">🚨 Mission Control Alert</h4>
            <span>
              {pendingClaims.length} space mission
              {pendingClaims.length > 1 ? "s" : ""} ready for reward extraction!
            </span>
          </div>
        </div>
      )}

      {/* Mission Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Space Missions */}
        <div className="space-card">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🛸</span>
            <h3 className="text-lg font-semibold text-cyan-300">
              My Space Missions
            </h3>
          </div>
          {myListed.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-6xl mb-4 block">🌌</span>
              <p className="text-gray-400 text-sm">
                No active missions. Launch your first satellite!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {myListed.map((slot) => (
                <div key={slot.publicKey.toString()} className="mission-log">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-cyan-300 flex items-center gap-2">
                        <span className="text-lg">📡</span>
                        {slot.account.speedMbps.toString()} Mbps Signal
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        🕐{" "}
                        {SolanaProgram.formatTime(
                          Number(slot.account.startTime)
                        )}{" "}
                        →{" "}
                        {SolanaProgram.formatTime(
                          Number(slot.account.auctionEndTime)
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-green-400 flex items-center gap-1">
                        <span className="text-lg">💎</span>
                        {slot.account.winningBid
                          ? SolanaProgram.formatSOL(
                              Number(slot.account.winningBid)
                            )
                          : "0"}{" "}
                        SOL
                      </div>
                      <div className="text-xs">
                        {slot.account.claimed ? (
                          <span className="badge badge-success badge-xs">
                            ✅ Claimed
                          </span>
                        ) : slot.account.closed ? (
                          <span className="badge badge-warning badge-xs">
                            🔒 Closed
                          </span>
                        ) : SolanaProgram.isAuctionActive(slot.account) ? (
                          <span className="badge badge-info badge-xs">
                            🟢 Active
                          </span>
                        ) : (
                          <span className="badge badge-error badge-xs">
                            🔴 Ended
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Conquests */}
        <div className="space-card">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🏆</span>
            <h3 className="text-lg font-semibold text-cyan-300">
              My Conquests
            </h3>
          </div>
          {myWinning.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-6xl mb-4 block">🌠</span>
              <p className="text-gray-400 text-sm">
                No victories yet. Compete in space auctions!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {myWinning.map((slot) => (
                <div key={slot.publicKey.toString()} className="mission-log">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-cyan-300 flex items-center gap-2">
                        <span className="text-lg">🌐</span>
                        {slot.account.speedMbps.toString()} Mbps Data
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        🕐{" "}
                        {SolanaProgram.formatTime(
                          Number(slot.account.startTime)
                        )}{" "}
                        →{" "}
                        {SolanaProgram.formatTime(
                          Number(slot.account.auctionEndTime)
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-yellow-400 flex items-center gap-1">
                        <span className="text-lg">💫</span>
                        {slot.account.winningBid
                          ? SolanaProgram.formatSOL(
                              Number(slot.account.winningBid)
                            )
                          : "0"}{" "}
                        SOL
                      </div>
                      <div className="text-xs">
                        {slot.account.closed ? (
                          <span className="badge badge-success badge-xs">
                            🎯 Conquered
                          </span>
                        ) : (
                          <span className="badge badge-info badge-xs">
                            ⚔️ Leading
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
