"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const WalletConnect: React.FC = () => (
  <WalletMultiButton className="btn btn-accent connect-button-glow animate-float-welcome text-lg px-6 py-2 shadow-cyan-lg border-2 border-cyan-400/40" />
);

export default WalletConnect;
