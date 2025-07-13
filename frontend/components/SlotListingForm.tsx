"use client";
import React, { useState } from "react";

interface SlotListingFormProps {
  onList: (slot: any) => void;
}

const SlotListingForm: React.FC<SlotListingFormProps> = ({ onList }) => {
  const [speed, setSpeed] = useState(100);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [minBid, setMinBid] = useState(0.1);

  return (
    <form
      className="card bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 mb-8"
      onSubmit={(e) => {
        e.preventDefault();
        onList({ speed, start, end, minBid });
      }}
    >
      <h3 className="text-3xl font-bold mb-4 text-white">
        List Bandwidth Slot
      </h3>
      <div className="mb-4">
        <label className="block text-cyan-400 mb-2 font-medium">
          Speed (Mbps)
        </label>
        <input
          type="number"
          className="input-field w-full"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          min={1}
        />
      </div>
      <div className="mb-4">
        <label className="block text-cyan-400 mb-2 font-medium">
          Start Time
        </label>
        <input
          type="datetime-local"
          className="input-field w-full"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-cyan-400 mb-2 font-medium">End Time</label>
        <input
          type="datetime-local"
          className="input-field w-full"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-cyan-400 mb-2 font-medium">
          Minimum Bid (SOL)
        </label>
        <input
          type="number"
          className="input-field w-full"
          value={minBid}
          onChange={(e) => setMinBid(Number(e.target.value))}
          min={0.01}
          step={0.01}
        />
      </div>
      <button className="btn-primary w-full" type="submit">
        List Slot
      </button>
    </form>
  );
};

export default SlotListingForm;
