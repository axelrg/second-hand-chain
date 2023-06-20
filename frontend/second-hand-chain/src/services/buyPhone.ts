import Web3 from "web3";
import Contract from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import Erc721Compiled from "../../../../truffle/build/contracts/ERC721.json";
import getPhoneOwner from "./getPhoneOwner";

const abi = Erc721Compiled;


const contractAddressERC: string = import.meta.env.VITE_CONTRACT_ADDRESS;
let selectedAccount: string;
var web3: Web3 = new Web3(
    "https://eth-sepolia.g.alchemy.com/v2/"+import.meta.env.VITE_ALCHEMY_API_KEY
  );

const buyPhone = async (id:Number, price:string) => {
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
                }else{
                    console.log("sip")
                    return "You must log into Metamask"
                }

                const signBuyPhone = async () => {

                    var from = await getPhoneOwner(id)

                    const tx= {
                        from: selectedAccount,
                        to: contractAddressERC,
                        value: web3.utils.toHex(price),
                        
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
                            console.log(error)
                            return "You must log into Metamask";
                        }
                    }
                    return await signBuyPhone()
            } catch (error) {
                console.log(error)
                return "You must log into Metamask"
            }
        };
    

    return await callBuyPhone();

}

export default buyPhone