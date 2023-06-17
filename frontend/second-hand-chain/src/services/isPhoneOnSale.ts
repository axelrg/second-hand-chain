import Web3 from "web3";
import Contract from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import SecondHandChainCompiled from "../../../../truffle/build/contracts/ERC721.json";
const contractAddressSHC: string = "0x57C2531dA183eA7B8E78659fDF37206c8f43bD8E";
const abi = SecondHandChainCompiled;

var web3: Web3 = new Web3(
    "https://eth-sepolia.g.alchemy.com/v2/MGfg5dJiVVHJmYuN_lcjYLa5snWbIyDz"
  );

const isPhoneOnSale = async (id:Number) => {
      const contract: Contract = new web3.eth.Contract(
        abi.abi as AbiItem[],
        contractAddressSHC
      );
      const fetchimeiRegistered = async () => {
        try {
          var response : boolean = await contract.methods.getIsPhoneOnSale(id).call();
          return response
        } catch (error) {
          console.log(error);
        }
      }
  return await fetchimeiRegistered();
}

export default isPhoneOnSale