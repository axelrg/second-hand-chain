import Web3 from "web3";
import Contract from "web3-eth-contract";
import { AbiItem } from "web3-utils";





import SecondHandChainCompiled from "../../../../truffle/build/contracts/ERC721.json";
import nftStorage from "./nftStorage";
const contractAddressSHC: string = import.meta.env.VITE_CONTRACT_ADDRESS
const abi = SecondHandChainCompiled;
let selectedAccount: string;
var web3: Web3 = new Web3(
    "https://eth-sepolia.g.alchemy.com/v2/"+import.meta.env.VITE_ALCHEMY_API_KEY
  );


  interface Phone{
    model :string
    brand :string
    imei : string
    colour :string
    ram : string
    mem: string
    salePrice : string
    price : string
    image : File
}


const createPhone = async (phone: Phone) => {
   let provider = window.ethereum;

   const contract: Contract = new web3.eth.Contract(
    abi.abi as AbiItem[],
    contractAddressSHC
  );

        const fetchWallet = async () => {
            try {
                if (typeof provider !== 'undefined'){
                var accounts : string[] = await provider.request({method:'eth_requestAccounts'})
                selectedAccount=accounts[0]
                const balance : string = await web3.eth.getBalance(accounts[0])
                } else { 
                    return "You must log into Metamask" 
                }

                const fetchHash = async () => {
                    var url = await nftStorage(phone)
                    const tx = {
                        from: selectedAccount,
                        to: contractAddressSHC,
                        
                        'data': contract.methods.createPhone(
                              phone.model,
                              phone.imei,
                              phone.brand,
                              phone.colour,
                              web3.utils.toWei(phone.price, 'ether'),
                              web3.utils.toWei(phone.salePrice, 'ether'),
                              phone.ram,
                              phone.mem,
                              url
                            ).encodeABI()
                    }
                
                    try {
                        var response : string = await window.ethereum.request({
                            method: 'eth_sendTransaction',
                            params: [tx]
                        })
                        return response
                    } catch (error) {
                        return "You must log into Metamask"
                    }
                }
                   
                 return await fetchHash()
                    
            } catch (error) {
                return "You must sign it in Metamask"
            }
        };
    

    return await fetchWallet();

}

export default createPhone