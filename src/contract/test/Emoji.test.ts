import { ethers } from "hardhat";
import { expect } from "chai";
import { Signer } from 'ethers';
import { ERC721Mock, Emoji } from "../types";


describe("Emoji", async function () {
  let token: ERC721Mock;
  let repository: Emoji;
  let owner: Signer;
  let addrs: Signer[];
  const tokenId = 1n;
  const emoji1 = Buffer.from("😎");
  const emoji2 = Buffer.from("😁");

  beforeEach(async function () {
      [owner, ...addrs] = await ethers.getSigners();
      token = await ethers.deployContract('ERC721Mock', [
          "ERC721Mock",
          "721Mock"
      ]) as ERC721Mock;
    await token.waitForDeployment();
    repository = await ethers.deployContract('Emoji') as Emoji;
    await repository.waitForDeployment();
  });

  it("can support IERC6381", async function () {
    expect(await repository.supportsInterface("0xd9fac55a")).to.equal(true);
  });

  it("can support IERC165", async function () {
    expect(await repository.supportsInterface("0x01ffc9a7")).to.equal(true);
  });

  it("does not support other interfaces", async function () {
    expect(await repository.supportsInterface("0xffffffff")).to.equal(false);
  });

  describe("With minted tokens", async function () {
    beforeEach(async function () {
      await token.mint(await owner.getAddress(), tokenId);
    });

    it("can emote", async function () {
      await expect(
        repository.connect(addrs[0]).emote(await token.getAddress(), tokenId, emoji1, true)
      )
        .to.emit(repository, "Emoted")
        .withArgs(
          await addrs[0].getAddress(),
          await token.getAddress(),
          Number(tokenId),
          emoji1,
          true
        );
      expect(
        await repository.emoteCountOf(await token.getAddress(), tokenId, emoji1)
      ).to.equal(1n);
    });

    it("can undo emote", async function () {
      await repository.emote(await token.getAddress(), tokenId, emoji1, true);

      await expect(repository.emote(await token.getAddress(), tokenId, emoji1, false))
        .to.emit(repository, "Emoted")
        .withArgs(
          await owner.getAddress(),
          await token.getAddress(),
          Number(tokenId),
          emoji1,
          false
        );
      expect(
        await repository.emoteCountOf(await token.getAddress(), tokenId, emoji1)
      ).to.equal(0n);
    });

    it("can be emoted from different accounts", async function () {
      await repository
        .connect(addrs[0])
        .emote(await token.getAddress(), tokenId, emoji1, true);
      await repository
        .connect(addrs[1])
        .emote(await token.getAddress(), tokenId, emoji1, true);
      await repository
        .connect(addrs[2])
        .emote(await token.getAddress(), tokenId, emoji2, true);
      expect(
        await repository.emoteCountOf(await token.getAddress(), tokenId, emoji1)
      ).to.equal(2n);
      expect(
        await repository.emoteCountOf(await token.getAddress(), tokenId, emoji2)
      ).to.equal(1n);
    });

    it("can add multiple emojis to same NFT", async function () {
      await repository.emote(await token.getAddress(), tokenId, emoji1, true);
      await repository.emote(await token.getAddress(), tokenId, emoji2, true);
      expect(
        await repository.emoteCountOf(await token.getAddress(), tokenId, emoji1)
      ).to.equal(1n);
      expect(
        await repository.emoteCountOf(await token.getAddress(), tokenId, emoji2)
      ).to.equal(1n);
    });

    it("does nothing if new state is the same as old state", async function () {
      await repository.emote(await token.getAddress(), tokenId, emoji1, true);
      await repository.emote(await token.getAddress(), tokenId, emoji1, true);
      expect(
        await repository.emoteCountOf(await token.getAddress(), tokenId, emoji1)
      ).to.equal(1n);

      await repository.emote(await token.getAddress(), tokenId, emoji2, false);
      expect(
        await repository.emoteCountOf(await token.getAddress(), tokenId, emoji2)
      ).to.equal(0n);
    });

    it("can bulk emote", async function () {
      expect(
        await repository.bulkEmoteCountOf(
          [await token.getAddress(), await token.getAddress()],
          [tokenId, tokenId],
          [emoji1, emoji2]
        )
      ).to.eql([0n, 0n]);

      expect(
        await repository.haveEmotersUsedEmotes(
          [await owner.getAddress(), await owner.getAddress()],
          [await token.getAddress(), await token.getAddress()],
          [tokenId, tokenId],
          [emoji1, emoji2]
        )
      ).to.eql([false, false]);

      await expect(
        repository.bulkEmote(
          [await token.getAddress(), await token.getAddress()],
          [tokenId, tokenId],
          [emoji1, emoji2],
          [true, true]
        )
      )
        .to.emit(repository, "Emoted")
        .withArgs(
          await owner.getAddress(),
          await token.getAddress(),
          Number(tokenId),
          emoji1,
          true
        )
        .to.emit(repository, "Emoted")
        .withArgs(
          await owner.getAddress(),
          await token.getAddress(),
          Number(tokenId),
          emoji2,
          true
        );

      expect(
        await repository.bulkEmoteCountOf(
          [await token.getAddress(), await token.getAddress()],
          [tokenId, tokenId],
          [emoji1, emoji2]
        )
      ).to.eql([1n, 1n]);

      expect(
        await repository.haveEmotersUsedEmotes(
          [await owner.getAddress(), await owner.getAddress()],
          [await token.getAddress(), await token.getAddress()],
          [tokenId, tokenId],
          [emoji1, emoji2]
        )
      ).to.eql([true, true]);
    });

    it("can bulk undo emote", async function () {
      await expect(
        repository.bulkEmote(
          [await token.getAddress(), await token.getAddress()],
          [tokenId, tokenId],
          [emoji1, emoji2],
          [true, true]
        )
      )
        .to.emit(repository, "Emoted")
        .withArgs(
          await owner.getAddress(),
          await token.getAddress(),
          Number(tokenId),
          emoji1,
          true
        )
        .to.emit(repository, "Emoted")
        .withArgs(
          await owner.getAddress(),
          await token.getAddress(),
          Number(tokenId),
          emoji2,
          true
        );

      expect(
        await repository.bulkEmoteCountOf(
          [await token.getAddress(), await token.getAddress()],
          [tokenId, tokenId],
          [emoji1, emoji2]
        )
      ).to.eql([1n, 1n]);

      expect(
        await repository.haveEmotersUsedEmotes(
          [await owner.getAddress(), await owner.getAddress()],
          [await token.getAddress(), await token.getAddress()],
          [tokenId, tokenId],
          [emoji1, emoji2]
        )
      ).to.eql([true, true]);

      await expect(
        repository.bulkEmote(
          [await token.getAddress(), await token.getAddress()],
          [tokenId, tokenId],
          [emoji1, emoji2],
          [false, false]
        )
      )
        .to.emit(repository, "Emoted")
        .withArgs(
          await owner.getAddress(),
          await token.getAddress(),
          Number(tokenId),
          emoji1,
          false
        )
        .to.emit(repository, "Emoted")
        .withArgs(
          await owner.getAddress(),
          await token.getAddress(),
          Number(tokenId),
          emoji2,
          false
        );

      expect(
        await repository.bulkEmoteCountOf(
          [await token.getAddress(), await token.getAddress()],
          [tokenId, tokenId],
          [emoji1, emoji2]
        )
      ).to.eql([0n, 0n]);

      expect(
        await repository.haveEmotersUsedEmotes(
          [await owner.getAddress(), await owner.getAddress()],
          [await token.getAddress(), await token.getAddress()],
          [tokenId, tokenId],
          [emoji1, emoji2]
        )
      ).to.eql([false, false]);
    });

    it("can bulk emote and unemote at the same time", async function () {
      await repository.emote(await token.getAddress(), tokenId, emoji2, true);

      expect(
        await repository.bulkEmoteCountOf(
          [await token.getAddress(), await token.getAddress()],
          [tokenId, tokenId],
          [emoji1, emoji2]
        )
      ).to.eql([0n, 1n]);

      expect(
        await repository.haveEmotersUsedEmotes(
          [await owner.getAddress(), await owner.getAddress()],
          [await token.getAddress(), await token.getAddress()],
          [tokenId, tokenId],
          [emoji1, emoji2]
        )
      ).to.eql([false, true]);

      await expect(
        repository.bulkEmote(
          [await token.getAddress(), await token.getAddress()],
          [tokenId, tokenId],
          [emoji1, emoji2],
          [true, false]
        )
      )
        .to.emit(repository, "Emoted")
        .withArgs(
          await owner.getAddress(),
          await token.getAddress(),
          Number(tokenId),
          emoji1,
          true
        )
        .to.emit(repository, "Emoted")
        .withArgs(
          await owner.getAddress(),
          await token.getAddress(),
          Number(tokenId),
          emoji2,
          false
        );

      expect(
        await repository.bulkEmoteCountOf(
          [await token.getAddress(), await token.getAddress()],
          [tokenId, tokenId],
          [emoji1, emoji2]
        )
      ).to.eql([1n, 0n]);

      expect(
        await repository.haveEmotersUsedEmotes(
          [await owner.getAddress(), await owner.getAddress()],
          [await token.getAddress(), await token.getAddress()],
          [tokenId, tokenId],
          [emoji1, emoji2]
        )
      ).to.eql([true, false]);
    });

    it("can not bulk emote if passing arrays of different length", async function () {
      await expect(
        repository.bulkEmote(
          [await token.getAddress(), await token.getAddress()],
          [tokenId, tokenId],
          [emoji1, emoji2],
          [true]
        )
      ).to.be.revertedWithCustomError(
        repository,
        "BulkParametersOfUnequalLength"
      );

      await expect(
        repository.bulkEmote(
          [await token.getAddress()],
          [tokenId, tokenId],
          [emoji1, emoji2],
          [true, true]
        )
      ).to.be.revertedWithCustomError(
        repository,
        "BulkParametersOfUnequalLength"
      );

      await expect(
        repository.bulkEmote(
          [await token.getAddress(), await token.getAddress()],
          [tokenId],
          [emoji1, emoji2],
          [true, true]
        )
      ).to.be.revertedWithCustomError(
        repository,
        "BulkParametersOfUnequalLength"
      );

      await expect(
        repository.bulkEmote(
          [await token.getAddress(), await token.getAddress()],
          [tokenId, tokenId],
          [emoji1],
          [true, true]
        )
      ).to.be.revertedWithCustomError(
        repository,
        "BulkParametersOfUnequalLength"
      );
    });

    it("can use presigned emote to react to token", async function () {
      const message = await repository.prepareMessageToPresignEmote(
        await token.getAddress(),
        tokenId,
        emoji1,
        true,
        9999999999n
      );

        const signature = await owner.signMessage(ethers.getBytes(message));

      const r: string = signature.substring(0, 66);
      const s: string = "0x" + signature.substring(66, 130);
      const v: number = parseInt(signature.substring(130, 132), 16);

      await expect(
        repository
          .connect(addrs[0])
          .presignedEmote(
            await owner.getAddress(),
            await token.getAddress(),
            tokenId,
            emoji1,
            true,
            9999999999n,
            v,
            r,
            s
          )
      )
        .to.emit(repository, "Emoted")
        .withArgs(
          await owner.getAddress(),
          await token.getAddress(),
          Number(tokenId),
          emoji1,
          true
        );
    });

    it("can use presigned emotes to bulk react to token", async function () {
      const messages = await repository.bulkPrepareMessagesToPresignEmote(
        [await token.getAddress(), await token.getAddress()],
        [tokenId, tokenId],
        [emoji1, emoji2],
        [true, true],
        [9999999999n, 9999999999n]
      );

        const signature1 = await owner.signMessage(ethers.getBytes(messages[0]));

        const signature2 = await owner.signMessage(ethers.getBytes(messages[1]));

      const r1: string = signature1.substring(0, 66);
      const s1: string = "0x" + signature1.substring(66, 130);
      const v1: number = parseInt(signature1.substring(130, 132), 16);
      const r2: string = signature2.substring(0, 66);
      const s2: string = "0x" + signature2.substring(66, 130);
      const v2: number = parseInt(signature2.substring(130, 132), 16);

      await expect(
        repository
          .connect(addrs[0])
          .bulkPresignedEmote(
            [await owner.getAddress(), await owner.getAddress()],
            [await token.getAddress(), await token.getAddress()],
            [tokenId, tokenId],
            [emoji1, emoji2],
            [true, true],
            [9999999999n, 9999999999n],
            [v1, v2],
            [r1, r2],
            [s1, s2]
          )
      )
        .to.emit(repository, "Emoted")
        .withArgs(
          await owner.getAddress(),
          await token.getAddress(),
          Number(tokenId),
          emoji1,
          true
        )
        .to.emit(repository, "Emoted")
        .withArgs(
          await owner.getAddress(),
          await token.getAddress(),
          Number(tokenId),
          emoji2,
          true
        );
    });
  });
});
