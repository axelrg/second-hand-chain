import Web3 from "web3";
import Contract from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import SecondHandChainCompiled from "../../../../truffle/build/contracts/SecondHandChain.json";

const abi = SecondHandChainCompiled;


const contractAddressSHC: string = "0x360c612eb72bC04c1b7EE64E5e481bc6B4D80759";
let selectedAccount: string;
var web3: Web3 = new Web3(
    "https://eth-sepolia.g.alchemy.com/v2/MGfg5dJiVVHJmYuN_lcjYLa5snWbIyDz"
  );




const putPhoneOnSale = async (id:string, price:string) => {
    let provider = window.ethereum;

    const contract: Contract = new web3.eth.Contract(
    abi.abi as AbiItem[],
    contractAddressSHC
    );

        const callPutOnSale = async () => {
            try {
                if (typeof provider !== 'undefined'){
                var accounts : string[] = await provider.request({method:'eth_requestAccounts'})
                console.log(accounts)
                selectedAccount=accounts[0]
                }

                const signPutOnSale = async () => {
                    const tx = {
                        from: selectedAccount,
                        to: contractAddressSHC,
                        
                        'data': contract.methods.putPhoneOnSale(
                              price,id
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
                    return await signPutOnSale()
            } catch (error) {
                console.log(error)
            }
        };
    

    return await callPutOnSale();

}

export default putPhoneOnSale