"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useConnect, useContractRead, useContractWrite } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import collectionReference from "@common/polybaseConfig";
import { hashString } from "@common/lib";
import {
  ARTICLE_CONTRACT_ADDRESS,
  EMOJI_CONTRACT_ADDRESS,
  CHAIN_ID,
} from "@common/config";
import ABI from "@contracts/Article.sol/Article.json";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@common/components";
import AutosizeTextarea from "react-textarea-autosize";

const createRecord = async (
  address: any,
  title: string,
  summary: string,
  content: string,
  tokenId: number,
) => {
  await collectionReference.create([
    hashString(address + Date.now()),
    address?.toLowerCase(),
    title,
    summary,
    content,
    tokenId,
  ]);
};

export default function CreateArticle() {
  const abi = ABI.abi;
  const { address } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { data: articleTokenId, refetch } = useContractRead({
    address: ARTICLE_CONTRACT_ADDRESS,
    abi,
    chainId: CHAIN_ID,
    functionName: "getLastTokenId",
    watch: true,
  });
  const { writeAsync: mintNft } = useContractWrite({
    address: ARTICLE_CONTRACT_ADDRESS,
    abi,
    functionName: "safeMintWithParent",
    args: [address, 1],
  });
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      await mintNft();
      await refetch();
      console.log(`articleTokenId: ${articleTokenId}`);
      await createRecord(address, title, summary, content, Number(articleTokenId) - 1);
      setLoading(false);
      router.push("/articles");
    } catch(err) {
      console.log(`err: ${err}`)
    }
  };

  useEffect(() => {
    try {
      if (!address) {
        connect();
      }
    } catch (err) {}
  }, [address, connect]);

  return (
    <div className="container px-5 py-24 mx-auto">
      <Heading className="">Create Article</Heading>

      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>タイトル</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          <FormLabel>要約</FormLabel>
          <Input value={summary} onChange={(e) => setSummary(e.target.value)} />

          <FormLabel>本文</FormLabel>
          <Textarea
            className="h-100"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            size="lg"
            rows={5}
            as={AutosizeTextarea}
            minH="unset"
            overflow="hidden"
            minRows={1}
          />
          <Button
            type="submit"
            color="white"
            bg="orange.400"
            isLoading={loading}
            mt={4}
          >
            作成
          </Button>
        </FormControl>
      </form>
    </div>
  );
}
