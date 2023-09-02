"use client";

import { createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { astar, shibuya } from "./Chain";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [astar, shibuya],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export default config;
