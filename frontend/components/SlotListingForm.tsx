"use client";

import React, { useState } from "react";

interface SlotListingFormProps {
  onList: (slot: {
    speedMbps: number;
    startTime: Date;
    auctionEndTime: Date;
    minBid: number;
  }) => Promise<void>;
  isLoading?: boolean;
}

const SlotListingForm: React.FC<SlotListingFormProps> = ({
  onList,
  isLoading = false,
}) => {
  const [speedMbps, setSpeedMbps] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [auctionEndTime, setAuctionEndTime] = useState<string>("");
  const [minBid, setMinBid] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Set default values
  React.useEffect(() => {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

    setStartTime(oneHourLater.toISOString().slice(0, 16));
    setAuctionEndTime(twoHoursLater.toISOString().slice(0, 16));
    setMinBid("0.1");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    const speed = parseInt(speedMbps);
    const minBidAmount = parseFloat(minBid);
    const start = new Date(startTime);
    const end = new Date(auctionEndTime);
    const now = new Date();

    if (!speed || speed <= 0) {
      setError("Speed must be a positive number");
      return;
    }

    if (!minBidAmount || minBidAmount <= 0) {
      setError("Minimum bid must be a positive number");
      return;
    }

    if (start <= now) {
      setError("Start time must be in the future");
      return;
    }

    if (end <= start) {
      setError("End time must be after start time");
      return;
    }

    if (end.getTime() - start.getTime() < 30 * 60 * 1000) {
      setError("Auction must run for at least 30 minutes");
      return;
    }

    try {
      await onList({
        speedMbps: speed,
        startTime: start,
        auctionEndTime: end,
        minBid: minBidAmount,
      });

      // Reset form
      setSpeedMbps("");
      setStartTime("");
      setAuctionEndTime("");
      setMinBid("0.1");

      // Set default times again
      const newNow = new Date();
      const newOneHourLater = new Date(newNow.getTime() + 60 * 60 * 1000);
      const newTwoHoursLater = new Date(newNow.getTime() + 2 * 60 * 60 * 1000);

      setStartTime(newOneHourLater.toISOString().slice(0, 16));
      setAuctionEndTime(newTwoHoursLater.toISOString().slice(0, 16));
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to list slot");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center animate-pulse-glow">
          <span className="text-3xl">📡</span>
        </div>
        <h2 className="text-3xl font-bold cosmic-text mb-2">
          Launch Satellite Mission
        </h2>
        <p className="text-lg text-purple-300">
          Deploy your bandwidth satellite into the cosmic marketplace
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Satellite Configuration */}
        <div className="space-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-xl">🛰️</span>
            </div>
            <h3 className="text-xl font-semibold text-cyan-300">
              Satellite Configuration
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-cyan-300 font-semibold flex items-center gap-2">
                  <span>⚡</span>
                  <span>Signal Strength (Mbps)</span>
                </span>
              </label>
              <input
                type="number"
                min="1"
                step="1"
                className="input input-bordered w-full bg-black/50 border-purple-500/30 text-white text-lg font-mono focus:border-cyan-400"
                value={speedMbps}
                onChange={(e) => setSpeedMbps(e.target.value)}
                placeholder="e.g., 100"
                required
                disabled={isLoading}
              />
              <label className="label">
                <span className="label-text-alt text-gray-400">
                  The bandwidth capacity your satellite will provide
                </span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-cyan-300 font-semibold flex items-center gap-2">
                  <span>💎</span>
                  <span>Minimum Bid (SOL)</span>
                </span>
              </label>
              <input
                type="number"
                min="0.001"
                step="0.001"
                className="input input-bordered w-full bg-black/50 border-purple-500/30 text-white text-lg font-mono focus:border-cyan-400"
                value={minBid}
                onChange={(e) => setMinBid(e.target.value)}
                placeholder="0.1"
                required
                disabled={isLoading}
              />
              <label className="label">
                <span className="label-text-alt text-gray-400">
                  The minimum bid amount required to compete
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Mission Timeline */}
        <div className="space-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
              <span className="text-xl">🕐</span>
            </div>
            <h3 className="text-xl font-semibold text-purple-300">
              Mission Timeline
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-cyan-300 font-semibold flex items-center gap-2">
                  <span>🚀</span>
                  <span>Mission Launch Time</span>
                </span>
              </label>
              <input
                type="datetime-local"
                className="input input-bordered w-full bg-black/50 border-purple-500/30 text-white text-lg font-mono focus:border-cyan-400"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                disabled={isLoading}
              />
              <label className="label">
                <span className="label-text-alt text-gray-400">
                  When the auction bidding begins
                </span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-cyan-300 font-semibold flex items-center gap-2">
                  <span>🏁</span>
                  <span>Mission End Time</span>
                </span>
              </label>
              <input
                type="datetime-local"
                className="input input-bordered w-full bg-black/50 border-purple-500/30 text-white text-lg font-mono focus:border-cyan-400"
                value={auctionEndTime}
                onChange={(e) => setAuctionEndTime(e.target.value)}
                required
                disabled={isLoading}
              />
              <label className="label">
                <span className="label-text-alt text-gray-400">
                  When the auction ends (minimum 30 minutes from start)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="space-alert">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              <div>
                <div className="font-bold">Mission Error</div>
                <div className="text-sm">{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* Mission Brief */}
        <div className="space-card">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📋</span>
            <span className="font-bold text-cyan-300 text-lg">
              Mission Brief
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-purple-300 mb-2">
                How Space Auctions Work:
              </h4>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>
                  • 🎯 Explorers compete by placing bids on your satellite
                </li>
                <li>• 💎 Highest bidder wins when the mission ends</li>
                <li>• 🔒 You close the auction and claim your rewards</li>
                <li>• 🔄 Outbid participants get automatic refunds</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-300 mb-2">
                Mission Requirements:
              </h4>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• ⚡ Minimum 1 Mbps signal strength</li>
                <li>• 💎 Minimum 0.001 SOL bid requirement</li>
                <li>• 🕐 Missions must run for at least 30 minutes</li>
                <li>• 🚀 Launch time must be in the future</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Launch Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn-space-primary px-12 py-4 rounded-full text-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="loading loading-spinner loading-sm"></span>
                <span>Launching Satellite...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>🚀</span>
                <span>Launch Satellite Mission</span>
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SlotListingForm;
