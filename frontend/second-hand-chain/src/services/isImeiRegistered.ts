import Web3 from "web3";
import Contract from "web3-eth-contract";
import { AbiItem } from "web3-utils";
const abi = SecondHandChainCompiled;

import SecondHandChainCompiled from "../../../../truffle/build/contracts/SecondHandChain.json";
const contractAddressSHC: string = "0x360c612eb72bC04c1b7EE64E5e481bc6B4D80759";

var web3: Web3 = new Web3(
    "https://eth-sepolia.g.alchemy.com/v2/MGfg5dJiVVHJmYuN_lcjYLa5snWbIyDz"
  );

const isImeiRegistered = async (imei:string) => {
      const contract: Contract = new web3.eth.Contract(
        abi.abi as AbiItem[],
        contractAddressSHC
      );
      const fetchimeiRegistered = async () => {
        try {
          var response : boolean = await contract.methods.imeiRegistered(imei).call();
          return response
        } catch (error) {
          console.log(error);
        }
      }
  return await fetchimeiRegistered();
}

export default isImeiRegistered