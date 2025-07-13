"use client";
import React, { useState } from "react";
import SlotCard from "../../components/SlotCard";
import SlotListingForm from "../../components/SlotListingForm";
import BidModal from "../../components/BidModal";
import WalletConnect from "../../components/WalletConnect";
import Dashboard from "../../components/Dashboard";
import { Tab } from "@headlessui/react";
import { useWalletPublicKey } from "../../components/useWalletPublicKey";

// Demo slot data for fallback
const demoSlot = {
  validator: "demo-validator-1234",
  speed: 100,
  start: "2025-07-13T12:00",
  end: "2025-07-13T13:00",
  minBid: 0.1,
  currentBid: 0.15,
  winner: "demo-bidder-5678",
  status: "open" as const,
};

export default function HomePage() {
  const [slots, setSlots] = useState([demoSlot]);
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<typeof demoSlot | null>(null);
  const publicKey = useWalletPublicKey();

  const handleListSlot = (slot: any) => {
    setSlots([
      ...slots,
      {
        ...slot,
        validator: publicKey || "",
        currentBid: slot.minBid,
        winner: "-",
        status: "open",
      },
    ]);
  };

  const handleBid = (amount: number) => {
    if (selectedSlot) {
      setSlots(
        slots.map((s) =>
          s === selectedSlot
            ? { ...s, currentBid: amount, winner: publicKey || "" }
            : s
        )
      );
      setBidModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#23233a] to-[#1a1a2e] text-white">
      {/* Top nav */}
      <nav className="flex items-center justify-between px-8 py-4 bg-black/60 shadow-lg sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">Solana Bandwidth Auction</span>
        </div>
        <WalletConnect />
      </nav>

      <main className="max-w-4xl mx-auto p-6 flex flex-col gap-8">
        <Tab.Group>
          <Tab.List className="flex space-x-2 rounded-xl bg-black/30 p-1 mb-6">
            <Tab className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-semibold rounded-lg
              ${selected ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow' : 'text-cyan-200 hover:bg-black/40 hover:text-white'}`
            }>Dashboard</Tab>
            <Tab className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-semibold rounded-lg
              ${selected ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow' : 'text-cyan-200 hover:bg-black/40 hover:text-white'}`
            }>List Slot</Tab>
            <Tab className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-semibold rounded-lg
              ${selected ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow' : 'text-cyan-200 hover:bg-black/40 hover:text-white'}`
            }>Auctions</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <Dashboard publicKey={publicKey} slots={slots} />
            </Tab.Panel>
            <Tab.Panel>
              <SlotListingForm onList={handleListSlot} />
            </Tab.Panel>
            <Tab.Panel>
              <h2 className="text-xl font-semibold mb-2">Available Bandwidth Slots</h2>
              {slots.length === 0 ? (
                <div className="alert alert-warning">No slots found. Showing demo slot.</div>
              ) : null}
              <div className="flex flex-col gap-4">
                {slots.map((slot, i) => (
                  <div key={i} className="">
                    <SlotCard {...slot} />
                    <button
                      className="btn btn-primary btn-sm mb-4"
                      onClick={() => {
                        setSelectedSlot(slot);
                        setBidModalOpen(true);
                      }}
                    >
                      Bid
                    </button>
                  </div>
                ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        <BidModal
          open={bidModalOpen}
          onClose={() => setBidModalOpen(false)}
          onBid={handleBid}
          minBid={selectedSlot?.minBid || 0.1}
        />
      </main>
    </div>
  );
}
