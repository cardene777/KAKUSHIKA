import { ethers } from "hardhat";
import {
  USER1_PRIVATE_KEY,
  USER2_PRIVATE_KEY,
  USER3_PRIVATE_KEY,
} from "../../config";

async function main() {
  const [author] = await ethers.getSigners();
  const authorAddress = await author.getAddress();

  const user1Wallet = new ethers.Wallet(USER1_PRIVATE_KEY);
  const user1 = user1Wallet.connect(ethers.provider);
  const user2Wallet = new ethers.Wallet(USER2_PRIVATE_KEY);
  const user2 = user2Wallet.connect(ethers.provider);
  const user3Wallet = new ethers.Wallet(USER3_PRIVATE_KEY);
  const user3 = user3Wallet.connect(ethers.provider);

  const emoji1 = Buffer.from("🥰");
  const emoji2 = Buffer.from("🤩");
  const emoji3 = Buffer.from("🚀");

  const tokenName = "Article";
  const symbol = "ART";
  const ArticleContract = await ethers.deployContract("Article", [
    tokenName,
    symbol,
  ]);

  const articleContract = await ArticleContract.waitForDeployment();

  const articleContractTx = articleContract.deploymentTransaction();

  const articleContractAddress = await articleContract.getAddress();

  console.log(`Article Contract Address: ${articleContractAddress}`);
  console.log(`Tx Hash: ${articleContractTx?.hash}`);

  const EmojiContract = await ethers.deployContract("Emoji");

  const emojiContract = await EmojiContract.waitForDeployment();

  const emojiContractTx = emojiContract.deploymentTransaction();

  console.log(`Emoji Contract Address: ${await emojiContract.getAddress()}`);
  console.log(`Tx Hash: ${emojiContractTx?.hash}`);

  await articleContract.safeMintWithParent(authorAddress, 0);
  console.log("mint parent nft ok");
  // await articleContract.safeMintWithParent(authorAddress, 1);
  // console.log("mint child 2 nft ok");
  // await articleContract.safeMintWithParent(authorAddress, 1);
  // console.log("mint child 3 nft ok");
  // await articleContract.safeMintWithParent(authorAddress, 1);
  // console.log("mint child 4 nft ok");

  // await emojiContract
  //   .connect(user1)
  //   .bulkEmote(
  //     [articleContractAddress, articleContractAddress, articleContractAddress],
  //     [2, 3, 4],
  //     [emoji1, emoji2, emoji3],
  //     [true, true, true]
  //   );
  // console.log("🥰🤩🚀 OK");
  // await emojiContract
  //   .connect(user2)
  //   .bulkEmote(
  //     [articleContractAddress, articleContractAddress, articleContractAddress],
  //     [2, 3, 4],
  //     [emoji3, emoji2, emoji1],
  //     [true, true, true]
  //   );
  // console.log("🥰🤩🚀 OK");
  // await emojiContract
  //   .connect(user3)
  //   .bulkEmote(
  //     [articleContractAddress, articleContractAddress, articleContractAddress],
  //     [2, 3, 4],
  //     [emoji2, emoji3, emoji1],
  //     [true, true, true]
  //   );
  // console.log("🥰🤩🚀 OK");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
