import { useEffect, useState } from "react";
import Web3 from "web3";
import Contract from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import SecondHandChainCompiled from "../../../../truffle/build/contracts/SecondHandChain.json";

const abi = SecondHandChainCompiled;


const contractAddressSHC: string = "0x2751ba6CA233db6bb12D57311D49621Ee76bA55b";
let selectedAccount: string;
var web3: Web3 = new Web3(
    "https://eth-sepolia.g.alchemy.com/v2/MGfg5dJiVVHJmYuN_lcjYLa5snWbIyDz"
  );

const createPhone = () => {
   let provider = window.ethereum;

   if (typeof provider !== 'undefined'){

        const fetchWallet = async () => {
            try {
                var accounts : string[] = await provider.request({method:'eth_requestAccounts'})
                console.log(accounts)
                selectedAccount=accounts[0]
                const balance : string = await web3.eth.getBalance(accounts[0])
                console.log(balance)
                const contract: Contract = new web3.eth.Contract(
                    abi.abi as AbiItem[],
                    contractAddressSHC
                  );  
                
                const tx = {
                    from: selectedAccount,
                    to: contractAddressSHC,
                    
                    'data': contract.methods._createPhone(
                          "iPhone 9",
                          "aaaaaaaaabbbcccg",
                          "Apple",
                          "Red",
                          560000,
                          5600000,
                          8,
                          128 
                        ).encodeABI()
                }

                const txHash = await window.ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [tx]
                })

                
            
            } catch (error) {
                console.log(error)
            }
        };
    
    fetchWallet();

    



    

    //provider.request({method:'eth_requestAccounts'}).then( accounts  =>{
    //    console.log(accounts)
    //}).catch(err => {
    //    console.log(err)
    //})
   }
    
}

export default createPhone