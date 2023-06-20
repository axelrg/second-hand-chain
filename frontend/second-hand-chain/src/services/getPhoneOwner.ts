import Web3 from "web3";
import Contract from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import SecondHandChainCompiled from "../../../../truffle/build/contracts/ERC721.json";
const contractAddressSHC: string = import.meta.env.VITE_CONTRACT_ADDRESS;
const abi = SecondHandChainCompiled;

var web3: Web3 = new Web3(
  "https://eth-sepolia.g.alchemy.com/v2/"+import.meta.env.VITE_ALCHEMY_API_KEY
  );

const getPhoneOwner = async (id:Number) => {
      const contract: Contract = new web3.eth.Contract(
        abi.abi as AbiItem[],
        contractAddressSHC
      );
      const fetchPhoneOwner = async () => {
        try {
          var response : boolean = await contract.methods.getPhoneOwner(id).call();
          return response
        } catch (error) {
          console.log(error);
        }
      }
  return await fetchPhoneOwner();
}

export default getPhoneOwner