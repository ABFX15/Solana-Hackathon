import React from "react";

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
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
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8 animate-fade-in">
              <div className="inline-block relative">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center animate-pulse-glow">
                  <span className="text-6xl">🛸</span>
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Solana Bandwidth Exchange
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                🚀 The First Decentralized Bandwidth Marketplace in the Galaxy
              </p>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Trade bandwidth across the cosmic network. Validators auction
                their excess capacity, while space explorers bid for the data
                transmission they need.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={onGetStarted}
                className="btn-space-primary text-lg px-8 py-4 rounded-full font-semibold"
              >
                🚀 Launch Mission Control
              </button>
              <button className="btn-space-secondary text-lg px-8 py-4 rounded-full font-semibold">
                📡 Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="space-card hover-lift">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-2xl font-bold text-cyan-400">
                  Real-Time
                </div>
                <div className="text-sm text-gray-400">
                  Instant bandwidth auctions
                </div>
              </div>
              <div className="space-card hover-lift">
                <div className="text-3xl mb-2">🌌</div>
                <div className="text-2xl font-bold text-purple-400">
                  Decentralized
                </div>
                <div className="text-sm text-gray-400">
                  Powered by Solana blockchain
                </div>
              </div>
              <div className="space-card hover-lift">
                <div className="text-3xl mb-2">💎</div>
                <div className="text-2xl font-bold text-pink-400">
                  Trustless
                </div>
                <div className="text-sm text-gray-400">
                  Smart contract automation
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              🌟 How the Space Network Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center space-card hover-lift">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                  <span className="text-3xl">📡</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-cyan-300">
                  1. Launch Satellite
                </h3>
                <p className="text-gray-400">
                  Validators deploy their bandwidth satellites into the
                  marketplace with custom speed, timing, and minimum bid
                  requirements.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center space-card hover-lift">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-purple-300">
                  2. Compete for Data
                </h3>
                <p className="text-gray-400">
                  Space explorers place bids on bandwidth slots they need.
                  Higher bids win, with automatic refunds for outbid
                  participants.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center space-card hover-lift">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                  <span className="text-3xl">💎</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-yellow-300">
                  3. Harvest Rewards
                </h3>
                <p className="text-gray-400">
                  When auctions end, validators can claim their earnings while
                  winners get access to the bandwidth they purchased.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              ✨ Advanced Space Technologies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-card hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-xl">⚡</span>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-300">
                    Lightning Fast
                  </h3>
                </div>
                <p className="text-gray-400">
                  Solana's high-speed blockchain ensures instant transaction
                  processing and real-time auction updates.
                </p>
              </div>

              <div className="space-card hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                    <span className="text-xl">🔒</span>
                  </div>
                  <h3 className="text-lg font-semibold text-green-300">
                    Secure Escrow
                  </h3>
                </div>
                <p className="text-gray-400">
                  Smart contracts handle all payments with automatic escrow,
                  ensuring secure transactions for all participants.
                </p>
              </div>

              <div className="space-card hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                    <span className="text-xl">🌐</span>
                  </div>
                  <h3 className="text-lg font-semibold text-purple-300">
                    Global Network
                  </h3>
                </div>
                <p className="text-gray-400">
                  Connect with validators and users across the entire Solana
                  ecosystem for maximum bandwidth availability.
                </p>
              </div>

              <div className="space-card hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <span className="text-xl">📊</span>
                  </div>
                  <h3 className="text-lg font-semibold text-yellow-300">
                    Real-Time Analytics
                  </h3>
                </div>
                <p className="text-gray-400">
                  Track your earnings, bandwidth usage, and auction performance
                  with comprehensive dashboard analytics.
                </p>
              </div>

              <div className="space-card hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                    <span className="text-xl">🔄</span>
                  </div>
                  <h3 className="text-lg font-semibold text-cyan-300">
                    Auto-Refunds
                  </h3>
                </div>
                <p className="text-gray-400">
                  Automatic refund system ensures outbid participants get their
                  SOL back instantly when someone places a higher bid.
                </p>
              </div>

              <div className="space-card hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                    <span className="text-xl">🎯</span>
                  </div>
                  <h3 className="text-lg font-semibold text-pink-300">
                    Fair Auctions
                  </h3>
                </div>
                <p className="text-gray-400">
                  Transparent, time-based auctions with clear rules and
                  validator-controlled closing mechanisms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              🚀 Ready to Explore the Bandwidth Galaxy?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of validators and users already trading bandwidth
              on the most advanced decentralized network in the cosmos.
            </p>
            <button
              onClick={onGetStarted}
              className="btn-space-primary text-xl px-12 py-6 rounded-full font-semibold"
            >
              🛸 Launch Your Space Mission
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
