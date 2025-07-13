"use client";

import React, { useState } from "react";

interface BidModalProps {
  open: boolean;
  onClose: () => void;
  onBid: (amount: number) => void;
  minBid: number;
}

const BidModal: React.FC<BidModalProps> = ({
  open,
  onClose,
  onBid,
  minBid,
}) => {
  const [amount, setAmount] = useState(minBid);
  if (!open) return null;
  return (
    <div className="modal modal-open animate-fadeIn">
      <div className="modal-box glass-effect border-2 border-cyan-500/30 shadow-cyan-lg animate-float">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-900/40 text-cyan-300 animate-float">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 8c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0 2c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z" />
            </svg>
          </span>
          <h3 className="font-bold text-lg gradient-text">Place a Bid</h3>
        </div>
        <input
          type="number"
          className="input input-premium w-full mb-4"
          value={amount}
          min={minBid}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <div className="modal-action flex gap-2">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary connect-button-glow"
            onClick={() => onBid(amount)}
          >
            Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidModal;
