import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractMetadata,
  useContractMetadataUpdate,
  useNFT,
} from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import Image from 'next/image'

const contractAddress = '0x4b37532Eb5e2f40BF31e34d90A52454FdB003128' // erc-721 collection contract
const address1 = '0xE80A51ab33cAefE128AC9AE04BF6822C8FBb619b' // owner of the contract
const address2 = '0x3B4E78E08de9FF899EB5Ca82710C5f2cD26E0bBC'
const address3 = '0x495d579DB75cED9f912438666b98d9c8d5b3F6d5'

const Home: NextPage = () => {
  const address = useAddress()
  const { contract, isLoading: isLoadingContract } =
    useContract(contractAddress)

  // Get ContractMetadata
  const { data: contractMetadata, isLoading: is1 } =
    useContractMetadata(contract)

  // Update ContractMetadata
  const {
    mutate: updateContractMetadata,
    isLoading: is2,
    error: e2,
  } = useContractMetadataUpdate(contract)

  if (e2) {
    console.error('failed to update contract metadata', e2)
  }

  // Get a single NFT
  const tokenId = 0 // the tokenId to look up
  const { data: nft, isLoading: is3, error: e3 } = useNFT(contract, tokenId)
  console.log(nft?.metadata.owner)

  return (
    <div className="container mx-auto ">
      <h1 className="text-3xl pt-4">ERC-721 </h1>

      <div className="p-4 my-2 bg-slate-100 rounded-md">
        <h3 className="text-xl">Wallet Info.</h3>
        <p>Current connected wallet address: {address}</p>
      </div>

      <div className="p-4 my-2 bg-slate-100 rounded-md">
        <h3 className="text-xl">Contract Info. - Metadata</h3>
        <p>
          <a
            href="https://thirdweb.com/mumbai/0x4b37532Eb5e2f40BF31e34d90A52454FdB003128"
            className="bg-red-200 p-1 rounded-md"
          >
            NFT collection - dashboard
          </a>
        </p>
        <p>Contract address: {contractAddress}</p>
        <p>Name: {contractMetadata?.name}</p>
        <p>Symbol: {contractMetadata?.symbol}</p>
        <p>Description: {contractMetadata?.description}</p>
      </div>

      <div className="p-4 my-2 bg-slate-100 rounded-md">
        <h3 className="text-xl">ERC-721 extension</h3>
        <p>tokenID: {tokenId}</p>
        <p>owner: {nft?.owner}</p>
        <p>type: {nft?.type}</p>
        <p>name: {nft?.metadata.name}</p>
        <p>description: {nft?.metadata.description}</p>
        <Image
          src={nft?.metadata.image}
          width={100}
          height={100}
          alt="ipfs image"
        />
      </div>
    </div>
  )
}

export default Home
