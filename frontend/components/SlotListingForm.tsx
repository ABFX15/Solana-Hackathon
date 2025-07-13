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
      className="glass-effect border-2 border-cyan-500/30 shadow-cyan-lg p-6 rounded-2xl mb-8 animate-fadeIn"
      onSubmit={(e) => {
        e.preventDefault();
        onList({ speed, start, end, minBid });
      }}
    >
      <h3 className="hero-title text-3xl mb-4 animate-gradient-text">
        List Bandwidth Slot
      </h3>
      <div className="input-group mb-3">
        <label className="label flex items-center gap-2 text-cyber">
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M13 16h-1v-4h-1m4 4h1a2 2 0 002-2v-5a2 2 0 00-2-2h-1.5a1.5 1.5 0 01-3 0H7a2 2 0 00-2 2v5a2 2 0 002 2h1" />
          </svg>
          Speed (Mbps)
        </label>
        <input
          type="number"
          className="input input-premium"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          min={1}
        />
      </div>
      <div className="input-group mb-3">
        <label className="label flex items-center gap-2 text-cyber">
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Start Time
        </label>
        <input
          type="datetime-local"
          className="input input-premium"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </div>
      <div className="input-group mb-3">
        <label className="label flex items-center gap-2 text-cyber">
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          End Time
        </label>
        <input
          type="datetime-local"
          className="input input-premium"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>
      <div className="input-group mb-3">
        <label className="label flex items-center gap-2 text-cyber">
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 8c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0 2c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z" />
          </svg>
          Minimum Bid (SOL)
        </label>
        <input
          type="number"
          className="input input-premium"
          value={minBid}
          onChange={(e) => setMinBid(Number(e.target.value))}
          min={0.01}
          step={0.01}
        />
      </div>
      <button
        className="btn btn-primary w-full mt-4 animate-shimmer connect-button-glow"
        type="submit"
      >
        List Slot
      </button>
    </form>
  );
};

export default SlotListingForm;
