import React, { useState } from "react";

export const WalletButton = () => {
  let selectedAccount: string = "";

  const connectWallet = () => {
    let provider = window.ethereum;
    let isConnected: boolean = false;

    if (typeof provider !== "undefined") {
      const fetchWallet = async () => {
        try {
          var accounts: string[] = await provider.request({
            method: "eth_requestAccounts",
          });
          console.log(accounts);
          selectedAccount = accounts[0];
          setConected(true);
          isConnected = true;
          setAccount(accounts[0]);
        } catch (error) {
          console.log(error);
        }
      };

      fetchWallet();
    } else {
      alert("Install Metamask");
    }

    return isConnected;
  };

  const [connected, setConected] = useState<boolean>(connectWallet());
  const [account, setAccount] = useState<string>();

  return (
    <>
      {connected && (
        <button className="btn" onClick={() => connectWallet()}>
          {account}
        </button>
      )}
      {!connected && (
        <button className="btn" onClick={() => connectWallet()}>
          {" "}
          Login to Metamask{" "}
        </button>
      )}
    </>
  );
};
