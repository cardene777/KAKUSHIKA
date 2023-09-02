"use client"

import { useEffect, useState } from "react";
import BlogCard from "@common/BlogCard";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import collectionReference from "@common/polybaseConfig";

import Article1 from "@assets/article1.svg";
import Article2 from "@assets/article2.svg";

const images = [Article1, Article2]

const Articles = () => {
  const [allArticle, setAllArticle] = useState<any>([])
   const { address } = useAccount();
   const { connect } = useConnect({
     connector: new InjectedConnector(),
   });
  const getAllRecord = async () => {
    const records = await collectionReference.get();
    if (records) {
      setAllArticle(records.data);
    }
  }

  useEffect(() => {
    try {
      if (!address) {
        connect();
      } else {
        if (allArticle.length === 0) {
          getAllRecord();
        }
      }
    } catch (err) {

    }
  }, [address, allArticle.length, connect])

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {allArticle.map((article: any, index: number) => (
            <BlogCard
              key={index}
              id={article.data.id}
              imageUrl={images[index % 2]}
              category="Poem"
              description={article.data.article.summary}
              articleTokenId={Number(article.data.article.tokenId)}
              good={article.data.article.good}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
