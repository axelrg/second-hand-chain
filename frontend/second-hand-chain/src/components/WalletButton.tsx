import { useEffect, useState } from "react";

export const WalletButton = () => {
  let selectedAccount: string = "";
  const [error, setError] = useState("");
  const [connected, setConected] = useState<boolean>();
  const [account, setAccount] = useState<string>();

  const connectWallet = () => {
    let provider = window.ethereum;
    let isConnected: boolean = false;

    if (typeof provider !== "undefined") {
      const fetchWallet = async () => {
        try {
          var accounts: string[] = await provider.request({
            method: "eth_requestAccounts",
          });
          selectedAccount = accounts[0];
          setConected(true);
          isConnected = true;
          setAccount(accounts[0]);
          setError("");
        } catch (error) {
          setError("Log in from Metamask extension");
        }
      };

      fetchWallet();
    } else {
      setError("Install Metamask");
    }
  };

  useEffect(() => {
    connectWallet();

    const t = setInterval(connectWallet, 3000);

    return () => clearInterval(t); // clear
  }, []);

  return (
    <>
      {error == "" && connected && (
        <div className="tooltip tooltip-bottom" data-tip="Wallet Account">
          <button className="btn no-animation">
            {account?.substring(0, 5)}...{account?.slice(-5)}
          </button>
        </div>
      )}
      {error == "" && !connected && (
        <button className="btn" onClick={() => connectWallet()}>
          {" "}
          Login to Metamask{" "}
        </button>
      )}

      {error == "Install Metamask" && (
        <div className="indicator">
          <span className="indicator-item indicator-bottom indicator-start badge badge-warning">
            {error}
          </span>
          <button className="btn btn-disabled">Login to Metamask </button>
        </div>
      )}
      {error == "Log in from Metamask extension" && (
        <div className="indicator">
          <span className="indicator-item indicator-bottom indicator-start badge badge-warning">
            {error}
          </span>
          <button className="btn btn-disabled">Login to Metamask </button>
        </div>
      )}
    </>
  );
};
