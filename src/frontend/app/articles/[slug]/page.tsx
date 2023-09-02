"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useAccount,
  useConnect,
  useContractRead,
  useContractWrite,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import collectionReference from "@common/polybaseConfig";
import {
  CHAIN_ID,
  ARTICLE_CONTRACT_ADDRESS,
  EMOJI_CONTRACT_ADDRESS,
  EMOJI1,
  EMOJI2,
  EMOJI3,
} from "@common/config";
import ABI from "@contracts/Emoji.sol/Emoji.json";

const abi = ABI.abi;

const changeEmojiBytes = (emoji: string) => {
  const textEncoder = new TextEncoder();
  const emojiBytes = textEncoder.encode(emoji);

  const emojiHex = Array.from(emojiBytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return `0x${emojiHex}`;
};

const Article = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { token: number, id: number };
}) => {
  const { address } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const router = useRouter();


  const { data: emoji1Data } = useContractRead({
    address: EMOJI_CONTRACT_ADDRESS,
    abi,
    chainId: CHAIN_ID,
    functionName: "emoteCountOf",
    args: [
      ARTICLE_CONTRACT_ADDRESS,
      searchParams.token,
      changeEmojiBytes(EMOJI1),
    ],
    watch: true,
  });
  const { data: emoji2Data } = useContractRead({
    address: EMOJI_CONTRACT_ADDRESS,
    abi,
    chainId: CHAIN_ID,
    functionName: "emoteCountOf",
    args: [
      ARTICLE_CONTRACT_ADDRESS,
      searchParams.token,
      changeEmojiBytes(EMOJI2),
    ],
    watch: true,
  });
  const { data: emoji3Data } = useContractRead({
    address: EMOJI_CONTRACT_ADDRESS,
    abi,
    chainId: CHAIN_ID,
    functionName: "emoteCountOf",
    args: [
      ARTICLE_CONTRACT_ADDRESS,
      searchParams.token,
      changeEmojiBytes(EMOJI3),
    ],
    watch: true,
  });
  const { write: emoteEmoji1 } = useContractWrite({
    address: EMOJI_CONTRACT_ADDRESS,
    abi,
    functionName: "emote",
    args: [
      ARTICLE_CONTRACT_ADDRESS,
      searchParams.token,
      changeEmojiBytes(EMOJI1),
      true,
    ],
  });
  const { write: emoteEmoji2 } = useContractWrite({
    address: EMOJI_CONTRACT_ADDRESS,
    abi,
    functionName: "emote",
    args: [
      ARTICLE_CONTRACT_ADDRESS,
      searchParams.token,
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
      searchParams.token,
      changeEmojiBytes(EMOJI3),
      true,
    ],
  });

  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [good, setGood] = useState<string>("");

  const getArticle = async () => {
    try {
      if (address) {
        const record: any = await collectionReference.record(params.slug).get();
        if (record) {
          setTitle(record.data.article.title);
          setSummary(record.data.article.summary);
          setContent(record.data.article.content);
          setGood(record.data.article.good);
        }
      }
    } catch {}
  };

  const goodArticle = async () => {
    if (address) {
      const recordData = await collectionReference
        .record(params.slug)
        .call("good");
    }
  };

  const deleteRecord = async () => {
    if (address) {
      await collectionReference
        .record(
          params.slug
        )
        .call("del");
      router.push("/articles");
    }
  };

  useEffect(() => {
    try {
      if (address) {
        getArticle();
      } else {
        connect();
      }
    } catch (err) {}
  }, [address, connect, getArticle]);

  return (
    <div className="flex justify-center mt-10 mb-20">
      <div className="w-1/2 grid justify-start">
        <h1 className="pb-4 font-semibold text-5xl border-b-2">{title}</h1>
        <p className="mt-8 p-4 text-lg border-2 rounded-lg border-slate-500 border-opacity-50 shadow-md shadow-slate-600">
          {summary}
        </p>
        <p className="prose mt-8 p-4 text-lg border-2 rounded-lg border-slate-500 border-opacity-50 shadow-md shadow-slate-600 text-gray-600">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {content || ""}
          </ReactMarkdown>
        </p>
        <div className="mt-8 flex">
          <p
            className="text-gray-400 mr-6 items-center text-xl"
            suppressHydrationWarning={true}
          >
            <button
              type="button"
              className="mr-2"
              onClick={() => emoteEmoji1()}
            >
              {EMOJI1}
            </button>
            {Number(emoji1Data) || 0}
          </p>
          <p
            className="text-gray-400 mr-6 items-center text-xl"
            suppressHydrationWarning={true}
          >
            <button
              type="button"
              className="mr-2"
              onClick={() => emoteEmoji2()}
            >
              {EMOJI2}
            </button>
            {Number(emoji2Data) || 0}
          </p>
          <p
            className="text-gray-400 mr-6 items-center text-xl"
            suppressHydrationWarning={true}
          >
            <button
              type="button"
              className="mr-2"
              onClick={() => emoteEmoji3()}
            >
              {EMOJI3}
            </button>
            {Number(emoji3Data) || 0}
          </p>
          <p
            className="text-gray-400 mr-6 items-center text-xl"
            suppressHydrationWarning={true}
          >
            <button type="button" className="mr-2" onClick={goodArticle}>
              👍
            </button>
            {Number(good) || 0}
          </p>
        </div>
      <div className="flex container mt-10 mx-auto">
        <button
          type="button"
            className="p-2 mr-4 border-gray-600 hover:bg-gray-200 border-4 rounded-lg text-gray-600 text-lg font-semibold"
          onClick={deleteRecord}
        >
          Delete
        </button>
      </div>
      </div>
    </div>
  );
};

export default Article;
