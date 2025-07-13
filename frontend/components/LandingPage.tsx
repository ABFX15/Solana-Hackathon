import React from "react";
import WalletConnect from "./WalletConnect";

interface LandingPageProps {
  onGetStarted?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = () => {
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
                <WalletConnect />
              </div>
            </div>
          </div>
        </nav>

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

            {/* Wallet Connection CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="flex flex-col items-center gap-4">
                <WalletConnect />
                <p className="text-sm text-gray-400">
                  Connect your wallet to start trading bandwidth
                </p>
              </div>
              <a
                href="#features"
                className="btn-space-secondary text-lg px-8 py-4 rounded-full font-semibold"
              >
                📡 Learn More
              </a>
            </div>

            {/* Demo Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
              <div className="space-card hover-lift">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-3xl font-bold text-cyan-400">~400ms</div>
                <div className="text-sm text-gray-400">Transaction Speed</div>
              </div>
              <div className="space-card hover-lift">
                <div className="text-3xl mb-2">💎</div>
                <div className="text-3xl font-bold text-purple-400">
                  $0.00025
                </div>
                <div className="text-sm text-gray-400">Avg. Fee (SOL)</div>
              </div>
              <div className="space-card hover-lift">
                <div className="text-3xl mb-2">🌌</div>
                <div className="text-3xl font-bold text-pink-400">24/7</div>
                <div className="text-sm text-gray-400">Network Uptime</div>
              </div>
              <div className="space-card hover-lift">
                <div className="text-3xl mb-2">🚀</div>
                <div className="text-3xl font-bold text-green-400">1000+</div>
                <div className="text-sm text-gray-400">Validators Ready</div>
              </div>
            </div>

            {/* Key Benefits */}
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

        {/* Demo Showcase */}
        <section className="py-20 px-4 bg-black/20 backdrop-blur-sm border-y border-purple-500/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              🎯 Live Demo Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column - Screenshots/Demo */}
              <div className="space-y-6">
                <div className="space-card">
                  <h3 className="text-2xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                    <span>📊</span>
                    <span>Mission Control Dashboard</span>
                  </h3>
                  <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-lg p-6 border border-purple-500/30">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">
                          Active Satellites:
                        </span>
                        <span className="text-cyan-400 font-bold">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Total Bandwidth:</span>
                        <span className="text-purple-400 font-bold">
                          2.4 Gbps
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Earnings:</span>
                        <span className="text-green-400 font-bold">
                          45.7 SOL
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Network Status:</span>
                        <span className="text-green-400 font-bold flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          Online
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-card">
                  <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                    <span>🎯</span>
                    <span>Smart Auction System</span>
                  </h3>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Automatic bid validation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Instant refund system
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Validator-controlled closing
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Escrow protection
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column - Technical Specs */}
              <div className="space-y-6">
                <div className="space-card">
                  <h3 className="text-2xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                    <span>⚙️</span>
                    <span>Technical Excellence</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300">
                        Built on Solana (65k TPS)
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <span className="text-gray-300">
                        Anchor Framework (Rust)
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                      <span className="text-gray-300">
                        Next.js + TypeScript
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300">
                        Real-time WebSocket updates
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-card">
                  <h3 className="text-xl font-bold text-pink-300 mb-4 flex items-center gap-2">
                    <span>🚀</span>
                    <span>Performance Metrics</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">
                        &lt; 500ms
                      </div>
                      <div className="text-xs text-gray-400">Avg Response</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">
                        99.9%
                      </div>
                      <div className="text-xs text-gray-400">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">
                        10Gbps
                      </div>
                      <div className="text-xs text-gray-400">Max Bandwidth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">
                        0.1%
                      </div>
                      <div className="text-xs text-gray-400">Platform Fee</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="features" className="py-20 px-4">
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

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              🚀 Ready to Explore the Bandwidth Galaxy?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Connect your wallet to join the decentralized bandwidth
              marketplace
            </p>
            <div className="flex justify-center">
              <WalletConnect />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
