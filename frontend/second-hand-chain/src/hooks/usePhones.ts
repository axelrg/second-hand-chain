import { useEffect, useState } from "react";
import Web3 from "web3";
import Contract from "web3-eth-contract";
import { AbiItem } from "web3-utils";
const abi = SecondHandChainCompiled;

import SecondHandChainCompiled from "../../../../truffle/build/contracts/ERC721.json";
const contractAddressSHC: string = "0xc725DDDfE7a82865DdbE3c1ee66b26c9a0252237";

var web3: Web3 = new Web3(
    "https://eth-sepolia.g.alchemy.com/v2/MGfg5dJiVVHJmYuN_lcjYLa5snWbIyDz"
  );

interface Phone{
    model :string
    brand :string
    colour :string
    ram : BigInteger
    mem: BigInteger
    owners : string[]
    saleTime : BigInteger[]
    salePrice : BigInteger[]
    price : BigInteger
}

const usePhones = () => {
    const [phones , setPhones] = useState<Phone[]>([]);

    useEffect(() => {
      const contract: Contract = new web3.eth.Contract(
        abi.abi as AbiItem[],
        contractAddressSHC
      );
      const fetchPhones = async () => {
        try {
          var response : Phone[] = await contract.methods.getPhones().call();
          console.log(response)
          setPhones(response)
        } catch (error) {
          console.log("ERROR FETCHING PHONES");
        }
      };
      fetchPhones();
    }, []);

    return phones
}

export default usePhones