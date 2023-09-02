import { Chain } from "wagmi";

export const astar = {
  id: 592,
  name: "Astar",
  network: "Astar",
  nativeCurrency: {
    decimals: 18,
    name: "Astar",
    symbol: "ASTR",
  },
  rpcUrls: {
    public: { http: ["https://evm.astar.network"] },
    default: { http: ["https://evm.astar.network"] },
  },
  blockExplorers: {
    subscan: { name: "Subscan", url: "https://astar.subscan.io/" },
    default: { name: "Subscan", url: "https://astar.subscan.io/" },
  },
} as const satisfies Chain;

export const shibuya = {
  id: 81,
  name: "Shibuya",
  network: "Shibuya",
  nativeCurrency: {
    decimals: 18,
    name: "Shibuya",
    symbol: "SBY",
  },
  rpcUrls: {
    public: { http: ["https://evm.shibuya.astar.network/"] },
    default: { http: ["https://evm.shibuya.astar.network/"] },
  },
  blockExplorers: {
    subscan: { name: "Subscan", url: "https://shibuya.subscan.io/" },
    default: { name: "Subscan", url: "https://shibuya.subscan.io/" },
  },
} as const satisfies Chain;
