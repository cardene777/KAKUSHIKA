import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { expect } from 'chai';
import { Article } from "../types"

describe('Article Contract', function () {
  let articleContract: Article;
  let owner: Signer;
  let addr1: Signer;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    articleContract = (await ethers.deployContract("Article", [
      "Article",
      "ART",
    ])) as Article;
    await articleContract.waitForDeployment();
  });

  it('should have a valid name and symbol', async function () {
    const name = await articleContract.name();
    const symbol = await articleContract.symbol();
    expect(name).to.equal("Article");
    expect(symbol).to.equal('ART');
  });

  // Add more tests for other functions

  // Example test for parentOf function
    it('should return the correct parent ID', async function () {
      const addr1Address = await addr1.getAddress()
    await articleContract.safeMintWithParent(addr1Address, 0, 1);
    const parentId = await articleContract.parentOf(1);
    expect(parentId).to.equal(0);
  });

  // Example test for childrenOf function
  it('should return the correct children IDs', async function () {
  const addr1Address = await addr1.getAddress();
  await articleContract.safeMintWithParent(addr1Address, 0, 1); // Mint a parent token with ID 1
  await articleContract.safeMintWithParent(addr1Address, 1, 2);
  const childrenIds = await articleContract.childrenOf(1);
  expect(childrenIds).to.deep.equal([2]);
});

  // Add more tests for other functions
});
