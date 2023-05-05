import {
  Address,
  Web3Button,
  useAddress,
  useBurnToken,
  useContract,
  useContractMetadata,
  useContractMetadataUpdate,
  useContractWrite,
  useGrantRole,
  useMintToken,
  useTokenBalance,
  useTokenSupply,
  useTransferToken,
} from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import Image from 'next/image'

const contractAddress = '0x3b09f4a3571434B59fe7419457bAA8920Cc5B4F7' // erc-20 contract
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

  // Get token balance of a wallet
  const {
    data: balance,
    isLoading: is3,
    error: e3,
  } = useTokenBalance(contract, address)

  // Get total supply
  const {
    data: totalSupply,
    isLoading: is4,
    error: e4,
  } = useTokenSupply(contract)

  // Transfer token to a specific wallet
  const {
    mutate: transferTokens,
    isLoading: is5,
    error: e5,
  } = useTransferToken(contract)

  if (e5) {
    console.error('failed to transfer tokens', e5)
  }

  // Burn Tokens
  const {
    mutate: burnTokens,
    isLoading: is6,
    error: e6,
  } = useBurnToken(contract)

  if (e6) {
    console.error('failed to burn tokens', e6)
  }

  // Mint tokens
  const {
    mutate: mintTokens,
    isLoading: is7,
    error: e7,
  } = useMintToken(contract)

  if (e7) {
    console.error('failed to mint tokens', e7)
  }

  // Permissions - grant a role
  const {
    mutate: grantRole,
    isLoading: is8,
    error: e8,
  } = useGrantRole(contract)

  if (e8) {
    console.error('failed to grant role', e8)
  }

  // useContractWrite(contract, "transfer")
  const { mutateAsync: transfer, isLoading } = useContractWrite(
    contract,
    'transfer'
  )
  const callTransfer = async (address: Address, amount: String) => {
    try {
      const data = await transfer({ args: [address, amount] })
      console.info('contract call successs', data)
    } catch (err) {
      console.error('contract call failure', err)
    }
  }

  return (
    <div className="container mx-auto ">
      <h1 className="text-3xl pt-4">ERC-20 </h1>

      <div className="p-4 my-2 bg-slate-100 rounded-md">
        <h3 className="text-xl">Wallet Info.</h3>
        <p>Current connected wallet address: {address}</p>
      </div>

      <div className="p-4 my-2 bg-slate-100 rounded-md">
        <h3 className="text-xl">Contract Info. - Metadata</h3>
        <p>
          <a
            href="https://thirdweb.com/mumbai/0x3b09f4a3571434B59fe7419457bAA8920Cc5B4F7"
            className="bg-red-200 p-1 rounded-md"
          >
            Sultan token dashboard
          </a>
        </p>
        <p>Contract address: {contractAddress}</p>
        <p>Name: {contractMetadata?.name}</p>
        <p>Symbol: {contractMetadata?.symbol}</p>
        <p>Description: {contractMetadata?.description}</p>
        <Image
          src={contractMetadata?.image}
          width={100}
          height={100}
          alt="ipfs image"
        />

        <button
          className="bg-red-200 p-1 rounded-md"
          disabled={is2}
          onClick={() =>
            updateContractMetadata({
              name: 'Sultan Token 2',
              description: 'Updated description 2',
            })
          }
        >
          Update contract metadata 2
        </button>
        <br />
        <Web3Button
          contractAddress={contractAddress}
          action={() => {
            updateContractMetadata({
              name: 'Sultan Token 3',
              description: 'Updated description 3',
            })
          }}
          theme="light"
        >
          Update contract metadata 3
        </Web3Button>
      </div>

      <div className="p-4 my-2 bg-slate-100 rounded-md">
        <h3 className="text-xl">Token - transfer, burn, mint </h3>
        <p>Wallet address: {address} </p>
        <p>Token balance: {balance?.displayValue}</p>
        <p>Total supply: {totalSupply?.displayValue}</p>
        <br />
        <Web3Button
          contractAddress={contractAddress}
          action={() => {
            transferTokens({ to: address2, amount: 2000 })
          }}
          theme="light"
        >
          Transfer 2000 to address2
        </Web3Button>
        <Web3Button
          contractAddress={contractAddress}
          action={() => {
            transferTokens({ to: address3, amount: 3000 })
          }}
          theme="light"
        >
          Transfer 3000 to address3
        </Web3Button>
        <br />
        <p>Transfer using contract write call function</p>
        <button
          className="bg-red-200 p-1 mx-2 rounded-md"
          onClick={() => callTransfer(address2, '1500')}
        >
          Transfer 1500 to address2
        </button>
        <button
          className="bg-red-200 p-1 mx-2 rounded-md"
          onClick={() => callTransfer(address3, '2500')}
        >
          Transfer 2500 to address3
        </button>
        <br />
        <Web3Button
          contractAddress={contractAddress}
          action={() => {
            burnTokens({ amount: 1000 })
          }}
          theme="dark"
        >
          Burn 999 tokens from address1
        </Web3Button>
        <br />
        <button
          className="bg-red-200 p-1 mx-2 rounded-md"
          disabled={is7}
          onClick={() => mintTokens({ to: address1, amount: 1000 })}
        >
          Mint 1000 to address1
        </button>
        <button
          className="bg-red-200 p-1 mx-2 rounded-md"
          disabled={is7}
          onClick={() => mintTokens({ to: address2, amount: 2000 })}
        >
          Mint 2000 to address2
        </button>
        <button
          className="bg-red-200 p-1 mx-2 rounded-md"
          disabled={is7}
          onClick={() => mintTokens({ to: address3, amount: 3000 })}
        >
          Mint 3000 to address3
        </button>
      </div>

      <div className="p-4 my-2 bg-slate-100 rounded-md">
        <h3 className="text-xl">Permissions </h3>
        <button
          className="bg-red-200 p-1 mx-2 rounded-md"
          disabled={is8}
          onClick={() => grantRole({ role: 'admin', address: address2 })}
        >
          Grant Admin role to address2
        </button>
        <button
          className="bg-red-200 p-1 mx-2 rounded-md"
          disabled={is8}
          onClick={() => grantRole({ role: 'admin', address: address3 })}
        >
          Grant Admin role to address3
        </button>
      </div>
    </div>
  )
}

export default Home
