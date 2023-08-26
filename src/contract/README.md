# Hardhat

## Install Module

```sh
$ npm install
```

## Compile

```sh
$ npx hardhat compile
```

## Test

### Article

```sh
$ npx hardhat test test/Article.test.ts
```

### Emoji

```sh
$ npx hardhat test test/Emoji.test.ts
```

## Deploy

### Testnet

#### Article Contract

```sh
$ npx hardhat run --network sepolia scripts/Article.deploy.ts
# or
$ npx hardhat run --network shibuya scripts/Article.deploy.ts
```

#### Emoji Contract

```sh
$ npx hardhat run --network sepolia scripts/Emoji.deploy.ts
# or
$ npx hardhat run --network shibuya scripts/Emoji.deploy.ts

```

#### Sample

```sh
$ npx hardhat run --network sepolia scripts/sample/Test.deploy.ts
# or
$ npx hardhat run --network shibuya scripts/sample/Test.deploy.ts
```

### Mainnet

#### Sample

```sh
$ npx hardhat run --network astar scripts/sample/Test.deploy.ts
```

## Contract Address

- [Contract Address](./docs/Sepolia.md)
