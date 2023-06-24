export const WebsiteDescription = () => {
  return (
    <>
      <div className=" p-5 justify-center">
        <h1 className="text-5xl font-bold mb-6 text-center text-accent">
          Second Hand Chain
        </h1>
        <p className="text-lg mb-4 text-center">
          Second Hand Chain is a decentralized application (dApp) that serves as
          a platform for creating and managing trades involving non-fungible
          tokens (NFTs) representing real-world smartphones. By harnessing the
          power of blockchain technology, Second Hand Chain provides a secure,
          transparent, and efficient marketplace for the buying and selling of
          pre-owned smartphones. At its core, Second Hand Chain enables users to
          tokenize physical smartphones as unique NFTs on the blockchain. Each
          NFT represents a unique smartphone, with its features and ownership
          history. These NFTs act as digital certificates of authenticity,
          verifying the trade history of the corresponding physical devices.
        </p>
        <br />
        <h2 className="text-2xl font-bold mb-2 text-center">
          How to use Second Hand Chain:
        </h2>
      </div>
      <div className="preview border-base-300 bg-base-100 rounded-b-box rounded-tr-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden border bg-cover bg-top p-4 undefined">
        <div className=" flex flex-col w-full lg:flex-row justify-center">
          <div className="justify-center">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              1º Install and configure Metamask
            </h2>

            <p className="text-lg mb-4">
              The first step is getting a Metamask wallet and an account, takes
              less than 2 minutes, not even an email is required.
            </p>
            <iframe
              src="\InstallMetamask.mp4"
              width="380"
              height="214"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>

          <div className="divider lg:divider-horizontal justify-center"></div>

          <div className="justify-center">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              2º Get some Sepolia ETH and start to trade phones
            </h2>
            <p className="text-lg mb-4">
              To save data in blockchain networks you must pay some gas fees,
              you can get some ETH for Sepolia network. Get them for free from a
              faucet (Alchemy, Infura, Sepolia PoW Faucet, ...) or just ask me
              for some.
            </p>
            <iframe
              src="\demo.mp4"
              width="380"
              height="214"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </div>
      </div>

      <a
        className="btn btn-ghost drawer-button h-20 normal-case"
        href="https://github.com/axelrg/UBU-SecondHandChain"
      >
        <img
          className="w-20 h-20 btn-circle"
          src="github-mark-white.svg"
          alt="TypeScript Logo"
        />
      </a>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-center">
          Technologies Used:
        </h2>
        <div className="flex flex-wrap items-center justify-center">
          <div className="flex items-center justify-center m-4">
            <img
              className="w-20 h-20"
              src="typescript-logo.svg"
              alt="TypeScript Logo"
            />
          </div>
          <div className="flex items-center justify-center m-4">
            <img className="w-20 h-20" src="react-logo.svg" alt="React Logo" />
          </div>
          <div className="flex items-center justify-center m-4">
            <img className="w-20 h-20" src="vite-logo.svg" alt="Vite Logo" />
          </div>
          <div className="flex items-center justify-center m-4">
            <img
              className="w-20 h-20"
              src="solidity-logo.svg"
              alt="Solidity Logo"
            />
          </div>
          <div className="flex items-center justify-center m-4">
            <img
              className="w-20 h-20"
              src="alchemy-logo.svg"
              alt="Alchemy Logo"
            />
          </div>
          <div className="flex items-center justify-center m-4">
            <img
              className="w-20 h-20"
              src="metamask-logo.svg"
              alt="MetaMask Logo"
            />
          </div>
          <div className="flex items-center justify-center m-4">
            <img
              className="w-20 h-20"
              src="tailwind-logo.svg"
              alt="Tailwind CSS Logo"
            />
          </div>
          <div className="flex items-center justify-center m-4">
            <img
              className="w-20 h-15"
              src="nftstorage-logo.svg"
              alt="nftstorage Logo"
            />
          </div>
          <div className="flex items-center justify-center m-4">
            <img
              className="w-20 h-20"
              src="daisyui-logo.svg"
              alt="Daisy UI Logo"
            />
          </div>
          <div className="flex items-center justify-center m-4">
            <img
              className="w-20 h-20"
              src="truffle-logo.svg"
              alt="Truffle Logo"
            />
          </div>
          <div className="flex items-center justify-center m-4">
            <img
              className="w-20 h-20"
              src="vercel-logo.svg"
              alt="Vercel Logo"
            />
          </div>
        </div>
      </div>
    </>
  );
};
