import { useEffect, useState } from "react";
import Web3 from "web3";
import Contract from "web3-eth-contract";
import { AbiItem } from "web3-utils";
const abi = SecondHandChainCompiled;

import SecondHandChainCompiled from "../../../../truffle/build/contracts/SecondHandChain.json";
const contractAddressSHC: string = "0x2751ba6CA233db6bb12D57311D49621Ee76bA55b";

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
    saletime : BigInteger[]
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