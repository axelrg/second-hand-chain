import { useEffect, useState } from "react";
import Web3 from "web3";
import Contract from "web3-eth-contract";
import { AbiItem } from "web3-utils";
const abi = SecondHandChainCompiled;

import SecondHandChainCompiled from "../../../../truffle/build/contracts/ERC721.json";
const contractAddressSHC: string = import.meta.env.VITE_CONTRACT_ADDRESS;

var web3: Web3 = new Web3(
  "https://eth-sepolia.g.alchemy.com/v2/"+import.meta.env.VITE_ALCHEMY_API_KEY
  );

interface Phone{
    id : Number
    model :string
    brand :string
    colour :string
    ram : BigInteger
    mem: BigInteger
    owners : string[]
    saleTime : BigInteger[]
    salePrice : BigInteger[]
    price : BigInteger
    url: string
}

const usePhones = (changeFetchedPhones:string) => {
    let provider = window.ethereum;
    let selectedAccount: string;
    const [phones , setPhones] = useState<Phone[]>([]);


    useEffect(() => {
        
      const contract: Contract = new web3.eth.Contract(
        abi.abi as AbiItem[],
        contractAddressSHC
      );
      const fetchPhones = async () => {
        try {
            
            var accounts : string[] = await provider.request({method:'eth_requestAccounts'})
            selectedAccount=accounts[0]
            
          var response : Phone[] = await contract.methods.getAllPhonesInAddress(selectedAccount).call();
          setPhones(response)
        } catch (error) {
          
          setPhones([])
        }
      };
      fetchPhones();
    }, [changeFetchedPhones]);

    return phones
}

export default usePhones