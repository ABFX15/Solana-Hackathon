import React from "react";

export interface SlotCardProps {
  validator: string;
  speed: number;
  start: string;
  end: string;
  minBid: number;
  currentBid: number;
  winner: string;
  status: "open" | "closed";
}

const SlotCard: React.FC<SlotCardProps> = ({
  validator,
  speed,
  start,
  end,
  minBid,
  currentBid,
  winner,
  status,
}) => (
  <div className="card glass-effect border-2 border-cyan-500/30 shadow-cyan-lg mb-6 animate-fadeIn hover:scale-[1.025] transition-transform duration-300">
    <div className="card-body flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-cyan-900/40 text-cyan-300 mr-2 animate-float">
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 17v-2a4 4 0 014-4h8a4 4 0 014 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </span>
        <h2 className="card-title gradient-text text-2xl">Bandwidth Slot</h2>
        <span
          className={`badge badge-cyan uppercase ml-2 ${
            status === "open" ? "badge-success" : "badge-error"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="flex flex-wrap gap-3 text-sm">
        <span className="badge badge-cyan">
          <b>Validator:</b> {validator.slice(0, 8)}...
        </span>
        <span className="badge badge-cyan">
          <b>Speed:</b> {speed} Mbps
        </span>
        <span className="badge badge-cyan">
          <b>Start:</b> {start}
        </span>
        <span className="badge badge-cyan">
          <b>End:</b> {end}
        </span>
      </div>
      <div className="flex flex-wrap gap-3 text-sm mt-2">
        <span className="badge badge-warning">
          <b>Min Bid:</b> {minBid} SOL
        </span>
        <span className="badge badge-success">
          <b>Current Bid:</b> {currentBid} SOL
        </span>
        <span className="badge badge-cyan">
          <b>Winner:</b> {winner === "-" ? "None" : winner.slice(0, 8) + "..."}
        </span>
      </div>
    </div>
  </div>
);

export default SlotCard;
