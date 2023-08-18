"use client";

import { useState } from "react";
import Image from "next/image";

interface BlogCardProps {
  imageUrl: string;
  category: string;
  description: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  imageUrl,
  category,
  description,
}) => {
    const [good, setGood] = useState<number>(0);
    const [emoji1, setEmoji1] = useState<number>(0);
    const [emoji2, setEmoji2] = useState<number>(0);
    const [emoji3, setEmoji3] = useState<number>(0);

    const handleIncrementGood = () => {
      setGood((prevGood) => prevGood + 1);
    };

    const handleIncrementEmoji1 = () => {
      setEmoji1((prevEmoji) => prevEmoji + 1);
    };

    const handleIncrementEmoji2 = () => {
      setEmoji2((prevEmoji) => prevEmoji + 1);
    };

    const handleIncrementEmoji3 = () => {
      setEmoji3((prevEmoji) => prevEmoji + 1);
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
                onClick={handleIncrementEmoji1}
              >
                🥰
              </button>
              {emoji1}
            </span>
            <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm py-1">
              <button
                type="button"
                className="mr-1"
                onClick={handleIncrementEmoji2}
              >
                ✨
              </button>
              {emoji2}
            </span>
            <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
              <button
                type="button"
                className="mr-1"
                onClick={handleIncrementEmoji3}
              >
                🤩
              </button>
              {emoji3}
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
