import Web3 from "web3";
import Contract from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import SecondHandChainCompiled from "../../../../truffle/build/contracts/ERC721.json";
const contractAddressSHC: string = "0xdB763aD869253e0eA95f64c7150d02A13dC5A7dD";
const abi = SecondHandChainCompiled;
let selectedAccount: string;
var web3: Web3 = new Web3(
    "https://eth-sepolia.g.alchemy.com/v2/MGfg5dJiVVHJmYuN_lcjYLa5snWbIyDz"
  );




const putPhoneOnSale = async (id:string, price:string) => {
    let provider = window.ethereum;
    console.log(typeof price)

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
                            web3.utils.toWei(price, 'ether'),
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
                    return await signPutOnSale()
            } catch (error) {
                console.log(error)
            }
        };
    

    return await callPutOnSale();

}

export default putPhoneOnSale