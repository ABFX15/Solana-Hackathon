import React from "react";

interface DashboardProps {
  publicKey: string | null;
  slots: any[];
}

const Dashboard: React.FC<DashboardProps> = ({ publicKey, slots }) => {
  if (!publicKey) {
    return (
      <div className="alert alert-info mb-4 animate-fadeIn">
        Connect your wallet to see your dashboard.
      </div>
    );
  }

  const myListed = slots.filter((slot) => slot.validator === publicKey);
  const myWon = slots.filter((slot) => slot.winner === publicKey);
  const totalEarnings = myListed.reduce(
    (sum, slot) => sum + (slot.currentBid || 0),
    0
  );
  const totalUsed = myWon.reduce((sum, slot) => sum + (slot.speed || 0), 0);

  return (
    <div className="mb-8 animate-fadeIn">
      <h2 className="hero-title text-3xl mb-4 gradient-text animate-gradient-text">
        My Dashboard
      </h2>
      <div className="stats stats-vertical lg:stats-horizontal shadow-cyan-lg glass-effect border-2 border-cyan-500/30 mb-6 animate-float">
        <div className="stat">
          <div className="stat-title flex items-center gap-2 text-cyber">
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
            Total Earnings
          </div>
          <div className="stat-value gradient-text text-2xl">
            {totalEarnings} <span className="text-cyan-400">SOL</span>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title flex items-center gap-2 text-cyber">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 17v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Bandwidth Given Up
          </div>
          <div className="stat-value text-cyan-300 text-2xl">
            {myListed.length} <span className="text-cyan-400">slots</span>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title flex items-center gap-2 text-cyber">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M13 16h-1v-4h-1" />
              <path d="M17 16h1a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2h-1.5a1.5 1.5 0 0 1-3 0H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1" />
            </svg>
            Bandwidth Used
          </div>
          <div className="stat-value text-cyan-300 text-2xl">
            {totalUsed} <span className="text-cyan-400">Mbps</span>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <b className="text-cyber text-cyan-300">My Listed Slots:</b>
        <ul className="list-disc ml-6 mt-1 space-y-1">
          {myListed.length === 0 ? (
            <li className="text-gray-400">None</li>
          ) : (
            myListed.map((slot, i) => (
              <li key={i} className="text-futura text-cyan-200">
                {slot.speed} Mbps, {slot.start} - {slot.end},{" "}
                <span className="badge badge-success">
                  Highest Bid: {slot.currentBid} SOL
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
      <div>
        <b className="text-cyber text-cyan-300">My Won Slots:</b>
        <ul className="list-disc ml-6 mt-1 space-y-1">
          {myWon.length === 0 ? (
            <li className="text-gray-400">None</li>
          ) : (
            myWon.map((slot, i) => (
              <li key={i} className="text-futura text-cyan-200">
                {slot.speed} Mbps, {slot.start} - {slot.end},{" "}
                <span className="badge badge-cyan">
                  Bid: {slot.currentBid} SOL
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
