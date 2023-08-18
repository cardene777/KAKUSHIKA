import { ethers } from "hardhat";

async function main() {
  const EmojiContract = await ethers.deployContract("Emoji");

  const contract = await EmojiContract.waitForDeployment();

  const deploymentTx = contract.deploymentTransaction()

  console.log(`Contract Address: ${await contract.getAddress()}`);
  console.log(`Tx Hash: ${deploymentTx?.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
