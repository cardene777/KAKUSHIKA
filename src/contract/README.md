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
```

#### Emoji Contract

```sh
$ npx hardhat run --network sepolia scripts/Emoji.deploy.ts
```
