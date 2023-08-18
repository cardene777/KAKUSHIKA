"use client";

import Image from "next/image";

import Logo from "@assets/pinterest_profile_image.png";

export default function Home() {
  return (
    <main>
      <div className="grid items-center justify-center h-screen">
        <div>
          <h1 className="mb-8 font-mono text-center text-5xl">KAKUSHIKA</h1>
          <div className="mb-12">
            <Image src={Logo} alt="Logo" className="w-full" />
          </div>
          <hr />
          <h1 className="mt-8 font-mono text-center text-2xl">
            Coming Soon...
          </h1>
        </div>
      </div>
    </main>
  );
}
