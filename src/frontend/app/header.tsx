"use client";

import { useEffect } from "react"
import Link from "next/link";
import Image from "next/image";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { createWalletClient, custom } from "viem";
import { sepolia } from "@wagmi/core/chains";

import Logo from "@assets/pinterest_profile_image.png";

// declare global {
//   interface Window {
//     ethereum?: any
//   }
// }

const Header = () => {
  // const walletClient = createWalletClient({
  //   chain: sepolia,
  //   transport: custom(window?.ethereum),
  // });
  const { address } = useAccount();
  const { connect, connectAsync } = useConnect({
    chainId: sepolia.id,
    connector: new InjectedConnector(),
  });

  const handleWalletConnect = async () => {
    await connectAsync();
  };

  const connectChain = async () => {
    try {
      // await walletClient.addChain({ chain: sepolia });
      connect();
    } catch (err) {
      console.log();
    }
  };

  useEffect(() => {
    if (!address) connectChain();
  }, [address]);

  return (
    <header className="bg-cyan-800 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <Image src={Logo} alt="Logo" className="w-1/6" />
          <span className="ml-3 text-xl">KAKUSHIKA</span>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link href="/" className="mr-5 hover:text-gray-900">
            Home
          </Link>
          <Link href="/articles" className="mr-5 hover:text-gray-900">
            Articles
          </Link>
        </nav>
        <button
          type="button"
          className={`inline-flex items-center bg-gray-600 border-0 py-3 px-3 focus:outline-none ${
            address ? "hover:bg-gray-600" : "hover:bg-gray-500"
          } rounded text-base mt-4 md:mt-0"
          control-id="ControlID-139`}
          onClick={handleWalletConnect}
          disabled={address ? true : false}
        >
          {address ? address : "Wallet Connect"}
          {address ? '' :
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          }
        </button>
      </div>
    </header>
  );
};

export default Header;
