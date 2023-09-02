"use client";

import { useEffect } from "react"
import Link from "next/link";
import Image from "next/image";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { createWalletClient, custom } from "viem";
import { shibuya } from "@lib/Chain";

import Logo from "@assets/pinterest_profile_image.png";

const Header = () => {
  const { address } = useAccount();
  const { connect, connectAsync } = useConnect({
    chainId: shibuya.id,
    connector: new InjectedConnector(),
  });

  const handleWalletConnect = async () => {
    await connectAsync();
  };

  useEffect(() => {
    if (!address) {
      try {
        connect();
      } catch (err) {
        console.log();
      }
    };
  }, [address, connect]);

  return (
    <header className="bg-cyan-700 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <Image src={Logo} alt="Logo" className="w-1/6" />
          <span className="ml-3 text-xl">KAKUSHIKA</span>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base text-slate-300 font-semibold justify-center">
          <Link
            href="/"
            className="mr-5 hover:text-white hover:font-bold hover:border-b-2 hover:border-white"
          >
            Home
          </Link>
          <Link
            href="/articles"
            className="mr-5 hover:text-white hover:font-bold hover:border-b-2 hover:border-white"
          >
            Articles
          </Link>
          <Link
            href="/articles/new"
            className="py-2 px-4 inline-flex items-center border-4 rounded-lg border-slate-300 hover:bg-slate-500"
          >
            記事を書く
          </Link>
        </nav>
        <div className="flex flex-end items-center text-base justify-center text-slate-300 font-semibold">
          <button
            type="button"
            className={`bg-gray-600 border-0 py-3 px-4 focus:outline-none ${
              address ? "hover:bg-gray-600" : "hover:bg-gray-500"
            } rounded-lg text-white"
          control-id="ControlID-139`}
            onClick={handleWalletConnect}
            disabled={address ? true : false}
          >
            {address ? address : "Wallet Connect"}
            {address ? (
              ""
            ) : (
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
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
