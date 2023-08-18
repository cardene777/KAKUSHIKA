import { ethers } from "hardhat";

async function main() {
    const tokenName = "Article"
    const symbol = "ART"
  const ArticleContract = await ethers.deployContract("Article", [
    tokenName,
    symbol,
  ]);

  const contract = await ArticleContract.waitForDeployment();

  const deploymentTx = contract.deploymentTransaction()

  console.log(`Contract Address: ${await contract.getAddress()}`);
  console.log(`Tx Hash: ${deploymentTx?.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
