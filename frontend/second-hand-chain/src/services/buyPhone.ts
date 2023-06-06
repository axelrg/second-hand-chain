import Web3 from "web3";
import Contract from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import Erc721Compiled from "../../../../truffle/build/contracts/ERC721.json";
import getPhoneOwner from "./getPhoneOwner";

const abi = Erc721Compiled;


const contractAddressERC: string = "0xc725DDDfE7a82865DdbE3c1ee66b26c9a0252237";
let selectedAccount: string;
var web3: Web3 = new Web3(
    "https://eth-sepolia.g.alchemy.com/v2/MGfg5dJiVVHJmYuN_lcjYLa5snWbIyDz"
  );

const buyPhone = async (id:Number) => {
    let provider = window.ethereum;

    const contract: Contract = new web3.eth.Contract(
    abi.abi as AbiItem[],
    contractAddressERC
    );

        const callBuyPhone = async () => {
            try {
                if (typeof provider !== 'undefined'){
                var accounts : string[] = await provider.request({method:'eth_requestAccounts'})
                console.log(accounts)
                selectedAccount=accounts[0]
                }

                const signBuyPhone = async () => {

                    var from = await getPhoneOwner(id)

                    console.log(from)

                    const tx= {
                        from: selectedAccount,
                        to: contractAddressERC,
                        value: web3.utils.toHex(web3.utils.toWei('0.2', 'ether')),
                        
                        'data': contract.methods.transferFrom(
                            from, 
                            selectedAccount, 
                            id
                        ).encodeABI()
                    }
                        try {
                            var response : string = await window.ethereum.request({
                                method: 'eth_sendTransaction',
                                params: [tx]
                            })
                            return response
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    return await signBuyPhone()
            } catch (error) {
                console.log(error)
            }
        };
    

    return await callBuyPhone();

}

export default buyPhone