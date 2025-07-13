"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Tab } from "@headlessui/react";
import SlotCard from "../../components/SlotCard";
import SlotListingForm from "../../components/SlotListingForm";
import BidModal from "../../components/BidModal";
import WalletConnect from "../../components/WalletConnect";
import Dashboard from "../../components/Dashboard";
import LandingPage from "../../components/LandingPage";
import { SolanaProgram, BandwidthSlotData } from "../../lib/solana-program";

export default function HomePage() {
  const anchorWallet = useAnchorWallet();
  const [solanaProgram, setSolanaProgram] = useState<SolanaProgram | null>(
    null
  );
  const [slots, setSlots] = useState<BandwidthSlotData[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<BandwidthSlotData | null>(
    null
  );
  const [showBidModal, setShowBidModal] = useState(false);
  const [loading, setLoading] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [showLanding, setShowLanding] = useState(true);

  const fetchSlots = useCallback(async () => {
    if (!solanaProgram) return;

    try {
      const allSlots = await solanaProgram.getAllSlots();
      setSlots(allSlots);
    } catch (err: unknown) {
      console.error("Error fetching slots:", err);
      setError("Failed to fetch slots");
    }
  }, [solanaProgram]);

  // Initialize Solana program when wallet connects
  useEffect(() => {
    if (anchorWallet && anchorWallet.publicKey) {
      setShowLanding(false);
      try {
        console.log("Creating SolanaProgram with anchorWallet:", anchorWallet);
        const program = new SolanaProgram(anchorWallet);
        setSolanaProgram(program);

        // Setup event listeners
        const listeners = [
          program.addEventListener("BandwidthListed", (event) => {
            console.log("Bandwidth listed:", event);
            fetchSlots();
          }),
          program.addEventListener("BidPlaced", (event) => {
            console.log("Bid placed:", event);
            fetchSlots();
          }),
          program.addEventListener("AuctionClosed", (event) => {
            console.log("Auction closed:", event);
            fetchSlots();
          }),
          program.addEventListener("FundsClaimed", (event) => {
            console.log("Funds claimed:", event);
            fetchSlots();
          }),
        ];

        // Cleanup event listeners on unmount
        return () => {
          listeners.forEach((listener) => {
            program.removeEventListener(listener);
          });
        };
      } catch (error) {
        console.error("Failed to create SolanaProgram:", error);
        setError("Failed to initialize Solana program");
      }
    } else {
      setShowLanding(true);
      setSolanaProgram(null);
    }
  }, [anchorWallet, fetchSlots]);

  // Fetch slots when program is ready
  useEffect(() => {
    if (solanaProgram) {
      fetchSlots();
    }
  }, [solanaProgram, fetchSlots]);

  const handleListSlot = async (slotData: {
    speedMbps: number;
    startTime: Date;
    auctionEndTime: Date;
    minBid: number;
  }) => {
    if (!solanaProgram) {
      setError("Please connect your wallet first");
      return;
    }

    setLoading("Listing...");
    setError("");

    try {
      const tx = await solanaProgram.listBandwidth(
        slotData.speedMbps,
        slotData.startTime,
        slotData.auctionEndTime,
        slotData.minBid
      );

      console.log("Transaction signature:", tx);

      // Wait a bit then refetch slots
      setTimeout(fetchSlots, 2000);
    } catch (err: unknown) {
      console.error("Error listing slot:", err);
      setError((err as Error).message || "Failed to list slot");
    } finally {
      setLoading("");
    }
  };

  const handleBid = async (amount: number) => {
    if (!solanaProgram || !selectedSlot) {
      setError("Please connect your wallet first");
      return;
    }

    setLoading("Placing bid...");
    setError("");

    try {
      const tx = await solanaProgram.placeBid(selectedSlot.publicKey, amount);

      console.log("Bid transaction signature:", tx);

      // Wait a bit then refetch slots
      setTimeout(fetchSlots, 2000);
    } catch (err: unknown) {
      console.error("Error placing bid:", err);
      setError((err as Error).message || "Failed to place bid");
    } finally {
      setLoading("");
    }
  };

  const handleCloseAuction = async (slotData: BandwidthSlotData) => {
    if (!solanaProgram) {
      setError("Please connect your wallet first");
      return;
    }

    setLoading("Closing auction...");
    setError("");

    try {
      const tx = await solanaProgram.closeAuction(slotData.publicKey);

      console.log("Close auction transaction signature:", tx);

      // Wait a bit then refetch slots
      setTimeout(fetchSlots, 2000);
    } catch (err: unknown) {
      console.error("Error closing auction:", err);
      setError((err as Error).message || "Failed to close auction");
    } finally {
      setLoading("");
    }
  };

  const handleClaimFunds = async (slotData: BandwidthSlotData) => {
    if (!solanaProgram) {
      setError("Please connect your wallet first");
      return;
    }

    setLoading("Claiming funds...");
    setError("");

    try {
      const tx = await solanaProgram.claimFunds(slotData.publicKey);

      console.log("Claim funds transaction signature:", tx);

      // Wait a bit then refetch slots
      setTimeout(fetchSlots, 2000);
    } catch (err: unknown) {
      console.error("Error claiming funds:", err);
      setError((err as Error).message || "Failed to claim funds");
    } finally {
      setLoading("");
    }
  };

  const handleBidClick = (slotData: BandwidthSlotData) => {
    setSelectedSlot(slotData);
    setShowBidModal(true);
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  // Auto-refresh slots every 30 seconds
  useEffect(() => {
    const interval = setInterval(fetchSlots, 30000);
    return () => clearInterval(interval);
  }, [fetchSlots]);

  // Show landing page if not connected
  if (!anchorWallet?.publicKey) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // Sort slots by auction end time
  const sortedSlots = [...slots].sort((a, b) => {
    const aActive = SolanaProgram.isAuctionActive(a.account);
    const bActive = SolanaProgram.isAuctionActive(b.account);

    if (aActive && !bActive) return -1;
    if (!aActive && bActive) return 1;

    return Number(a.account.auctionEndTime) - Number(b.account.auctionEndTime);
  });

  const activeSlots = sortedSlots.filter((slot) =>
    SolanaProgram.isAuctionActive(slot.account)
  );
  const endedSlots = sortedSlots.filter(
    (slot) => !SolanaProgram.isAuctionActive(slot.account)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white relative overflow-hidden">
      {/* Animated Space Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="bg-black/40 backdrop-blur-md border-b border-purple-500/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center animate-pulse-glow">
                  <span className="text-2xl">🛸</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold cosmic-text">
                    Solana Bandwidth Exchange
                  </h1>
                  <p className="text-xs text-purple-300">
                    Decentralized Bandwidth Marketplace
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowLanding(true)}
                  className="text-sm text-purple-300 hover:text-purple-200 transition-colors"
                >
                  🏠 Home
                </button>
                <WalletConnect />
              </div>
            </div>
          </div>
        </nav>

        {/* Messages */}
        {(error || success) && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
            {error && (
              <div className="alert alert-error mb-4 space-alert">
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
                <span>{error}</span>
                <button
                  onClick={clearMessages}
                  className="btn btn-sm btn-circle btn-ghost"
                >
                  ✕
                </button>
              </div>
            )}
            {success && (
              <div className="alert alert-success mb-4 space-card">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{success}</span>
                <button
                  onClick={clearMessages}
                  className="btn btn-sm btn-circle btn-ghost"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-2xl bg-black/40 backdrop-blur-md p-1 mb-8 border border-purple-500/30">
              <Tab
                className={({ selected }) =>
                  `w-full rounded-xl py-3 px-4 text-sm font-medium leading-5 transition-all duration-300
                ${
                  selected
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg transform scale-105"
                    : "text-purple-200 hover:bg-white/[0.12] hover:text-white"
                }`
                }
              >
                <div className="flex items-center justify-center gap-2">
                  <span>🚀</span>
                  <span>Mission Control</span>
                </div>
              </Tab>
              <Tab
                className={({ selected }) =>
                  `w-full rounded-xl py-3 px-4 text-sm font-medium leading-5 transition-all duration-300
                ${
                  selected
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg transform scale-105"
                    : "text-purple-200 hover:bg-white/[0.12] hover:text-white"
                }`
                }
              >
                <div className="flex items-center justify-center gap-2">
                  <span>📡</span>
                  <span>Launch Satellite</span>
                </div>
              </Tab>
              <Tab
                className={({ selected }) =>
                  `w-full rounded-xl py-3 px-4 text-sm font-medium leading-5 transition-all duration-300
                ${
                  selected
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg transform scale-105"
                    : "text-purple-200 hover:bg-white/[0.12] hover:text-white"
                }`
                }
              >
                <div className="flex items-center justify-center gap-2">
                  <span>⚡</span>
                  <span>Active Missions ({activeSlots.length})</span>
                </div>
              </Tab>
              <Tab
                className={({ selected }) =>
                  `w-full rounded-xl py-3 px-4 text-sm font-medium leading-5 transition-all duration-300
                ${
                  selected
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg transform scale-105"
                    : "text-purple-200 hover:bg-white/[0.12] hover:text-white"
                }`
                }
              >
                <div className="flex items-center justify-center gap-2">
                  <span>🌌</span>
                  <span>All Missions ({slots.length})</span>
                </div>
              </Tab>
            </Tab.List>

            <Tab.Panels>
              {/* Dashboard */}
              <Tab.Panel>
                <Dashboard
                  publicKey={anchorWallet?.publicKey}
                  slots={slots}
                  isLoading={loading}
                />
              </Tab.Panel>

              {/* List Bandwidth */}
              <Tab.Panel>
                <SlotListingForm onList={handleListSlot} isLoading={loading} />
              </Tab.Panel>

              {/* Active Auctions */}
              <Tab.Panel>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold cosmic-text">
                      ⚡ Active Space Missions
                    </h2>
                    <button
                      onClick={fetchSlots}
                      className="btn-space-secondary px-6 py-2 rounded-full text-sm"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        "🔄 Refresh"
                      )}
                    </button>
                  </div>

                  {activeSlots.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                        <span className="text-6xl">🌌</span>
                      </div>
                      <h3 className="text-2xl font-semibold text-purple-300 mb-4">
                        No Active Missions
                      </h3>
                      <p className="text-gray-400">
                        The space is quiet... no active bandwidth auctions at
                        the moment.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {activeSlots.map((slot) => (
                        <SlotCard
                          key={slot.publicKey.toString()}
                          slotData={slot}
                          publicKey={anchorWallet?.publicKey}
                          onBid={handleBidClick}
                          onClose={handleCloseAuction}
                          onClaim={handleClaimFunds}
                          isLoading={loading}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </Tab.Panel>

              {/* All Auctions */}
              <Tab.Panel>
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold cosmic-text">
                      🌌 All Space Missions
                    </h2>
                    <button
                      onClick={fetchSlots}
                      className="btn-space-secondary px-6 py-2 rounded-full text-sm"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        "🔄 Refresh"
                      )}
                    </button>
                  </div>

                  {/* Active Auctions Section */}
                  {activeSlots.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-green-400 mb-6 flex items-center gap-2">
                        <span>⚡</span>
                        <span>Active Missions</span>
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                        {activeSlots.map((slot) => (
                          <SlotCard
                            key={slot.publicKey.toString()}
                            slotData={slot}
                            publicKey={anchorWallet?.publicKey}
                            onBid={handleBidClick}
                            onClose={handleCloseAuction}
                            onClaim={handleClaimFunds}
                            isLoading={loading}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ended Auctions Section */}
                  {endedSlots.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-400 mb-6 flex items-center gap-2">
                        <span>🏁</span>
                        <span>Completed Missions</span>
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {endedSlots.map((slot) => (
                          <SlotCard
                            key={slot.publicKey.toString()}
                            slotData={slot}
                            publicKey={anchorWallet?.publicKey}
                            onBid={handleBidClick}
                            onClose={handleCloseAuction}
                            onClaim={handleClaimFunds}
                            isLoading={loading}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {slots.length === 0 && !loading && (
                    <div className="text-center py-16">
                      <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                        <span className="text-6xl">🚀</span>
                      </div>
                      <h3 className="text-2xl font-semibold text-purple-300 mb-4">
                        No Missions Yet
                      </h3>
                      <p className="text-gray-400">
                        Be the first space explorer to launch a bandwidth
                        satellite!
                      </p>
                    </div>
                  )}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </main>
      </div>

      {/* Bid Modal */}
      <BidModal
        open={showBidModal}
        onClose={() => setShowBidModal(false)}
        onBid={handleBid}
        slotData={selectedSlot}
        isLoading={loading}
      />
    </div>
  );
}
