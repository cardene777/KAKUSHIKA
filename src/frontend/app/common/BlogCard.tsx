"use client";

import { useState } from "react";
import Image from "next/image";
import { useContractRead, useContractWrite } from "wagmi";
import {
  CHAIN_ID,
  ARTICLE_CONTRACT_ADDRESS,
  EMOJI_CONTRACT_ADDRESS,
  EMOJI1,
  EMOJI2,
  EMOJI3,
} from "@common/config";
import ABI from "@contracts/Emoji.sol/Emoji.json";

const changeEmojiBytes = (emoji: string) => {
  const textEncoder = new TextEncoder();
  const emojiBytes = textEncoder.encode(emoji);

  const emojiHex = Array.from(emojiBytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return `0x${emojiHex}`;
};

interface BlogCardProps {
  imageUrl: string;
  category: string;
  description: string;
  articleTokenId: number;
}

const BlogCard: React.FC<BlogCardProps> = ({
  imageUrl,
  category,
  description,
  articleTokenId,
}) => {
  const abi = ABI.abi;
  const {
    data: emoji1Data,
  } = useContractRead({
    address: EMOJI_CONTRACT_ADDRESS,
    abi,
    chainId: CHAIN_ID,
    functionName: "emoteCountOf",
    args: [ARTICLE_CONTRACT_ADDRESS, articleTokenId, changeEmojiBytes(EMOJI1)],
    watch: true,
  });
  const { data: emoji2Data } = useContractRead({
    address: EMOJI_CONTRACT_ADDRESS,
    abi,
    chainId: CHAIN_ID,
    functionName: "emoteCountOf",
    args: [ARTICLE_CONTRACT_ADDRESS, articleTokenId, changeEmojiBytes(EMOJI2)],
    watch: true,
  });
  const { data: emoji3Data } = useContractRead({
    address: EMOJI_CONTRACT_ADDRESS,
    abi,
    chainId: CHAIN_ID,
    functionName: "emoteCountOf",
    args: [ARTICLE_CONTRACT_ADDRESS, articleTokenId, changeEmojiBytes(EMOJI3)],
    watch: true,
  });
  const { write: emoteEmoji1 } = useContractWrite({
    address: EMOJI_CONTRACT_ADDRESS,
    abi,
    functionName: "emote",
    args: [ARTICLE_CONTRACT_ADDRESS, articleTokenId, changeEmojiBytes(EMOJI1), true],
  });
  const { write: emoteEmoji2 } = useContractWrite({
    address: EMOJI_CONTRACT_ADDRESS,
    abi,
    functionName: "emote",
    args: [
      ARTICLE_CONTRACT_ADDRESS,
      articleTokenId,
      changeEmojiBytes(EMOJI2),
      true,
    ],
  });
  const { write: emoteEmoji3 } = useContractWrite({
    address: EMOJI_CONTRACT_ADDRESS,
    abi,
    functionName: "emote",
    args: [
      ARTICLE_CONTRACT_ADDRESS,
      articleTokenId,
      changeEmojiBytes(EMOJI3),
      true,
    ],
  });

  const [good, setGood] = useState<number>(0);

  const handleIncrementGood = () => {
    setGood((prevGood) => prevGood + 1);
  };

  return (
    <div className="p-4 md:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <Image src={imageUrl} alt="Logo" className="h-60" />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            CATEGORY
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-400 mb-3">
            {category}
          </h1>
          <p className="leading-relaxed mb-3">{description}</p>
          <div className="flex items-center flex-wrap">
            <a className="text-green-500 inline-flex items-center md:mb-2 lg:mb-0">
              詳細を見る
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm py-1">
              <button
                type="button"
                className="mr-1"
                onClick={() => emoteEmoji1()}
              >
                {EMOJI1}
              </button>
              {Number(emoji1Data)}
            </span>
            <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm py-1">
              <button
                type="button"
                className="mr-1"
                onClick={() => emoteEmoji2()}
              >
                {EMOJI2}
              </button>
              {Number(emoji2Data)}
            </span>
            <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
              <button
                type="button"
                className="mr-1"
                onClick={() => emoteEmoji3()}
              >
                {EMOJI3}
              </button>
              {Number(emoji3Data)}
            </span>
            <span className="text-gray-400 inline-flex items-center leading-none text-sm">
              <button
                type="button"
                className="mr-1"
                onClick={handleIncrementGood}
              >
                👍
              </button>
              {good}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
