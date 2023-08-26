"use client"

import { useEffect, useState } from "react";
import BlogCard from "@common/BlogCard";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import collectionReference from "@common/polybaseConfig";
import { article1, article2 } from "@common/data/article";

import Article1 from "@assets/article1.svg";
import Article2 from "@assets/article2.svg";

const images = [Article1, Article2]

const Articles = () => {
  const [allArticle, setAllArticle] = useState<any>([])
   const { address } = useAccount();
   const { connect } = useConnect({
     connector: new InjectedConnector(),
   });
  const description1 =
    "ERCについてまとめた記事になります。気になったERCの詳細を見るなど、辞書的な使い方をしてください！";
  const description2 =
    "Ethereumとは何か？1からわかりやすく解説しています。Ethereumの基礎を理解していきましょう！";
  const description3 =
    "Bitcoinとは何か？1からわかりやすく解説しています。Bitcoinの基礎を理解していきましょう！";

  const createRecord = async () => {
    if (address) {
      await collectionReference.create([
        1,
        address?.toLowerCase(),
        "アウトプットはいいぞ！",
        "アウトプットをしてみてよかったことをまとめて、「アウトプットしてみようよ！」ってことを伝えたいと思います。",
        article1,
      ]);
      await collectionReference.create([
        2,
        address?.toLowerCase(),
        "あれ？まだアウトプットしてないの？",
        "アウトプットを推奨しつつ、「もっと気軽にアウトプットしていこう！」というメッセージを込めてあなたにお届けします。",
        article2,
      ]);
    }
  }

  const getAllRecord = async () => {
    const records = await collectionReference.get();
    console.log(`records: ${JSON.stringify(records)}`);
    if (records) {
      setAllArticle(records.data);
    }
  }

  const deleteRecord = async () => {
    if (address) {
      await collectionReference.record("1").call("del");
      await collectionReference.record("2").call("del");
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
  }, [address, connect])

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {allArticle.map((article: any) => (
            <BlogCard
              key={article.data.id}
              id={article.data.id}
              imageUrl={images[article.data.id % 2]}
              category="Poem"
              description={article.data.article.summary}
              articleTokenId={Number(article.data.id) + 1}
              good={article.data.article.good}
            />
          ))}
        </div>
      </div>
      <div className="flex container px-5 py-24 mx-auto">
        <button
          type="button"
          className="p-2 mr-4 border-slate-500 border-2 rounded-lg text-slate-300 text-lg font-semibold"
          onClick={createRecord}
        >
          Record
        </button>
        <button
          type="button"
          className="p-2 mr-4 border-slate-500 border-2 rounded-lg text-slate-300 text-lg font-semibold"
          onClick={deleteRecord}
        >
          Delete
        </button>
      </div>
    </section>
  );
};

export default Articles;
