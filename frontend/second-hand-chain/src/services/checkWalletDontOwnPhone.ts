import Web3 from "web3";
import Contract from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import SecondHandChainCompiled from "../../../../truffle/build/contracts/ERC721.json";
const contractAddressSHC: string = "0xdB763aD869253e0eA95f64c7150d02A13dC5A7dD";
const abi = SecondHandChainCompiled;

var web3: Web3 = new Web3(
  "https://eth-sepolia.g.alchemy.com/v2/MGfg5dJiVVHJmYuN_lcjYLa5snWbIyDz"
);

let selectedAccount: string;

const checkWalletDontOwnPhone = async (id:Number) => {
      const contract: Contract = new web3.eth.Contract(
        abi.abi as AbiItem[],
        contractAddressSHC
      );
      
      const fetchPhoneOwner = async () => {
        try {
          let provider = window.ethereum;
          if (typeof provider !== 'undefined'){
            var accounts : string[] = await provider.request({method:'eth_requestAccounts'})
            selectedAccount=accounts[0]
            }
          var response : string = await contract.methods.getPhoneOwner(id).call();

          if (response.toLowerCase() == selectedAccount.toLowerCase()){
            return "true"
          } else {
            return "false"
          }
        } catch (error) {
          console.log(error);
          return "Log into Metamask"
          
        }
      }
  return await fetchPhoneOwner();
}

export default checkWalletDontOwnPhone