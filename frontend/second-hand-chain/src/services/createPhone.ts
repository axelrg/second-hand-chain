import Web3 from "web3";
import Contract from "web3-eth-contract";
import { AbiItem } from "web3-utils";





import SecondHandChainCompiled from "../../../../truffle/build/contracts/ERC721.json";
const contractAddressSHC: string = "0x57C2531dA183eA7B8E78659fDF37206c8f43bD8E";
const abi = SecondHandChainCompiled;
let selectedAccount: string;
var web3: Web3 = new Web3(
    "https://eth-sepolia.g.alchemy.com/v2/MGfg5dJiVVHJmYuN_lcjYLa5snWbIyDz"
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
                console.log(accounts)
                selectedAccount=accounts[0]
                const balance : string = await web3.eth.getBalance(accounts[0])
                console.log(balance)
                }

                const fetchHash = async () => {
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
                              phone.mem
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
                console.log(error)
            }
        };
    

    return await fetchWallet();

}

export default createPhone