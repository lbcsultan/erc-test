import { ConnectWallet } from '@thirdweb-dev/react'
import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <div className="bg-yellow-100">
      <div className="flex items-center justify-between container mx-auto">
        <div className="text-4xl font-bold ">ERC-Test</div>
        <div className="flex flex-row ">
          <Link href={'/'} className="menuitem">
            Home
          </Link>
          <Link href={'/erc20'} className="menuitem">
            ERC20
          </Link>
          <Link href={'/erc721'} className="menuitem">
            ERC721
          </Link>
          <Link href={'/erc1155'} className="menuitem">
            ERC1155
          </Link>
        </div>
        <ConnectWallet />
      </div>
    </div>
  )
}

export default Header
