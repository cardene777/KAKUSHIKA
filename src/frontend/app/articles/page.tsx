"use client";

import BlogCard from "@common/BlogCard";

import Article1 from "@assets/article1.svg";
import Article2 from "@assets/article2.svg";
import Article3 from "@assets/article3.svg";

const Articles = () => {
  const description1 =
    "ERCについてまとめた記事になります。気になったERCの詳細を見るなど、辞書的な使い方をしてください！";
  const description2 =
    "Ethereumとは何か？1からわかりやすく解説しています。Ethereumの基礎を理解していきましょう！";
  const description3 =
    "Bitcoinとは何か？1からわかりやすく解説しています。Bitcoinの基礎を理解していきましょう！";
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          <BlogCard
            imageUrl={Article1}
            category="ERC"
            description={description1}
            articleTokenId={2}
          />
          <BlogCard
            imageUrl={Article2}
            category="Ethereum"
            description={description2}
            articleTokenId={3}
          />
          <BlogCard
            imageUrl={Article3}
            category="Bitcoin"
            description={description3}
            articleTokenId={4}
          />
        </div>
      </div>
    </section>
  );
};

export default Articles;
