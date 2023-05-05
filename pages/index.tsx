import { ConnectWallet } from '@thirdweb-dev/react'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="container mx-auto ">
      <h1 className="text-3xl pt-4">ERC Standard Contracts </h1>
      <main className="pt-4">
        <div className="m-4">
          <h1 className="text-2xl">ERC-20: Token </h1>
          <p>Token standard</p>
          <a href="https://ethereum.org/en/developers/docs/standards/tokens/erc-20/">
            ERC-20
          </a>
        </div>
        <div className="m-4">
          <h1 className="text-2xl">ERC-721: NFT </h1>
          <p>NFT - Non-Fungible Token</p>
          <a href="https://ethereum.org/en/developers/docs/standards/tokens/erc-721/">
            ERC-721
          </a>
        </div>
        <div className="m-4">
          <h1 className="text-2xl">ERC-1155: Multi-Token </h1>
          <p>Multi-token</p>
          <a href="https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/">
            ERC-1155
          </a>
        </div>
      </main>
    </div>
  )
}

export default Home
