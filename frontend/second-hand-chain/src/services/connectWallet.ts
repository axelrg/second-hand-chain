import Web3 from "web3";



let selectedAccount: string;
var web3: Web3 = new Web3(
    "https://eth-sepolia.g.alchemy.com/v2/"+import.meta.env.VITE_ALCHEMY_API_KEY
  );

const connectWallet = () => {
   let provider = window.ethereum;

   if (typeof provider !== 'undefined'){

        const fetchWallet = async () => {
            try {
                var accounts : string[] = await provider.request({method:'eth_requestAccounts'})
                console.log(accounts)
                selectedAccount=accounts[0]
                const balance : string = await web3.eth.getBalance(accounts[0])
                console.log(balance)
                
            } catch (error) {
                console.log(error)
            }
        };
    
    fetchWallet();
   }
   else{
    //alert("Install Metamask")
   }
    
}

export default connectWallet